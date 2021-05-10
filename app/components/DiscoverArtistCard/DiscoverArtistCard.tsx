import React, { useState } from "react";
import { styles } from "./discoverArtistCard.css";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";
import { capitalizeFirst } from "../../utils/util";
import Image from 'next/image';
import AvatarCard from "../AvatarCard/AvatarCard";
import Carousel from "react-material-ui-carousel";

export default function DiscoverArtistCard({ artist, onFollowClick }) {
  const { t } = useTranslation(['common', 'discover']);
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  const [isFollowed, setFollow] = useState(artist.FollowedByMe);

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

      <Carousel
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={false}
        autoPlay={false}
        timeout={100}
        navButtonsProps={{
          className: s.navButtons,
          style: null
        }}
      >
        {artist.Artworks.map(aw =>
          <Image src={`${bucketUrl}${aw.Name}`}
            key={aw.Name}
            alt="Portfolio image"
            height="200"
            width={(200 / aw.Height) * aw.Width}
          />
        )}
      </Carousel>
    </div>
  );
}
