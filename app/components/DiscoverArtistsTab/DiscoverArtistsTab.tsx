import { memo, useContext, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import usePostFollow from "../../hooks/dataFetching/usePostFollow";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import Artist from "../../models/Artist";
import DiscoverArtists from "../DiscoverArtists/DiscoverArtists";


interface DiscoverArtistsTabProps {
  username?: string;
  socialId?: string;
}

const DiscoverArtistsTab = memo((props: DiscoverArtistsTabProps) => {
  const { username, socialId } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const loadMoreArtistsElementRef = useRef(null);
  const [loadMoreArtists, setLoadMoreArtists] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>();
  const token = useContext(TokenContext);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const { follow } = usePostFollow();

  function filterArtist(tags: string[], searchQuery = "") {
    setLoadMoreArtists(true);
    setSearchQuery(searchQuery);
  }

  function followArtist(userToFollow, isFollow) {
    redirectIfNotLoggedIn();
    follow(userToFollow, isFollow, socialId, token);
  }

  const { data: artists, isLoading: isLoadingArtists } = useInfiniteScrollWithKey<Artist>(loadMoreArtistsElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        setLoadMoreArtists(false);
        return null;
      }
      if (pageIndex == 0) {
        const url = new URL(`${apiBaseUrl}/api/discover/artists`);
        if (searchQuery != null && searchQuery != '') {
          url.searchParams.append('q', searchQuery);
        }
        if (username != null && username != '') {
          url.searchParams.append('myUsername', username);
        }
        url.searchParams.append('page', (pageIndex + 1).toString());
        url.searchParams.append('pageSize', "10");
        return url.href;
      }
      return previousPageData.next;
    }, username);

  return (
    <DiscoverArtists
      artists={artists}
      onFollowClick={followArtist}
      onFilter={filterArtist}
      loadMoreElementRef={loadMoreArtistsElementRef}
      isLoading={isLoadingArtists}
      loadMore={loadMoreArtists}
    />
  );
})

export default DiscoverArtistsTab