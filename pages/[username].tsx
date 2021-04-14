import Image from 'next/image'
import { useRouter } from 'next/router'
import Main from '../app/components/Main/Main'
import { Tabs, Tab } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import ProfileComponent from '../app/components/Profile/Profile'
import ArtworkListItem from '../app/components/ArtworkListItem/ArtworkListItem'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { useTranslation } from "next-i18next"
import { profileStyles } from '../styles/[username]'
import { useGetArtworks } from '../app/hooks/dataFetching/Artworks'
import { useGetUserProfile } from '../app/hooks/dataFetching/useGetUserProfile'
import { useState } from 'react'
import TabPanel from '../app/components/TabPanel/TabPanel'

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function Profile() {
  const router = useRouter();
  const { t } = useTranslation(['common']);
  const s = profileStyles();

  const [activeTab, setActiveTab] = useState(0);

  const artworks = useGetArtworks('857ce515-b7dd-4eae-991b-20468cf33ec3');
  const userProfile = useGetUserProfile('857ce515-b7dd-4eae-991b-20468cf33ec3');
  const { username } = router.query;
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  function handleTabChange(_, newValue) {
    setActiveTab(newValue);
  }

  return (
    <>
      <div className={s.profileCoverPhoto}>        
        {artworks.isLoading && <div>Loading...</div>}
        {!artworks.isLoading && !artworks.isError && artworks &&
          <Image
            src={`${bucketUrl}${artworks.data[0].PrimaryFile}`}
            alt="Cover image"
            layout="fill"
            objectFit="cover"
          />
        }
        {artworks.isError && <div>error...</div>}
      </div>
      <Main>
        <div className={s.profileGrid}>
          <div className={s.profileSummary}>
            <ProfileComponent userProfile={userProfile}></ProfileComponent>
          </div>
          <Divider className={s.divider}></Divider>
          <div className={s.tabsContainer}>
            <Tabs value={activeTab} onChange={handleTabChange} centered >
              <Tab label={t('portfolio')} {...a11yProps('portfolio')} />
              <Tab label={t('aboutMe')} {...a11yProps('about me')} />
            </Tabs>
            <Box p={1}>
              <TabPanel value={activeTab} index={0}>
                <div className={s.portfolioContainer}>
                  {artworks.isLoading && <div>Loading...</div>}
                  {!artworks.isLoading && !artworks.isError && artworks.data &&
                    artworks.data?.map(artwork =>
                      <div key={artwork.Id} className={s.artWorkListItem}>
                        <ArtworkListItem artwork={artwork} isLikedByMe={true} />
                      </div>
                    )
                  }
                  {artworks.isError && <div>error...</div>}
                </div>
              </TabPanel>
              <TabPanel value={activeTab} index={1}>Om mig</TabPanel>
            </Box>
          </div>
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'feed']),
    }
  }
}