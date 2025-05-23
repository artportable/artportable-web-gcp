import { checkoutFormStyles } from "./checkoutForm.css";
import { Box, CircularProgress, Snackbar } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "../Button/Button";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { capitalizeFirst } from "../../utils/util";
import router from "next/router";
import { TokenContext } from "../../contexts/token-context";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { UserContext } from "../../contexts/user-context";
import { zapierLeadBasicConfirmed } from "../../utils/zapierLead";
import TextField from "@mui/material/TextField";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const zapierBasicConfirmedApiUrl =
  process.env.NEXT_PUBLIC_ZAPIER_BASIC_CONFIRMED;

export default function CheckoutForm({ email, fullName, plan }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [customerId, setCustomerId] = useState("");
  const [countdown, setCountdown] = useState(6);
  const token = useContext(TokenContext);
  const countdownRef = useRef(null);
  const { family_name, given_name, phone, user_type } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const styles = checkoutFormStyles();
  const { t } = useTranslation(["checkout", "common"]);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [promotionCode, setpromotionCode] = useState("");
  const interval = t(plan?.recurringInterval);

  useEffect(() => {
    if (email !== null && fullName !== null && plan !== null) {
      // Create a Stripe customer as soon as the page loads
      fetch(`${apiBaseUrl}/api/payments/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          fullName: fullName,
          phoneNumber: phone.value,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCustomerId(data?.id);
        })
        .catch((e) => console.log(e));
    }
  }, [email, fullName, plan]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "18px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const confirmedPortfolio = () => {
    setPaymentConfirmed(true);
    zapierLeadBasicConfirmed({
      name: { value: given_name.value + " " + family_name.value } ?? "",
      phoneNumber: { value: phone.value } ?? "",
      email: { email } ?? "",
      product: "portfolio",
      type: { value: user_type.value } ?? "",
    });
  };
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Create payment method towards Stripe
  function createPaymentMethod() {
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const billingName = fullName;

    stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: billingName,
        },
      })
      .then((result) => {
        if (result.error) {
          setErrorOpen(true);
          setProcessing(false);
          setDisabled(true);
        } else {
          createSubscription({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            priceId: plan.id,
            promotionCode: promotionCode,
          })
            .then((result) => {
              setSucceeded(true);
              setProcessing(false);
            })
            .catch((error) => {
              setErrorOpen(true);
            });
        }
      });
  }

  // Create subscription
  function createSubscription({
    customerId,
    paymentMethodId,
    priceId,
    promotionCode,
  }) {
    return fetch(`${apiBaseUrl}/api/Payments/subscriptions`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerId: customerId,
        paymentMethodId: paymentMethodId,
        priceId: priceId,
        promotionCodeId: promotionCode,
      }),
    })
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          setErrorOpen(true);
          throw new Error("Error creating subscription");
        }
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          setErrorOpen(true);
          throw new Error(result.error.message);
        }

        // Check if the status is "succeeded"
        if (result.Status === "succeeded") {
          setSucceeded(true);
          startCountdown();
          return result;
        }

        // Check if 3D Secure is required
        // Check if 3D Secure is required
        if (result.requiresAction) {
          return stripe
            .confirmCardPayment(result.clientSecret, {
              payment_method: paymentMethodId,
            })
            .then((resultConfirm) => {
              if (resultConfirm.error) {
                setErrorOpen(true);
                throw new Error(resultConfirm.error.message);
              } else if (resultConfirm.paymentIntent.status === "succeeded") {
                setSucceeded(true);
                startCountdown();
                return resultConfirm;
              } else {
                setErrorOpen(true);
                throw new Error(
                  "Payment failed after 3D Secure authentication"
                );
              }
            })
            .catch((error) => {
              setErrorOpen(true);
              setProcessing(false);
              throw error;
            });
        }
      })
      .catch((error) => {
        setErrorOpen(true);
        setProcessing(false);
        console.error(error);
        throw error;
      });
  }

  const startCountdown = () => {
    countdownRef.current = setInterval(
      () => setCountdown((prev) => prev - 1),
      1000
    );
  };

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(countdownRef.current);
      confirmedPortfolio();
      router.push("/");
    }
  }, [countdown]);

  const handleSuccessClose = () => {
    confirmedPortfolio();
    router.push("/");
  };

  useEffect(() => {
    if (paymentConfirmed) {
      sessionStorage.setItem("payment", "true");
    }
  }, [confirmedPortfolio]);

  const validateCoupon = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/Payments/validate-coupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ promotionCode }),
        }
      );

      const data = await response.json();
      if (data.valid) {
        // Update UI to show discount
      } else {
        setError("Invalid coupon code");
      }
    } catch (error) {
      setError("Error validating coupon");
    }
  };

  return (
    <>
      <div className={styles.cardElementContainer}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      </div>
      {/* Show any error that happens when processing the payment */}
      <div className={styles.cardErrorContainer} role="alert">
        {error}
      </div>

      <div className={styles.product}>
        <Box fontSize="1rem">{t("product")}</Box>
        <Box>{plan?.product}</Box>
      </div>
      <Box className={styles.subtotal}>
        <Box fontSize="1rem" fontWeight="bold">
          {t(":Total")}
        </Box>

        {plan?.productKey === "portfolioPremiumPlus" ? (
          <Box>975 SEK</Box>
        ) : plan?.productKey === "portfolioPremium" ? (
          <Box>359 SEK</Box>
        ) : (
          <Box>{t("newPlan")}</Box>
        )}
      </Box>
      <Box className={styles.divider}></Box>
      {plan?.productKey === "portfolioPremium" && (
        <div>
          <TextField
            label={t("Discount code")}
            variant="outlined"
            value={promotionCode}
            onChange={(e) => setpromotionCode(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
      )}
      <Box
        display="flex"
        position="relative"
        justifyContent="flex-end"
        marginTop="2rem"
      >
        <Button
          variant="contained"
          color="primary"
          disableElevation
          rounded
          onClick={createPaymentMethod}
          disabled={processing || disabled || succeeded}
        >
          {capitalizeFirst(t("common:words.pay"))}
          {processing && (
            <CircularProgress
              size={24}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Button>
      </Box>

      <Snackbar open={succeeded} onClose={handleSuccessClose}>
        <Alert
          severity="success"
          variant="filled"
          action={
            <Button style={{ color: "#fff" }} onClick={() => startCountdown()}>
              {t("takeMeThereNow")}
            </Button>
          }
        >
          <AlertTitle>{t("paymentSuccessful")}</AlertTitle>
          {t("redirectingIn")}: {countdown}...
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        onClose={() => {
          setErrorOpen(false);
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => {
            setErrorOpen(false);
          }}
        >
          <AlertTitle>{t("paymentUnsuccessful")}</AlertTitle>
          {t("tryAgain")}
        </Alert>
      </Snackbar>
    </>
  );
}
