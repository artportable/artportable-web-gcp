import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import ZendeskFormMenu from "../ZendeskFormMenu/ZendeskFormMenu";
import CloseIcon from '@material-ui/icons/Close';

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

  const submit = () => {
    setSentInterest('hej')
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
      // aria-labelledby="dialog-title"
      // aria-describedby="dialog-description"
      >
        {sentInterest === 'hej' ?
          <>
            <IconButton aria-label="close" className={s.closeButton} onClick={onCloseClick}>
              <CloseIcon />
            </IconButton>
            <DialogTitle id="dialog-title" className={s.title}>
              {t('support:writeToUs')}
            </DialogTitle>
            <DialogContent>
              <div>
                Tackar
              </div>
            </DialogContent>
          </>
          :
          <>
            <IconButton aria-label="close" className={s.closeButton} onClick={onCloseClick}>
              <CloseIcon />
            </IconButton>
            <DialogTitle id="dialog-title" className={s.title}>
              {t('support:writeToUs')}
            </DialogTitle>
            <DialogContent>
              <div>
                Information om produkten.
                Klicka här för att bli kontaktad av din konstkoordinator
                <Button
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
