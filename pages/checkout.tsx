import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from '@material-ui/core/Box';
import Button from '../app/components/Button/Button';
import CheckoutForm from "../app/components/CheckoutForm/CheckoutForm";
import InputLabel from '@material-ui/core/InputLabel';

import { checkoutStyles } from '../styles/checkout';
import PaymentIntervalTabs, { PaymentInterval } from "../app/components/PaymentIntervalTabs/PaymentIntervalTabs";
import { useStore } from "../app/redux/store";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51IRGljA3UXZjjLWxcvyxrdMZLfGL3VgavI4xiWcb1TmBWhZ13M8CIxwx9HMLzMtahX6RxxYZcUnJkOAxdfCwIjFE00VCslxaIc");

export default function Checkout( props ) {
  const store = useStore();
  const { t } = useTranslation('checkout');
  const styles = checkoutStyles();

  const plan = store.getState()?.signup?.price;
  const interval = t(plan?.recurringInterval);

  const [selectedPaymentInterval, setSelectedPaymentInterval] = useState<PaymentInterval>('yearly')

  return (
    <Box className={styles.root}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" component="h1">
            <Box fontWeight="medium" marginBottom={3}>
              {t('checkoutHeader')}
            </Box>
          </Typography>

          <InputLabel>{t('paymentDetails')}</InputLabel>
          {/* Stripe checkout HERE */}
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
          <div className={styles.product}>
            <Box fontSize="1rem">
              Product:
            </Box>
            <Box>
              {plan?.product}
            </Box>
          </div>
          <Box className={styles.subtotal}>
            <Box fontSize="1rem" fontWeight="bold">
              {t('subtotal')}
            </Box>
            <Box>
              {`${plan?.amount} ${plan?.currency.toUpperCase()} / ${interval}`}
            </Box>
          </Box>

          <Box marginTop="2rem">{t('checkoutTermsFooter')}</Box>
        </CardContent>
      </Card>
      <Box className={styles.navigationContainer}>
        <Button
          size="small" 
          variant="contained" 
          color="primary"
          disableElevation 
          roundedButton>
          {t('backButton')}
        </Button>
        <Button
          size="small" 
          variant="contained" 
          color="primary"
          disableElevation 
          roundedButton>
          {t('finishButton')}
        </Button>
      </Box>
      {/* <style jsx global>{`
        body {
          background-image: url("/images/acrylic-painting.jpg");
          background-size: cover;
        }
      `}</style> */}
    </Box>
  );
}

export async function getStaticProps({context, locale}) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'checkout']),
    }
  }
}
