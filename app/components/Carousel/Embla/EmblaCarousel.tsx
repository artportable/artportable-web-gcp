import React, { useCallback } from "react";
import Image from "next/image";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Typography from "@material-ui/core/Typography";
import {
  findFirstFramedImage,
  findFirstNotFramedImage,
  convertImagePosition,
} from "../../../utils/imageUtils";
import clsx from "clsx";
import { styles } from "./embla.module.css";

type PropType = {
  slides: Slide[];
  options?: EmblaOptionsType;
  autoPlay: boolean;
  useDynamicSlideWidth: boolean;
  forDesktop: boolean;
  externalLink: boolean;
  isStoryCarousel?: boolean;
  dotsVisible?: boolean;
  showArrows?: boolean;
};

type Slide = {
  imageSrc: string;
  thumbnailSrc: string;
  backupSrc?: string;
  hoverSrc: string;
  width: number;
  height: number;
  hoverCenter: string;
  overlayContent: React.ReactElement;
  hoverOverlayContent: React.ReactElement;
  artistName: string;
  title: string;
  linkURL: string;
  roundedCorners?: boolean;
  header?: React.ReactElement;
  footer?: React.ReactElement;
  storyFooter?: React.ReactElement;
  isStory?: boolean;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const {
    slides,
    options,
    autoPlay,
    useDynamicSlideWidth = false,
    forDesktop,
    externalLink = false,
    isStoryCarousel = false,
    dotsVisible = true,
    showArrows = true,
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoPlay ? [Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      playOnInit: false // Only start playing when in viewport
    })] : []
  );
  const s = styles();

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  let slideElements = [];

  if (!isStoryCarousel) {
    slideElements = slides.map((slide, index) => (
      <div
        className={clsx(s.embla__slide, {
          [s.dynamic_width]: useDynamicSlideWidth,
          [s.embla__slide__desktop]: forDesktop,
        })}
        key={index}
      >
        <a href={slide.linkURL} target={externalLink ? "_blank" : "_self"}>
          {/* _self is default */}
          {slide.header && slide.header}
          <div
            className={clsx(s.embla__slide__image, {
              [s.has_footer]: slide.footer,
            })}
          >
            {/*
                If we want to use slide.thumbnailSrc as src, but fall back to imageSrc if thumbnail fails:
                onError={elem => (elem.target as HTMLImageElement).src = slide.imageSrc}
                If we want to use a backup src:
                onError={elem => (elem.target as HTMLImageElement).src = slide.backupSrc || ''}
              */}
            <img
              className={clsx(s.image__element, {
                [s.dynamic_image]: useDynamicSlideWidth,
                [s.rounded__corners]: slide.roundedCorners,
              })}
              src={slide.imageSrc}
              alt={slide.artistName}
            />
            {slide.overlayContent && (
              <div className={s.overlay_content}>{slide.overlayContent}</div>
            )}
            {/* <div className={s.image__container}></div> */}
            {slide.hoverSrc && (
              <div className={s.hover__image}>
                <Image
                  src={slide.hoverSrc}
                  layout="fill"
                  priority={false}
                  objectPosition={convertImagePosition(slide.hoverCenter)}
                  alt=""
                  unoptimized
                />
              </div>
            )}
            {slide.hoverOverlayContent && (
              <div className={s.hover__overlay_content}>
                {slide.hoverOverlayContent}
              </div>
            )}
          </div>
        </a>
        {slide.footer && <div className={s.slide__footer}>{slide.footer}</div>}
      </div>
    ));
  } else if (isStoryCarousel) {
    slideElements = slides.map((slide, index) => (
      <div
        className={clsx(s.embla__slide__story, "has-shadow", {
          [s.dynamic_width]: useDynamicSlideWidth,
          [s.embla__slide__desktopStory]: forDesktop,
        })}
        key={index}
      >
        <a href={slide.linkURL} target={externalLink ? "_blank" : "_self"}>
          {/* _self is default */}
          <div
            style={{
              position: "relative",
              marginTop: 60, // Make room for header.
              marginBottom: 75, // Make room for footer.
            }}
          >
            {slide.header && slide.header}
            <div className={clsx(s.embla__slide__image, "story-image")}>
              {/*
                If we want to use slide.thumbnailSrc as src, but fall back to imageSrc if thumbnail fails:
                onError={elem => (elem.target as HTMLImageElement).src = slide.imageSrc}
                If we want to use a backup src:
                onError={elem => (elem.target as HTMLImageElement).src = slide.backupSrc || ''}
              */}
              <img
                className={clsx(s.image__element, {
                  [s.dynamic_image]: useDynamicSlideWidth,
                  [s.rounded__corners]: slide.roundedCorners,
                })}
                src={slide.imageSrc}
                alt={slide.artistName}
              />
              {slide.overlayContent && (
                <div className={s.overlay_content}>{slide.overlayContent}</div>
              )}
              {slide.hoverSrc && (
                <div className={s.hover__image}>
                  <Image
                    src={slide.hoverSrc}
                    layout="fill"
                    priority={false}
                    objectPosition={convertImagePosition(slide.hoverCenter)}
                    alt=""
                    unoptimized
                  />
                </div>
              )}
              {slide.hoverOverlayContent && (
                <div className={s.hover__overlay_content}>
                  {slide.hoverOverlayContent}
                </div>
              )}
            </div>
            {slide.storyFooter && slide.storyFooter}
          </div>
        </a>
      </div>
    ));
  }

  return (
    <section
      className={clsx(s.embla, {
        [s.emblaForStory]: isStoryCarousel,
      })}
    >
      <div className={s.embla__viewport} ref={emblaRef}>
        <div className={s.embla__container}>{slideElements}</div>
      </div>

      {showArrows && forDesktop && (
        <>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </>
      )}
    </section>
  );
};

export default EmblaCarousel;
