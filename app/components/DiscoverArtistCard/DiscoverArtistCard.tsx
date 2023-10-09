import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import { styles } from "./discoverArtistCard.css";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";
import { capitalizeFirst } from "../../utils/util";
import AvatarCard from "../AvatarCard/AvatarCard";
import Paper from "@material-ui/core/Paper";
import clsx from 'clsx'
import { useRef } from "react";
import { IconButton, Theme, useTheme } from "@material-ui/core";
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { normalizeImageSize } from "../../utils/layoutUtils";
import { useMainWidth } from "../../hooks/useWidth";
import { useStore } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../utils/googleAnalytics'
import { UserContext } from "../../contexts/user-context";

export default function DiscoverArtistCard({ artist, onFollowClick }) {
  const { t } = useTranslation(['common', 'discover']);
  const mainWidth = useMainWidth().regular;
  const s = styles();
  const store = useStore();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const scrollRef = useRef(null);
  const scrollBy = mainWidth / 1.5;

  const [isFollowed, setFollow] = useState(artist.FollowedByMe);
  const images = artist.Artworks.map(a => ({
    ...normalizeImageSize(a.PrimaryFile),
    id: a.Id,
    title: a.Title
  }));
  const { isSignedIn } = useContext(UserContext);

  function toggleFollow() {
    onFollowClick(artist.SocialId, !isFollowed);
    setFollow(!isFollowed);
    console.log(artist.SocialId);
  }
  useEffect(() => {
    setFollow(artist.FollowedByMe);
  }, [artist.FollowedByMe]);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <AvatarCard user={artist}></AvatarCard>
        {isSignedIn &&
          <Button
            size="small"
            variant={!isFollowed ? "contained" : "outlined"}
            color="primary"
            startIcon={!isFollowed ? <AddIcon /> : null}
            disableElevation
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
      </div>
      <div className={s.scrollContainer}>
        <div ref={scrollRef} className={clsx(s.row, s.scroll, s.rowFlex)}>
          {images.map((image, i) =>
            <div className={clsx(s.rowFlex)} key={i}>
              <Paper key={image.Name} className={s.imagePaper} variant="outlined">
                <Link href={`/art/${image.id}`}>
                  <a>
                    <img className={s.image} src={`${bucketUrl}${image.Name}`}
                      alt={image.title}
                      width={image.Width}
                      height={image.Height}
                    />
                  </a>
                </Link>
              </Paper>
            </div>
          )}
        </div>
        <IconButton  aria-label="close" className={s.leftButton} color="primary" onClick={() => {
          scrollRef.current.scrollBy({ top: 0, left: -scrollBy, behavior: 'smooth' });
        }}>
          <ChevronLeftOutlinedIcon className={s.chevron}></ChevronLeftOutlinedIcon>
        </IconButton>
        <IconButton className={s.rightButton} color="primary" onClick={() => {
          scrollRef.current.scrollBy({ top: 0, left: scrollBy, behavior: 'smooth' });
        }}>
          <ChevronRightOutlinedIcon className={s.chevron}></ChevronRightOutlinedIcon>
        </IconButton>
      </div>
    </div>
  );
}
