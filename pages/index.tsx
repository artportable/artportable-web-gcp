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
import { useRedirectToLoginIfNotLoggedIn } from "../app/hooks/useRedirectToLoginIfNotLoggedIn";
import DiscoverTopArtTab from "../app/components/DiscoverTopArtTab/DiscoverTopArtTab";
import DiscoverTopArtistsTab from "../app/components/DisvoerTopArtistTab/DiscoverTopArtistsTab";
import { Artwork } from "../app/models/Artwork";
import Artist from "../app/models/Artist";
import Head from 'next/head';


export default function DiscoverPage() {
  const { t } = useTranslation(['index', 'header', 'plans', 'common', 'discover']);
  const s = styles();
  const store = useStore();
  const token = useContext(TokenContext);
  const { username, socialId, isSignedIn } = useContext(UserContext);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const dispatch = useDispatch();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const discoverTab = store.getState()?.discover?.tab ?? 1;
  const discoverTopArtTab = store.getState()?.discoverTopArtTab?.tab ?? 0;

  const tags = useGetTags();
  const rowWidth = useMainWidth().wide

  const [activeTab, setActiveTab] = useState(discoverTopArtTab);
  const [selectedTags, setSelectedTags] = useState(null);
  const [searchQueryArt, setSearchQueryArt] = useState(null);
  const loadMoreArtworksElementRef = useRef(null);
  const loadMoreArtistsElementRef = useRef(null);
  const loadMoreMontlyArtistsElementRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [searchQueryMontly, setSearchQueryMontly] = useState<string>();
  const [loadMoreArtworks, setLoadMoreArtworks] = useState<boolean>(true);
  const [loadMoreArtists, setLoadMoreArtists] = useState<boolean>(true);
  const [loadMoreMontlyArtists, setLoadMoreMontlyArtists] = useState<boolean>(true);

  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!isSignedIn.isPending) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    if (isSignedIn.value) {
      setActiveTab(discoverTab);
    }
  }, [isSignedIn]);



  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey<Artwork>(loadMoreArtworksElementRef,
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
        if (username.value != null && username.value != '') {
          url.searchParams.append('myUsername', username.value);
        }
        if (searchQueryArt) {
          url.searchParams.append('q', searchQueryArt);
        }
        url.searchParams.append('page', (pageIndex + 1).toString());
        url.searchParams.append('pageSize', "20");
        return url.href;
      }
      return previousPageData.next;
    }, activeTab);

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
        if (username.value != null && username.value != '') {
          url.searchParams.append('myUsername', username.value);
        }
        url.searchParams.append('page', (pageIndex + 1).toString());
        url.searchParams.append('pageSize', "10");
        return url.href;
      }
      return previousPageData.next;
    }, activeTab);

  const { data: monthlyArtists, isLoading: isLoadingMonthlyArtists } = useInfiniteScrollWithKey<Artist>(loadMoreMontlyArtistsElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        setLoadMoreMontlyArtists(false);
        return null;
      }

      if (pageIndex == 0) {
        const url = new URL(`${apiBaseUrl}/api/discover/monthlyArtists`);
        if (searchQueryMontly != null && searchQueryMontly != '') {
          url.searchParams.append('q', searchQueryMontly);
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

  const useWideLayout = activeTab === 0 || activeTab === 1;

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

  function filterMontlyArtist(tags: string[], searchQuery = "") {
    setLoadMoreMontlyArtists(true);
    setSearchQueryMontly(searchQuery);
  }

  function like(artworkId, isLike) {
    redirectIfNotLoggedIn();

    fetch(`${apiBaseUrl}/api/artworks/${artworkId}/like?mySocialId=${socialId.value}`, {
      method: isLike ? 'POST' : 'DELETE',
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
      })
  }

  function follow(userToFollow, isFollow) {
    if (socialId.value === null || socialId.value === undefined) {
      return; // TODO: Display modal to sign up
    }

    fetch(`${apiBaseUrl}/api/connections/${userToFollow}?mySocialId=${socialId.value}`, {
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

  function a11yProps(index: any) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  return (
    <Main noHeaderPadding wide={useWideLayout} isShow={false}>
      <Head>
        <meta name="title" content={t('index:title')} />
        <meta name="description" content={t('index:description')} />
        <meta name="url" content="https://artportable.com/" />

        <meta property="og:title" content=""/>
        <meta property="og:description" content={t('index:description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://artportable.com/" />
        <meta property="og:image" content="/images/artportable_tv_commercial.png"/>
      </Head>
      {!loading &&
        <>
          {!isSignedIn.value &&
            <IndexHero></IndexHero>
          }
          <div className={s.discoverContainer}>
            <Tabs
              className={s.tabs}
              value={activeTab}
              onChange={(_, newValue) => setTab(newValue)}
              variant={"scrollable"}
              scrollButtons={"on"}
            >
              <Tab className={s.text} label={t('discover:topArt')} {...a11yProps(t('discover:topArt'))} />
              <Tab className={s.text} label={t('discover:art')} {...a11yProps(t('discover:art'))} />
              <Tab className={s.text} label={t('discover:mostFollowed')} {...a11yProps(t('discover:mostFollowed'))} />
              <Tab className={s.text} label={t('discover:monthlyArtist')} {...a11yProps(t('discover:monthlyArtist'))} />
              <Tab className={s.text} label={t('discover:artists')} {...a11yProps(t('discover:artists'))} />
            </Tabs>
            <Box paddingTop={4}>
              <TabPanel value={activeTab} index={0}>
                <DiscoverTopArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
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
              <TabPanel value={activeTab} index={2}>
                <DiscoverTopArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={3}>
                <DiscoverArtists
                  artists={monthlyArtists}
                  onFollowClick={follow}
                  onFilter={filterMontlyArtist}
                  loadMoreElementRef={loadMoreMontlyArtistsElementRef}
                  isLoading={isLoadingMonthlyArtists}
                  loadMore={loadMoreMontlyArtists}
                ></DiscoverArtists>
              </TabPanel>
              <TabPanel value={activeTab} index={4}>
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
      ...await serverSideTranslations(locale, ['art', 'header', 'footer', 'common', 'discover', 'tags', 'index', 'plans', 'snackbar', 'support', 'articles']),
    }
  };
}
