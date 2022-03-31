import { useState, useContext } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import ZendeskFormMenu from "../ZendeskFormMenu/ZendeskFormMenu";
import CloseIcon from '@material-ui/icons/Close';
import { UserContext } from "../../contexts/user-context";

import { styles } from './monthlyUserUpgrade.css'
import Button from "../Button/Button";

interface Props {
  open: any;
  onClose(): any;

}

export default function DialogMonthlyUser(props: Props) {
  const s = styles();
  const { t } = useTranslation(['header', 'common', 'support']);
  const [sentInterest, setSentInterest] = useState('');
  const { email, family_name, given_name } = useContext(UserContext);

  const submit = () => {
    setSentInterest('hej')
    console.log(
      given_name.value + " " + family_name.value,
      email.value)

  }

  const onCloseClick = () => {
    props.onClose();
    setSentInterest('')
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
        {sentInterest === 'hej' ?
          <>
            <IconButton aria-label="close" className={s.closeButton} onClick={onCloseClick}>
              <CloseIcon />
            </IconButton>
            <DialogTitle id="dialog-title" className={s.title}>
              Tack!
            </DialogTitle>
            <DialogContent>
              <div className={s.dialogContent}>
                <Typography>
                  Intresseförfrågan har gått iväg. 
                  Din konstkoordinator kommer kontakta dig inom kort för att berätta mer.
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
                  onClick={submit}>
                  Stäng
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
              Bli månadens konstnär
            </DialogTitle>
            <DialogContent>
              <div className={s.dialogContent}>
                <Typography>
                  Som månadens konstnär blir du disponerad på startsidan under fliken månandes konstnär.
                  Är du intresserad att synliggöra ditt konstnärskap mer, klicka dig vidare så kontaktar din konstkoordinator dig inom kort.
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
                  Fortsätt
                </Button>
              </div>
            </DialogContent>
          </>
        }
      </Dialog>
    </div>
  );
}
