import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ButtonGroup } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CheckoutForm from "../app/components/CheckoutForm/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51IRGljA3UXZjjLWxcvyxrdMZLfGL3VgavI4xiWcb1TmBWhZ13M8CIxwx9HMLzMtahX6RxxYZcUnJkOAxdfCwIjFE00VCslxaIc");

export default function Checkout( props ) {
  const { t } = useTranslation('checkout');

  return (
    <>
      <h1>{t('checkoutHeader')}</h1>
      <ButtonGroup variant="text">
        <Button>{t('yearlyPayment')}</Button>
        <Button>{t('monthlyPayment')}</Button>
      </ButtonGroup>
      <br/>
      <br/>
      <span>{t('paymentDetails')}</span><br/>
      {/* Stripe checkout HERE */}
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
      <br/>
      <br/>
      <span>{t('subtotal')}</span><br/>
      <span>{t('discount')} årsplan</span>
      <br/>
      <br/>
      <span>{t('toPayToday')}</span><br/>
      <span>-------------------------------------------------------------------------------</span><br/>
      <span>{t('checkoutTermsFooter')}</span>
      <br/>
      <br/>
      <Button color="primary">{t('backButton')}</Button>
      <Button color="primary">{t('finishButton')}</Button>
    </>
  );
}

export async function getStaticProps({context, locale}) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'checkout']),
    }
  }
}
