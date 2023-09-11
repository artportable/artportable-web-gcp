import { useTranslation } from "next-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import { styles } from "./discoverTrendingArtTab.css";

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
  const { t } = useTranslation(["index", "common", "discover", "tags"]);
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
        } else {
          // If fetchType is a tag
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);
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
        url.searchParams.append("likesSince", "-30");
        return url.href;
      },
      username
    );

  return (
    <>
      <div className={s.displayTitle}>
        {{
          trending: t("discover:trendingArt"),
          latest: t("discover:latestArt"),
        }[props.fetchType] || t(`tags:${props.fetchType}`)}
      </div>

      {props.fetchType === "trending" && (
        <div className={s.displayText}>{t("discover:trendingText")}</div>
      )}

      {props.fetchType === "latest" && (
        <div className={s.displayTextLatest}>{t("discover:latestText")}</div>
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
          tagPlaceholder={
            props.fetchType === "Originalkonst"
              ? t(`tags:${props.fetchType}`).toLocaleLowerCase()
              : t(`tags:${props.tagPlaceholder}`).toLocaleLowerCase()
          }
        />
      )}
    </>
  );
});

export default DiscoverTrendingArtTab;
