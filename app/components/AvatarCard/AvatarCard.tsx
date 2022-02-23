import React from "react";
import { Avatar, Link } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { styles } from "./avatarCard.css";
import { useTranslation } from "next-i18next";
import { capitalizeFirst } from "../../utils/util";


export default function AvatarCard({ user }) {
  const { t } = useTranslation(['tags']);
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <Link href={`/profile/@${user.Username}`} style={{ textDecoration: 'none', color: 'black' }}>
      <div className={s.container}>
        {user?.ProfilePicture ? (
          <Avatar src={`${bucketUrl}${user?.ProfilePicture}`}
            alt="Profile picture"
            className={s.avatar}
          />
        ) : (
          <Avatar className={s.avatar}>
            <AccountCircleIcon style={{ fontSize: 72 }} color="secondary"></AccountCircleIcon>
          </Avatar>
        )}
        <div className={s.text}>
          <span className={s.username}>{user.Username}</span>
          <span>{user.Location}</span>
          {user?.Tags &&
            <span>{user.Tags.map(tag => capitalizeFirst(t(tag))).join(', ')}</span>
          }
        </div>
        {user.MonthlyArtist &&
          <div>
            <img
              src="/Artportable_Emblem_Gold.svg"
              alt="Logo Artportable"
              className={s.emblem}
            />
          </div>
        }
      </div>
    </Link>
  );
}