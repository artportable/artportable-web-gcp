import React, { memo, useContext, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import DiscoverArtists from "../DiscoverArtists/DiscoverArtists";

interface DiscoverTopArtistsTabProps {
  username?: string;
  socialId?: string;
}

const DiscoverTopArtistsTab = memo((props: DiscoverTopArtistsTabProps) => {
  const { username, socialId } = props
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const [loadMoreArtists, setLoadMoreArtists] = useState<boolean>(true);
  const loadMoreArtistsElementRef = useRef(null);
  const token = useContext(TokenContext);

  function filter(tags: string[], searchQuery = "") {
    setLoadMoreArtists(true);
    setSearchQuery(searchQuery);
  }

  function follow(userToFollow, isFollow) {
    if (!socialId) {
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

  const { data: artists, isLoading: isLoadingArtists } = useInfiniteScrollWithKey(loadMoreArtistsElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        setLoadMoreArtists(false);
        return null;
      }

      if (pageIndex == 0) {
        const url = new URL(`${apiBaseUrl}/api/Discover/artists/top`);
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
    <>
      <DiscoverArtists
        artists={artists}
        onFollowClick={follow}
        onFilter={filter}
        loadMoreElementRef={loadMoreArtistsElementRef}
        isLoading={isLoadingArtists}
        loadMore={loadMoreArtists}
      />
    </>
  );
})

export default DiscoverTopArtistsTab
