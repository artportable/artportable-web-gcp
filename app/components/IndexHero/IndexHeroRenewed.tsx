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
          delay: 200000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapper}>
                <a href="https://artportable.com/art/1872cd35-3e1e-4a1d-a089-e42d3697be00">
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
                          ? "/images/aylin.jpeg"
                          : "/images/aylin.jpeg"
                      }
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
                          paddingLeft: "4px",
                        }}
                      >
                        Aylin Eriten,&nbsp;
                      </p>
                      <p
                        style={{
                          color: "black",
                          backgroundColor: "white",
                          paddingRight: "4px",
                          fontStyle: "italic",
                        }}
                      >
                        Macaron Tower
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
                  <a href="https://artportable.com/en/profile/@irine">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/slide3.jpeg"}
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
                          Irina Mylnikova
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <a href="https://artportable.com/en/profile/@irine">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/slide3.jpeg"}
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
                          Irina Mylnikova
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
                    href="https://artportable.com/akryl"
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
                  <a href="https://artportable.com/en/art/083d6409-b618-4b39-a417-db6050a3167d">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/firstsnow.jpeg"}
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
                          Marie Sandell
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <a href="https://artportable.com/en/art/083d6409-b618-4b39-a417-db6050a3167d">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/firstsnow.jpeg"}
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
                          Marie Sandell
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
                    href="https://artportable.com/profile/@marie.sandell"
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
