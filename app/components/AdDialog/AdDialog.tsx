import { useState, useEffect } from "react";
import { Dialog, IconButton } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import CloseIcon from '@material-ui/icons/Close';
import { styles } from './adDialog.css'
import { ActionType, CategoryType, trackGoogleAnalytics } from "../../utils/googleAnalytics";

interface RandomImageProps {
  companyImage: string;
  companyLink: string;
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
    if (randomAd === { companyImage: '', companyLink: '', companyName: '' }) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, []);

  const ad = [
    { companyName: "Artportable", companyImage: '/ad/artAd.png', companyLink: 'https://idp.artportable.com/auth/realms/prod/protocol/openid-connect/registrations?client_id=artportable-web&redirect_uri=https%3A%2F%2Fartportable.com%2Fplans&state=2bd10942-7b2e-46ca-b5fc-dc7a8014be24&response_mode=fragment&response_type=code&scope=openid&nonce=1468fa51-5405-4ec3-8738-5cd23c617bdc&ui_locales=sv&code_challenge=7_R5eG0FnCgVgxm7Tf3xuj8kHQ8R0o5XJMtGv3UnUk4&code_challenge_method=S256' },
    // { companyName: "Nokia", companyImage: '/ad/artAd2.png', companyLink: "https://www.nokia.com/" },
    // { companyName: "Samsung", companyImage: '/ad/samsung.jpg', companyLink: "https://www.samsung.com/" },
  ]

  useEffect(() => {
    const randomAdIndex = Math.floor(Math.random() * ad.length);
    setRandomAd(({
      companyImage: (ad[randomAdIndex].companyImage),
      companyLink: (ad[randomAdIndex].companyLink),
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
          <CloseIcon />
        </IconButton>
        {randomAd &&
          <a href={(randomAd.companyLink)} target="_blank" onClick={onClick}>
            <img className={s.adImage} src={(randomAd.companyImage)} alt={(randomAd.companyName)}></img>
          </a>
        }
      </Dialog>
  );
}

