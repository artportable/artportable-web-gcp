import React, { useContext, useState } from "react";
import Link from 'next/link'
import { Avatar } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { styles } from "./avatarCard.css";
import { useTranslation } from "next-i18next";
import { capitalizeFirst } from "../../utils/util";

import AddIcon from '@material-ui/icons/Add';
import Button from "../Button/Button";
import { UserContext } from "../../contexts/user-context";
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../utils/googleAnalytics'

export default function AvatarCard({ artist, onFollowClick }) {
  const { t } = useTranslation(['tags']);
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const { isSignedIn } = useContext(UserContext);
  const [isFollowed, setFollow] = useState(artist.FollowedByMe);
  function toggleFollow() {
    onFollowClick(artist.SocialId, !isFollowed);
    setFollow(!isFollowed);
    console.log(artist.SocialId);
  }

  return (
    <Link href={`/profile/@${artist.Username}`}>
      <a style={{ textDecoration: 'none', color: 'black' }}>
        <div className={s.container}>
          <div className={s.text}>
            <span className={s.username}>{`${artist.Name.toUpperCase()} ${artist.Surname.toUpperCase()}`}
              <img
                src="/Artportable_Emblem_Gold.svg"
                alt="Logo Artportable"
                className={s.emblem}
              />
            </span>
            <span
              style={{ fontSize: "18px" }}>{artist.Location}
              {isSignedIn &&
                <Button
                  size="small"
                  variant={!isFollowed ? "contained" : "outlined"}

                  startIcon={!isFollowed ? <AddIcon /> : null}
                  rounded
                  className={s.button}
                  onClick={() => { toggleFollow(); trackGoogleAnalytics(ActionType.FOLLOW_DISCOVER, CategoryType.INTERACTIVE); }}>
                  {capitalizeFirst(
                    !isFollowed ?
                      t('common:words.follow') :
                      t('common:words.following')
                  )}
                </Button>
              }
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}