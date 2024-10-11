import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { styles } from "./indexHeroRenewed.css";
import clsx from "clsx";
import { Link, Typography, useMediaQuery } from "@material-ui/core";
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
          delay: 800000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div className={clsx(s.fullWidthContainer)}>
          <SwiperSlide>
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
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 1)" }}
                >
                  <div className={s.arrowDown}>
                    {t("findArt")}
                    <KeyboardDoubleArrowDownIcon />
                  </div>
                </Button>
              </div>
            </div>
            <div className={s.fullWidthImage}>
              <Image
                layout="fill"
                src={
                  isTinyDevice
                    ? "/images/onnebyDesktop.jpeg"
                    : "/images/onnebyMobile3.jpg"
                }
                alt={"konst"}
                objectFit="cover"
                loading="lazy"
              />

              {!isTinyDevice ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                  }}
                >
                  <div className={s.readMoreButton}>
                    <a
                      href="https://artportable.com/en/art/517f0b7a-96ed-4208-b936-15c053d1657c"
                      style={{ display: "inline" }}
                    >
                      Anneli Önneby, {""}
                    </a>
                    <a
                      href="https://artportable.com/en/art/517f0b7a-96ed-4208-b936-15c053d1657c"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                      }}
                    >
                      "Catnap och skata"
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
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                  }}
                >
                  <div className={s.readMoreButton}>
                    <a
                      href="https://artportable.com/en/art/5fadd34d-bf2a-4c18-82ae-122f01fe7ae5"
                      style={{ display: "inline" }}
                    >
                      Anneli Önneby{""}
                    </a>
                    <a
                      href="https://artportable.com/en/art/5fadd34d-bf2a-4c18-82ae-122f01fe7ae5"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                      }}
                    >
                      "Cat nap"
                    </a>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {isTinyDevice ? (
              <section
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "calc(100vh - 90px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "rgb(21 20 19)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "50%",
                      alignContent: "center",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "38px",
                        fontWeight: "normal",
                      }}
                    >
                      Konstutställning med vernissage
                    </h2>
                    <h2
                      style={{
                        fontSize: "24px",
                      }}
                    >
                      <Link
                        style={{ color: "white" }}
                        href="https://artportable.com/profile/@petra.risberg"
                      >
                        PETRA RISBERG
                      </Link>
                    </h2>
                    <p>Utställning 9 - 17 november kl. 13 - 17</p>
                    <p>Vernissage lördag 9 november kl. 14 - 20</p>
                    <h3>
                      <Link
                        style={{ color: "white" }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://galleririsberg.se/"
                      >
                        Galleri Risberg
                      </Link>
                    </h3>
                    <p>Bergsgatan 36, Stockholm</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    backgroundImage: `url("/images/risberg1.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </section>
            ) : (
              <section
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "calc(70vh)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    backgroundImage: `url("/images/risberg1.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                    backgroundRepeat: "no-repeat",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      width: "100%",
                      height: "50%",
                      alignContent: "center",
                      backgroundColor: "#0000006b",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "22px",
                        fontWeight: "normal",
                      }}
                    >
                      Konstutställning med vernissage
                    </h2>
                    <h2
                      style={{
                        fontSize: "24px",
                      }}
                    >
                      <Link
                        style={{ color: "white", textDecoration: "underline" }}
                        href="https://artportable.com/profile/@petra.risberg"
                      >
                        PETRA RISBERG
                      </Link>
                    </h2>
                    <div>Utställning 9 - 17 november kl. 13 - 17</div>
                    <div>Vernissage lördag 9 november kl. 14 - 20</div>
                    <h3>
                      <Link
                        style={{ color: "white", textDecoration: "underline" }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://galleririsberg.se/"
                      >
                        Galleri Risberg
                      </Link>
                    </h3>
                    <p>Bergsgatan 36, Stockholm</p>
                  </div>
                </div>
              </section>
            )}
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
}
