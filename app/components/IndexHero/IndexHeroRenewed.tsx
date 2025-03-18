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
          delay: 14000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapper}>
                <a href="https://artportable.com/art/0839e891-9c94-49e5-b1a8-0edef931848d">
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
                          ? "/images/felix.jpeg"
                          : "/images/felix.jpeg"
                      }
                      alt="first page artwork"
                      priority
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
                        Felix Oppenheim,&nbsp;
                      </p>
                      <p
                        style={{
                          color: "black",
                          backgroundColor: "white",
                          paddingRight: "4px",
                          fontStyle: "italic",
                        }}
                      >
                        Expedition Kashmir
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
                  {/* <Button className={s.buttonFindArt} onClick={onScrollDown}>
                    {t("findArt")}
                  </Button> */}
                </div>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapperRest}>
                {isTinyDevice ? (
                  <a href="https://artportable.com/artiklar/liljevalchs-varsalong-2025-har-nu-oppnat-sina-dorrar---textilkonst-populart-i-ar">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/liljevalch.jpg"}
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
                          Foto: Mattias Lindbäck
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <a href="https://artportable.com/artiklar/liljevalchs-varsalong-2025-har-nu-oppnat-sina-dorrar---textilkonst-populart-i-ar">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/liljevalch.jpg"}
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
                          Foto: Mattias Lindbäck
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
                    href="https://artportable.com/artiklar/liljevalchs-varsalong-2025-har-nu-oppnat-sina-dorrar---textilkonst-populart-i-ar"
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
                  <a href="https://artportable.com/art/8d0bf184-865f-49aa-aabf-2082b2fa6296">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/curated.jpg"}
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
                          Knut Sönstevold
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <a href="https://artportable.com/art/8d0bf184-865f-49aa-aabf-2082b2fa6296">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/images/curated.jpg"}
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
                          Knut Sönstevold
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
                    href="https://artportable.com/curated"
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
