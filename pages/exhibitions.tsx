import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useTranslation } from "next-i18next";
import ExhibitionCard from "../app/components/Exhibitions/Exhibition";
import { styles } from "../styles/exhibitions.css";
import { Typography } from "@material-ui/core";

export default function Exhibition({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation("exhibitions");

  return (
    <>
      <Main navBarItems={navBarItems}>
        <Head>
          <title>{t("title")}</title>
        </Head>
        <div className={s.banner}>
          <div className={s.headerDiv}>
            <Typography variant="h2" className={s.headerTypo}>
              {t("artportableExhibition")}
            </Typography>
            <Typography variant="h6" className={s.subHeaderTypo}>
              {t("exhibitionText")}
            </Typography>
            <Typography variant="h4" className={s.welcomeText}>
              {t("welcomeText")}
            </Typography>
          </div>
          <img
            className={s.image}
            src="mingel.jpeg"
            alt="showRoom Image"
            title="showroom"
          />
        </div>
        <div className={s.divider} />
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
        "common",
        "footer",
        "header",
        "gdpr",
        "support",
        "plans",
        "exhibitions",
      ])),
    },
    revalidate: 60,
  };
}
