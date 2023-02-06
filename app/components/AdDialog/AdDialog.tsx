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
    if (
      randomAd ===
      {
        companyImageSv: "",
        companyLinkSv: "",
        companyImageEn: "",
        companyLinkEn: "",
        companyName: "",
      }
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, []);

  const ad = [
    /*   {
      companyName: "Plingon",
      companyImageSv: "/ad/plingon.jpg",
      companyLinkSv: "https://bit.ly/3FyutR1",
      companyImageEn: "/ad/plingon.jpg",
      companyLinkEn: "https://bit.ly/3FyutR1",
    }, */
    {
      companyName: "Artportable",
      companyImageSv: "/ad/Zlatko_w2-min.jpg",
      companyLinkSv:
        "https://artportable.com/en/profile/@zlatkogradholt",
      companyImageEn: "/ad/Zlatko_w2-min.jpg",
      companyLinkEn:
        "https://artportable.com/en/profile/@zlatkogradholt",
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
              <img
                className={s.adImage}
                src={randomAd.companyImageSv}
                alt={randomAd.companyName}
              />
            </a>
          ) : (
            <a href={randomAd.companyLinkEn} target="_blank" onClick={onClick}>
              <img
                className={s.adImage}
                src={randomAd.companyImageEn}
                alt={randomAd.companyName}
              />
            </a>
          )}
        </>
      )}
    </Dialog>
  );
}
