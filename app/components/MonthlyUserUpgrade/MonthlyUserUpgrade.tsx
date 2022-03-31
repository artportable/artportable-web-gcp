import { useState, useContext } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import ZendeskFormMenu from "../ZendeskFormMenu/ZendeskFormMenu";
import CloseIcon from '@material-ui/icons/Close';
import { UserContext } from "../../contexts/user-context";
import { zapierMonthlyInterest } from "../../utils/zapierLead";

import { styles } from './monthlyUserUpgrade.css'
import Button from "../Button/Button";

interface Props {
  open: any;
  onClose(): any;

}

export default function DialogMonthlyUser(props: Props) {
  const s = styles();
  const { t } = useTranslation(['profile']);
  const [sentInterest, setSentInterest] = useState(false);
  const { email, family_name, given_name } = useContext(UserContext);

  const submit = () => {
    setSentInterest(true)
    zapierMonthlyInterest({
      "email":  email.value,
      "name": given_name.value + " " + family_name.value

    })
  }

  const onCloseClick = () => {
    props.onClose();
    setSentInterest(false)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={onCloseClick}
        className={s.dialog}
      // aria-labelledby="dialog-title"
      // aria-describedby="dialog-description"
      >
        {sentInterest ?
          <>
            <IconButton aria-label="close" className={s.closeButton} onClick={onCloseClick}>
              <CloseIcon />
            </IconButton>
            <DialogTitle id="dialog-title" className={s.title}>
              {t('thanks')}
            </DialogTitle>
            <DialogContent>
              <div className={s.dialogContent}>
                <Typography className={s.text}>
                {t('inShort')}
                </Typography>
                <div className={s.imgDivSecondView}>
                <img
                  src="/Artportable_Emblem_Gold.svg"
                  alt="Logo Artportable"
                  className={s.emblem}
                />
              </div>
                <Button
                  className={s.button}
                  variant="contained"
                  color="primary"
                  onClick={onCloseClick}>
                  {t('close')}
                </Button>
              </div>
            </DialogContent>
          </>
          :
          <>
            <IconButton aria-label="close" className={s.closeButton} onClick={onCloseClick}>
              <CloseIcon />
            </IconButton>
            <DialogTitle id="dialog-title" className={s.title}>
              {t('becomeMonthly')}
            </DialogTitle>
            <DialogContent>
              <div className={s.dialogContent}>
                <Typography className={s.textSendPurchase}>
                {t('sendPurchase')}
                </Typography>
                <Typography className={s.text}>
                {t('asMonthlyArtist')}
                </Typography>
                <div className={s.imgDiv}>
                <img
                  src="/Artportable_Emblem_Gold.svg"
                  alt="Logo Artportable"
                  className={s.emblem}
                />
              </div>
                <Button
                  className={s.button}
                  variant="contained"
                  color="primary"
                  onClick={submit}>
                  {t('send')}
                </Button>
              </div>
            </DialogContent>
          </>
        }
      </Dialog>
    </div>
  );
}
