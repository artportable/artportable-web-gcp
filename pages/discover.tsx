import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from '../styles/discover.css';
import React, { useState } from "react";
import { useRouter } from "next/router";
import Main from '../app/components/Main/Main'
import { useTranslation } from "next-i18next";
import { Box, Tab, Tabs } from "@material-ui/core";
import TabPanel from '../app/components/TabPanel/TabPanel'
import DiscoverArt from "../app/components/DiscoverArt/DiscoverArt";
import DiscoverArtists from "../app/components/DiscoverArtists/DiscoverArtists";
import { useGetArtists } from "../app/hooks/dataFetching/Discover";
import { useStore } from "react-redux";


export default function DiscoverPage() {
  const { t } = useTranslation(['common', 'discover']);
  const s = styles();
  const store = useStore();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);

  const username = store.getState()?.user?.username;
  const artists = useGetArtists(username);

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
    <Main>
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered >
        <Tab label={t('discover:art')} {...a11yProps(t('discover:art'))} />
        <Tab label={t('discover:artists')} {...a11yProps(t('discover:artists'))} />
      </Tabs>
      <Box p={1}>
        <TabPanel value={activeTab} index={0}>
          <DiscoverArt></DiscoverArt>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          {!artists.isLoading && !artists.isError && artists.data &&
            <DiscoverArtists artists={artists.data} onFollowClick={follow}></DiscoverArtists>
          }
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
