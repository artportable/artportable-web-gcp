import React from "react";
import Link from 'next/link'
import { Avatar } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { styles } from "./avatarCard.css";
import { useTranslation } from "next-i18next";
import { capitalizeFirst } from "../../utils/util";


export default function AvatarCard({ user }) {
  const { t } = useTranslation(['tags']);
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <Link href={`/profile/@${user.Username}`}>
    <a style={{ textDecoration: 'none', color: 'black' }}>
      <div className={s.container}>
        <div className={s.text}>
          <span className={s.username}>{`${user.Name.toUpperCase()} ${user.Surname.toUpperCase()}`} 
          <img
              src="/Artportable_Emblem_Gold.svg"
              alt="Logo Artportable"
              className={s.emblem}
            />
          </span>
          <span style={{fontSize: "18px"}}>{user.Location}</span>
        </div>
      </div>
    </a>
  </Link>
  );
}