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
          delay: 12000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapper}>
                <a href="https://artportable.com/art/a033365e-9901-426e-b770-797990d23a3d">
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
                          ? "/images/larsCompressed.png"
                          : "/images/katharsis.jpg"
                      }
                      alt="konst"
                      loading="lazy"
                      style={{ objectFit: "cover" }}
                      layout="fill"
                    />
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
                  <a href="https://artportable.com/art/8997e46a-8620-4f61-90d5-2ae857eabace">
                    <img
                      src={"/images/otsa.png"}
                      alt={"konst"}
                      loading="lazy"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </a>
                ) : (
                  <a href="https://artportable.com/art/61b3a5fc-a4be-47e4-8b8e-ab95b2c125e3">
                    <img
                      src={"/images/otsaWide.jpg"}
                      alt={"konst"}
                      loading="lazy"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </a>
                )}
              </div>
              <div className={s.headlineWrapperRest}>
                <div className={s.headline}>{t("artistTitle")}</div>
                <div className={s.headlineThree}>
                  {t("artistDescription")}
                </div>{" "}
                <br />
                <div className={s.buttonWrapperSeeMore}>
                  <a
                    className={s.seeMoreButton}
                    href="https://artportable.com/profile/@vivianne"
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
                <a href="https://artportable.com/art/9a32dd35-f4ce-49fe-a98e-3d14e0cda4b1">
                  <img
                    src={
                      isTinyDevice
                        ? "/images/risberg3.jpeg"
                        : "/images/risberg3.jpeg"
                    }
                    alt={"konst"}
                    loading="lazy"
                    style={{ width: "100%", height: "100%" }}
                  />
                </a>
              </div>
              <div className={s.headlineWrapperRest}>
                <div className={s.headlineVernissage}>
                  Konstutställning med vernissage
                </div>

                <div className={s.headlineThree}>
                  Utställning 9-17 november kl. 13-17
                  <br />
                  <div className={s.headlineThree}>
                    Vernissage lördag 9 november kl. 14-20
                  </div>
                  <div>
                    <a href="https://galleririsberg.se/">Galleri Risberg</a>
                    <br />
                    Bergsgatan 36, Stockholm
                  </div>
                  <br />
                  <div className={s.buttonWrapperSeeMore}>
                    <a
                      className={s.seeMoreButton}
                      href="https://artportable.com/profile/@petra.risberg"
                    >
                      {t("seeMore")}
                    </a>
                  </div>
                  <div className={s.mailUs}>
                    Vill du synas här?{" "}
                    <a href="mailto:hello@artportable.com">
                      hello@artportable.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
}
