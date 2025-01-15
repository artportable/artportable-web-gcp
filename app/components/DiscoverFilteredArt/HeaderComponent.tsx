import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { styles } from "./headerComponent.css";
import { useMediaQuery } from "@material-ui/core";
import { theme } from "../../../styles/theme";
import { useEffect, useState } from "react";
import { KeycloakInstance } from "keycloak-js";
import { useKeycloak } from "@react-keycloak/ssr";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Typography from "@mui/material/Typography";

export default function IndexHeroRenewed({ page, filterOpen }) {
  const { t } = useTranslation("index");
  const s = styles();
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    console.log("from header: " + page);
  }, [page]);

  return (
    <div
      style={{
        width: filterOpen ? "79%" : "100%",
      }}
      className={s.container}
    >
      <div
        style={{
          width: filterOpen ? "100%" : "83%",
          margin: "0 auto",
        }}
      >
        {page === "likes" && (
          <div>
            {" "}
            <Typography
              className={s.titleWrapper}
              style={{ width: filterOpen ? "80%" : "100%" }}
            >
              {t("discoverTitle")}
            </Typography>
            <Typography className={s.textWrapper}>
              {t("discoverText")}
            </Typography>
          </div>
        )}
        {page === "latest" && (
          <div>
            {" "}
            <Typography
              className={s.titleWrapperTwo}
              style={{ width: filterOpen ? "90%" : "100%" }}
            >
              {t("latestTitle")}
            </Typography>
            <Typography className={s.textWrapper}>{t("latestText")}</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
