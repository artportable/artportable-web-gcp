import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Link } from "@material-ui/core";
import SchoolIcon from "@material-ui/icons/School";
import clsx from "clsx";

import { useTranslation } from "next-i18next";
import { styles } from "./offers.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import minRam from "../../../public/offers/minramwhite.png";
import dexterDesktop from "../../../public/offers/dexterDesktop.jpg";
import dexterMobile from "../../../public/offers/dexterMobile.jpg";
import Image from "next/image";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../../app/utils/googleAnalytics";

export default function Offers() {
  const s = styles();
  const { t } = useTranslation("profile");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // call once initially

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className={s.title}>{t("offerTitle")}</div>

      <div className={s.frameDexter}>
        <Link href="https://www.dexterfineart.com/editions-campaign">
          <a
            onClick={() =>
              trackGoogleAnalytics(
                ActionType.EXCLUSIVE_OFFER,
                CategoryType.INTERACTIVE
              )
            }
          >
            <Image src={isMobile ? dexterMobile : dexterDesktop} alt="logo" />
          </a>
        </Link>
      </div>

      <div style={{ margin: "20px" }}></div>
      <div className={s.frame}>
        <div
          style={{
            width: "190px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            href="https://www.minram.se"
            onClick={() =>
              trackGoogleAnalytics(
                ActionType.EXCLUSIVE_OFFER,
                CategoryType.INTERACTIVE
              )
            }
          >
            <Image src={minRam} alt="logo" />
          </Link>
        </div>

        <div style={{ marginTop: "20px", fontSize: "16px" }}>
          {t("offerText")}
          <a
            href="https://www.minram.se"
            style={{ color: "black", cursor: "pointer", fontWeight: "bold" }}
          >
            www.minram.se
          </a>
          . {t("useOffer")}{" "}
          <p style={{ color: "black", fontWeight: "bold" }}>MINRAMART</p>{" "}
          {t("onCheckout")}
        </div>
      </div>
    </div>
  );
}
