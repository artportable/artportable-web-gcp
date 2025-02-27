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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gridColumn: "1 / 4",
      }}
    >
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.leftItem}>
            <div className={s.whatIs}>Vad är Artportable?</div>
            <div className={s.whatIsText}>
              Vi är det digitala konstgalleriet. På Artportable.com hittar du
              alla typer av konst: olja, akvarell, fotografi och keramik.
              Naturtroget eller abstrakt – här finns alla tekniker och format
              representerade, från konstnärer i hela landet. Det smartaste av
              allt? Du kontaktar själv konstnären bakom ditt favoritverk och gör
              upp om både köp och leverans. Enkelt och modernt.
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
            Artportable är en digital tjänst för dig som målar, fotar, stickar,
            drejar eller skapar visuellt. Vi gör det enkelt och prisvärt att
            visa upp och sälja din konst online. Vi ser fram emot att upptäcka
            din konst!
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
              Bli medlem.
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "360px",
          borderBottom: "1px solid black",

          width: "90%",
        }}
      >
        <div
          style={{ fontSize: "40px", fontFamily: "Roboto", fontWeight: "600" }}
        >
          Våra samarbetspartners
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
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
      </div>
    </div>
  );
}
