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

export default function IndexHeroRenewed({ title, filterOpen }) {
  const { t } = useTranslation("index ");
  const s = styles();
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    console.log("from header: " + filterOpen);
  }, [filterOpen]);

  return (
    <div
      style={{
        width: filterOpen ? "79%" : "100%",
        marginRight: "0",
        marginLeft: "auto",
      }}
      className={s.container}
    >
      <div
        style={{
          padding: "10px",
          margin: "0 auto",
        }}
      >
        <Typography
          className={s.titleWrapper}
          style={{ width: filterOpen ? "80%" : "90%" }}
        >
          Hitta ditt originalverk och köp det direkt från konstnären
        </Typography>
        <Typography style={{ fontSize: "16px", width: "100%" }}>
          På Artportable hittar du alla typer av konst; olja, akvarell,
          fotografi eller keramik. Naturtroget eller abstrakt, här finns alla
          tänkbara tekniker och format representerade, från hela landet. Det
          smartaste av allt, du kontaktar själv konstnären bakom ditt
          favoritverk och gör upp både köp och leverans. Enkelt och modernt.
        </Typography>
      </div>
    </div>
  );
}
