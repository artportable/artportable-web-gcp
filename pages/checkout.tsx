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
  const { t } = useTranslation(['checkout', 'common']);
  const styles = checkoutStyles();

  const plan = store.getState()?.signup?.price;
  const email = store.getState()?.signup?.data?.email;
  const fullName = store.getState()?.signup?.data?.firstName + ' ' + store.getState()?.signup?.data?.lastName;

  const [selectedPaymentInterval, setSelectedPaymentInterval] = useState<PaymentInterval>('yearly');

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
            <CheckoutForm 
              email={email}
              fullName={fullName}
              plan={plan}

            />
          </Elements>
        </CardContent>
      </Card>
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
