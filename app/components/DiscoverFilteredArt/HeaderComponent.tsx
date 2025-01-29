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
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          backgroundColor: "#0076D5",
          height: "250px",
          width: filterOpen ? "85%" : "100%",
          marginLeft: "auto",
        }}
      >
        <div style={{ color: "white", marginLeft: "10px" }}>
          {" "}
          <h1>Köp det senaste på Artportable</h1>
        </div>
      </div>
    </>
  );
}
