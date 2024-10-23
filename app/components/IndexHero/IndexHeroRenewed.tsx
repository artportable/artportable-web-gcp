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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
        <div>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapper}>
                <a href="https://artportable.com/en/art/f35a11fb-6434-4ee8-8702-dacd07fbd7ab">
                  <img
                    src={
                      isTinyDevice
                        ? "/images/intoTheSunset.png"
                        : "/images/intoTheSunsetMobile.png"
                    }
                    alt={"konst"}
                    loading="lazy"
                    style={{ width: "100%", height: "100%" }}
                  />
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
                  <Button className={s.buttonRegister} onClick={onScrollDown}>
                    {t("findArt")}
                  </Button>
                </div>
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapper}>
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
              <div className={s.headlineWrapper}>
                <div className={s.headline}>
                  Konstutställning med vernissage
                </div>
                <div className={s.headlineTitle}>
                  <a
                    style={{ textDecoration: "underline" }}
                    href="https://artportable.com/profile/@petra.risberg"
                  >
                    Petra Risberg
                  </a>
                </div>
                <div className={s.headlineThree}>
                  Utställning 9 - 17 november kl. 13 - 17
                  <br />
                  <div className={s.headlineThree}>
                    Vernissage lördag 9 november kl. 14 - 20
                  </div>
                  <br />
                  <div>
                    <a href="https://galleririsberg.se/">Galleri Risberg</a>
                    <br />
                    Bergsgatan 36, Stockholm
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
