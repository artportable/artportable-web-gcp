import { useState, useContext, useEffect } from "react";
import { Dialog, IconButton } from "@material-ui/core";
import { useTranslation } from 'next-i18next'

import CloseIcon from '@material-ui/icons/Close';


import { styles } from './adDialog.css'

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

  const images = [
    { companyName: "Apple", companyImage: '/ad/iphone.jpg', companyLink: 'https://www.apple.com/' },
    { companyName: "Nokia", companyImage: '/ad/nokia.jpg', companyLink: "https://www.nokia.com/" },
  ]

  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setRandomImage(({
      companyImage: (images[randomImageIndex].companyImage),
      companyLink: (images[randomImageIndex].companyLink),
      companyName: (images[randomImageIndex].companyName)
    }));
  }, [])



  const onCloseClick = () => {
    props.onClose();
  }

  return (
    <div>
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
          <a href={(randomImage.companyLink)} className={s.adImage} target="_blank">
            <img className={s.adImage} src={(randomImage.companyImage)}></img>
          </a>
        }
      </Dialog>
    </div>
  );
}

