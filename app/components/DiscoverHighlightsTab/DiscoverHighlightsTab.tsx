import React, { memo, useContext, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { useMainWidth } from "../../hooks/useWidth";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";

interface DiscoverHighLightsTabProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
  sold: string;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
}

const DiscoverHighLightsTab = memo((props: DiscoverHighLightsTabProps) => {
  const { username, socialId, rowWidth } = props
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

  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey<Artwork>(loadMoreArtworksElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        props.stopLoadImages();
        return null;
      }

      if (pageIndex == 0) {
        let url;
        if (props.sold === "Unsold") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/curatedunsold`);
        }
        else if (props.sold === "Sold") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/curatedsold`);
        }
        else if (props.sold === "All") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/curated`);
        }
        else {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/curated`);
        }
        selectedTags.forEach(tag => {
          url.searchParams.append('tag', tag);
        });
        if (searchQuery) {
          url.searchParams.append('q', searchQuery);
        }
        if (username && username != '') {
          url.searchParams.append('myUsername', username);
        }
        url.searchParams.append('page', (pageIndex + 1).toString());
        url.searchParams.append('pageSize', "20");
        return url.href;
      }
      return previousPageData.next;
    }, username);

  return (
    <>
      {!tags?.isLoading && !tags?.isError && tags?.data &&
        <DiscoverArt
          artworks={artworks}
          tags={tags?.data}
          onFilter={filter}
          onLike={likeArtwork}
          rowWidth={rowWidth}
          loadMoreElementRef={loadMoreArtworksElementRef}
          isLoading={isLoadingArtWorks}
          loadMore={props.loadMore}
        />
      }
    </>
  );
})

export default DiscoverHighLightsTab