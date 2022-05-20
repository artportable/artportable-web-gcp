import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import AboutUs from "../app/components/AboutUs/AboutUs";
import Main from "../app/components/Main/Main";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function About({navBarItems}) {
  const mdPlusScreenOrDown = useBreakpointDown('mdPlus')


  return (
    <>
      <Main wide={mdPlusScreenOrDown ? true : false} navBarItems={navBarItems}>
        <AboutUs />
      </Main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems(); 
  return {
    props: {
      navBarItems: navBarItems,
      ...await serverSideTranslations(locale, ['common', 'footer', 'header', 'gdpr', 'support', 'plans', 'about']),
    },
    revalidate: 60,
  }
}