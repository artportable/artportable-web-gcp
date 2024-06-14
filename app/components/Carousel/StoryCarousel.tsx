import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useTranslation } from "next-i18next";
import { parseISO } from "date-fns";
import clsx from "clsx";
import EmblaCarousel from "./Embla/EmblaCarousel";
// import LikeButton from "../Button/LikeButton";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { Story } from "../../models/Story";
import { styles } from "./storycarousel.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
("");

type Data = {
  forDesktop: boolean;
  containerStyle?: any;
};

export default function StoryCarousel(props: Data) {
  const { forDesktop, containerStyle = {} } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { t } = useTranslation(["common"]);
  const s = styles();
  const sShared = sharedStyles();
  const loadMoreArtworksElementRef = useRef(null);

  const { data: stories, isLoading: isLoadingStories } =
    useInfiniteScrollWithKey<Story>(
      loadMoreArtworksElementRef,
      (pageIndex, previousPageData) => {
        if (pageIndex == 0) {
          let url = new URL(`${apiBaseUrl}/api/discover/stories/boosted`);

          url.searchParams.append("page", (pageIndex + 1).toString());
          url.searchParams.append("pageSize", "100");
          return url.href;
        }
        return previousPageData.next;
      }
    );

  if (stories.length < 1) return null;

  const formattedSlides = formatStoryForEmbla(
    stories,
    s,
    sShared,
    t,
    forDesktop
  );

  return (
    <div style={containerStyle}>
      <EmblaCarousel
        isStoryCarousel={true}
        slides={formattedSlides}
        options={{
          align: "center",
          loop: true,
        }}
        autoPlay={true}
        useDynamicSlideWidth={true}
        forDesktop={forDesktop}
        externalLink={false}
        dotsVisible={false}
      />
    </div>
  );
}

const formatStoryForEmbla = (stories, s, sShared, t, forDesktop) => {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const formatted = [];

  const filteredStories = [];
  stories.forEach((story) => {
    if (story) {
      filteredStories.push(story);
    }
  });

  filteredStories.forEach((story) => {
    let startDate: Date =
      story.StartDate && parseISO(story.StartDate).getFullYear() > 1
        ? new Date(story?.StartDate)
        : null;

    const month: string = startDate
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(startDate)
      : "";
    const day: string = startDate
      ? startDate.toLocaleString("default", { day: "numeric" })
      : "";

    const overlayContent = (
      <div className={s.rocketOverlay}>
        <div className={s.rocketIcon}>
          <img src="/rocket-white.png" alt="Rocket Icon" />
        </div>
      </div>
    );

    formatted.push({
      overlayContent,
      imageSrc: `${bucketUrl}${story.PrimaryFile.Name}`,
      thumbnailSrc: "",
      hoverSrc: "",
      width: story.PrimaryFile.Width,
      height: story.PrimaryFile.Height,
      tallImage: true,
      useShadow: true,
      hoverCenter: "center",
      artistName: "",
      title: story.Title,
      linkURL: story.Slug ? `/stories/${story.Slug}` : `/story/${story.Id}`,
      roundedCorners: false,
      header: (
        <Link href={`/profile/@${story.Username}`}>
          <a>
            <div className={s.writerContainer}>
              <h2>
                {story.Name} {story.Surname}
              </h2>
            </div>
          </a>
        </Link>
      ),
      storyFooter: (
        <div className={s.storyFooter}>
          <header>
            {startDate && (
              <time dateTime={startDate.toISOString()} className={s.dateStart}>
                <div className={s.monthDay}>
                  <span className={s.month}>{month}</span>
                  <span className={s.day}>{day}</span>
                </div>
              </time>
            )}
            <h2 className={s.title}>{story?.Title}</h2>
          </header>
        </div>
      ),
    });
  });

  return formatted;
};
