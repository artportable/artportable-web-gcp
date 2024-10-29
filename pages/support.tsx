import Main from "../app/components/Main/Main";
import ZendeskForm from "../app/components/ZendeskFormMenu/ZendeskFormMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/support.css";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Head from "next/head";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function Support({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["support"]);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { locale } = useRouter();

  return (
    <Main navBarItems={navBarItems}>
      <Head>
        <meta name="title" content={t("contactUs")} />
        <meta name="description" content={t("yourWelcome")} />
        <meta property="og:title" content={t("contactUs")} />
        <meta property="og:description" content={t("yourWelcome")} />
        <meta property="og:url" content="https://artportable.com/support" />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />
        <link rel="canonical" href={`${publicUrl}/${locale}/support`} />
      </Head>
      <div className={s.paddingWidth}>
        <Typography variant="h1" className={s.headerTypo}>
          {t("contactUs")}
        </Typography>
        <div className={s.flexPaper}>
          <Paper className={s.paperLeft} elevation={0}>
            <Typography className={clsx(s.textBlock, s.textBlockWidth)}>
              {t("yourWelcome")}
            </Typography>
            <div className={s.iconTextFlex}>
              <MailOutlineIcon className={s.icon} />
              <Typography className={s.linkText}>
                <a href="mailto:hello@artportable.com">hello@artportable.com</a>
              </Typography>
            </div>

            <div className={s.textBlock}>
              <Typography className={s.typoBold}>
                {t("openingHours")}
              </Typography>
              <Typography>{t("8-17")}</Typography>
              <Typography>{t("deviating")}</Typography>
            </div>
            {/* <div className={s.zendeskForm}>
              <ZendeskForm />
            </div> */}
          </Paper>
        </div>
      </div>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "header",
        "support",
        "footer",
        "support",
        "common",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}
