import React, { useState } from "react";
import { styles } from "./discoverArtistCard.css";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";
import { capitalizeFirst } from "../../utils/util";
import Image from 'next/image';
import AvatarCard from "../AvatarCard/AvatarCard";
import Paper from "@material-ui/core/Paper";
import clsx from 'clsx'
import { useRef } from "react";
import { IconButton, Theme, useTheme } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { normalizeImageSize } from "../../utils/layoutUtils";
import { useMainWidth } from "../../hooks/useWidth";
import { useStore } from "react-redux";

export default function DiscoverArtistCard({ artist, onFollowClick }) {
  const { t } = useTranslation(['common', 'discover']);
  const mainWidth = useMainWidth().regular;
  const s = styles();
  const store = useStore();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;

  const scrollRef = useRef(null);
  const scrollBy = mainWidth / 1.5;

  const [isFollowed, setFollow] = useState(artist.FollowedByMe);
  const images = artist.Images.map(i => normalizeImageSize(i, 200));
  const isSignedIn = store.getState()?.user?.isSignedIn;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <AvatarCard user={artist}></AvatarCard>
        {isSignedIn &&
          <Button
            size="small"
            variant="contained"
            color="primary"
            disabled={isFollowed}
            disableElevation
            rounded
            className={s.button}
            onClick={() => {
              onFollowClick(artist.Username);
              setFollow(true);
            }}>
              {capitalizeFirst(t('common:words.follow'))}
          </Button>
        }
      </div>
      <div className={s.scrollContainer}>
        <div ref={scrollRef} className={clsx(s.row, s.scroll, s.rowFlex)}>
          {images.map((image, i) =>
            <div className={clsx(s.rowFlex)} key={i}>
              <Paper key={image.Name} className={s.imagePaper} variant="outlined">
                <img src={`${bucketUrl}${image.Name}`}
                  alt="Portfolio image"
                  width={image.Width}
                  height={image.Height}
                />
              </Paper>
            </div>
          )}
        </div>
        <IconButton className={s.leftButton} color="primary" onClick={() => {
            scrollRef.current.scrollBy({ top: 0, left: -scrollBy, behavior: 'smooth'});
          }}>
            <ChevronLeftIcon className={s.chevron}></ChevronLeftIcon>
        </IconButton>
        <IconButton className={s.rightButton} color="primary" onClick={() => {
            scrollRef.current.scrollBy({ top: 0, left: scrollBy, behavior: 'smooth'});
          }}>
          <ChevronRightIcon className={s.chevron}></ChevronRightIcon>
        </IconButton>
      </div>
    </div>
  );
}
