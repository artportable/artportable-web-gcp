import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import CheckoutFormRocket from "../app/components/CheckoutForm/CheckoutFormRocket";
import InputLabel from "@material-ui/core/InputLabel";
import { styles } from "../styles/checkoutboost";
import { useRouter } from "next/router";
import { useStore } from "react-redux";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { UserContext } from "../app/contexts/user-context";
import { useGetUserProfile } from "../app/hooks/dataFetching/UserProfile";
import { useGetProfileUser } from "../app/hooks/dataFetching/useGetProfileUser";
import { LoadingContext } from "../app/contexts/loading-context";
import CheckIcon from "@mui/icons-material/Check";
import { useGetArtwork } from "../app/hooks/dataFetching/Artworks";

export default function Boost(props) {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  const promise = loadStripe(stripeKey);
  const router = useRouter();

  const artwork = useGetArtwork(props?.artworkId);

  const { isSignedIn, username, socialId, membership, phone } =
    useContext(UserContext);
  const { t } = useTranslation(["checkout", "common"]);

  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const profileUser = useGetProfileUser();
  const isMyProfile = profileUser === username.value;
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const userProfile = useGetUserProfile(profileUser, username.value);
  const { setLoading } = useContext(LoadingContext);
  const s = styles();

  useEffect(() => {
    if (!isReady) {
      setLoading(true);
    }
    if (isReady) {
      setLoading(false);
    }
  }, [isReady, userProfile?.data]);

  useEffect(() => {
    if (!isSignedIn.isPending && !userProfile.isLoading) {
      setIsReady(true);
    }
  }, [isSignedIn, userProfile.isLoading]);

  useEffect(() => {
    if (initialized && keycloak.tokenParsed) {
      const parsedToken = keycloak.tokenParsed as any;
      setEmail(parsedToken.email);
      setFullName(parsedToken.given_name + " " + parsedToken.family_name);
    }
  }, [initialized, email, fullName]);

  return (
    <>
      <div className={s.root}>
        <div className={s.fullContainer}>
          <div className={s.top}>
            <div className={s.imgText}>
              <div className={s.textOne}>{t("promoteYourArt")}</div>
              <ul
                style={{
                  fontSize: "18px",

                  marginTop: "1.5rem",
                  textAlign: "center",
                }}
              >
                <li>{t("showlist")}</li>
                <br />
                <li>{t("showlisttwo")}</li>
              </ul>
            </div>
          </div>
          {/* <div className={s.downMobile}>
              <div className={s.contentPointHeader}>
                {t("increaseVisibility")}
              </div>

              <div className={s.priceNow}>{t("priceNow")}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div className={s.contentPoint}>
                  <CheckIcon />
                  <div className={s.contentDiv}>{t("broaderPublic")}</div>
                </div>
                <div className={s.contentPoint}>
                  <CheckIcon />
                  <div className={s.contentDiv}>{t("moreSale")}</div>
                </div>
              </div>

              <div>
                <div className={s.contentText}>{t("startPage")}</div>
              </div>
            </div> */}

          <div className={s.right}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                className={s.logo}
                src="/ArtportableLogo.svg"
                alt="logo"
                title=""
              />
              <div>
                <Typography>{t("fillInDetails")}</Typography>
              </div>
            </div>
            <CardContent className={s.cardContentWidth}>
              <InputLabel>{t("paymentDetails")}</InputLabel>

              <Elements stripe={promise}>
                <CheckoutFormRocket
                  email={email}
                  fullName={fullName}
                  artworkId={props?.artworkId}
                />
              </Elements>
            </CardContent>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale, query }) {
  const artworkId = Object.keys(query)[0] || null;

  if (!artworkId) {
    return { props: { error: "Artwork ID is missing", locale } };
  }

  return {
    props: {
      artworkId,
      locale,
      ...(await serverSideTranslations(locale, [
        "header",
        "checkout",
        "footer",
        "art",
        "common",
        "tags",
        "support",
        "plans",
        "forms",
        "upload",
      ])),
    },
  };
}