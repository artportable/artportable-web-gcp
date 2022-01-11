import { Box } from "@material-ui/core";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import PaymentPremium from "../app/components/Payments/PaymentPremium";
import { styles } from '../styles/payment.css';
import Main from "../app/components/Main/Main";

export default function Payment(props) {

  const s = styles();


  return (
    <Main>
    <PaymentPremium />
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'footer', 'header', 'gdpr', 'support', 'plans', 'payment', 'checkout']),
    }
  }
}