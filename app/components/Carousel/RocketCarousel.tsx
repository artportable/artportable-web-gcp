import React, { useState, useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Typography from "@material-ui/core/Typography";
import EmblaCarousel from "./Embla/EmblaCarousel"
import Artist from '../../models/Artist'
import {Artwork} from '../../models/Artwork'

type Data = {
  forDesktop: boolean,
  // artists: Artist[],
}

export default function RocketCarousel(props: Data) {
  // const [artists, setArtists] = useState<Artist[]>([])
  // const [artworks, setArtworks] = useState<Artwork[]>([])
  const [artworks, setArtworks] = useState([])
  const { forDesktop } = props
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return null
  if (artworks.length < 1) return null

  const fetchData = async () => {
    // const response = await fetch(`${apiBaseUrl}/api/Artists`);
    const response = await fetch(`${apiBaseUrl}/api/Artworks`);
    let newData = await response.json();
    newData = newData.slice(0, 10)
    // newData = newData.slice(2, 3)

    const formattedArtworks = formatApArtworkForEmbla(newData)

    setArtworks(formattedArtworks)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const printsDataForCarousel = []
  // console.log('artists', artists);
  // console.log('artworks', artworks);

  return (
    <div>
      <EmblaCarousel
        slides={artworks}
        options={{
          align: 'start',
          loop: true,
        }}
        useDynamicSlideWidth={false}
        forDesktop={props.forDesktop}
      />
    </div>
  )
}

const formatApArtworkForEmbla = (items) => {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const formatted = []

  /*
    <img
      src="/rocket-white.png"
      alt="Rocket Icon"
      className={s.rocketIcon}
    />
    rocketIcon: {
      padding: "10px",
      maxWidth: "40px",
      width: "100%",
    },
  */
  const overlayContent = (
    <div style={{
      width: '100%',
      height: '100%',
      flexFlow: 'column nowrap',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    }}>
      <Typography
        variant="body2"
        style={{
          color: 'white',
        }}>
        {'Text 1'}
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: 'white',
        }}>
        {'Text 2'}
      </Typography>
    </div>
  )

  items.forEach(item => {
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
    })
  })

  return formatted
}