import React, { useCallback } from 'react'
import Image from 'next/image'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import Typography from "@material-ui/core/Typography";
import { findFirstFramedImage, findFirstNotFramedImage, convertImagePosition } from '../../../utils/imageUtils'
import clsx from 'clsx'
import { styles } from './embla.module.css'

type PropType = {
  slides: Slide[]
  options?: EmblaOptionsType
  forDesktop: boolean
}

type Slide = {
  imageSrc: string,
  thumbnailSrc: string,
  hoverSrc: string,
  width: number,
  height: number,
  hoverCenter: string,
  artistName: string,
  title: string,
  linkURL: string,
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, forDesktop } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
  // const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const s = styles()

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className={s.embla}>
      <div className={s.embla__viewport} ref={emblaRef}>
        <div className={s.embla__container}>
          {slides.map((slide, index) => (
            <div className={clsx(s.embla__slide, {
              [s.embla__slide__desktop]: forDesktop,
            })} key={index}>
              <a href={slide.linkURL} target="_blank">
                <div className={s.embla__slide__image}>
                  {/*
                    If we want to use slide.thumbnailSrc as src, but fall back to imageSrc if thumbnail fails:
                    onError={elem => (elem.target as HTMLImageElement).src = slide.imageSrc}
                  */}
                  <img
                    className={s.image__element}
                    src={slide.imageSrc}
                    alt={slide.artistName}
                    />
                  <div className={s.hover__image}>
                    {slide.hoverSrc &&
                      <Image
                        src={slide.hoverSrc}
                        layout="fill"
                        priority={false}
                        objectPosition={convertImagePosition(slide.hoverCenter)}
                        alt=""
                      />
                    }
                    <div className={s.hover__overlay}>
                      <Typography
                        variant="body2"
                        style={{
                          color: 'white',
                          // paddingBottom: '10px',
                        }}>
                        { slide.title }
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{
                          color: 'white',
                          // paddingBottom: '10px',
                        }}>
                        { slide.artistName }
                      </Typography>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={s.embla__controls}>

        <div className={s.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={clsx(s.embla__dot, {
                [s.embla__dot__selected]: index === selectedIndex,
              })}
            />
          ))}
        </div>
      </div>
      
      {forDesktop &&
        <>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </>
      }
    </section>
  )
}

const formatApArtworkForEmbla = (prints) => {
  const formatted = []
  // prints.forEach(print => {
  //   const artworkImage = findFirstFramedImage(print.images)
  //   const environmentImage = findFirstNotFramedImage(print.images)
  //   const imageSrc = artworkImage.src
  //   const thumbnailSrc = ''
  //   const hoverSrc = environmentImage.src
    
    
  //   if (artworkImage && environmentImage) {
  //     formatted.push({
  //       imageSrc,
  //       thumbnailSrc,
  //       hoverSrc,
  //       width: artworkImage.width,
  //       height: artworkImage.height,
  //       hoverCenter: environmentImage.center,
  //       artistName: print.artistMod ? print.artistMod.name : print.artistName,
  //       title: print.title,
  //       linkURL: `https://selectedprints.se/print/${print.slug}`,
  //     })
  //   }
  // })

  return formatted
}

const formatAwArtworkForEmbla = (prints) => {
  const formatted = []
  prints.forEach(print => {
    const artworkImage = findFirstFramedImage(print.images)
    const environmentImage = findFirstNotFramedImage(print.images)
    const imageSrc = artworkImage.src
    const thumbnailSrc = ''
    const hoverSrc = environmentImage.src
    
    
    if (artworkImage && environmentImage) {
      formatted.push({
        imageSrc,
        thumbnailSrc,
        hoverSrc,
        width: artworkImage.width,
        height: artworkImage.height,
        hoverCenter: environmentImage.center,
        artistName: print.artistMod ? print.artistMod.name : print.artistName,
        title: print.title,
        linkURL: `https://selectedprints.se/print/${print.slug}`,
      })
    }
  })

  return formatted
}

export default EmblaCarousel
export { formatAwArtworkForEmbla, formatApArtworkForEmbla }
