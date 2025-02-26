import Link from "next/link";
import { Typography } from "@material-ui/core";
import { styles } from "./footer.css";
import clsx from "clsx";
import { useTranslation } from "next-i18next";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import useSignupRedirectHref from "../../hooks/useSignupRedirectHref";
import { useContext } from "react";
import { UserContext } from "../../contexts/user-context";

export default function Footer() {
  const s = styles();
  const { t } = useTranslation("footer");
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const signUpRedirectHref = useSignupRedirectHref();
  const { username, isSignedIn, membership } = useContext(UserContext);
  return (
    <>
      {!isSignedIn.value && (
        <footer className={s.footer}>
          <div className={s.image}>
            <div className={s.sunneby}>
              <div>
                <Link href={"/"}>
                  <a>
                    <img
                      className={s.logo}
                      src="/ArtportableLogo.svg"
                      alt="Logo Artportable"
                    />
                  </a>
                </Link>
                <Typography
                  variant="body2"
                  component="div"
                  className={s.reserved}
                >
                  © 2025 Höök & Nordlander AB. All rights reserved.
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  className={s.cookies}
                >
                  {t("cookies")}
                </Typography>
              </div>
              {/* <div className={s.socialMediaFlex}>
         <Link href="https://www.instagram.com/artportableofficial/">
           <a>
             <img
               className={s.socialmediaImage}
               src={'/images/instagram.svg'}
               alt="Link to artportables instagram"
               title="instagram logo" />
           </a>
         </Link>
         <Link href="https://www.facebook.com/artportable/">
           <a>
             <img
               className={s.socialmediaImage}
               src={'/images/facebook.svg'}
               alt="Link to artportables facebook"
               title="facebook logo" />

           </a>
         </Link>
         <Link href="https://www.tiktok.com/@artportable">
           <a>
             <img
               className={s.tiktok}
               src={'/images/TIK-TOK.svg'}
               alt="Link to artportables tiktok"
               title="tiktok logo" />
           </a>
         </Link>
       </div> */}
            </div>

            <div className={clsx(s.getInTouch, s.flexItem)}>
              <Typography
                variant="subtitle2"
                component="div"
                className={s.links}
              >
                {t("popularPages")}
              </Typography>
              <Link href="https://artportable.com/">
                <a>
                  <Typography variant="body2" component="div">
                    {t("art")}
                  </Typography>
                </a>
              </Link>
              <Link href="/fotokonst">
                <a>
                  <Typography variant="body2" component="div">
                    {t("photography")}
                  </Typography>
                </a>
              </Link>
              <Link href="/akvarell">
                <a>
                  <Typography variant="body2" component="div">
                    {t("aquarelle")}
                  </Typography>
                </a>
              </Link>
              <Link href="/skulpturer">
                <a>
                  <Typography variant="body2" component="div">
                    {t("sculpture")}
                  </Typography>
                </a>
              </Link>
              <Link href="/oljemalningar">
                <a>
                  <Typography variant="body2" component="div">
                    {t("oilPaintings")}
                  </Typography>
                </a>
              </Link>
            </div>

            <div className={clsx(s.hide, s.flexItem)}>
              <Typography
                variant="subtitle2"
                component="div"
                className={s.links}
              >
                {t("becomeAPart")}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                onClick={() => keycloak.login({ locale: router.locale })}
                className={s.idpLink}
              >
                {t("logIn")}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                onClick={() =>
                  keycloak.register({
                    locale: router.locale,
                    redirectUri: signUpRedirectHref,
                  })
                }
                className={s.idpLink}
              >
                {t("register")}
              </Typography>
            </div>

            <div className={clsx(s.getInTouch, s.flexItem)}>
              <Typography
                variant="subtitle2"
                component="div"
                className={s.links}
              >
                {t("getInTouch")}
              </Typography>
              <Link href="/support">
                <a>
                  <Typography variant="body2" component="div">
                    {t("contactUs")}
                  </Typography>
                </a>
              </Link>
              <Link href="/about-us">
                <a>
                  <Typography variant="body2" component="div">
                    {t("aboutUs")}
                  </Typography>
                </a>
              </Link>
              <Link href={"/gdpr"}>
                <a style={{ textDecoration: "underline" }}>{t("integrity")}</a>
              </Link>
            </div>

            <div className={clsx(s.mobile, s.flexItem)}>
              <Typography
                variant="subtitle2"
                component="div"
                className={s.links}
              >
                {t("followUs")}
              </Typography>
              <div className={s.flexSocialMedia}>
                <Link href="https://www.instagram.com/artportable/">
                  <a>Instagram</a>
                </Link>
                <Link href="https://www.facebook.com/artportable/">
                  <a>Facebook</a>
                </Link>
                <Link href="https://www.tiktok.com/@artportable">
                  <a>Tiktok</a>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
