import React, { useState } from "react";
import { styles } from "./discoverArtistCard.css";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";
import { capitalizeFirst } from "../../utils/util";
import AvatarCard from "../AvatarCard/AvatarCard";
import Paper from "@material-ui/core/Paper";
import clsx from 'clsx'
import { useRef } from "react";
import { IconButton, Theme, useTheme, Link } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { normalizeImageSize } from "../../utils/layoutUtils";
import { useMainWidth } from "../../hooks/useWidth";
import { useStore } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../utils/googleAnalytics'

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
    ...normalizeImageSize(a.PrimaryFile, 200),
    id: a.Id,
    title: a.Title
  }));
  const isSignedIn = store.getState()?.user?.isSignedIn;

  function toggleFollow() {
    onFollowClick(artist.Username, !isFollowed);
    setFollow(!isFollowed);
  }

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
                  <img src={`${bucketUrl}${image.Name}`}
                    alt={image.title}
                    width={image.Width}
                    height={image.Height}
                  />
                </Link>
              </Paper>
            </div>
          )}
        </div>
        <IconButton className={s.leftButton} color="primary" onClick={() => {
          scrollRef.current.scrollBy({ top: 0, left: -scrollBy, behavior: 'smooth' });
        }}>
          <ChevronLeftIcon className={s.chevron}></ChevronLeftIcon>
        </IconButton>
        <IconButton className={s.rightButton} color="primary" onClick={() => {
          scrollRef.current.scrollBy({ top: 0, left: scrollBy, behavior: 'smooth' });
        }}>
          <ChevronRightIcon className={s.chevron}></ChevronRightIcon>
        </IconButton>
      </div>
    </div>
  );
}
