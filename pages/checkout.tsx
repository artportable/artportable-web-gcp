import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import CheckoutForm from "../app/components/CheckoutForm/CheckoutForm";
import InputLabel from "@material-ui/core/InputLabel";
import { styles } from "../styles/checkout";
import { useRouter } from "next/router";
import { useStore } from "react-redux";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.

export default function Checkout() {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  const promise = loadStripe(stripeKey);

  const store = useStore();
  const { t } = useTranslation(["checkout", "common"]);
  const router = useRouter();

  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const plan = store.getState()?.signup?.price;
  const s = styles();

  useEffect(() => {
    console.log(plan?.id);
  }, [plan]);

  useEffect(() => {
    if (initialized && keycloak.tokenParsed) {
      const parsedToken = keycloak.tokenParsed as any;
      setEmail(parsedToken.email);
      setFullName(parsedToken.given_name + " " + parsedToken.family_name);
    }
  }, [initialized]);

  return (
    <>
      <Box className={s.root}>
        <div className={s.left}>
          <div className={s.leftContent}>
            {plan?.product === "Portfolio" ? (
              <div className={s.headlineDiv}>
                <Typography variant="h1" className={s.headline}>
                  {t("fewSeconds")}
                </Typography>
                {/* <Typography variant="h3" className={s.headlineText}>
                  <strong>{t("zeroSek")}</strong> {t("moreSeconds")}
                </Typography> */}
              </div>
            ) : (
              <div className={s.headlineDiv}>
                <Typography variant="h1" className={s.headline}>
                  {t("fewSecondsPremium")}
                </Typography>
              </div>
            )}
            {/* <img
              className={s.image}
              src="/images/majadror.png"
              alt=""
              title="" /> */}
          </div>
        </div>
        <div className={s.right}>
          {plan?.product === "Portfolio" ? (
            <div className={s.headlineDivMobile}>
              <Typography variant="h1" className={s.headlineMobile}>
                {t("fewSeconds")}
              </Typography>
              <Typography variant="h3" className={s.headlineText}>
                <strong>{t("zeroSek")}</strong> {t("moreSeconds")}
              </Typography>
            </div>
          ) : (
            <div className={s.headlineDivMobile}>
              <Typography variant="h1" className={s.headlineMobile}>
                {t("fewSecondsPremium")}
              </Typography>
              {/* <Typography variant="h5">{t("moreSeconds")}</Typography> */}
            </div>
          )}
          <Typography className={s.fillInText}>{t("pleaseFill")}</Typography>
          <Card className={s.card}>
            <img
              className={s.logo}
              src="/ArtportableLogo.svg"
              alt="logo"
              title=""
            />
            <CardContent className={s.cardContentWidth}>
              <Typography variant="h5" component="h1">
                {/* <Box fontWeight="medium" marginBottom={3}>
              {t('checkoutHeader')}
            </Box> */}
              </Typography>

              <InputLabel>{t("paymentDetails")}</InputLabel>
              {/* Stripe checkout HERE */}
              <Elements stripe={promise}>
                <CheckoutForm email={email} fullName={fullName} plan={plan} />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </Box>
    </>
  );
}

export async function getStaticProps({ context, locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "checkout",
        "support",
        "plans",
      ])),
    },
  };
}
