import { Box } from "@material-ui/core";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import PaymentPremium from "../app/components/Payments/PaymentPremium";
import { styles } from '../styles/payment.css';

export default function Payment(props) {

  const { t } = useTranslation(['gdpr']);
  const s = styles();


  return (
    <Box>
    <PaymentPremium />
    </Box>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'footer', 'header', 'gdpr', 'support', 'plans']),
    }
  }
}