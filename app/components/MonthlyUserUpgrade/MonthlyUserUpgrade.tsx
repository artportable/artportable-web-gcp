import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import ZendeskFormMenu from "../ZendeskFormMenu/ZendeskFormMenu";
import CloseIcon from '@material-ui/icons/Close';

import { styles } from './monthlyUserUpgrade.css'
import Button from "../Button/Button";

interface Props {
  openContact: any;
  handleClose(): any;
  submitInterest(): any
  sentInterest: any
  closeInterest(): any
}

export default function DialogMonthlyUser(props: Props) {
  const s = styles();
  const { t } = useTranslation(['header', 'common', 'support']);


  return (
    <div>
      <Dialog
        open={props.openContact}
        onClose={() => { props.handleClose(); props.closeInterest(); }}
      // aria-labelledby="dialog-title"
      // aria-describedby="dialog-description"
      >
        {!props.sentInterest ?
          <>
            <IconButton aria-label="close" className={s.closeButton} onClick={() => { props.handleClose(); props.closeInterest(); }}>
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
                  onClick={props.submitInterest()}>
                  Fortsätt
                </Button>
              </div>
            </DialogContent>
          </>
          :
          <>
            <IconButton aria-label="close" className={s.closeButton} onClick={() => { props.handleClose(); props.closeInterest(); }}>
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
        }
      </Dialog>
    </div>
  );
}
