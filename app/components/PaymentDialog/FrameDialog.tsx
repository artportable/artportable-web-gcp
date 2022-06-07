import { useState, useContext } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import ZendeskFormMenu from "../ZendeskFormMenu/ZendeskFormMenu";
import CloseIcon from '@material-ui/icons/Close';
import { UserContext } from "../../contexts/user-context";
import { zapierMonthlyInterest } from "../../utils/zapierLead";

import { styles } from './premiumDialog.css'
import Button from "../Button/Button";
import PaymentFrame from "../Payments/PaymentFrame";

interface Props {
  open: any;
  onClose(): any;

}

export default function FrameDialog(props: Props) {
  const s = styles();


  const onCloseClick = () => {
    props.onClose();
  }

  return (
    <div>
      <Dialog
        className={s.dialog}
        open={props.open}
        onClose={onCloseClick}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        disableScrollLock={true}
      >
        <IconButton aria-label="close" className={s.closeButton} onClick={onCloseClick}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <PaymentFrame />
        </DialogContent>
      </Dialog>
    </div>
  );
}