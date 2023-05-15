import { useState, useEffect } from "react";
import { Dialog, IconButton } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import CloseIcon from "@material-ui/icons/Close";
import { styles } from "./adDialog.css";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import router from "next/router";
import { Locales } from "../../models/i18n/locales";
import Image from "next/image";
import Head from "next/head";
interface RandomImageProps {
  companyImageSv: string;
  companyLinkSv: string;
  companyImageEn: string;
  companyLinkEn: string;
  companyName: string;
}

interface Props {
  openAdDialog: any;
  setOpenAdDialog: any;
  onClose(): any;
}

export default function AdDialog(props: Props) {
  const s = styles();
  const { t } = useTranslation(["profile"]);
  const [randomAd, setRandomAd] = useState<RandomImageProps | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(randomAd === null || randomAd === undefined);
  }, [randomAd]);

  const ad = [
    {
      /*companyName: "Artportable",
      companyImageSv: "/ad/annica_hallman_takeover_new2.jpg",
      companyLinkSv: "https://artportable.com/profile/@Annica.b", 
      companyImageEn: "/ad/annica_hallman_takeover_new2.jpg",
      companyLinkEn: "https://artportable.com/en/profile/@Annica.b",*/
    },
  ];
  useEffect(() => {
    const randomAdIndex = Math.floor(Math.random() * ad.length);
    setRandomAd({
      companyImageSv: ad[randomAdIndex].companyImageSv,
      companyLinkSv: ad[randomAdIndex].companyLinkSv,
      companyImageEn: ad[randomAdIndex].companyImageEn,
      companyLinkEn: ad[randomAdIndex].companyLinkEn,
      companyName: ad[randomAdIndex].companyName,
    });
  }, []);

  const onClick = () => {
    trackGoogleAnalytics(
      ActionType.CLICK_FIRST_PAGE_AD,
      CategoryType.INTERACTIVE
    );
  };

  const onCloseClick = () => {
    props.onClose();
  };

  return (
    <Dialog
      className={s.dialog}
      open={props.openAdDialog}
      onClose={onCloseClick}
      aria-labelledby="ad"
      aria-describedby="ad-dialog"
    >
      <IconButton
        aria-label="close"
        className={s.closeButton}
        onClick={onCloseClick}
      >
        <CloseIcon className={s.closeIcon} />
      </IconButton>
      {randomAd && (
        <>
          {router.locale === Locales.sv ? (
            <a href={randomAd.companyLinkSv} target="_blank" onClick={onClick}>
              <Image
                className={s.adImage}
                src={randomAd.companyImageSv}
                alt={randomAd.companyName}
                width={900}
                height={500}
                quality={40}
              />
            </a>
          ) : (
            <a
              href={randomAd.companyLinkEn}
              target="_blank"
              onClick={onClick}
              rel="preload"
            >
              <Image
                className={s.adImage}
                src={randomAd.companyImageEn}
                alt={randomAd.companyName}
                width={900}
                height={500}
                quality={40}
              />
            </a>
          )}
        </>
      )}
    </Dialog>
  );
}
