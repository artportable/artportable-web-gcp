import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import EmblaCarousel from "./Embla/EmblaCarousel";
import LikeButton from "../Button/LikeButton";

import { styles } from "./rocketcarousel.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { Artwork } from "../../models/Artwork";

type Data = {
  forDesktop: boolean;
  containerStyle?: any;
  // artists: Artist[],
};

export default function RocketCarousel(props: Data) {
  // const [artists, setArtists] = useState<Artist[]>([])
  // const [artworks, setArtworks] = useState<Artwork[]>([])

  const { forDesktop, containerStyle = {} } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { t } = useTranslation(["common"]);
  const s = styles();
  const sShared = sharedStyles();
  const loadMoreArtworksElementRef = useRef(null);

  const { data: artworks, isLoading: isLoadingArtWorks } =
    useInfiniteScrollWithKey<Artwork>(
      loadMoreArtworksElementRef,
      (pageIndex, previousPageData) => {
        if (pageIndex == 0) {
          let url = new URL(`${apiBaseUrl}/api/Discover/artworks/boosted`);

          url.searchParams.append("page", (pageIndex + 1).toString());
          url.searchParams.append("pageSize", "100");
          return url.href;
        }
        return previousPageData.next;
      }
    );

  useEffect(() => {
    console.log(artworks);
  }, []);

  if (artworks.length < 1) return null;

  const formattedSlides = formatApArtworkForEmbla(
    artworks,
    s,
    sShared,
    t,
    forDesktop
  );

  return (
    <div style={containerStyle}>
      <EmblaCarousel
        slides={formattedSlides} // Use the formatted slides here
        options={{
          align: "center",
          loop: true,
        }}
        autoPlay={true}
        useDynamicSlideWidth={true}
        forDesktop={forDesktop}
      />
    </div>
  );
}

const formatApArtworkForEmbla = (items, s, sShared, t, forDesktop) => {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const formatted = [];

  items.forEach((item) => {
    const overlayContent = (
      <div className={s.rocketOverlay}>
        <div className={s.likeButton}>
          <LikeButton
            content={{
              Item: item,
            }}
          />
        </div>
        {forDesktop && (
          <div className={s.seeMoreButton + " displayOnHover"}>
            <Button
              className={clsx(
                sShared.smallButton,
                sShared.yellowButton,
                sShared.noBorder,
                sShared.mediumThickness
              )}
            >
              {t("common:seeMore")}
            </Button>
          </div>
        )}
      </div>
    );

    formatted.push({
      overlayContent,
      imageSrc: `${bucketUrl}${item.PrimaryFile.Name}`,
      thumbnailSrc: "",
      hoverSrc: "",
      width: item.PrimaryFile.Width,
      height: item.PrimaryFile.Height,
      hoverCenter: "center",
      artistName: "",
      title: item.Title,
      linkURL: `/art/${item.Id}`,
      roundedCorners: false,
      footer: (
        <div
          style={{
            marginTop: "10px",
            fontSize: "0.95rem",
            fontWeight: 400,
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${item.Owner.Name} ${item.Owner.Surname}`}
        </div>
      ),
    });
  });

  return formatted;
};
