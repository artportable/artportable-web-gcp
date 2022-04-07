import { LaptopWindowsTwoTone, TrendingUpRounded } from "@material-ui/icons";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { useMainWidth } from "../../hooks/useWidth";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";

interface DiscoverTrendingArtTabProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
}

const DiscoverTrendingArtTab = memo((props: DiscoverTrendingArtTabProps) => {
  const { username, socialId, rowWidth } = props
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const [loadMoreArtworks, setLoadMoreArtworks] = useState<boolean>(true);
  const loadMoreArtworksElementRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const tags = useGetTags();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const token = useContext(TokenContext);
  const { like } = usePostLike();
  const [sold, setSold] = useState("");

  function filter(tags: string[], searchQuery = "") {
    setLoadMoreArtworks(true);
    setSelectedTags(tags);
    setSearchQuery(searchQuery);
  }

  function likeArtwork(artworkId, isLike) {
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId, token);
  }

  useEffect(() => {
    sold;
  }, [])



  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey<Artwork>(loadMoreArtworksElementRef,
    (pageIndex, previousPageData) => {

      // console.log(loadMoreArtworksElementRef);
      // if (previousPageData && !previousPageData.next) {
      //   console.log(previousPageData.next, ".next")
      //   setLoadMoreArtworks(false);
      //   return null;
      // }
      if (sold === "Sold") {
        console.log(artworks);
      }
      if (pageIndex == 0) {
        let url;

        if (sold === "Sold") {
          if (previousPageData && !previousPageData.next) {
            console.log(previousPageData.next, ".next")
            console.log(previousPageData.data);
            // När man scrollar längst ner
            setLoadMoreArtworks(false);
            return null;
          }
          // if (previousPageData === null) {
          // {
          //   !artworks
          //   setLoadMoreArtworks(false)
          // }
          //   setLoadMoreArtworks(false);
          // }

          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trendingsold`);
          selectedTags.forEach(tag => {
            url.searchParams.append('tag', tag);
          });
        }
        else if (sold === "Unsold") {
          if (previousPageData && !previousPageData.next) {
            console.log(previousPageData.next, ".next")
            setLoadMoreArtworks(true);
            return null;
          }
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trendingunsold`);
          selectedTags.forEach(tag => {
            url.searchParams.append('tag', tag);
          });
        }
        else {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);
          selectedTags.forEach(tag => {
            url.searchParams.append('tag', tag);
          });
        }
        // const url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);

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

  const About = () => {
    window.location.href = "www.google.com";
  };

  return (
    <>
      <div>
        <button onClick={About}>About</button>

        <h1>This page is not available</h1>
        <p>You are redirecting to google.com/about</p>
      </div>
      <button onClick={() => setSold("Sold")}>Sold</button>
      <button onClick={() => setSold("Unsold")}>UnSold</button>
      <button>All</button>
      {!tags?.isLoading && !tags?.isError && tags?.data &&
        <DiscoverArt
          artworks={artworks}
          tags={tags?.data}
          onFilter={filter}
          onLike={likeArtwork}
          rowWidth={rowWidth}
          loadMoreElementRef={loadMoreArtworksElementRef}
          isLoading={isLoadingArtWorks}
          loadMore={loadMoreArtworks}
        />
      }
    </>
  );
})

export default DiscoverTrendingArtTab
