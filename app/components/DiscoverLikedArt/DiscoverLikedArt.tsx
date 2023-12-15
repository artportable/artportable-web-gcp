import { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";

import { UserContext } from "../../contexts/user-context";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";
import Switch from "@material-ui/core/Switch";
import axios from "axios";
import { useGetUserProfileSummary } from "../../hooks/dataFetching/UserProfile";
import { useTranslation } from "next-i18next";

interface DiscoverLikedArtTabProps {
  socialId?: string;
  rowWidth: number;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
  isMyProfile: boolean;
}
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const DiscoverLikedArtTab = memo((props: DiscoverLikedArtTabProps) => {
  const { socialId, rowWidth } = props;

  const loadMoreArtworksElementRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const [searchQueryArt, setSearchQueryArt] = useState(null);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const { username } = useContext(UserContext);
  const { like } = usePostLike();
  const token = useContext(TokenContext);
  const tags = useGetTags();
  const profileUser = useGetProfileUser();
  const userProfileSummary = useGetUserProfileSummary(profileUser);
  const likedArt: boolean = userProfileSummary?.data?.HideLikedArtworks;
  const [checked, setChecked] = useState(likedArt);
  const { t } = useTranslation(["index", "discover"]);

  const handleChange = () => {
    setChecked((prev) => !prev);
    axios
      .patch(
        `${apiBaseUrl}/api/Profile/${profileUser}/toggleHideLikedArtworks?hideLikedArtworks=${!checked}`
      )
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Revert to the previous state if the request fails
        setChecked((prev) => !prev);

        // Handle errors
        console.error("Error toggling hideLikedArtworks:", error);
      });
  };

  function filter(tags: string[], searchQuery = "") {
    props.loadImages();
    setSelectedTags(tags);
    setSearchQueryArt(searchQuery);
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
        if (pageIndex == 0) {
          let url;
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/likedart`);

          selectedTags.forEach((tag) => {
            url.searchParams.append("tag", tag);
          });

          url.searchParams.append("myUsername", profileUser);

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
      {props.isMyProfile && (
        <div>
          {t("discover:toggleLikeArt")}
          <Switch
            checked={!checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      )}

      {!checked && (
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
      )}
    </>
  );
});
