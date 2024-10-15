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
          delay: 888000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div className={clsx(s.fullWidthContainer)}>
          <SwiperSlide>
            {!isTinyDevice ? (
              <div></div>
            ) : (
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
            )}
            <div className={s.fullWidthImage}>
              <Image
                layout="fill"
                src={
                  isTinyDevice
                    ? "/images/yellowfields.jpg"
                    : "/images/loMobile.jpg"
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
                      href="https://artportable.com/en/art/07789129-9f95-491f-8914-bb25675da490"
                      style={{ display: "inline" }}
                    >
                      Lo Fehrling, {""}
                    </a>
                    <a
                      href="https://artportable.com/en/art/07789129-9f95-491f-8914-bb25675da490"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                      }}
                    >
                      Landfall
                    </a>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    color: "black",
                    fontSize: "14px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className={s.readMoreButton}>
                    <a
                      href="https://artportable.com/en/art/69abf98c-a847-4560-a42b-2ad3bc7cc5b7"
                      style={{ display: "inline" }}
                    >
                      Lo Fehrling{""}
                    </a>
                    <a
                      href="https://artportable.com/en/art/69abf98c-a847-4560-a42b-2ad3bc7cc5b7"
                      style={{
                        fontStyle: "italic",
                        display: "inline",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      Yellow Fields
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
                    <Typography
                      style={{
                        fontSize: "38px",
                        fontWeight: "normal",
                      }}
                    >
                      Konstutställning med vernissage
                    </Typography>
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
                className={s.fullWidthImage}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "auto",
                      alignContent: "center",
                      backgroundColor: "rgb(0 0 0 / 78%)",
                      paddingTop: "10px",
                    }}
                  >
                    <Typography
                      variant="h2"
                      className={s.headline}
                      style={{ color: "white" }}
                    >
                      Konstutställning med vernissage
                    </Typography>
                    <Typography
                      className={s.headline}
                      style={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      <Link
                        style={{ color: "white" }}
                        href="https://artportable.com/profile/@petra.risberg"
                      >
                        PETRA RISBERG
                      </Link>
                    </Typography>
                    <Typography
                      style={{
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                        color: "white",
                      }}
                    >
                      Utställning 9 - 17 november kl. 13 - 17
                    </Typography>
                    <Typography
                      style={{
                        color: "white",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      Vernissage lördag 9 november kl. 14 - 20
                    </Typography>
                    <Typography
                      variant="h3"
                      style={{
                        marginTop: "20px",
                        color: "white",
                        marginBottom: "20px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://galleririsberg.se/"
                        style={{
                          color: "white",
                        }}
                      >
                        Galleri Risberg
                      </Link>
                    </Typography>
                    <Typography
                      style={{
                        marginBottom: "10px",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
                        color: "white",
                      }}
                    >
                      Bergsgatan 36, Stockholm
                    </Typography>
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
