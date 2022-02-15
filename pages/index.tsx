import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from '../styles/index.css';
import React, { useContext, useEffect, useState } from "react";
import Main from '../app/components/Main/Main'
import { useTranslation } from "next-i18next";
import { Box, Tab, Tabs } from "@material-ui/core";
import TabPanel from '../app/components/TabPanel/TabPanel'
import { useDispatch, useStore } from "react-redux";
import { SET_TAB } from "../app/redux/actions/discoverActions";
import { useGetTags } from "../app/hooks/dataFetching/Artworks";
import { useMainWidth } from "../app/hooks/useWidth";
import IndexHero from "../app/components/IndexHero/IndexHero";
import { LoadingContext } from "../app/contexts/loading-context";
import { UserContext } from "../app/contexts/user-context";
import DiscoverTopArtTab from "../app/components/DiscoverTopArtTab/DiscoverTopArtTab";
import DiscoverTopArtistsTab from "../app/components/DisvoerTopArtistTab/DiscoverTopArtistsTab";
import DiscoverArtistsTab from "../app/components/DiscoverArtistsTab/DiscoverArtistsTab";
import Head from 'next/head';
import DiscoverMonthlyArtistsTab from "../app/components/DiscoverMonthlyArtistTab/DiscoverMonthlyArtistTab";
import DiscoverArtTab from "../app/components/DiscoverArtTab/DiscoverArtTab";
import DiscoverTrendingArtTab from "../app/components/DiscoverTrendingArtTab/DiscoverTrendingArtTab";


export default function DiscoverPage() {
  const { t } = useTranslation(['index', 'header', 'plans', 'common', 'discover']);
  const s = styles();
  const store = useStore();
  const { username, socialId, isSignedIn } = useContext(UserContext);
  const dispatch = useDispatch();

  const discoverTab = store.getState()?.discover?.tab ?? 1;
  const discoverTopArtTab = store.getState()?.discoverTopArtTab?.tab ?? 0;

  const tags = useGetTags();
  const rowWidth = useMainWidth().wide

  const [activeTab, setActiveTab] = useState(discoverTopArtTab);

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

  const useWideLayout = activeTab === 0 || activeTab === 1 || activeTab === 2;

  function setTab(value) {
    setActiveTab(value);
    dispatch({
      type: SET_TAB,
      payload: value
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

        <meta property="og:title" content="" />
        <meta property="og:description" content={t('index:description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://artportable.com/" />
        <meta property="og:image" content="/images/artportable_tv_commercial.png" />
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
              <Tab className={s.text} label={t('discover:trendingArt')} {...a11yProps(t('discover:trendingArt'))}/>
              <Tab className={s.text} label={t('discover:topArt')} {...a11yProps(t('discover:topArt'))} />
              <Tab className={s.text} label={t('discover:art')} {...a11yProps(t('discover:art'))} />
              <Tab className={s.text} label={t('discover:mostFollowed')} {...a11yProps(t('discover:mostFollowed'))} />
              <Tab className={s.text} label={t('discover:monthlyArtist')} {...a11yProps(t('discover:monthlyArtist'))} />
              <Tab className={s.text} label={t('discover:artists')} {...a11yProps(t('discover:artists'))} />
            </Tabs>
            <Box paddingTop={4}>
              <TabPanel value={activeTab} index={0}>
                <DiscoverTrendingArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <DiscoverTopArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={2}>
                <DiscoverArtTab
                  username={username.value}
                  socialId={socialId.value}
                  rowWidth={rowWidth}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={3}>
                <DiscoverTopArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={4}>
                <DiscoverMonthlyArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={5}>
                <DiscoverArtistsTab
                  username={username.value}
                  socialId={socialId.value}
                />
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
