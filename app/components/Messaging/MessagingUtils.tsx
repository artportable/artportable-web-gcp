import { Avatar } from "@material-ui/core";
import React from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from "./messagingUtils.css";

export const ChatAvatar = ({ image }: {image: string }) => {
  const s = styles();

  if (image) {
    return <Avatar src={`${image}`}
      alt="Profile picture"
      className={s.avatar}
    />
   } else {
    return (
      <Avatar className={s.avatar}>
        <AccountCircleIcon style={{ fontSize: 48 }} color="secondary"></AccountCircleIcon>
      </Avatar>
    )
  }
}
