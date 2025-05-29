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

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const zapierBasicConfirmedApiUrl =
  process.env.NEXT_PUBLIC_ZAPIER_BASIC_CONFIRMED;

export default function CheckoutFormRocket({ email, fullName, artworkId }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [customerId, setCustomerId] = useState("");
  const [countdown, setCountdown] = useState(6);
  const token = useContext(TokenContext);
  const countdownRef = useRef(null);
  const { family_name, given_name, username, phone, user_type } =
    useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const styles = checkoutFormStyles();
  const { t } = useTranslation(["checkout", "common"]);

  useEffect(() => {
    if (email !== null && fullName !== null) {
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
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create customer");
          }
          return response.json();
        })
        .then((data) => {
          setCustomerId(data?.id);
        })
        .catch((error) => {
          console.error("Error creating customer:", error);
          // Handle the error appropriately in your UI
        });
    }
  }, [email, fullName]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
        fontStyle: "italic",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  function createPaymentMethod() {
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
          setError(result.error.message);
          setErrorOpen(true);
          setProcessing(false);
          setDisabled(true);
        } else {
          createPurchase({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            artworkId: artworkId,
          })
            .then((result) => {
              setSucceeded(true);
              setProcessing(false);
            })
            .catch((error) => {
              setError(error.message);
              setErrorOpen(true);
            });
        }
      });
  }

  function createPurchase({ customerId, paymentMethodId, artworkId }) {
    return fetch(`${apiBaseUrl}/api/payments/boost`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        customerId: customerId,
        paymentMethodId: paymentMethodId,
        artworkId: artworkId,
      }),
    })
      .then((response) => {
        console.log(response);

        if (!response.ok) {
          throw new Error("Purchase failed.");
        }
        return response;
      })
      .then((result) => {
        if (result.status === 200) {
          setSucceeded(true);
          startCountdown();
        }
        return result;
      })
      .catch((error) => {
        setError(error.message);
        setErrorOpen(true);
        setProcessing(false);
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

      router.push(`/`);
    }
  }, [countdown]);

  const handleSuccessClose = () => {
    router.push(`/`);
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
      <Box className={styles.subtotal}></Box>
      <Box className={styles.subtotal}>
        <Box fontSize="1rem" fontWeight="bold">
          {t("total")}
        </Box>
        <Box fontSize="1rem" fontWeight="bold">
          <div style={{ textDecoration: "line-through", fontWeight: "300" }}>
            {t("395 SEK")}
          </div>{" "}
          {t("195 SEK")}
        </Box>
      </Box>
      <Box className={styles.divider}></Box>
      <Box
        display="flex"
        position="relative"
        justifyContent="flex-end"
        marginTop="2rem"
      >
        <Button
        className={styles.button}
       
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
