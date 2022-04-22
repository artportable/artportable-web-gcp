import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import ManageSubscriptions from "./ManageSubscriptions";
import CloseIcon from '@material-ui/icons/Close';

import { styles } from './manageSubscriptionsDialog.css'

interface Props {
  openContact: any;
  handleClose(): any;
}

export default function ManageSubscriptionsDialog(props:Props) {
  const s = styles();
  const { t } = useTranslation(['header', 'common', 'support']);


  return (
    <div>
      <Dialog
        open={props.openContact}
        onClose={props.handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <IconButton aria-label="close" className={s.closeButton} onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="dialog-title" className={s.title}>Hantera ditt abonnemang</DialogTitle>
        <DialogContentText className={s.dialogText}>
            Fyll i din epost och beskriv hur du vill hantera ditt abonnemang.
          </DialogContentText>
        <DialogContent>
          <ManageSubscriptions />
        </DialogContent>
      </Dialog>
    </div>
  );
}
