import React, { useState, useEffect } from 'react'
import Button from "@material-ui/core/Button"
import { useTranslation } from "next-i18next";
import clsx from 'clsx'
import EmblaCarousel from "./Embla/EmblaCarousel"
import LikeButton from '../Button/LikeButton'
import PLACEHOLDER_ARTWORKS, { PLACEHOLDER_ARTWORKS_STAGING } from "../../../data/rocketPlaceholderArtworks";
import { styles } from './rocketcarousel.css'
import { styles as sharedStyles } from "../../../styles/shared.css";

type Data = {
  forDesktop: boolean,
  containerStyle?: any,
  // artists: Artist[],
}

export default function RocketCarousel(props: Data) {
  // const [artists, setArtists] = useState<Artist[]>([])
  // const [artworks, setArtworks] = useState<Artwork[]>([])
  const [artworks, setArtworks] = useState([])
  const { forDesktop, containerStyle = {} } = props
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { t } = useTranslation(["common"]);
  const s = styles();
  const sShared = sharedStyles();


  const fetchData = async () => {
    const pageUrl = process.env.NEXT_PUBLIC_URL
    let newData = [];

    if (pageUrl === 'http://localhost:3000') {
      // Fetch ten random unsold artworks until we can fetch rocker artworks.
      const response = await fetch(`${apiBaseUrl}/api/Discover/artworks/unsold`);
      newData = await response.json();
    } else if (pageUrl === 'https://beta.artportable.com') {
      newData = PLACEHOLDER_ARTWORKS_STAGING;
    } else if (pageUrl === 'https://artportable.com') {
      newData = PLACEHOLDER_ARTWORKS;
    }

    const formattedArtworks = formatApArtworkForEmbla(newData, s, sShared, t)

    setArtworks(formattedArtworks)
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (artworks.length < 1) return null

  return (
    <div style={containerStyle}>
      <EmblaCarousel
        slides={artworks}
        options={{
          align: 'start',
          loop: true,
        }}
        autoPlay={true}
        useDynamicSlideWidth={true}
        forDesktop={props.forDesktop}
      />
    </div>
  )
}

const formatApArtworkForEmbla = (items, s, sShared, t) => {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const formatted = []

  items.forEach(item => {
    const overlayContent = (
      <div className={s.rocketOverlay}>
        <div className={s.rocketIcon}>
          <img
            src="/rocket-white.png"
            alt="Rocket Icon"
          />
        </div>
        <div className={s.likeButton}>
          <LikeButton
            content={{
              Item: item,
            }}
          />
        </div>
        <div className={s.seeMoreButton + ' displayOnHover'}>
          <Button className={clsx(sShared.smallButton, sShared.yellowButton, sShared.buttonShadow)}>{(t("common:seeMore"))}</Button>
        </div>
      </div>
    )

    formatted.push({
      overlayContent,
      imageSrc: `${bucketUrl}${item.PrimaryFile.Name}`,
      thumbnailSrc: '',
      hoverSrc: '',
      width: item.PrimaryFile.Width,
      height: item.PrimaryFile.Height,
      hoverCenter: 'center',
      artistName: '',
      title: item.Title,
      linkURL: `/art/${item.Id}`,
      roundedCorners: true,
    })
  })

  return formatted
}