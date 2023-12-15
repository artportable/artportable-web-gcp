import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "./discoverArtistCard.css";
import { useTranslation } from "next-i18next";
import AvatarCard from "../AvatarCard/AvatarCard";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { useRef } from "react";
import { normalizeImageSize } from "../../utils/layoutUtils";
import { useMainWidth } from "../../hooks/useWidth";
import { useStore } from "react-redux";
import { UserContext } from "../../contexts/user-context";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";

export default function DiscoverArtistCard({ artist, onFollowClick }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  useEffect(() => {
    console.log(artist);
  }, []);

  return (
    <div>
      <Paper variant="outlined" className={s.card}>
        <AvatarCard artist={artist} onFollowClick={onFollowClick}></AvatarCard>
        <Link href={`/profile/@${artist?.Username}`}>
          <a>
            <div className={s.imageGrid}>
              {artist.Artworks[0] && (
                <div className={s.first}>
                  <Image
                    className={s.image}
                    src={`${bucketUrl}${artist.Artworks[0].PrimaryFile.Name}`}
                    alt="Portfolio image"
                    layout="fill"
                    quality={20}
                  />
                </div>
              )}
              {artist.Artworks[1] && (
                <div className={s.second}>
                  <Image
                    className={s.image}
                    src={`${bucketUrl}${artist.Artworks[1].PrimaryFile.Name}`}
                    alt="Portfolio image"
                    layout="fill"
                    quality={20}
                  />
                </div>
              )}
              {artist.Artworks[2] && (
                <div className={s.third}>
                  <Image
                    className={s.image}
                    src={`${bucketUrl}${artist.Artworks[2].PrimaryFile.Name}`}
                    alt="Portfolio image"
                    layout="fill"
                    quality={20}
                  />
                </div>
              )}
              {artist.Artworks[3] && (
                <div className={s.forth}>
                  <Image
                    className={s.image}
                    src={`${bucketUrl}${artist.Artworks[3].PrimaryFile.Name}`}
                    alt="Portfolio image"
                    layout="fill"
                    quality={20}
                  />
                </div>
              )}
              {artist.Artworks[4] && (
                <div className={s.fifth}>
                  <Image
                    className={s.image}
                    src={`${bucketUrl}${artist.Artworks[4].PrimaryFile.Name}`}
                    alt="Portfolio image"
                    layout="fill"
                    quality={20}
                  />
                </div>
              )}
            </div>
          </a>
        </Link>
      </Paper>
    </div>
  );
}
