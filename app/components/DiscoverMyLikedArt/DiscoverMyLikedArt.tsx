import { memo, useContext, useEffect, useRef, useState } from "react";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import { useTranslation } from "next-i18next";
import { styles } from "./discoverMyLikedArtTab.css";
import { UserContext } from "../../contexts/user-context";

interface DiscoverMyLikedArtTabProps {
  socialId?: string;
  rowWidth: number;
  sold: string;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
  header?: string;
}

export const DiscoverMyLikedArtTab = memo(
  (props: DiscoverMyLikedArtTabProps) => {
    const { socialId, rowWidth, header } = props;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const loadMoreArtworksElementRef = useRef(null);
    const [selectedTags, setSelectedTags] = useState(null);
    const [searchQueryArt, setSearchQueryArt] = useState(null);
    const { username } = useContext(UserContext);
    const tags = useGetTags();
    const { t } = useTranslation(["index", "common", "discover", "tags"]);
    const s = styles();

    function filter(tags: string[], searchQuery = "") {
      props.loadImages();
      setSelectedTags(tags);
      setSearchQueryArt(searchQuery);
    }

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

            selectedTags.forEach((tag) => {
              url.searchParams.append("tag", tag);
            });
            if (username.value != null && username.value != "") {
              url.searchParams.append("myUsername", username.value);
            }
            if (searchQueryArt) {
              url.searchParams.append("q", searchQueryArt);
            }
            url.searchParams.append("page", (pageIndex + 1).toString());
            url.searchParams.append("pageSize", "20");
            return url.href;
          }
          return previousPageData.next;
        },
        username.value
      );

    return (
      <>
        <DiscoverArt
          artworks={artworks}
          tags={tags?.data}
          onFilter={filter}
          rowWidth={rowWidth}
          loadMoreElementRef={loadMoreArtworksElementRef}
          isLoading={isLoadingArtWorks}
          loadMore={props.loadMore}
          activeTab={props.activeTab}
          trendingArtTab={false}
          likedArtTab={false}
          header={header}
        />
      </>
    );
  }
);
