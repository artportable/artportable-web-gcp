import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from "./messagingUtils.css";

export const ChatAvatar = ({ image }: { image: string }) => {
  const s = styles();

  const [hasImage, setHasImage] = useState(null);

  useEffect(() => {
    if(image)
    {

      const imageValue = image.split('/images/');
      setHasImage((imageValue[1] !== null && imageValue[1] !== undefined));
    }
    else {
      setHasImage(false);
    }
  }, [image]);

  if (hasImage) {
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
