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
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export default function IndexHeroRenewed({ onScrollDown }) {
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
          delay: 10000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div className={clsx(s.fullWidthContainer)}>
          <SwiperSlide>
            <div className={s.fullWidthImage}>
              <Image
                layout="fill"
                src={
                  isTinyDevice
                    ? "/images/ackeberg3.jpg"
                    : "/images/andersOlsson.jpeg"
                }
                alt={"konst"}
                objectFit="fill"
                loading="lazy"
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
                <div className={s.desktopHeaderButtons}>
                  <Button
                    className={clsx(
                      sShared.largeButtonFindArt,
                      sShared.findArtButton,
                      sShared.noBorder
                    )}
                    size="medium"
                    rounded
                    onClick={onScrollDown}
                  >
                    <div className={s.arrowDown}>
                      {t("findArt")}
                      <KeyboardDoubleArrowDownIcon />
                    </div>
                  </Button>
                </div>
              </div>
              {!isTinyDevice ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "11px",
                  }}
                >
                  <div className={s.readMoreButton}>
                    <a
                      href="https://artportable.com/art/ac6cf305-9b60-4b51-b75b-afc3a765ca80"
                      style={{ display: "inline" }}
                    >
                      Anders Olsson, {""}
                    </a>
                    <a
                      href="https://artportable.com/art/ac6cf305-9b60-4b51-b75b-afc3a765ca80"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                      }}
                    >
                      "Regn"
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
                      href="https://artportable.com/art/af11206f-9a8b-43f3-9e57-42d6accc6119"
                      style={{ display: "inline" }}
                    >
                      Magdalena Ekblad Ackeberg, {""}
                    </a>
                    <a
                      href="https://artportable.com/art/af11206f-9a8b-43f3-9e57-42d6accc6119"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                      }}
                    >
                      "On my way home"
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
                <Image
                  loading="lazy"
                  layout="fill"
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
        </div>
      </Swiper>
    </div>
  );
}
