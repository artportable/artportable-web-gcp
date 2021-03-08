import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { ButtonGroup } from "@material-ui/core";
import Button from '@material-ui/core/Button';


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
      ...await serverSideTranslations(locale, ['common', 'checkout']),
    }
  }
}
