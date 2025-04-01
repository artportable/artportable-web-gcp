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
import Link from "next/link";

export default function IndexHeroRenewed({ onScrollDown }) {
  const { t } = useTranslation("index");
  const s = styles();
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div className={s.container}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        scrollbar={{
          hide: false,
        }}
        autoplay={{
          delay: 1422222000,
          disableOnInteraction: false,
        }}
        navigation={isTinyDevice}
      >
        <div>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapper}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Image
                    src={"/images/heroImageTwo.png"}
                    alt="first page artwork"
                    priority
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    unoptimized
                  />
                  <div className={s.imageText}>
                    {" "}
                    <div>
                      {" "}
                      <p
                        style={{
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        {t("buyFrom")} <br />
                        {t("direct")}
                        <br />
                      </p>
                    </div>
                  </div>{" "}
                  <div className={s.imageButton}>
                    {" "}
                    <div className={s.buttonFindArt}>
                      {" "}
                      <Link href={"/discover"} passHref>
                        {t("findArt")}
                      </Link>
                    </div>
                  </div>{" "}
                  <br />
                </div>
              </div>
              <div className={s.headlineWrapperMobile}>
                <div className={s.imageTextMobile}>
                  {" "}
                  <div>
                    {" "}
                    <p
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      {t("buyFrom")} <br />
                      {t("direct")}
                      <br />
                    </p>
                    <div className={s.buttonFindArtMobile}>
                      {" "}
                      <Link href={"/discover"} passHref>
                        {t("findArt")}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* <div className={s.buttonWrapper}>
                  <Link href={"/discover"} passHref>
                    <Button className={s.buttonFindArt}>{t("findArt")}</Button>
                  </Link>
                </div> */}
              </div>
            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section className={s.sectionWrapper}>
              <div className={s.imgWrapperRest}>
                {isTinyDevice ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={"/images/rachelimage.jpeg"}
                      alt="konst"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                    <div className={s.imageTitle}>
                      <p
                        style={{
                          padding: "2px",
                          color: "rgb(255 255 255 / 70%)",
                        }}
                      >
                        Foto:&nbsp;
                        <span style={{ fontStyle: "italic" }}>
                          Matilda Rahm
                        </span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={"/images/rachelimage.jpeg"}
                      alt="artworkimage"
                      layout="fill"
                      objectFit="cover"
                      priority
                    />
                    <div className={s.imageTitle}>
                      <p
                        style={{
                          padding: "2px",
                          color: "rgb(255 255 255 / 70%)",
                        }}
                      >
                        Foto:&nbsp;
                        <span style={{ fontStyle: "italic" }}>
                          Matilda Rahm
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className={s.headlineWrapperRest}>
                <div className={s.headlineStyled}>
                  "Jag kommer lämna lögner efter mig"
                </div>
                <div className={s.headlineThree}>– Rachel Mohlin</div> <br />
                <div className={s.buttonWrapperSeeMore}>
                  <a
                    className={s.seeMoreButton}
                    href="https://artportable.com/editorial/rachel-mohlin"
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
                        src={
                          "https://artportable-cdn-edhmaucaccbngbgu.z01.azurefd.net/artportable-prod/images/82c89d55-a979-4bc5-9b15-6cf5c2dab7f7.jpg"
                        }
                        alt="konst"
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className={s.imageTitle}>
                        <p
                          style={{
                            color: "rgb(255 255 255 / 70%)",
                            padding: "2px",
                          }}
                        >
                          Knut Sönstevold,&nbsp;
                          <span style={{ fontStyle: "italic" }}>Fallande</span>
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
                        src={
                          "https://artportable-cdn-edhmaucaccbngbgu.z01.azurefd.net/artportable-prod/images/82c89d55-a979-4bc5-9b15-6cf5c2dab7f7.jpg"
                        }
                        alt="artworkimage"
                        layout="fill"
                        objectFit="cover"
                        unoptimized
                        priority
                      />
                      <div className={s.imageTitle}>
                        <p
                          style={{
                            color: "rgb(255 255 255 / 70%)",
                            padding: "2px",
                          }}
                        >
                          Knut Sönstevold,&nbsp;
                          <span style={{ fontStyle: "italic" }}>Fallande</span>
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
