import { checkoutFormStyles } from "./checkoutForm.css";
import { Box, CircularProgress, Snackbar } from "@material-ui/core";
import { 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useElements, 
  useStripe 
} from "@stripe/react-stripe-js";
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
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const zapierBasicConfirmedApiUrl =
  process.env.NEXT_PUBLIC_ZAPIER_BASIC_CONFIRMED;

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckoutForm({ email, fullName, plan }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [customerId, setCustomerId] = useState("");
  const [countdown, setCountdown] = useState(6);
  const [cardholderName, setCardholderName] = useState(fullName || "");
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);
  const token = useContext(TokenContext);
  const countdownRef = useRef(null);
  const { family_name, given_name, phone, user_type } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const styles = checkoutFormStyles();
  const { t } = useTranslation(["payment", "common"]);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [promotionCode, setpromotionCode] = useState("");

  // Update fullName when it's available
  useEffect(() => {
    if (fullName && !cardholderName) {
      setCardholderName(fullName);
    }
  }, [fullName]);

  // Check if form is complete
  useEffect(() => {
    const isComplete = cardNumberComplete && cardExpiryComplete && cardCvcComplete && cardholderName.trim() !== "";
    setDisabled(!isComplete);
  }, [cardNumberComplete, cardExpiryComplete, cardCvcComplete, cardholderName]);

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

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const confirmedPortfolio = () => {
    setPaymentConfirmed(true);

  };

  const handleCardNumberChange = (event) => {
    setCardNumberComplete(event.complete);
    setError(event.error ? event.error.message : "");
  };

  const handleCardExpiryChange = (event) => {
    setCardExpiryComplete(event.complete);
    setError(event.error ? event.error.message : "");
  };

  const handleCardCvcChange = (event) => {
    setCardCvcComplete(event.complete);
    setError(event.error ? event.error.message : "");
  };

  // Create payment method towards Stripe
  function createPaymentMethod() {
    setProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    stripe
      .createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: cardholderName,
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
    router.push("/upload");
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
      <div className={styles.formContainer}>
        {/* Card details section */}
        <div className={styles.sectionTitle}>{t("cardDetails")}</div>
        
        {/* Card Number */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>{t("cardNumber")}*</label>
          <div className={styles.cardElementContainer}>
            <CardNumberElement
              options={cardElementOptions}
              onChange={handleCardNumberChange}
            />
          </div>
        </div>

        {/* Payment method icons */}
        <div className={styles.paymentIcons}>
          <img src="/icons/visa.svg" alt="Visa" className={styles.paymentIcon} />
          <img src="/icons/mastercard.svg" alt="MasterCard" className={styles.paymentIcon} />
          <img src="/icons/amex.svg" alt="American Express" className={styles.paymentIcon} />
          <img src="/icons/maestro.svg" alt="Maestro" className={styles.paymentIcon} />
        </div>

        {/* Expiry and CVC row */}
        <div className={styles.fieldRow}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>{t("expiryDate")}</label>
            <div className={styles.cardElementContainer}>
              <CardExpiryElement
                options={cardElementOptions}
                onChange={handleCardExpiryChange}
              />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>{t("securityCode")}</label>
            <div className={styles.cardElementContainer}>
              <CardCvcElement
                options={cardElementOptions}
                onChange={handleCardCvcChange}
              />
            </div>
          </div>
        </div>

        {/* Cardholder name */}
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>{t("cardholderName")}</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className={styles.textInput}
            placeholder={t("cardholderName")}
          />
        </div>

        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className={styles.cardErrorContainer} role="alert">
            {error}
          </div>
        )}

        {/* Discount code for premium plans */}
        {plan?.productKey === "portfolioPremium" && (
          <div className={styles.fieldGroup}>
            <TextField
              label={t("discountCode")}
              variant="outlined"
              value={promotionCode}
              onChange={(e) => setpromotionCode(e.target.value)}
              fullWidth
              margin="normal"
              size="small"
            />
          </div>
        )}

        {/* Payment button */}
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            rounded
            onClick={createPaymentMethod}
            disabled={processing || disabled || succeeded}
            className={styles.payButton}
          >
            {t("pay")}
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
        </div>
      </div>

      {/* Beautiful Success Modal */}
      <Dialog
        open={succeeded}
        onClose={handleSuccessClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "0",
            overflow: "visible",
          },
        }}
      >
        <DialogContent style={{ padding: "48px 32px", textAlign: "center" }}>
          {/* Success Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              animation: "successBounce 0.6s ease-out",
            }}
          >
            <CheckCircleIcon
              style={{
                fontSize: "48px",
                color: "white",
              }}
            />
          </div>

          {/* Success Title */}
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "12px",
              fontSize: "28px",
            }}
          >
            {t("paymentSuccessful", { ns: "checkout" })}
          </Typography>

          {/* Success Message */}
          <Typography
            variant="body1"
            style={{
              color: "#6b7280",
              marginBottom: "32px",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            {t("welcomeToArtportable", { ns: "checkout" }) || "Welcome to Artportable! Your subscription is now active and you can start uploading your artwork."}
          </Typography>

          {/* Plan Information Card */}
          <div
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "32px",
            }}
          >
            <Typography
              variant="subtitle2"
              style={{ color: "#6b7280", marginBottom: "8px", fontSize: "14px" }}
            >
              {t("product", { ns: "payment" })}
            </Typography>
            <Typography
              variant="h6"
              style={{ 
                fontWeight: "600", 
                color: "#1f2937",
                fontSize: "18px"
              }}
            >
              {plan?.productKey === "portfolio" ? "Bas" : 
               plan?.productKey === "portfolioPremium" ? "Premium" :
               plan?.productKey === "portfolioPremiumPlus" ? "Premium +" :
               plan?.productKey === "portfolioMini" ? "Mini" :
               plan?.product || "Portfolio"}
            </Typography>
          </div>

          {/* Action Buttons */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSuccessClose}
            style={{
              borderRadius: "30px",
              fontWeight: 500,
              fontFamily: "Roboto",
              fontSize: "14px",
              backgroundColor: "white",
              border: "1px solid black",
              color: "black",
              width: "150px",
              height: "40px",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
              marginBottom: "10px",
            }}
          >
            {t("startUploading", { ns: "checkout" }) || "Start Uploading"}
          </Button>

          {/* Countdown */}
          <Typography
            variant="caption"
            style={{
              color: "#9ca3af",
              fontSize: "14px",
              display: "block",
            }}
          >
            {t("autoRedirectIn", { ns: "checkout" }) || "Auto-redirecting in"}: {countdown}s{" "}
            <span
              onClick={() => {
                clearInterval(countdownRef.current);
                confirmedPortfolio();
                router.push("/");
              }}
              style={{
                color: "#3b82f6",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: "500",
              }}
            >
              {t("skipWait", { ns: "checkout" }) || "Skip wait"}
            </span>
          </Typography>
        </DialogContent>
      </Dialog>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes successBounce {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
      `}</style>

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
