import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { styles } from "./indexHeroRenewed.css";
import { useMediaQuery } from "@material-ui/core";
import { theme } from "../../../styles/theme";
import { useState } from "react";
import { KeycloakInstance } from "keycloak-js";
import { useKeycloak } from "@react-keycloak/ssr";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";
import Image from "next/image";

export default function IndexHeroRenewed({ onScrollDown }) {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const { t } = useTranslation("index");
  const s = styles();
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("lg"));
  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");

  return (
    <div className={s.container}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        scrollbar={{
          hide: false,
        }}
        autoplay={{
          delay: 140000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapper}>
                <a href="https://artportable.com/art/cd0c459b-d857-485d-88e1-921fa9f55ff4">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={
                        isTinyDevice
                          ? "/images/torleivs.webp"
                          : "/images/torleivs.webp"
                      }
                      alt="first page artwork"
                      loading="lazy"
                      layout="fill"
                      objectFit="cover"
                      quality={10}
                    />
                    <div className={s.imageTitle}>
                      <p
                        style={{
                          color: "black",
                          backgroundColor: "white",
                          paddingLeft: "4px",
                        }}
                      >
                        TORLEIV AGDESTEIN,&nbsp;
                      </p>
                      <p
                        style={{
                          color: "black",
                          backgroundColor: "white",
                          paddingRight: "4px",
                          fontStyle: "italic",
                        }}
                      >
                        Bortenfor
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className={s.headlineWrapper}>
                <div className={s.headline}>{t("nordensLargestArena")}</div>
                <div className={s.headlineTwo}>{t("underTitle")}</div>
                <div className={s.buttonWrapper}>
                  <Button
                    className={s.buttonRegister}
                    onClick={() =>
                      keycloak.register({
                        locale: router.locale,
                        redirectUri: signUpRedirectHref,
                      })
                    }
                  >
                    {t("signUp")}
                  </Button>
                  <Button className={s.buttonFindArt} onClick={onScrollDown}>
                    {t("findArt")}
                  </Button>
                </div>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapperRest}>
                {isTinyDevice ? (
                  <a href="https://artportable.com/en/profile/@gabriellanorum">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/image2.jpeg"}
                        alt="konst"
                        loading="lazy"
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className={s.imageTitle}>
                        <p
                          style={{
                            color: "black",
                            backgroundColor: "white",
                            padding: "2px",
                          }}
                        >
                          Gabriella Norum
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <a href="https://artportable.com/en/profile/@norumgabriella">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/image2.jpeg"}
                        alt="artworkimage"
                        loading="lazy"
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className={s.imageTitle}>
                        <p
                          style={{
                            color: "black",
                            backgroundColor: "white",
                            padding: "2px",
                          }}
                        >
                          Gabriella Norum
                        </p>
                      </div>
                    </div>
                  </a>
                )}
              </div>
              <div className={s.headlineWrapperRest}>
                <div className={s.headlineStyled}>{t("titleHeader")}</div>
                <div className={s.headlineThree}>
                  {t("descriptionBody")}
                </div>{" "}
                <br />
                <div className={s.buttonWrapperSeeMore}>
                  <a
                    className={s.seeMoreButton}
                    style={{ color: "white" }}
                    href="https://artportable.com/en/profile/@norumgabriella"
                  >
                    {t("seeMore")}
                  </a>
                </div>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapperRest}>
                {isTinyDevice ? (
                  <a href="https://artportable.com/art/c4bd9742-1f48-4541-b62b-63ee36351f21">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/image3.jpeg"}
                        alt="konst"
                        loading="lazy"
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className={s.imageTitle}>
                        <p
                          style={{
                            backgroundColor: "white",
                            padding: "2px",
                            color: "black",
                          }}
                        >
                          Daniel Zausnig
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <a href="https://artportable.com/art/c4bd9742-1f48-4541-b62b-63ee36351f21">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/image3.jpeg"}
                        alt="artworkimage"
                        loading="lazy"
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className={s.imageTitle}>
                        <p
                          style={{
                            backgroundColor: "white",
                            padding: "2px",
                            color: "black",
                          }}
                        >
                          Daniel Zausnig
                        </p>
                      </div>
                    </div>
                  </a>
                )}
              </div>
              <div className={s.headlineWrapperRest}>
                <div className={s.headlineStyled}>{t("artistTitle")}</div>
                <div className={s.headlineThree}>
                  {t("artistDescription")}
                </div>{" "}
                <br />
                <div className={s.buttonWrapperSeeMore}>
                  <a
                    className={s.seeMoreButton}
                    style={{ color: "white" }}
                    href="https://artportable.com/profile/@danielzausnig"
                  >
                    {t("seeMore")}
                  </a>
                </div>
              </div>
            </section>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
}
