import { styles } from "./indexArtportable.css";
import { useMediaQuery } from "@material-ui/core";
import { theme } from "../../../styles/theme";
import { useState } from "react";
import { KeycloakInstance } from "keycloak-js";
import { useKeycloak } from "@react-keycloak/ssr";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";
import Image from "next/image";
import Divider from "@mui/material/Divider";

export default function IndexArtportable() {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const { t } = useTranslation("index");
  const s = styles();
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gridColumn: "1 / 4",
      }}
    >
      <div className={s.container}>
        {/* <div className={s.wrapper}>
          <div className={s.leftItem}>
            <div className={s.whatIs}>{t("whatIs")}</div>
            <div className={s.whatIsText}>{t("whatIsText")}</div>
          </div>
          <div className={s.rightItem}>
            <Image
              src={"/images/apstudio.png"}
              alt="first page artwork"
              width={"400px"}
              height={"300px"}
              quality={10}
            />
          </div>
        </div> */}

        <div className={s.registerWrapper}>
          <div className={s.registerTitle}>{t("nextLevel")}</div>
          <div className={s.registerText}>{t("nextLevelText")}</div>
          <div>
            <Button
              className={s.buttonRegister}
              onClick={() =>
                keycloak.register({
                  locale: router.locale,
                })
              }
            >
              {t("signUpTwo")}
            </Button>
          </div>
        </div>
      </div>
      {/* <div className={s.partnersWrapper}>
        <div className={s.partners}>{t("partners")}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <img
            src="/images/bonnierlogo.png"
            alt="Logo bonnier"
            className={s.LogoBonnier}
          />
          <img
            src="/images/egmont.png"
            alt="Logo egmont"
            className={s.LogoEgmont}
          />
          <img
            src="/images/schibsted.svg"
            alt="Logo bonnier"
            className={s.LogoTwo}
          />
        </div>
      </div> */}
    </div>
  );
}
