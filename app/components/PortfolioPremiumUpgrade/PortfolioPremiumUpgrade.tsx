import { useState, useContext } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import ZendeskFormMenu from "../ZendeskFormMenu/ZendeskFormMenu";
import CloseIcon from '@material-ui/icons/Close';
import { UserContext } from "../../contexts/user-context";
import { zapierPortfolioPremiumInterest } from "../../utils/zapierLead";

import { styles } from './portfolioPremiumUpgrade.css'
import Button from "../Button/Button";

interface Props {
  open: any;
  onClose(): any;
  numberExits: any;

}

export default function DialogPortfolioPremium(props: Props) {
  const s = styles();
  const { t } = useTranslation(['profile']);
  const [sentInterest, setSentInterest] = useState(false);
  const { email, family_name, given_name, phone } = useContext(UserContext);
  const [numberExists, setNumberExists] = useState(true);

  const submit = () => {
    setSentInterest(true)
    zapierPortfolioPremiumInterest({
      "email": email.value + " " + given_name.value + " " + family_name.value + " " + phone.value + " " + "portfolioPremiumInterest",
    });
  }

  const onCloseClick = () => {
    props.onClose();
    setSentInterest(false)
  }
  const addNumber = () => {
    if (!phone.value) {
      setNumberExists(false)
    }
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
            <img
              src="/Artportable_Logotyp_Black.svg"
              alt="Logo Artportable"
              className={s.logo}
            />
            <DialogTitle id="dialog-title" className={s.title}>
              {t('thanks')}
            </DialogTitle>
            <DialogContent>
              <div className={s.dialogContent}>
                <Typography className={s.text}>
                  {t('inShort')}
                </Typography>
                <div className={s.imgDivSecondView}>
                  {/* <img
                  src="/Artportable_Emblem_Gold.svg"
                  alt="Logo Artportable"
                  className={s.emblem}
                /> */}
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
            <img
              src="/Artportable_Logotyp_Black.svg"
              alt="Logo Artportable"
              className={s.logo}
            />
            <DialogTitle id="dialog-title" className={s.title}>
              Portfolio Premium
            </DialogTitle>
            <DialogContent>
              <div className={s.dialogContent}>
                <div>
                  <Typography className={s.textSendPurchase}>
                    {t('sendPurchase')}
                  </Typography>
                  <Typography className={s.text}>
                    Få ut mer av ditt konstnärskap.
                  </Typography>
                </div>
                <div className={s.imgDiv}>
                  {(numberExists) &&
                    <div className={s.textFieldDiv}>
                      <TextField
                        className={s.textField}
                        fullWidth
                        placeholder={t("Telefonnummer")}
                        value={phone.value}
                        required
                        variant="outlined"
                        // onChange={(e) => handleChange(e, 'phone')}
                      />
                    </div>
                  }
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
