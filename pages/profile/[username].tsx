import Main, { FullWidthBlock } from '../../app/components/Main/Main'
import Head from 'next/head';
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
import EditArtworkDialog from '../../app/components/EditArtworkDialog/EditArtworkDialog'
import UploadIcon from '@material-ui/icons/Publish'

import { useTranslation } from "next-i18next"
import { profileStyles } from '../../styles/[username]'
import { useGetArtworks } from '../../app/hooks/dataFetching/Artworks'
import { useGetSimilarPortfolios, useGetUserProfileTags, useGetUserProfile, useGetUserProfileSummary, useGetUserProfilePicture } from '../../app/hooks/dataFetching/UserProfile'
import React, { useContext, useEffect, useState } from 'react'
import TabPanel from '../../app/components/TabPanel/TabPanel'
import { useGetProfileUser } from '../../app/hooks/dataFetching/useGetProfileUser'
import SimilarPortfoliosSection from '../../app/components/SimilarPortfoliosSection/SimilarPortfoliosSection'
import { useMainWidth } from '../../app/hooks/useWidth'
import { getImageAsRows } from '../../app/utils/layoutUtils'
import { useTheme, Theme } from '@material-ui/core'
import { useRouter } from 'next/router'
import ArtworkListItemDefinedSkeleton from '../../app/components/ArtworkListItemDefinedSkeleton/ArtworkListItemDefinedSkeleton'
import { Alert } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import { UPDATE_PROFILE_PICTURE } from '../../app/redux/actions/userActions'
import { capitalizeFirst } from '../../app/utils/util'
import Button from '../../app/components/Button/Button'

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useBreakpointDown } from "../../app/hooks/useBreakpointDown";
import Link from 'next/link'
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import { TokenContext } from '../../app/contexts/token-context'
import ArtistPriceSpan from '../../app/components/ArtistPriceSpan/ArtistPriceSpan'
import { LoadingContext } from '../../app/contexts/loading-context'
import { UserContext } from '../../app/contexts/user-context'
import { useRedirectToLoginIfNotLoggedIn } from '../../app/hooks/useRedirectToLoginIfNotLoggedIn'
import { Membership } from '../../app/models/Membership'
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../app/utils/googleAnalytics';
import UpgradePortfolio from '../../app/components/UpgradePortfolio/UpgradPortfolio'
import PurchaseRequestDialog from '../../app/components/PurchaseRequestDialog/PurchaseRequestDialog';
import usePostLike from '../../app/hooks/dataFetching/usePostLike';
import useRefreshToken from '../../app/hooks/useRefreshToken';
import usePostFollow from '../../app/hooks/dataFetching/usePostFollow';
import { getNavBarItems } from '../../app/utils/getNavBarItems';

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function Profile(props) {
  const { t } = useTranslation(['common', 'profile', 'upload', 'header']);
  const s = profileStyles();
  const rowWidth = useMainWidth().regular;
  const theme: Theme = useTheme();
  const router = useRouter();
  const smScreenOrSmaller = useBreakpointDown('sm');
  const { isSignedIn, username, socialId, membership } = useContext(UserContext);
  const profileUser = useGetProfileUser();
  const isMyProfile = profileUser === username.value;
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const {navBarItems, profile: staticUserProfile} = props;
  const canonicalURL = publicUrl + router.asPath;

  const [activeTab, setActiveTab] = useState(0);
  const [uploadSnackbarOpen, setUploadSnackbarOpen] = useState(false);
  const [uploadCoverSnackbarOpen, setUploadCoverSnackbarOpen] = useState(false);
  const [deleteArtworkSnackbarOpen, setDeleteArtworkSnackbarOpen] = useState(false);
  const [hasArtwork, setHasArtwork] = useState(false);
  const [artworkPrices, setArtworkPrices] = useState<number[]>([]);
  const [editArtworkOpen, setEditArtworkOpen] = useState(false);
  const [artworkToEdit, setArtworkToEdit] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const artworks = useGetArtworks(profileUser, username.value);
  const userProfileSummary = useGetUserProfileSummary(profileUser);
  const tags = useGetUserProfileTags(profileUser);
  const similarPortfolios = useGetSimilarPortfolios(profileUser);
  const userProfile = useGetUserProfile(profileUser, username.value);

  const [imageRows, setImageRows] = useState(null);
  const dispatch = useDispatch();
  const token = useContext(TokenContext);
  const [isFollowed, setFollow] = useState(userProfile?.data?.FollowedByMe);
  const { setLoading } = useContext(LoadingContext);

  const { like } = usePostLike();
  const { follow } = usePostFollow();
  const { refreshToken } = useRefreshToken();

  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] = useState(false);
  const [purchaseRequestDialogData, setPurchaseRequestDialogData] = useState({
    title: '',
    creator: '',
    url: '',
    referTo: '',
    imageurl: ''
  });

  useEffect(() => {
    if (!isReady) {
      setLoading(true);
    }
    if (isReady) {
      setLoading(false);
    }
  }, [isReady]);

  useEffect(() => {
    if (!isSignedIn.isPending && !userProfile.isLoading) {
      setIsReady(true);
    }
  },
    [isSignedIn, userProfile.isLoading]);

  const onUpdateProfilePicture = (profilePicture: any) => {
    dispatch({
      type: UPDATE_PROFILE_PICTURE,
      profilePicture: profilePicture
    });
  }

  useEffect(() => {
    setFollow(userProfile?.data?.FollowedByMe);
  }, [userProfile?.data?.FollowedByMe]);

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

    setArtworkPrices(artworks.data?.map(a => a.Price));
    setHasArtwork(artworks?.data !== null && artworks?.data?.length > 0);
  }, [artworks.data, imageRows]);

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
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId.value, token);
  }

  function toggleFollow() {
    redirectIfNotLoggedIn();
    follow(userProfileSummary.data?.SocialId, !isFollowed, socialId.value, token);
    setFollow(!isFollowed);
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
  const handleDeleteArtworkSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteArtworkSnackbarOpen(false);
  }

  function updateImage(blob, width: number, height: number, type: string) {
    refreshToken().then(() =>
      fetch(`${apiBaseUrl}/api/images?w=${width}&h=${height}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
          'Authorization': `Bearer ${token}`
        },
        body: blob
      }))
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
          throw response;
        }
        return response.text();
      })
      .then((name) => {
        const url = type === 'profile' ?
          `${apiBaseUrl}/api/profile/${username.value}/profilepicture?filename=${name}` :
          `${apiBaseUrl}/api/profile/${username.value}/coverphoto?filename=${name}`;

        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/jpeg',
            'Authorization': `Bearer ${token}`
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
                userProfile.mutate();
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

  const openEditArtworkDialog = (artwork) => {
    setArtworkToEdit(artwork);
    setEditArtworkOpen(true);
  }

  const onEditArtworkClose = async (promise) => {
    if (promise) {
      try {
        setEditArtworkOpen(false);
        setLoading(true);
        await promise;
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      artworks.mutate();
    } else {
      setEditArtworkOpen(false);
    }
  }

  function togglePurchaseRequestDialog() {
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen);
  }

  function onPurchaseRequestClick(title: string, creator: string, artworkId: string, referTo: string, imageurl: string) {
    const url = publicUrl + "/art/" + artworkId;
    referTo = userProfileSummary.data.SocialId;
    if (isSignedIn.value) {
      const originalRedirect = {
        pathname: "/messages",
        query: {
          artwork: encodeURIComponent(JSON.stringify({
            title: title,
            creator: creator,
            url: url,
            imageurl: imageurl
          })),
          referTo: referTo
        }
      }
      router.push(originalRedirect);
    } else {
      setPurchaseRequestDialogData({
        title: title,
        creator: creator,
        url: url,
        referTo: referTo,
        imageurl: imageurl
      })
      togglePurchaseRequestDialog();
    }
  }

  return (
    <Main navBarItems={navBarItems}>
      <Head>
        <title>{staticUserProfile && staticUserProfile.Name && staticUserProfile.Surname ? staticUserProfile?.Name + ' ' + staticUserProfile?.Surname : "Artportable"}</title>
        <meta name="title" content={staticUserProfile && staticUserProfile.Name && staticUserProfile.Surname ? staticUserProfile?.Name + ' ' + staticUserProfile?.Surname : "Artportable"} />
        <meta name="description" content={staticUserProfile?.Headline ?? ""} />

        <meta property="og:title" content={staticUserProfile && staticUserProfile.Name && staticUserProfile.Surname ? staticUserProfile?.Name + ' ' + staticUserProfile?.Surname : "Artportable"} />
        <meta property="og:description" content={staticUserProfile?.Headline ?? ""} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${publicUrl}/profile/@${staticUserProfile?.Username}`} />
        <meta property="og:image" content={`${bucketUrl}${staticUserProfile?.CoverPhoto}`} />
        
        <link rel="canonical" href={canonicalURL} />
      </Head>
      {isReady &&
        <>
          <FullWidthBlock>
            {userProfile?.isLoading && <div>Loading...</div>}
            {!userProfile?.isLoading && !userProfile?.isError &&
              <ProfileCoverPhoto coverPhoto={userProfile?.data?.CoverPhoto} onUpdateCoverPhoto={updateImage} isMyProfile={isMyProfile} />
            }
            {userProfile?.isError && <div>error...</div>}
          </FullWidthBlock>
          <div className={s.profileGrid}>
            <div className={s.profileSummary}>
              <ProfileComponent userProfile={userProfileSummary} userProfilePicture={isMyProfile ? profilePicture : userProfileSummary.data?.ProfilePicture} onUpdateProfilePicture={updateImage} isMyProfile={isMyProfile} linkToProfile={false}></ProfileComponent>
            </div>
            <div className={s.editActions}>
              {isMyProfile ?
                <>
                  <EditProfileDialog
                    userProfile={userProfile.data}
                  />
                  {(membership.value > Membership.Base) &&
                    <div className={s.upload}>
                      <Link href="/upload">
                        <a>
                          <Button
                            className={s.uploadButton}
                            onClick={() => trackGoogleAnalytics(ActionType.UPLOAD_IMAGE_PROFILE, CategoryType.INTERACTIVE)}
                            size="small"
                            variant="contained"
                            color="primary"
                            disableElevation="true"
                            startIcon={<UploadIcon className={s.uploadIcon} />}
                            rounded>
                            {t('upload:upload')}
                          </Button>
                        </a>
                      </Link>
                    </div>
                  }

                  {(membership.value < Membership.Portfolio) &&
                    <UpgradePortfolio />
                  }
                </>
                :
                <>
                  {
                    <Button
                      onClick={() => {
                        redirectIfNotLoggedIn({
                          pathname: "/messages",
                          query: {
                            referTo: userProfileSummary.data?.SocialId
                          }
                        });
                        trackGoogleAnalytics(ActionType.SEND_MESSAGE, CategoryType.INTERACTIVE)
                      }}
                      className={s.followButton}
                      size={smScreenOrSmaller ? 'small' : 'medium'}
                      variant={"contained"}
                      color="primary"
                      startIcon={<ChatIcon className={s.chatIcon} color={"inherit"} />}
                      disableElevation
                      rounded
                      disabled={!isSignedIn}>
                      <div className={s.messageButtonText}> {capitalizeFirst(t('common:message'))}</div>
                    </Button>
                  }
                  <Button
                    className={s.followButton}
                    size={smScreenOrSmaller ? 'small' : 'medium'}
                    variant={!isFollowed ? "contained" : "outlined"}
                    color="primary"
                    startIcon={!isFollowed ? <AddIcon /> : null}
                    disableElevation
                    rounded
                    disabled={!isSignedIn}
                    onClick={() => { toggleFollow(); !isFollowed ? trackGoogleAnalytics(ActionType.FOLLOW_PROFILE, CategoryType.INTERACTIVE) : null }}>
                    {capitalizeFirst(
                      !isFollowed ?
                        t('common:words.follow') :
                        t('common:words.following')
                    )}
                  </Button>
                </>
              }
            </div>
            {userProfile.data?.MonthlyArtist &&
              <div className={s.catalogued}>
                <img
                  src="/Artportable_Emblem_Gold.svg"
                  alt="Logo Artportable"
                  className={s.emblem}
                />
              </div>
            }
            <Divider className={s.divider}></Divider>

            <ArtistPriceSpan prices={artworkPrices} />
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
                                width={smScreenOrSmaller ? '100%' : image.Width}
                                height={smScreenOrSmaller ? 'auto' : image.Height}
                                artwork={artwork}
                                topActions={isMyProfile ?
                                  <>
                                    <Button
                                      className={s.editButton}
                                      variant="contained"
                                      color="default"
                                      rounded
                                      onClick={() => openEditArtworkDialog(artwork)}
                                      startIcon={<EditIcon />}>
                                    </Button>

                                  </> : undefined
                                }
                                onPurchaseRequestClick={onPurchaseRequestClick}
                                purchaseRequestAction={ActionType.PURCHASE_REQUEST_LIST_PROFILE}
                                onLikeClick={onLikeClick} />
                            }
                          }
                          )}
                        </div>
                      )}
                      <PurchaseRequestDialog
                        open={purchaseRequestDialogOpen}
                        onClose={togglePurchaseRequestDialog}
                        props={{
                          pathname: "/messages",
                          title: purchaseRequestDialogData.title,
                          creator: purchaseRequestDialogData.creator,
                          url: purchaseRequestDialogData.url,
                          referTo: purchaseRequestDialogData.referTo,
                          imageUrl: purchaseRequestDialogData.imageurl
                        }}
                      />
                      <EditArtworkDialog
                        artwork={artworkToEdit}
                        open={editArtworkOpen}
                        onClose={onEditArtworkClose} />
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
          <Snackbar open={deleteArtworkSnackbarOpen} autoHideDuration={6000} onClose={handleDeleteArtworkSnackbarClose}>
            <Alert onClose={handleDeleteArtworkSnackbarClose} variant="filled" severity="success">
              {t('profile:deleteArtworkSuccess')}
            </Alert>
          </Snackbar>
        </>
      }
    </Main>
  );
}

export async function getServerSideProps({ locale, params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const split = params.username.split('@');
  const username = split.length > 1 ? split[1] : null;
  const url = new URL(`${apiBaseUrl}/api/profile/${encodeURIComponent(username)}`);

  try {
    const profileResponse = await fetch(url.href);
    const profile = await profileResponse.json();
    const navBarItems = await getNavBarItems(); 
    return {
      props: {
        navBarItems: navBarItems,
        profile: profile,
        locale: locale,
        ...await serverSideTranslations(locale, ['common', 'header', 'footer', 'profile', 'tags', 'art', 'upload', 'support', 'plans']),
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      locale: locale,
      ...await serverSideTranslations(locale, ['common', 'header', 'footer', 'profile', 'tags', 'art', 'upload', 'support', 'plans']),
    }
  }
}