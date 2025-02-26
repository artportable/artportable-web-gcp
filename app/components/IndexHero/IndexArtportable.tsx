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

export default function IndexArtportable() {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const { t } = useTranslation("index");
  const s = styles();
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.leftItem}>
          <div
            style={{
              fontSize: "40px",
              fontFamily: "Roboto",
              fontWeight: 600,
              textAlign: "start",
            }}
          >
            Vad är Artportable?
          </div>
          <div
            style={{
              fontSize: "20px",
              fontFamily: "Joan",
              fontWeight: 400,
              textAlign: "start",
              lineHeight: "30px",
            }}
          >
            Vi är det digitala konstgalleriet. På artportable.com hittar du alla
            typer av konst; olja, akvarell, fotografi eller keramik. Naturtroget
            eller abstrakt, här finns alla tänkbara tekniker och format
            representerade, från hela landet. Det smartaste av allt, du
            kontaktar själv konstnären bakom ditt favoritverk och gör upp både
            köp och leverans. Enkelt och modernt.
          </div>
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
      </div>
      <div className={s.registerWrapper}>
        <div className={s.registerTitle}>
          Redo att ta ditt kontnärskap till nästa nivå?
        </div>
        <div className={s.registerText}>
          Skapa din egen professionella portfolio och låt konstälskare från hela
          världen upptäcka din konst. Starta din resa idag!
        </div>
        <div>
          <Button
            className={s.buttonRegister}
            onClick={() =>
              keycloak.register({
                locale: router.locale,
              })
            }
          >
            Bli medlem
          </Button>
        </div>
      </div>
    </div>
  );
}
