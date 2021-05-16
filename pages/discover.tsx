import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from '../styles/discover.css';
import React, { useEffect, useRef, useState } from "react";
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
import { useInfiniteScroll2 } from "../app/hooks/useInfiniteScroll";


export default function DiscoverPage() {
  const { t } = useTranslation(['common', 'discover']);
  const s = styles();
  const store = useStore();
  const dispatch = useDispatch();

  const username = store.getState()?.user?.username;
  const discoverTab = store.getState()?.discover?.tab ?? 0;

  const tags = useGetTags();
  const rowWidth = useMainWidth().wide + 250; // 250 is a threshold value

  const [activeTab, setActiveTab] = useState(discoverTab);
  const [artists, setArtists] = useState();
  const [artworks, setArtworks] = useState([]);
  const loadMoreElementRef = useRef(null);
  const { data } = useInfiniteScroll2(loadMoreElementRef);

  const useWideLayout = activeTab === 0;

  useEffect(() => {
    search(null);
    filter([]);
  }, []);

  function setTab(value) {
    setActiveTab(value);
    dispatch({
      type: SET_TAB,
      payload: value
    });
  }

  function filter(tags) {
    const url = new URL(`http://localhost:5001/api/discover/artworks`);
    url.searchParams.append('page', '1');
    url.searchParams.append('pageSize', '20');
    if (username != null && username != '') {
      url.searchParams.append('myUsername', username);
    }
    tags.forEach(tag => {
      url.searchParams.append('tag', tag);
    });

    fetch(url.href, {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setArtworks(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function search(searchQuery) {
    const url = new URL(`http://localhost:5001/api/discover/artists`);
    url.searchParams.append('page', '1');
    if (searchQuery != null && searchQuery != '') {
      url.searchParams.append('q', searchQuery);
    }
    if (username != null && username != '') {
      url.searchParams.append('myUsername', username);
    }

    fetch(url.href, {
      method: 'GET',
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setArtists(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function follow(userToFollow) {
    if (username === null || username === undefined) {
      return; // TODO: Display modal to sign up
    }

    fetch(`http://localhost:5001/api/connections/${userToFollow}?myUsername=${username}`, {
      method: 'POST',
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
    <Main wide={useWideLayout}>
      <Tabs value={activeTab} onChange={(_, newValue) => setTab(newValue)} centered >
        <Tab label={t('discover:art')} {...a11yProps(t('discover:art'))} />
        <Tab label={t('discover:artists')} {...a11yProps(t('discover:artists'))} />
      </Tabs>
      <Box paddingTop={4}>
        <TabPanel value={activeTab} index={0}>
          {!tags?.isLoading && !tags?.isError && tags?.data &&
            <DiscoverArt artworks={data} tags={tags?.data} onFilter={filter} rowWidth={rowWidth} loadMoreElementRef={loadMoreElementRef}></DiscoverArt>
          }
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <DiscoverArtists artists={artists} onFollowClick={follow} onSearch={search}></DiscoverArtists>
        </TabPanel>
      </Box>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      ...await serverSideTranslations(locale, ['header', 'common', 'discover', 'tags']),
    }
  };
}
