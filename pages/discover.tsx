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


export default function DiscoverPage() {
  const { t } = useTranslation(['common', 'discover']);
  const s = styles();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);

  function a11yProps(index: any) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  return (
    <Main wide>
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered >
        <Tab label={t('discover:art')} {...a11yProps(t('discover:art'))} />
        <Tab label={t('discover:artists')} {...a11yProps(t('discover:artists'))} />
      </Tabs>
      <Box paddingTop={4}>
        <TabPanel value={activeTab} index={0}>
          <DiscoverArt></DiscoverArt>
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <DiscoverArtists></DiscoverArtists>
        </TabPanel>
      </Box>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      ...await serverSideTranslations(locale, ['header', 'common', 'discover']),
    }
  };
}
