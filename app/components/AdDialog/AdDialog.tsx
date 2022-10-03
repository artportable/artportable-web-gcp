import { useState, useEffect } from "react";
import { Dialog, IconButton } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import CloseIcon from '@material-ui/icons/Close';
import { styles } from './adDialog.css'
import { ActionType, CategoryType, trackGoogleAnalytics } from "../../utils/googleAnalytics";
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
  setOpenAdDialog: any
  onClose(): any;
}

export default function AdDialog(props: Props) {
  const s = styles();
  const { t } = useTranslation(['profile']);
  const [randomAd, setRandomAd] = useState<RandomImageProps | undefined>()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (randomAd === { companyImageSv: '', companyLinkSv: '', companyImageEn: '', companyLinkEn: '', companyName: '' }) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, []);

  const ad = [
    {
      companyName: "Mag Blue",
      companyImageSv: '/ad/BannerMagBlue.png',
      companyLinkSv: 'https://artportable.com/profile/@mag_blue',
      companyImageEn: '/ad/BannerMagBlue.png',
      companyLinkEn: 'https://artportable.com/en/profile/@mag_blue'
    },
    // {
    //   companyName: "Artportable",
    //   companyImageSv: '/ad/artportableAdSv.png',
    //   companyLinkSv: 'https://idp.artportable.com/auth/realms/prod/protocol/openid-connect/registrations?client_id=artportable-web&redirect_uri=https%3A%2F%2Fartportable.com%2Fplans&state=2bd10942-7b2e-46ca-b5fc-dc7a8014be24&response_mode=fragment&response_type=code&scope=openid&nonce=1468fa51-5405-4ec3-8738-5cd23c617bdc&ui_locales=sv&code_challenge=7_R5eG0FnCgVgxm7Tf3xuj8kHQ8R0o5XJMtGv3UnUk4&code_challenge_method=S256',
    //   companyImageEn: '/ad/artportableAdEn.png',
    //   companyLinkEn: 'https://idp.artportable.com/auth/realms/prod/login-actions/registration?client_id=artportable-web&tab_id=oAwwi6j92ok&execution=c5726b3b-1c22-443d-9d16-bfc237ce2ae4&kc_locale=en'
    // },
  ]
  useEffect(() => {
    const randomAdIndex = Math.floor(Math.random() * ad.length);
    setRandomAd(({
      companyImageSv: (ad[randomAdIndex].companyImageSv),
      companyLinkSv: (ad[randomAdIndex].companyLinkSv),
      companyImageEn: (ad[randomAdIndex].companyImageEn),
      companyLinkEn: (ad[randomAdIndex].companyLinkEn),
      companyName: (ad[randomAdIndex].companyName)
    }));
  }, [])

  const onClick = () => {
    trackGoogleAnalytics(ActionType.CLICK_FIRST_PAGE_AD, CategoryType.INTERACTIVE)
  };

  const onCloseClick = () => {
    props.onClose();
  }

  return (
    <Dialog
      className={s.dialog}
      open={props.openAdDialog}
      onClose={onCloseClick}
      aria-labelledby="ad"
      aria-describedby="ad-dialog"
    >
      <IconButton aria-label="close" className={s.closeButton} onClick={onCloseClick}>
        <CloseIcon className={s.closeIcon}/>
      </IconButton>
      {randomAd &&
        <>
          {router.locale === Locales.sv ?
            (
              <a href={(randomAd.companyLinkSv)} target="_blank" onClick={onClick}>
                <img className={s.adImage} src={(randomAd.companyImageSv)} alt={(randomAd.companyName)} />
              </a>
            )
            :
            (
              <a href={(randomAd.companyLinkEn)} target="_blank" onClick={onClick}>
                <img className={s.adImage} src={(randomAd.companyImageEn)} alt={(randomAd.companyName)} />
              </a>
            )
          }
        </>
      }
    </Dialog>
  );
}

