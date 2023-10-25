import React, { useContext, useEffect, useState } from "react";
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
import dexterDesktop from "../../../public/offers/dexterDesktopSv.jpg";
import dexterMobile from "../../../public/offers/dexterMobileSv.jpg";
import dexterDesktopEn from "../../../public/offers/dexterDesktopEn.jpg";
import dexterMobileEn from "../../../public/offers/dexterMobileEn.jpg";
import penstoreMobile from "../../../public/offers/penstoreMobile.png";
import penstoreDesktop from "../../../public/offers/penstoreDesktop.png";
import Image from "next/image";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../../app/utils/googleAnalytics";
import { UserContext } from "../../contexts/user-context";
import { Membership } from "../../models/Membership";


export default function Offers() {
  const s = styles();
  const { t, i18n } = useTranslation("profile");
  const {  membership } = useContext(UserContext);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const debounceResize = (callback, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          callback(...args);
        }, delay);
      };
    };


    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();

    const debouncedHandleResize = debounceResize(handleResize, 200);
    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  let dexterImage;
  let penstoreImage;
  if (i18n.language === "sv") {
    dexterImage = isMobile ? dexterMobile : dexterDesktop;
    penstoreImage = isMobile ? penstoreMobile : penstoreDesktop;
  } else if (i18n.language === "en") {
    dexterImage = isMobile ? dexterMobileEn : dexterDesktopEn;
    penstoreImage = isMobile ? penstoreMobile : penstoreDesktop;
  }

  if (isMobile === null) return null;

  return (
    <div>
      <div className={s.title}>{t("offerTitle")}</div>
        <div className={s.frameDexter}>
          <Link href="https://www.penstore.se">
             <a
               onClick={() =>
                  trackGoogleAnalytics(
                     ActionType.EXCLUSIVE_OFFER,
                    CategoryType.INTERACTIVE
                    )
                 }
              >
                  <Image src={penstoreImage} alt="logo" />
                </a>
              </Link>
            </div>


      {membership.value > Membership.Base && (
        <>
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
            <Image src={dexterImage} alt="logo" />
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
        </>
      )}

  

     
    </div>
  );
}
