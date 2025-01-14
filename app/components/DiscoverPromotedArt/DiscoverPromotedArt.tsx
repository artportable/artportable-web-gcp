import { useTranslation } from "next-i18next";
import React, { memo, useContext, useRef, useState } from "react";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import { styles } from "./discoverPromotedArt.css";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
interface DiscoverPromotedArtTabProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
}

const DiscoverPromotedArtTab = memo((props: DiscoverPromotedArtTabProps) => {
  const { t } = useTranslation(["common"]);
  const s = styles();
  const { username, socialId, rowWidth } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const loadMoreArtworksElementRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const tags = useGetTags();

  function filter(tags: string[], searchQuery = "") {
    props.loadImages();
    setSelectedTags(tags);
    setSearchQuery(searchQuery);
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
          let url = new URL(`${apiBaseUrl}/api/Discover/artworks/promoted`);

          selectedTags.forEach((tag) => {
            url.searchParams.append("tag", tag);
          });
          if (searchQuery) {
            url.searchParams.append("q", searchQuery);
          }
          if (username && username != "") {
            url.searchParams.append("myUsername", username);
          }
          url.searchParams.append("page", (pageIndex + 1).toString());
          url.searchParams.append("pageSize", "20");
          return url.href;
        }
        return previousPageData.next;
      },
      username
    );

  return (
    <>
      {!tags?.isLoading && !tags?.isError && tags?.data && (
        <div>
          <div className={s.container}>
            <div className={s.wrapper}>
              <div className={s.imgContainer}>
                <div>
                  <img
                    src="/Artportable_Logotyp_Black.svg"
                    alt="Logo Artportable"
                    className={s.apLogo}
                  />
                </div>
                {""}
                <h3 className={s.x}>X</h3>
                <div>
                  <a href="https://www.husohem.se">
                    <img
                      src="/images/hus-hem_pink.png"
                      alt="Logo Artportable"
                      className={s.apLogo}
                    />
                  </a>
                </div>
              </div>
              <div className={s.text}>{t("common:husOhem")}</div>
            </div>
          </div>

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
            insertElements={[]}
          />
        </div>
      )}
    </>
  );
});

export default DiscoverPromotedArtTab;
