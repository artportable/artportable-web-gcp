import { useContext, useState } from "react";
import Main from "../app/components/Main/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/support.css";
import {
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import Head from "next/head";
import { useRouter } from "next/router";
import { UserContext } from "../app/contexts/user-context";
import { TokenContext } from "../app/contexts/token-context";
import {
  updateUser,
} from '../app/utils/emailUtil';

enum MailTypes {
  ARTWORK = 'artwork',
  LIKE = 'like',
}

enum StateTypes {
  INITIAL = 'initial',
  SUCCESS = 'success',
  ERROR = 'error',
}

export default function Notifications({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["support", "common"]);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const token = useContext(TokenContext);
  const { locale, query: { type } } = useRouter();
  const theme = useTheme();
  const largeDevice = useMediaQuery(theme.breakpoints.up("smPlus"));
  const { username, isSignedIn } = useContext(UserContext);
  const [pageState, setPageState] = useState(StateTypes.INITIAL);

  // type for unsubscribing to different kind of emails.
  // artwork (inform followers when uploading a new artwork)
  // like (inform artist when someone likes one of their artworks)

  let updateValue = ''
  let description = ''
  if (type === MailTypes.ARTWORK) {
    updateValue = 'EmailReceiveArtworkUploaded';
    description = t('unsubscribe.artworkUploadedEmail');
  } else if (type === MailTypes.LIKE) {
    updateValue = 'EmailReceiveLike';
    description = t('unsubscribe.artworkLikedEmail');
  } else {
    return null;
  }

  const sendAnswer = async (wantEmail) => {
    let params = { [updateValue]: wantEmail }

    let updatedUser = null;
    try {
      updatedUser = await updateUser(params, username.value, token);
      setPageState(StateTypes.SUCCESS);
    } catch(err) {
      console.error('updateUser failed in notifications:', err);
      setPageState(StateTypes.ERROR);
    }
  }

  const initialContent = ([
    <Typography variant="body1" style={{
      height: '20px',
      marginBottom: '30px',
    }} key="login">
      {!isSignedIn.value ? t("support:unsubscribe.logIn") : ''}
    </Typography>,
    <div key="header">
      {!largeDevice ?
        <Typography component="h1" variant="body1" style={{
          marginBottom: '30px',
          fontSize: '16px',
        }}>
          {description}
        </Typography>
        :
        <Typography component="h1" variant="h4" style={{
          marginBottom: '30px',
          fontWeight: 600,
        }}>
          {description}
        </Typography>
      }
    </div>,
    <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      alignItems: 'center',
    }} key="buttons">
      <Button variant="outlined" disabled={!isSignedIn.value}
        onClick={() => sendAnswer(true)}
        style={{
          margin: '0 10px 10px 10px',
          borderRadius: '20px',
        }}
      >
        {t('support:unsubscribe.startReceivingEmails')}
      </Button>
      <Button variant="outlined" disabled={!isSignedIn.value}
        onClick={() => sendAnswer(false)}
        style={{
          margin: '0 10px 10px 10px',
          borderRadius: '20px',
        }}
      >
        {t('support:unsubscribe.stopReceivingEmails')}
      </Button>
    </div>,
  ])

  const successContent = ([
    <div key="header">
      {!largeDevice ?
        <Typography component="h1" variant="body1" style={{
          marginBottom: '30px',
          fontSize: '16px',
        }}>
          {t('common:words.thanks')}
        </Typography>
        :
        <Typography component="h1" variant="h4" style={{
          marginBottom: '30px',
          fontWeight: 600,
        }}>
          {t('common:words.thanks')}
        </Typography>
      }
    </div>,
    <Button variant="outlined" disabled={true} style={{
      margin: '0 10px 10px 10px',
      borderRadius: '20px',
    }} key="button">
      {t('common:words.saved')}
    </Button>,
  ])

  const errorContent = ([
    <Typography component="h1" variant="body1" style={{
      marginBottom: '30px',
      fontSize: '16px',
    }} key="title">
      {t('common:somethingWentWrongTitle')}
    </Typography>,
    <Typography variant="body1" style={{
      marginBottom: '30px',
      fontSize: '16px',
    }} key="body">
      {t('common:somethinWentWrongText')}
    </Typography>,
  ])

  return (
    <Main navBarItems={navBarItems}>
      <Head>
        <meta name="title" content={t("support:contactUs")} />
        <meta name="description" content={t("support:yourWelcome")} />
        <meta name="robots" content="noindex,nofollow" />
        <link
          rel="canonical"
          href={`${publicUrl}/${locale}/support`}
        />
      </Head>
      <div style={{
        minHeight: '50vh',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        { pageState === StateTypes.INITIAL && initialContent }
        { pageState === StateTypes.SUCCESS && successContent }
        { pageState === StateTypes.ERROR && errorContent }
      </div>
    </Main>
  )
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
        "common",
        // "plans",
      ])),
    },
    revalidate: 60,
  };
}
