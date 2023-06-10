import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function Exhibition({ navBarItems }) {
  return (
    <>
      <Main navBarItems={navBarItems}>
        <Head>
          <title>Lediga jobbannonser</title>
        </Head>
        <div>Utställningar</div>
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
