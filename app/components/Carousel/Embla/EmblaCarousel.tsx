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
  useDynamicSlideWidth: boolean
  forDesktop: boolean
}

type Slide = {
  imageSrc: string,
  thumbnailSrc: string,
  hoverSrc: string,
  width: number,
  height: number,
  hoverCenter: string,
  overlayContent: React.ReactElement,
  hoverOverlayContent: React.ReactElement,
  artistName: string,
  title: string,
  linkURL: string,
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, useDynamicSlideWidth = false, forDesktop } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
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
              [s.dynamic_width]: useDynamicSlideWidth,
              [s.embla__slide__desktop]: forDesktop,
            })} key={index}>
              <a href={slide.linkURL} target="_blank">
                <div className={s.embla__slide__image}>
                  {/*
                    If we want to use slide.thumbnailSrc as src, but fall back to imageSrc if thumbnail fails:
                    onError={elem => (elem.target as HTMLImageElement).src = slide.imageSrc}
                  */}
                  <div className={s.image__container}>
                    <img
                      className={s.image__element}
                      src={slide.imageSrc}
                      alt={slide.artistName}
                      />
                    { slide.overlayContent &&
                        <div className={s.overlay_content}>
                          {slide.overlayContent}
                        </div>
                    }
                  </div>
                  { slide.hoverSrc &&
                    <div className={s.hover__image}>
                      <Image
                        src={slide.hoverSrc}
                        layout="fill"
                        priority={false}
                        objectPosition={convertImagePosition(slide.hoverCenter)}
                        alt=""
                      />
                    </div>
                  }
                  { slide.hoverOverlayContent &&
                    <div className={s.hover__overlay_content}>
                      {slide.hoverOverlayContent}
                    </div>
                  }
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

export default EmblaCarousel
