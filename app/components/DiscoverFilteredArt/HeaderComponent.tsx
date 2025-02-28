import { styles } from "./headerComponent.css";
import { useMediaQuery } from "@material-ui/core";
import { theme } from "../../../styles/theme";
import { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";

export default function IndexHeroRenewed({ page, filterOpen }) {
  const { t } = useTranslation("index");
  const s = styles();
  const isTinyDevice = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {page === "latest" && (
        <div className={s.container}>
          <div style={{ marginLeft: filterOpen ? "25%" : "10%" }}>
            <div
              style={{
                fontSize: "35px",
                fontFamily: "Roboto",
                fontWeight: 400,
              }}
              className={s.titleWrapper}
            >
              {t("latestTitle")}
            </div>
            <br />
            <div
              style={{
                fontSize: "20px",
                fontFamily: "Joan",
                fontWeight: 400,
                color: "#00000078",
              }}
            >
              {t("latestText")}
            </div>
          </div>
        </div>
      )}
      {page === "likes" && (
        <div className={s.containerLiked}>
          <div style={{ marginLeft: filterOpen ? "25%" : "10%" }}>
            <div
              style={{
                fontSize: "35px",
                fontFamily: "Roboto",
                fontWeight: 400,
              }}
              className={s.titleWrapper}
            >
              {t("discoverTitle")}
            </div>
            <br />
            <div
              style={{
                fontSize: "20px",
                fontFamily: "Joan",
                fontWeight: 400,
                color: "#00000078",
              }}
            >
              {t("discoverText")}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
