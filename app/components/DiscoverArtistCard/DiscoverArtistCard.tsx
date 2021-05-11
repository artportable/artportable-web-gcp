import React, { useState } from "react";
import { styles } from "./discoverArtistCard.css";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";
import { capitalizeFirst } from "../../utils/util";
import Image from 'next/image';
import AvatarCard from "../AvatarCard/AvatarCard";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
import { useGetRows } from "../../hooks/dataFetching/Artworks";
import clsx from 'clsx'

export default function DiscoverArtistCard({ artist, onFollowClick }) {
  const { t } = useTranslation(['common', 'discover']);
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  const [isFollowed, setFollow] = useState(artist.FollowedByMe);
  const rows = useGetRows(artist.Artworks, 200);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <AvatarCard user={artist}></AvatarCard>
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
      </div>

      <div className={clsx(s.row, s.scroll, s.rowFlex)}>
        {rows.map((row, i) =>
          <div className={clsx(s.rowFlex)} key={i}>
            {row.map(artwork =>
              <Paper className={s.imagePaper} variant="outlined">
                <Image src={`${bucketUrl}${artwork.artwork.Name}`}
                  priority={true}
                  key={artwork.artwork.Name}
                  alt="Portfolio image"
                  width={artwork.width}
                  height={artwork.height}
                />
              </Paper>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
