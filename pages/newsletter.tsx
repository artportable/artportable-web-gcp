import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import NewsletterCard from "../app/components/NewsletterCard/NewsletterCard";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useTranslation } from "next-i18next";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";


export default function Newsletter({navBarItems}) {
    const mdPlusScreenOrDown = useBreakpointDown('mdPlus')
    const { t } = useTranslation(["common"]);

  return (
    <>
      <Main wide={mdPlusScreenOrDown ? true : false} navBarItems={navBarItems}>
        <NewsletterCard />
      </Main>
    </>
  );
  }

  export async function getStaticProps({ locale }) {
    const navBarItems = await getNavBarItems();
    return {
      props: {
        navBarItems: navBarItems,
        ...(await serverSideTranslations(locale, [
          "header",
          "footer",
          "support",
        ])),
      },
      revalidate: 60,
    };
  }
