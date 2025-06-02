import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CheckoutForm from "../app/components/CheckoutForm/CheckoutForm";
import { styles } from "../styles/checkout";
import { useRouter } from "next/router";
import { useStore } from "react-redux";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.

export default function Checkout() {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  const promise = loadStripe(stripeKey);

  const store = useStore();
  const { t } = useTranslation(["payment", "common"]);
  const router = useRouter();

  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const plan = store.getState()?.signup?.price;
  const s = styles();

  // Helper function to format price
  const formatPrice = (plan) => {
    if (!plan) {
      // Internationalized fallback
      return `359 kr/${t("words.month", { ns: "common" })}`;
    }
    
    if (plan.amount && plan.currency) {
      const amount = plan.amount;
      const currency = plan.currency.toUpperCase();
      const interval = plan.recurringInterval;
      
      if (interval) {
        const intervalText = interval === "month" ? t("words.month", { ns: "common" }) : 
                           interval === "year" ? t("words.year", { ns: "common" }) : 
                           interval;
        return `${amount} ${currency}/${intervalText}`;
      }
      return `${amount} ${currency}`;
    }
    
    if (plan.price) {
      return plan.price;
    }
    
    // Internationalized fallbacks based on product key
    switch (plan.productKey) {
      case "portfolioPremiumPlus":
        return `975 kr/${t("words.month", { ns: "common" })}`;
      case "portfolioPremium":
        return `359 kr/${t("words.month", { ns: "common" })}`;
      default:
        return `359 kr/${t("words.month", { ns: "common" })}`;
    }
  };

  useEffect(() => {
    if (initialized && keycloak.tokenParsed) {
      const parsedToken = keycloak.tokenParsed as any;
      setEmail(parsedToken.email);
      setFullName(parsedToken.given_name + " " + parsedToken.family_name);
    }
  }, [initialized]);

  return (
    <Box className={s.root}>
      {/* Desktop Left Side - Artistic Content */}
      <div className={s.leftSide}>
        <div className={s.artisticContent}>
          <img
            src="/images/step2.jpeg"
            alt="Artist with paintings"
            className={s.heroImage}
          />
        </div>
      </div>

      {/* Right Side - Checkout Form */}
      <div className={s.rightSide}>
        <div className={s.formWrapper}>
          {/* Step indicator */}
          <Typography variant="body2" className={s.stepIndicator}>
            {t("stepFourOfFour")}
          </Typography>

          {/* Main heading */}
          <Typography variant="h1" className={s.mainHeading}>
            {t("addCardAndPay")}
          </Typography>

          {/* Product information */}
          <div className={s.productSection}>
            <Typography variant="h6" className={s.productLabel}>
              {t("product")}
            </Typography>
            <div className={s.productInfo}>
              <Typography className={s.productName}>
                {plan?.product === "Portfolio" ? t("portfolioPremium") : plan?.product}
              </Typography>
              <Typography className={s.productPrice}>
                {formatPrice(plan)}
              </Typography>
            </div>
          </div>

          {/* Payment form */}
          <div className={s.paymentSection}>
            <Elements stripe={promise}>
              <CheckoutForm email={email} fullName={fullName} plan={plan} />
            </Elements>
          </div>
        </div>
      </div>
    </Box>
  );
}

export async function getStaticProps({ context, locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "payment",
        "support",
        "plans",
        "checkout", 
        
      ])),
    },
  };
}
