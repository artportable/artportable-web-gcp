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
  const [randomImage, setRandomImage] = useState<RandomImageProps | undefined>()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (randomImage === { companyImage: '', companyLink: '', companyName: '' }) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, []);

  const ad = [
    { companyName: "Apple", companyImage: '/ad/iphone.jpg', companyLink: 'https://www.apple.com/' },
    { companyName: "Nokia", companyImage: '/ad/nokia.jpg', companyLink: "https://www.nokia.com/" },
    { companyName: "Samsung", companyImage: '/ad/samsung.jpg', companyLink: "https://www.samsung.com/" },
  ]

  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * ad.length);
    setRandomImage(({
      companyImage: (ad[randomImageIndex].companyImage),
      companyLink: (ad[randomImageIndex].companyLink),
      companyName: (ad[randomImageIndex].companyName)
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
        {randomImage &&
          <a href={(randomImage.companyLink)} target="_blank" onClick={onClick}>
            <img className={s.adImage} src={(randomImage.companyImage)}></img>
          </a>
        }
      </Dialog>
  );
}

