import { Box } from "@material-ui/core";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import PaymentPremium from "../app/components/Payments/PaymentPremium";
import { styles } from "../styles/payment.css";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import PaymentFrame from "../app/components/Payments/PaymentFrame";
import PaymentArticle from "../app/components/Payments/PaymentArticle";
import PaymentMonthlyArtist from "../app/components/Payments/PaymentMonthlyArtist";
import PaymentCategoryPage from "../app/components/Payments/PaymentCategoryPage";
import Shop from "../app/components/Shop/Shop";

export default function Payment(navBarItems) {
  const s = styles();

  return (
    <Main navBarItems={navBarItems}>
      <Shop />
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "common",
        "footer",
        "header",
        "gdpr",
        "support",
        "plans",
        "payment",
        "checkout",
      ])),
    },
    revalidate: 60,
  };
}
