import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from '../styles/index.css';
import React, { useContext, useEffect, useRef, useState } from "react";
import Main from '../app/components/Main/Main'
import { useTranslation } from "next-i18next";
import { Box, Tab, Tabs } from "@material-ui/core";
import TabPanel from '../app/components/TabPanel/TabPanel'
import DiscoverArt from "../app/components/DiscoverArt/DiscoverArt";
import DiscoverArtists from "../app/components/DiscoverArtists/DiscoverArtists";
import { useDispatch, useStore } from "react-redux";
import { SET_TAB } from "../app/redux/actions/discoverActions";
import { useGetTags } from "../app/hooks/dataFetching/Artworks";
import { useMainWidth } from "../app/hooks/useWidth";
import { isNullOrUndefined } from "../app/utils/util";
import { useInfiniteScrollWithKey } from "../app/hooks/useInfiniteScroll";
import IndexHero from "../app/components/IndexHero/IndexHero";
import { TokenContext } from "../app/contexts/token-context";
import { LoadingContext } from "../app/contexts/loading-context";
import { UserContext } from "../app/contexts/user-context";

export default function DiscoverPage() {
  const { t } = useTranslation(['index', 'header', 'plans', 'common', 'discover']);
  const s = styles();
  const store = useStore();
  const token = useContext(TokenContext);
  const { username, isSignedIn } = useContext(UserContext);
  const dispatch = useDispatch();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const discoverTab = store.getState()?.discover?.tab ?? 0;

  const tags = useGetTags();
  const rowWidth = useMainWidth().wide

  const [activeTab, setActiveTab] = useState(discoverTab);
  const [selectedTags, setSelectedTags] = useState(null);
  const [searchQueryArt, setSearchQueryArt] = useState(null);
  const loadMoreArtworksElementRef = useRef(null);
  const loadMoreArtistsElementRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [loadMoreArtworks, setLoadMoreArtworks] = useState<boolean>(true);
  const [loadMoreArtists, setLoadMoreArtists] = useState<boolean>(true);

  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if(!isSignedIn.isPending){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isSignedIn]);


  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey(loadMoreArtworksElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        setLoadMoreArtworks(false);
        return null;
      }

      if (pageIndex == 0) {
        const url = new URL(`${apiBaseUrl}/api/discover/artworks`);
        selectedTags.forEach(tag => {
          url.searchParams.append('tag', tag);
        });
        if(searchQueryArt) {
          url.searchParams.append('q', searchQueryArt);
        }
        url.searchParams.append('page', (pageIndex + 1).toString());
        url.searchParams.append('pageSize', "20");
        return url.href;
      }
      return previousPageData.next;
    }, activeTab);
  const { data: artists, isLoading: isLoadingArtists } = useInfiniteScrollWithKey(loadMoreArtistsElementRef,
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
        if (username.value != null && username.value != '') {
          url.searchParams.append('myUsername', username.value);
        }
        url.searchParams.append('page', (pageIndex + 1).toString());
        url.searchParams.append('pageSize', "10");
        return url.href;
      }
      return previousPageData.next;
    }, activeTab);


  const useWideLayout = activeTab === 0;

  useEffect(() => {
    setSearchQuery(null);
    filter([]);
  }, []);

  function setTab(value) {
    setActiveTab(value);
    dispatch({
      type: SET_TAB,
      payload: value
    });
  }

  function filter(tags: string[], searchQuery = "") {
    setLoadMoreArtworks(true);
    setSelectedTags(tags);
    setSearchQueryArt(searchQuery);
  }

  function filterArtist(tags: string[], searchQuery = "") {
    setLoadMoreArtists(true);
    setSearchQuery(searchQuery);
  }

  function like(artworkId, isLike) {
    if (isNullOrUndefined(username.value)) {
      return;
    }

    fetch(`${apiBaseUrl}/api/artworks/${artworkId}/like?myUsername=${username.value}`, {
      method: isLike ? 'POST' : 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`
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
      })
  }

  function follow(userToFollow, isFollow) {
    if (username.value === null || username.value === undefined) {
      return; // TODO: Display modal to sign up
    }

    fetch(`${apiBaseUrl}/api/connections/${userToFollow}?myUsername=${username.value}`, {
      method: isFollow ? 'POST' : 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`
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

  function a11yProps(index: any) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  return (
    <Main noHeaderPadding wide={useWideLayout}>
      {!loading && 
      <>
        {!isSignedIn.value &&
          <IndexHero></IndexHero>
        }
        <div className={s.discoverContainer}>
          <Tabs value={activeTab} onChange={(_, newValue) => setTab(newValue)} centered>
            <Tab label={t('discover:art')} {...a11yProps(t('discover:art'))} />
            <Tab label={t('discover:artists')} {...a11yProps(t('discover:artists'))} />
          </Tabs>
          <Box paddingTop={4}>
            <TabPanel value={activeTab} index={0}>
              {!tags?.isLoading && !tags?.isError && tags?.data &&
                <DiscoverArt
                  artworks={artworks}
                  tags={tags?.data}
                  onFilter={filter}
                  onLike={like}
                  rowWidth={rowWidth}
                  loadMoreElementRef={loadMoreArtworksElementRef}
                  isLoading={isLoadingArtWorks}
                  loadMore={loadMoreArtworks}
                />
              }
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <DiscoverArtists
                artists={artists}
                onFollowClick={follow}
                onFilter={filterArtist}
                loadMoreElementRef={loadMoreArtistsElementRef}
                isLoading={isLoadingArtists}
                loadMore={loadMoreArtists}
                ></DiscoverArtists>
            </TabPanel>
          </Box>
        </div>
      </>
      }
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['header', 'footer', 'common', 'discover', 'tags', 'index', 'plans', 'snackbar']),
    }
  };
 }
