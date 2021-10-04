import { useState, useEffect } from "react";
import Button from '../Button/Button'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { styles } from './dialogConstruction.css'

export default function DialogConstruction() {
  // const s = styles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button rounded size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
        Tekniska problem?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{"Ny plattform"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Vi har nyligen lanserat vår nya plattform. Tyvärr så fungerar inte allt som det är tänkt nu i början, men vi jobbar ständigt med förbättringar, med så väl som uppdateringar av profil, möjlighet att byta användarnamn och förbättrad sökfunktion.
          </DialogContentText>
          <DialogContentText id="dialog-description">
            Vi tar tacksamt emot feedback och frågor på emailadressen: support@artportable.com 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okej
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
