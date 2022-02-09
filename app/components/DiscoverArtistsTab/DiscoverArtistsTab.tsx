import { memo, useContext, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
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

  function filterArtist(tags: string[], searchQuery = "") {
    setLoadMoreArtists(true);
    setSearchQuery(searchQuery);
  }

  function follow(userToFollow, isFollow) {
    if (socialId === null || socialId === undefined || socialId!= '') {
      return; // TODO: Display modal to sign up
    }

    fetch(`${apiBaseUrl}/api/connections/${userToFollow}?mySocialId=${socialId}`, {
      method: isFollow ? 'POST' : 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
          throw response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
      onFollowClick={follow}
      onFilter={filterArtist}
      loadMoreElementRef={loadMoreArtistsElementRef}
      isLoading={isLoadingArtists}
      loadMore={loadMoreArtists}
    />
  );
})

export default DiscoverArtistsTab