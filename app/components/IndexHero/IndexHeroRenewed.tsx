import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { styles } from "./indexHeroRenewed.css";
import clsx from "clsx";
import { Typography, useMediaQuery } from "@material-ui/core";
import { theme } from "../../../styles/theme";
import { useEffect, useState } from "react";
import { styles as sharedStyles } from "../../../styles/shared.css";
import { KeycloakInstance } from "keycloak-js";
import { useKeycloak } from "@react-keycloak/ssr";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";

export default function IndexHeroRenewed() {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const { t } = useTranslation("index");
  const s = styles();
  const sShared = sharedStyles();
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("sm"));
  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");

  return (
    <div className={s.container}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        scrollbar={{
          hide: false,
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div className={clsx(s.fullWidthContainer)}>
          <SwiperSlide>
            <div className={s.fullWidthImage}>
              <img
                width={500}
                src={
                  isTinyDevice
                    ? "/images/ackeberg2.jpeg"
                    : "/images/ulrikaMelin1.jpg"
                }
                alt={"konst image"}
              />
              <div className={s.headlineContainer}>
                <Typography variant="h1" className={s.headline}>
                  {t("nordensLargestArena")}{" "}
                  <span>
                    <br />
                  </span>
                  {t("forArtistsAndArtLovers")}
                </Typography>
                <div className={s.desktopHeaderButtons}>
                  <Button
                    className={clsx(
                      sShared.largeButton,
                      sShared.yellowButton,
                      sShared.noBorder
                    )}
                    style={{
                      minWidth: "200px",
                    }}
                    size="medium"
                    // variant="contained"
                    color="primary"
                    rounded
                    onClick={() =>
                      keycloak.register({
                        locale: router.locale,
                        redirectUri: signUpRedirectHref,
                      })
                    }
                  >
                    {t("signUp")}
                  </Button>
                </div>
              </div>
              {!isTinyDevice ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "#636363",
                  }}
                >
                  <div className={s.readMoreButton}>
                    <a
                      href="https://artportable.com/profile/@ulrikaart"
                      style={{ display: "inline" }}
                    >
                      Ulrika Melin, {""}
                    </a>
                    <a
                      href="https://artportable.com/art/6501d6bb-4eef-4c84-8804-05910e4b7cd0"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                        textDecoration: "underline",
                      }}
                    >
                      "Sälen 1:1"
                    </a>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <div className={s.readMoreButton}>
                    <a
                      href="https://artportable.com/profile/@magdalena.ackeberg"
                      style={{ display: "inline" }}
                    >
                      Magdalena Ekblad Ackeberg, {""}
                    </a>
                    <a
                      href="https://artportable.com/art/b6343f99-cf91-4d5a-9a9c-b65c60ec40fe"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                        textDecoration: "underline",
                      }}
                    >
                      "At dawn"
                    </a>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={s.fullWidthImageTwo}>
              <a
                href="https://affordableartfair.com/fairs/stockholm/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    isTinyDevice
                      ? "/images/desktopAAF.png"
                      : "/images/art_fair.jpg"
                  }
                  alt={"affordable art fair image"}
                />
              </a>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>
            <div className={s.fullWidthImageCurated}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                <div style={{ flex: 1 }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={
                      isTinyDevice
                        ? "/images/akvarell.jpg"
                        : "/images/ulrikaMelin1.jpg"
                    }
                    alt="konst image"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={
                      isTinyDevice
                        ? "/images/ulrikaMelin1.jpg"
                        : "/images/ulrikaMelin1.jpg"
                    }
                    alt="konst image"
                  />
                </div>
              </div>

              <div className={s.headlineContainer}>
                <Typography variant="h4" className={s.headlineCurated}>
                  Kurerad samling
                </Typography>
                <Typography variant="h1" className={s.headline}>
                  Akvarell
                </Typography>
                <div className={s.desktopHeaderButtons}>
                  <Button
                    className={clsx(
                      sShared.largeButton,
                      sShared.yellowButton,
                      sShared.noBorder
                    )}
                    style={{
                      minWidth: "200px",
                    }}
                    size="medium"
                    // variant="contained"
                    color="primary"
                    rounded
                    onClick={() =>
                      keycloak.register({
                        locale: router.locale,
                        redirectUri: signUpRedirectHref,
                      })
                    }
                  >
                    {t("signUp")}
                  </Button>
                </div>
              </div>
              {!isTinyDevice ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "#636363",
                  }}
                >
                  <div className={s.readMoreButton}>
                    <a
                      href="https://artportable.com/profile/@ulrikaart"
                      style={{ display: "inline" }}
                    >
                      Ulrika Melin, {""}
                    </a>
                    <a
                      href="https://artportable.com/art/6501d6bb-4eef-4c84-8804-05910e4b7cd0"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                        textDecoration: "underline",
                      }}
                    >
                      "Sälen 1:1"
                    </a>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <div className={s.readMoreButton}>
                    <a
                      href="https://artportable.com/profile/@magdalena.ackeberg"
                      style={{ display: "inline" }}
                    >
                      Magdalena Ekblad Ackeberg, {""}
                    </a>
                    <a
                      href="https://artportable.com/art/b6343f99-cf91-4d5a-9a9c-b65c60ec40fe"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                        textDecoration: "underline",
                      }}
                    >
                      "At dawn"
                    </a>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide> */}
        </div>
      </Swiper>
    </div>
  );
}
