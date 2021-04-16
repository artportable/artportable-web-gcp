import Image from 'next/image'
import Main from '../app/components/Main/Main'
import AboutMe from '../app/components/AboutMe/AboutMe'
import { Tabs, Tab } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import ProfileComponent from '../app/components/Profile/Profile'
import ArtworkListItem from '../app/components/ArtworkListItem/ArtworkListItem'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { useTranslation } from "next-i18next"
import { profileStyles } from '../styles/[username]'
import { useGetArtworks } from '../app/hooks/dataFetching/Artworks'
import { useGetSimilarPortfolios, useGetUserProfileTags, useGetUserProfile, useGetUserProfileSummary } from '../app/hooks/dataFetching/UserProfile'
import { useState } from 'react'
import TabPanel from '../app/components/TabPanel/TabPanel'
import { useGetProfileUser } from '../app/hooks/dataFetching/useGetProfileUser'
import { useStore } from 'react-redux'
import SimilarPortfoliosSection from '../app/components/SimilarPortfoliosSection/SimilarPortfoliosSection'

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function Profile() {
  const { t } = useTranslation(['common', 'profile']);
  const s = profileStyles();
  const store = useStore();

  const [activeTab, setActiveTab] = useState(0);

  const profileUser = useGetProfileUser();
  const artworks = useGetArtworks(profileUser);
  const userProfileSummary = useGetUserProfileSummary(profileUser);
  const userProfile = useGetUserProfile(profileUser);
  const tags = useGetUserProfileTags(profileUser);
  const similarPortfolios = useGetSimilarPortfolios(profileUser);
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;
  const myUsername = store.getState()?.user?.username;

  function onLikeClick(artworkId, isLike) {
    fetch(`http://localhost:5001/api/artworks/${artworkId}/like?myUsername=${myUsername}`, {
      method: isLike ? 'POST' : 'DELETE',
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

  function handleTabChange(_, newValue) {
    setActiveTab(newValue);
  }

  return (
    <>
      <div className={s.profileCoverPhoto}>        
        {artworks.isLoading && <div>Loading...</div>}
        {!artworks.isLoading && !artworks.isError && artworks &&
          <Image
            src={`${bucketUrl}${artworks.data[0]?.PrimaryFile}`}
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
            <ProfileComponent userProfile={userProfileSummary}></ProfileComponent>
          </div>
          <Divider className={s.divider}></Divider>
          <div className={s.tabsContainer}>
            <Tabs value={activeTab} onChange={handleTabChange} centered >
              <Tab label={t('profile:portfolio')} {...a11yProps(t('profile:portfolio'))} />
              <Tab label={t('profile:aboutMe')} {...a11yProps(t('profile:aboutMe'))} />
            </Tabs>
            <Box p={1}>
              <TabPanel value={activeTab} index={0}>
                <div className={s.portfolioContainer}>
                  {artworks.isLoading && <div>Loading...</div>}
                  {!artworks.isLoading && !artworks.isError && artworks.data &&
                    artworks.data?.map(artwork =>
                      <div key={artwork.Id} className={s.artWorkListItem}>
                        <ArtworkListItem artwork={artwork} onLikeClick={onLikeClick} />
                      </div>
                    )
                  }
                  {artworks.isError && <div>error...</div>}
                </div>
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <AboutMe userProfile={userProfile} tags={tags.data}></AboutMe>
              </TabPanel>
            </Box>
          </div>
          {similarPortfolios?.data && !similarPortfolios?.isError && <>
            <Divider className={s.secondDivider}></Divider>
            <div className={s.similarPortfolios}>
              <SimilarPortfoliosSection portfolios={similarPortfolios.data}></SimilarPortfoliosSection>
            </div>
          </>}
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'profile']),
    }
  }
}