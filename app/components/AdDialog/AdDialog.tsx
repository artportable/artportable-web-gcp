import { useState, useContext, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { useTranslation } from 'next-i18next'
import ZendeskFormMenu from "../ZendeskFormMenu/ZendeskFormMenu";
import CloseIcon from '@material-ui/icons/Close';
import { UserContext } from "../../contexts/user-context";
import { zapierMonthlyInterest } from "../../utils/zapierLead";

import { styles } from './adDialog.css'
import Button from "../Button/Button";

interface Props {
  openAdDialog: any;
  setOpenAdDialog: any
  onClose(): any;

}

export default function AdDialog(props: Props) {
  const s = styles();
  const { t } = useTranslation(['profile']);


  const onCloseClick = () => {
    props.onClose();
  }
 
  return (
    <div>
      <Dialog
      className={s.dialog}
        open={props.openAdDialog}
        onClose={onCloseClick}
      // aria-labelledby="dialog-title"
      // aria-describedby="dialog-description"
      >
            {/* <IconButton aria-label="close" className={s.closeButton} onClick={onCloseClick}>
              <CloseIcon />
            </IconButton> */}

            <iframe className={s.videoFrame} src="https://player.vimeo.com/video/708144642?h=6eb4ca476d&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allowFullScreen title="Artportable commercial"></iframe>

      </Dialog>
    </div>
  );
}

