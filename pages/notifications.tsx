import { useContext } from "react";
import Main from "../app/components/Main/Main";
import ZendeskForm from "../app/components/ZendeskFormMenu/ZendeskFormMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/support.css";
import { Paper, Typography, Button } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Head from "next/head";
import clsx from "clsx";
import { useRouter } from "next/router";
import { UserContext } from "../app/contexts/user-context";

enum MailTypes {
  ARTWORK = 'artwork',
  LIKE = 'like',
}

export default function Support({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["support"]);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { locale, query: { type } } = useRouter();

  // type for unsubscribing to different kind of emails.
  // artwork (inform followers when uploading a new artwork)
  // like (inform artist when someone likes one of their artworks)

  console.log('locale', locale);
  console.log('type', type);
  // console.log('useRouter()', useRouter());
  console.log('useContext(UserContext);', useContext(UserContext));
  const { username, isSignedIn } = useContext(UserContext);
  console.log('username', username);
  console.log('isSignedIn', isSignedIn);

  let mailType = ''
  if (type === MailTypes.ARTWORK) {

  } else if (type === MailTypes.LIKE) {

  }

  return (
    <Main navBarItems={navBarItems}>
      <Head>
        <meta name="title" content={t("contactUs")} />
        <meta name="description" content={t("yourWelcome")} />
        {/* <meta property="og:title" content={t("contactUs")} />
        <meta property="og:description" content={t("yourWelcome")} />
        <meta property="og:url" content="https://artportable.com/support" /> */}
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />
        <meta name="robots" content="noindex,nofollow" />
        <link
          rel="canonical"
          href={`${publicUrl}/${locale}/support`}
        />
      </Head>
        {/* <div className={s.paddingWidth}>
          <Typography variant="body1" className={s.headerTypo}>
            {t("unsubscribe.artworkUploadedEmail")}
          </Typography>
          { !isSignedIn.value &&
            <Typography variant="body1">
              {t("unsubscribe.logIn")}
            </Typography>
          }
          <Button variant="outlined" disabled={!isSignedIn.value}>{t("unsubscribe.stopReceivingEmails")}</Button>
        </div> */}
        <div className={s.paddingWidth}>
        { !isSignedIn.value &&
            <Typography variant="body1">
              {t("unsubscribe.logIn")}
            </Typography>
          }
          <Typography variant="body1" className={s.headerTypo}>
            {t("Jag vill inte få mail när en konstnär jag följer lägger upp ett nytt verk (en gång om dagen max).")}
          </Typography>
          <Button variant="outlined" disabled={!isSignedIn.value}>{t("unsubscribe.stopReceivingEmails")}</Button>
          <Typography variant="body1" className={s.headerTypo}>
            {t("Jag vill få mail när någon likear ett av mina verk (en gång om dagen max).")}
          </Typography>
          <Button variant="outlined" disabled={!isSignedIn.value}>{t("Ja")}</Button><Button variant="outlined" disabled={!isSignedIn.value}>{t("Nej")}</Button>
        </div>
    </Main>
  )
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
        <meta name="robots" content="noindex,nofollow" />
        <link
          rel="canonical"
          href={`${publicUrl}/${locale}/support`}
        />
      </Head>
      <div className={s.paddingWidth}>
        <Typography variant="h1" className={s.headerTypo}>
          {t("*UNSUBSCRIBE*")}
        </Typography>
        <Button variant="outlined">*UNSUBSCRIBE*</Button>
        <Typography variant="h1" className={s.headerTypo}>
          {t("contactUs")}
        </Typography>
        <div className={s.flexPaper}>
          <Paper className={s.paperLeft} elevation={1}>
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
            <div className={s.zendeskForm}>
              <ZendeskForm />
            </div>
          </Paper>
          <Paper className={s.paperRight} elevation={1}>
            <div>
              <img
                className={s.logo}
                src="/Artportable_Logotyp_Black.svg"
                alt="Logo Artportable"
              />
              <Typography className={s.bold}>Artportable AB</Typography>
              <Typography>559113-1171</Typography>
              <div className={s.textBlockRight}>
                <Typography>Åsögatan 176</Typography>
                <Typography>116 32 Stockholm</Typography>
              </div>
            </div>
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
        // "header",
        // "support",
        // "footer",
        "support",
        // "common",
        // "plans",
      ])),
    },
    revalidate: 60,
  };
}
