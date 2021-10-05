import { useState, useEffect } from "react";
import Button from '../Button/Button'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'next-i18next'

import { styles } from './dialogConstruction.css'

export default function DialogConstruction() {
  const s = styles();
  const { t } = useTranslation(['header', 'common']);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <div className={s.technicalDiv}>
      <Button rounded size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
      {t('header:technicalButton')}
      </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{t('header:technicalHeading')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
          {t('header:technicalText')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
          {t('common:words:close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
