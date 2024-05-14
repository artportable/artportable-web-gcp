import React, { useState, useEffect } from 'react'
import Typography from "@material-ui/core/Typography";
import EmblaCarousel from "./Embla/EmblaCarousel"
import {
  findFirstFramedImage,
  findFirstNotFramedImage,
} from '../../utils/imageUtils'
import { getRandomSequentialIndexes } from "../../utils/layoutUtils";
import SELECTED_PRINTS from "../../../data/selectedPrintsData";

type Data = {
  forDesktop: boolean,
}

export default function SelectedprintsCarousel(props) {
  const { forDesktop } = props

  const [printsIndexes, setPrintIndexes] = useState<number[]>([])
    const maxPrintCount = 10
    useEffect(() => {
      if (printsIndexes.length > 0) return;
      // Decide randomly which prints to show in carousel.
      const randomIndexes = getRandomSequentialIndexes(SELECTED_PRINTS.length, maxPrintCount)
      setPrintIndexes(randomIndexes)
    }, [])
    
    const randomPrints = printsIndexes.map(index => SELECTED_PRINTS[index])
    const printsDataForCarousel = formatAwArtworkForEmbla(randomPrints)
  
    return (
      <div>
      <EmblaCarousel
        slides={printsDataForCarousel}
        options={{
          align: 'start',
          loop: true,
        }}
        autoPlay={true}
        forDesktop={forDesktop}
        useDynamicSlideWidth={false}
        externalLink={true}
        />
    </div>
  )
}

const formatAwArtworkForEmbla = (prints) => {
  const formatted = []
  prints.forEach(print => {
    const artworkImage = findFirstFramedImage(print.images)
    const environmentImage = findFirstNotFramedImage(print.images)
    const imageSrc = artworkImage.src
    const thumbnailSrc = ''
    const hoverSrc = environmentImage.src
    const artistName = print.artistMod ? print.artistMod.name : print.artistName
    
    const hoverOverlayContent = (
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
          { print.title }
        </Typography>
        <Typography
          variant="body1"
          style={{
            color: 'white',
          }}>
          { artistName }
        </Typography>
      </div>
    )
    
    if (artworkImage) {
      formatted.push({
        imageSrc,
        thumbnailSrc,
        hoverSrc,
        artistName,
        hoverOverlayContent,
        width: artworkImage.width,
        height: artworkImage.height,
        hoverCenter: environmentImage.center,
        title: print.title,
        linkURL: `https://selectedprints.se/print/${print.slug}`,
      })
    }
  })

  return formatted
}