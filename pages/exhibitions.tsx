import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { styles } from "../styles/job.css";
import { useTranslation } from "next-i18next";

export default function Exhibition({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["exhibitions"]);
  return (
    <>
      <Main navBarItems={navBarItems}>
        <Head>
          <title>{t("title")}</title>
        </Head>
        <div className={s.banner}>
          <Exhibition navBarItems={undefined}></Exhibition>
        </div>
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
        "exhibitions",
      ])),
    },
    revalidate: 60,
  };
}
