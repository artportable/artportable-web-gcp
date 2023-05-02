import { memo, useContext, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import usePostFollow from "../../hooks/dataFetching/usePostFollow";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import Artist from "../../models/Artist";
import DiscoverArtists from "../DiscoverArtists/DiscoverArtists";

interface DiscoverMonthlyArtistsTabProps {
  username?: string;
  socialId?: string;
}

const DiscoverMonthlyArtistsTab = memo(
  (props: DiscoverMonthlyArtistsTabProps) => {
    const { username, socialId } = props;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [searchQueryMontly, setSearchQueryMontly] = useState<string>();
    const [loadMoreMontlyArtists, setLoadMoreMontlyArtists] =
      useState<boolean>(true);
    const loadMoreMontlyArtistsElementRef = useRef(null);
    const token = useContext(TokenContext);
    const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
    const { follow } = usePostFollow();

    function filterMontlyArtist(tags: string[], searchQuery = "") {
      setLoadMoreMontlyArtists(true);
      setSearchQueryMontly(searchQuery);
    }

    function followArtist(userToFollow, isFollow) {
      redirectIfNotLoggedIn();
      follow(userToFollow, isFollow, socialId, token);
    }

    const { data: monthlyArtists, isLoading: isLoadingMonthlyArtists } =
      useInfiniteScrollWithKey<Artist>(
        loadMoreMontlyArtistsElementRef,
        (pageIndex, previousPageData) => {
          if (previousPageData && !previousPageData.next) {
            setLoadMoreMontlyArtists(false);
            return null;
          }

          if (pageIndex == 0) {
            const url = new URL(`${apiBaseUrl}/api/discover/monthlyArtists`);
            if (searchQueryMontly != null && searchQueryMontly != "") {
              url.searchParams.append("q", searchQueryMontly);
            }
            if (username != null && username != "") {
              url.searchParams.append("myUsername", username);
            }
            url.searchParams.append("page", (pageIndex + 1).toString());
            url.searchParams.append("pageSize", "13");
            return url.href;
          }
          return previousPageData.next;
        },
        username
      );

    return (
      <DiscoverArtists
        artists={monthlyArtists}
        onFollowClick={followArtist}
        onFilter={filterMontlyArtist}
        loadMoreElementRef={loadMoreMontlyArtistsElementRef}
        isLoading={isLoadingMonthlyArtists}
        loadMore={loadMoreMontlyArtists}
      ></DiscoverArtists>
    );
  }
);

export default DiscoverMonthlyArtistsTab;
