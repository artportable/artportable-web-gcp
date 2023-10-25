import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import { styles } from "./discoverArtistCard.css";
import { useTranslation } from "next-i18next";
import AvatarCard from "../AvatarCard/AvatarCard";
import Paper from "@material-ui/core/Paper";
import clsx from 'clsx'
import { useRef } from "react";
import { normalizeImageSize } from "../../utils/layoutUtils";
import { useMainWidth } from "../../hooks/useWidth";
import { useStore } from "react-redux";
import { UserContext } from "../../contexts/user-context";

export default function DiscoverArtistCard({ artist, onFollowClick }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const scrollRef = useRef(null);


  const images = artist.Artworks?.map(a => ({
    ...normalizeImageSize(a.PrimaryFile),
    id: a.Id,
    title: a.Title
  }));

  return (
    <div className={s.container}>
      <div className={s.header}>
        <AvatarCard artist={artist} onFollowClick={onFollowClick}></AvatarCard>
      </div>
      <div className={s.scrollContainer}>
        <div ref={scrollRef} className={clsx(s.row, s.scroll, s.rowFlex)}>
          {images && images.length > 0 && (
            <div className={clsx(s.rowFlex)}>
              <Paper key={images[0].Name} className={s.imagePaper} variant="outlined">
                <Link href={`/art/${images[0].id}`}>
                  <a>
                    <img
                      className={s.image}
                      src={`${bucketUrl}${images[0].Name}`}
                      alt={images[0].title}
                      width={images[0].Width}
                      height={images[0].Height}
                    />
                  </a>
                </Link>
              </Paper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}