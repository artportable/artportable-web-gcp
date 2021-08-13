import Main, { FullWidthBlock } from '../../app/components/Main/Main'
import AboutMe from '../../app/components/AboutMe/AboutMe'
import ProfileCoverPhoto from '../../app/components/ProfileCoverPhoto/ProfileCoverPhoto'
import { Tabs, Tab, Snackbar } from '@material-ui/core'
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
import { useUser } from '../../app/hooks/useUser'
import SimilarPortfoliosSection from '../../app/components/SimilarPortfoliosSection/SimilarPortfoliosSection'
import { useMainWidth } from '../../app/hooks/useWidth'
import { getImageAsRows } from '../../app/utils/layoutUtils'
import { useTheme, Theme } from '@material-ui/core'
import { useRouter } from 'next/router'
import ArtworkListItemDefinedSkeleton from '../../app/components/ArtworkListItemDefinedSkeleton/ArtworkListItemDefinedSkeleton'
import { Alert } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import { UPDATE_PROFILE_PICTURE } from '../../app/redux/actions/userActions'

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function Profile() {
  const { t } = useTranslation(['common', 'profile']);
  const s = profileStyles();
  const rowWidth = useMainWidth().regular;
  const theme: Theme = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const [uploadCoverSnackbarOpen, setUploadCoverSnackbarOpen] = useState(false);
  const [hasArtwork, setHasArtwork] = useState(false);

  const profileUser = useGetProfileUser();
  const artworks = useGetArtworks(profileUser);
  const userProfileSummary = useGetUserProfileSummary(profileUser);
  const userProfile = useGetUserProfile(profileUser);
  const tags = useGetUserProfileTags(profileUser);
  const similarPortfolios = useGetSimilarPortfolios(profileUser);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const { username, profilePicture } = useUser();
  const [imageRows, setImageRows] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(undefined);
  const dispatch = useDispatch();


  const onUpdateProfilePicture = (profilePicture: any) => {
    dispatch({
      type: UPDATE_PROFILE_PICTURE,
      profilePicture: profilePicture
    });
  }

  useEffect(() => {
    setCoverPhoto(userProfile?.data?.CoverPhoto);
  }, [userProfile?.data?.CoverPhoto]);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      if (url.includes(`/profile/@`)) {
        setImageRows(null);
      }
    }
    router.events.on('routeChangeComplete', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeStart);
    }
  }, []);

  useEffect(() => {
    const primaryImages = artworks?.data?.map(a => a.PrimaryFile);
    if (imageRows === null) {
      const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
      if (rows) {
        setImageRows(rows);
      }
    }

    setHasArtwork(artworks?.data !== null && artworks?.data?.length > 0);
  }, [artworks, imageRows]);

  useEffect(() => {
    setIsMyProfile(username !== null && profileUser !== null && username == profileUser);
  }, [username, profileUser]);

  useEffect(() => {
    const primaryImages = artworks?.data?.map(a => a.PrimaryFile);
    if (imageRows !== null) {
      const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
      if (rows) {
        setImageRows(rows);
      }
    }
  }, [rowWidth]);

  function onLikeClick(artworkId, isLike) {
    fetch(`${apiBaseUrl}/api/artworks/${artworkId}/like?myUsername=${username}`, {
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

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setUploadSnackbarOpen(false);
  }

  const handleCoverSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setUploadCoverSnackbarOpen(false);
  }

  function updateImage(blob, width: number, height: number, type: string) {
    fetch(`${apiBaseUrl}/api/images?w=${width}&h=${height}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg'
      },
      body: blob
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
          throw response;
        }
        return response.text();
      })
      .then((name) => {
        const url = type === 'profile' ?
          `${apiBaseUrl}/api/profile/${username}/profilepicture?filename=${name}` :
          `${apiBaseUrl}/api/profile/${username}/coverphoto?filename=${name}`;

        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/jpeg'
          },
        })
          .then((response) => {
            if (!response.ok) {
              console.log(response.statusText);
              throw response;
            }
            switch (type) {
              case 'profile':
                onUpdateProfilePicture(name);
                setUploadSnackbarOpen(true)
                break;
              default:
                setCoverPhoto(name)
                setUploadCoverSnackbarOpen(true);
                break;
            }
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <Main>
      <FullWidthBlock>
        {artworks.isLoading && <div>Loading...</div>}
        {!artworks.isLoading && !artworks.isError && artworks &&
          <ProfileCoverPhoto coverPhoto={coverPhoto} onUpdateCoverPhoto={updateImage} isMyProfile={isMyProfile} />
        }
        {artworks.isError && <div>error...</div>}
      </FullWidthBlock>

      <div className={s.profileGrid}>
        <div className={s.profileSummary}>
          <ProfileComponent userProfile={userProfileSummary} userProfilePicture={isMyProfile ? profilePicture : userProfileSummary.data?.ProfilePicture} onUpdateProfilePicture={updateImage} isMyProfile={isMyProfile} linkToProfile={false}></ProfileComponent>
        </div>
        <div className={s.editActions}>
          {isMyProfile &&
            <EditProfileDialog
              userProfile={userProfile.data}
            />
          }
        </div>
        <Divider className={s.divider}></Divider>
        {hasArtwork ?
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
                        let artwork = artworks.data?.find(a => a.PrimaryFile.Name === image.Name);

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
                  {artworks.isLoading &&
                    <>
                      <div className={s.portfolioRow}>
                        <ArtworkListItemDefinedSkeleton grow={1} />
                        <ArtworkListItemDefinedSkeleton grow={3} />
                        <ArtworkListItemDefinedSkeleton grow={2} />
                        <ArtworkListItemDefinedSkeleton grow={1} />
                      </div>
                      <div className={s.portfolioRow}>
                        <ArtworkListItemDefinedSkeleton grow={2} />
                        <ArtworkListItemDefinedSkeleton grow={4} />
                        <ArtworkListItemDefinedSkeleton grow={3} />
                      </div>
                    </>
                  }
                </div>
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <AboutMe userProfile={userProfile} userProfilePicture={isMyProfile ? profilePicture : userProfileSummary.data?.ProfilePicture} tags={tags.data}></AboutMe>
              </TabPanel>
            </Box>
          </div>
          :
          <div className={s.tabsContainer}>
            <Tabs value={activeTab} centered >
              <Tab label={t('profile:aboutMe')} {...a11yProps(t('profile:aboutMe'))} />
            </Tabs>
            <Box paddingY={1}>
              <TabPanel value={activeTab} index={0}>
                <AboutMe userProfile={userProfile} userProfilePicture={isMyProfile ? profilePicture : userProfileSummary.data?.ProfilePicture} tags={tags.data}></AboutMe>
              </TabPanel>
            </Box>
          </div>
        }
        {similarPortfolios?.data && !similarPortfolios?.isError && <>
          <Divider className={s.secondDivider}></Divider>
          <div className={s.similarPortfolios}>
            <SimilarPortfoliosSection portfolios={similarPortfolios.data}></SimilarPortfoliosSection>
          </div>
        </>}
      </div>
      <Snackbar open={uploadSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} variant="filled" severity="success">
          {t('profile:profilePictureUpdated')}
        </Alert>
      </Snackbar>
      <Snackbar open={uploadCoverSnackbarOpen} autoHideDuration={6000} onClose={handleCoverSnackbarClose}>
        <Alert onClose={handleCoverSnackbarClose} variant="filled" severity="success">
          {t('profile:coverPhotoUpdated')}
        </Alert>
      </Snackbar>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale: locale,
      ...await serverSideTranslations(locale, ['common', 'header', 'profile', 'tags']),
    },
    revalidate: 10,
  }
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};