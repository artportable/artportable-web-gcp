import Main, { FullWidthBlock } from '../../app/components/Main/Main'
import AboutMe from '../../app/components/AboutMe/AboutMe'
import ProfileCoverPhoto from '../../app/components/ProfileCoverPhoto/ProfileCoverPhoto'
import { Tabs, Tab } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import ProfileComponent from '../../app/components/Profile/Profile'
import ArtworkListItemDefined from '../../app/components/ArtworkListItemDefined/ArtworkListItemDefined'
import Image from "../../app/models/Image"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import EditProfileDialog from '../../app/components/EditProfileDialog/EditProfileDialog'

import { useTranslation } from "next-i18next"
import { profileStyles } from '../../styles/[username]'
import { useGetArtworks } from '../../app/hooks/dataFetching/Artworks'
import { useGetSimilarPortfolios, useGetUserProfileTags, useGetUserProfile, useGetUserProfileSummary } from '../../app/hooks/dataFetching/UserProfile'
import React, { useEffect, useState } from 'react'
import TabPanel from '../../app/components/TabPanel/TabPanel'
import { useGetProfileUser } from '../../app/hooks/dataFetching/useGetProfileUser'
import { useStore } from 'react-redux'
import SimilarPortfoliosSection from '../../app/components/SimilarPortfoliosSection/SimilarPortfoliosSection'
import { useMainWidth } from '../../app/hooks/useWidth'
import { getImageAsRows } from '../../app/utils/layoutUtils'
import { useTheme, Theme } from '@material-ui/core'

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
  const rowWidth = useMainWidth().regular;
  const theme: Theme = useTheme();

  const [activeTab, setActiveTab] = useState(0);

  const profileUser = useGetProfileUser();
  const artworks = useGetArtworks(profileUser);
  const userProfileSummary = useGetUserProfileSummary(profileUser);
  const userProfile = useGetUserProfile(profileUser);
  const tags = useGetUserProfileTags(profileUser);
  const similarPortfolios = useGetSimilarPortfolios(profileUser);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const myUsername = store.getState()?.user?.username;

  const [imageRows, setImageRows] = useState(null);

  useEffect(() => {
    const primaryImages = artworks?.data?.map(a => a.PrimaryFile);
    if(imageRows === null) {
      const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
      if (rows) {
        setImageRows(rows);
      }
    }
  }, [artworks]);

  useEffect(() => {
    const primaryImages = artworks?.data?.map(a => a.PrimaryFile);
    if(imageRows !== null) {
      const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
      if (rows) {
        setImageRows(rows);
      }
    }
  }, [rowWidth]);

  function onLikeClick(artworkId, isLike) {
    fetch(`${apiBaseUrl}/api/artworks/${artworkId}/like?myUsername=${myUsername}`, {
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
    <Main>
      <FullWidthBlock>
        {artworks.isLoading && <div>Loading...</div>}
        {!artworks.isLoading && !artworks.isError && artworks &&
          <ProfileCoverPhoto />
        
        }
        {artworks.isError && <div>error...</div>}
      </FullWidthBlock>

      <div className={s.profileGrid}>
        <div className={s.profileSummary}>
          <ProfileComponent userProfile={userProfileSummary}></ProfileComponent>
        </div>
        <div className={s.editActions}>
          {/* Add condition to show if user is on own profile */}
          <EditProfileDialog
            userProfileSummary={userProfileSummary.data}
            userProfile={userProfile.data}
            tags={tags} />
        </div>
        <Divider className={s.divider}></Divider>
        <div className={s.tabsContainer}>
          <Tabs value={activeTab} onChange={handleTabChange} centered >
            <Tab label={t('profile:portfolio')} {...a11yProps(t('profile:portfolio'))} />
            <Tab label={t('profile:aboutMe')} {...a11yProps(t('profile:aboutMe'))} />
          </Tabs>
          <Box paddingY={1}>
            <TabPanel value={activeTab} index={0}>
              <div className={s.portfolioContainer}>

              {imageRows && imageRows.map((row: Image[], i) =>
                <div className={s.portfolioRow} key={i}>   
                  {row.map(image => {
                      let artwork = artworks.data.find(a => a.PrimaryFile.Name === image.Name);

                      if (artwork) {
                        return <ArtworkListItemDefined
                          key={image.Name}
                          width={image.Width}
                          height={image.Height}
                          artwork={artwork}
                          onLikeClick={onLikeClick} />
                      }
                    }
                  )}
                </div>
              )}

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
  );
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'profile']),
    }
  }
}