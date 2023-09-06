import { useTranslation } from "next-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import { styles } from './discoverTrendingArtTab.css'


interface DiscoverTrendingArtTabProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
  sold: string;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
  fetchType: string;
  tagPlaceholder: string;
}

const DiscoverTrendingArtTab = memo((props: DiscoverTrendingArtTabProps) => {
  const { t } = useTranslation([
    "index",
    "header",
    "plans",
    "common",
    "discover",
    "tags",
    "support",
  ]);
  const s = styles();
  const { username, socialId, rowWidth } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const loadMoreArtworksElementRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const tags = useGetTags();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const token = useContext(TokenContext);
  const { like } = usePostLike();

  const [displayedText, setDisplayedText] = useState('');
  const hasStartedTyping = useRef(false); // to track if we've started the typing effect

  useEffect(() => {
    let index = 0;
    const fullText = "Se det som är mest populärt på Artportable just nu";

    // Only start typing effect for the "trending" tab
    if (props.fetchType === "trending" && !hasStartedTyping.current) {
      hasStartedTyping.current = true; // Mark that we've started the typing effect

      // Use a timer to type out text
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(prevText => prevText + fullText[index]);
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100); // Adjust the interval to make typing faster/slower

      // Cleanup effect if component unmounts
      return () => clearInterval(timer);
    }
  }, [props.fetchType]);

  function filter(tags: string[], searchQuery = "") {
    props.loadImages();
    setSelectedTags(tags);
    setSearchQuery(searchQuery);
  }

  function likeArtwork(artworkId, isLike) {
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId, token);
  }

  const { data: artworks, isLoading: isLoadingArtWorks } =
    useInfiniteScrollWithKey<Artwork>(
      loadMoreArtworksElementRef,
      (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.next) {
          props.stopLoadImages();
          return null;
        }

        let url;
        if (props.fetchType === "trending") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);
        } else if (props.fetchType === "latest") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/latest`);
        } else if (props.fetchType === "topsold") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/top`);
        } else {
          // If fetchType is a tag
          url = new URL(`${apiBaseUrl}/api/Discover/artworks`);
          url.searchParams.append("tag", props.fetchType);
        }

        if (searchQuery) {
          url.searchParams.append("q", searchQuery);
        }
        if (username && username != "") {
          url.searchParams.append("myUsername", username);
        }
        url.searchParams.append("page", (pageIndex + 1).toString());
        url.searchParams.append("pageSize", "20");

        return url.href;
      },
      username
    );

  return (
    <>
      <div
        style={{
          zIndex: 10,
          color: "#3e3e3e",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "35px",
          marginTop: "20px",
          width: "95%",
        }}
      >
        {{
          trending: t("discover:trendingArt").toLocaleUpperCase(),
          latest: t("discover:latestArt").toLocaleUpperCase(),
        }[props.fetchType] || t(`tags:${props.fetchType}`).toUpperCase()}
      </div>

      {props.fetchType === "trending" && (
        <div
          className={s.displayText}
        >
          {displayedText}
        </div>
      )}

      {props.fetchType === "latest" && (
        <div
        className={s.displayText}
        >
          Ha koll på det allras senaste som laddats upp från Artportables
          konstnärer
        </div>
      )}

      {!tags?.isLoading && !tags?.isError && tags?.data && (
        <DiscoverArt
          artworks={artworks}
          tags={tags?.data}
          onFilter={filter}
          onLike={likeArtwork}
          rowWidth={rowWidth}
          loadMoreElementRef={loadMoreArtworksElementRef}
          isLoading={isLoadingArtWorks}
          loadMore={props.loadMore}
          activeTab={props.activeTab}
          tagPlaceholder={props.tagPlaceholder}
        />
      )}
    </>
  );
});

export default DiscoverTrendingArtTab;
