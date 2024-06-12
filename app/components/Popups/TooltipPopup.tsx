import React, { useState } from 'react'
// import { useTranslation } from 'next-i18next'
// import CloseIcon from "@mui/icons-material/Close";
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import Button from "../Button/Button";
import {
  Dialog,
  DialogContent,
  // IconButton,
} from "@material-ui/core";

export default function TooltipPopup({ isOpen, doClose, content }) {
  return (
    <Dialog open={isOpen} onClose={doClose}>
      <DialogContent>
        {content}
      </DialogContent>
    </Dialog>
  )
}