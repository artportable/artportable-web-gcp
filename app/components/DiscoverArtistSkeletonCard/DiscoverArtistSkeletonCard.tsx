import React from "react";
import { styles } from "./discoverArtistSkeletonCard.css";
import { useTranslation } from "next-i18next";
import Paper from "@material-ui/core/Paper";
import clsx from 'clsx'
import { Avatar } from "@material-ui/core";
import { normalizeImageSize } from "../../utils/layoutUtils";
import { useMainWidth } from "../../hooks/useWidth";
import { Skeleton } from "@material-ui/lab";

export default function DiscoverArtistSkeletonCard() {
  const s = styles();


  const skeletonImages = [
    {
      Name: "Skeleton1",
      Width: 16,
      Height: 9
    },
    {
      Name: "Skeleton2",
      Width: 4,
      Height: 3
    },
    {
      Name: "Skeleton2",
      Width: 9,
      Height: 16
    },
    {
      Name: "Skeleton4",
      Width: 4,
      Height: 3
    },
    {
      Name: "Skeleton5",
      Width: 16,
      Height: 9
    },
  ]

  const images = skeletonImages.map(i => normalizeImageSize(i, 200));


  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.avatarContainer}>
          <Skeleton variant="circle">
            <Avatar className={s.avatar} />
          </Skeleton>
          <div className={s.text}>
            <Skeleton variant="text" width={40}></Skeleton>
            <Skeleton variant="text" width={70}></Skeleton>
            <Skeleton variant="text" width={150}></Skeleton>
          </div>
        </div>
      </div>
      <div className={s.scrollContainer}>
        <div className={clsx(s.row, s.scroll, s.rowFlex)}>
          {images.map((image, i) =>
            <div className={clsx(s.rowFlex)} key={i}>
              <Paper key={image.Name} className={s.imagePaper} variant="outlined">
                <Skeleton variant="rect" width={image.Width} height={image.Height} />
              </Paper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
