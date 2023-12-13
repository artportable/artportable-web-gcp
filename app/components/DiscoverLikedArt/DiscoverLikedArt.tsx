import { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import { styles } from "./discoverLikedArtTab.css";
import { useTranslation } from "next-i18next";

import { UserContext } from "../../contexts/user-context";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";

interface DiscoverLikedArtTabProps {
  socialId?: string;
  rowWidth: number;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
}

export const DiscoverLikedArtTab = memo((props: DiscoverLikedArtTabProps) => {
  const { socialId, rowWidth } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const loadMoreArtworksElementRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const [searchQueryArt, setSearchQueryArt] = useState(null);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const { username } = useContext(UserContext);
  const { like } = usePostLike();
  const token = useContext(TokenContext);
  const tags = useGetTags();

  function filter(tags: string[], searchQuery = "") {
    props.loadImages();
    setSelectedTags(tags);
    setSearchQueryArt(searchQuery);
  }

  function likeArtwork(artworkId, isLike) {
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId, token);
  }

  const profileUser = useGetProfileUser();

  const { data: artworks, isLoading: isLoadingArtWorks } =
    useInfiniteScrollWithKey<Artwork>(
      loadMoreArtworksElementRef,
      (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.next) {
          props.stopLoadImages();
          return null;
        }
        if (pageIndex == 0) {
          let url;
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/likedbyme`);

          url.searchParams.append("myUsername", profileUser);

          url.searchParams.append("page", (pageIndex + 1).toString());
          url.searchParams.append("pageSize", "20");
          return url.href;
        }
        return previousPageData.next;
      }
    );

  return (
    <>
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
      />
    </>
  );
});
