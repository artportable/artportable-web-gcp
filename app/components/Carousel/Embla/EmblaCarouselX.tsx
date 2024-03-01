import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { findFirstFramedImage, findFirstNotFramedImage } from '../../../utils/imageUtils'

interface Slide {
  imageSrc: string,
  hoverSrc: string,
  artistName: string,
  title: string,
  linkURL: string,
}

const EmblaCarousel = ({ data }: { data: Slide[] }) => {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: true })

  const slides = data.map(slide => {
    return (
      <div style={{
        height: '100px',
      }}>
      <img src={slide.imageSrc}
        style={{
          height: 'auto',
          width: 'auto',
          maxHeight: '100%',
          maxWidth: '100%',
        }}
      />,
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 50, .5)',
      }}></div>
    </div>
    )
  })

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        { slides }
      </div>
    </div>
  )
  
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  )
}

const formatAwArtworkForEmbla = (prints) => {
  const formatted = []
  prints.forEach(print => {
    const artworkImage = findFirstFramedImage(print.images)
    const environmentImage = findFirstNotFramedImage(print.images)
    const imageSrc = artworkImage.src
    const hoverSrc = environmentImage.src
    
    if (artworkImage && environmentImage) {
      formatted.push({
        imageSrc,
        hoverSrc,
        artistName: print.artistMod ? print.artistMod.name : print.artistName,
        title: print.title,
        linkURL: `https://selectedprints.se/print/${print.slug}`,
      })
    }
  })

  return formatted
}

export default EmblaCarousel
export { formatAwArtworkForEmbla }
