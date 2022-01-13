import React, { useContext, useEffect, useState } from "react";
import Head from 'next/head';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Main from "../../app/components/Main/Main";
import { useGetArtwork } from "../../app/hooks/dataFetching/Artworks";
import { Box, IconButton, Paper, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { styles } from "../../styles/art.css";
import { capitalizeFirst } from "../../app/utils/util";
import Button from "../../app/components/Button/Button";
import AvatarCard from "../../app/components/AvatarCard/AvatarCard";
import FavoriteIcon from '@material-ui/icons/Favorite';
import TagChip from "../../app/components/TagChip/TagChip";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import Link from "next/link";
import { TokenContext } from "../../app/contexts/token-context";
import { UserContext } from "../../app/contexts/user-context";
import { useRedirectToLoginIfNotLoggedIn } from "../../app/hooks/useRedirectToLoginIfNotLoggedIn";
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../app/utils/googleAnalytics';

export default function ArtworkPage(props) {
  const s = styles();
  const { t } = useTranslation(['art', 'common', 'tags']);
  const router = useRouter();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const staticArtwork = props.artwork;

  const { id } = router.query
  const { username, socialId } = useContext(UserContext);
  const artwork = useGetArtwork(id as string, username.value);
  const token = useContext(TokenContext);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();

  const [isFollowed, setFollow] = useState(artwork?.data?.Owner?.FollowedByMe); // TODO: Fetch and initialize with FollowedByMe
  const [isLiked, setIsLiked] = useState(artwork?.data?.LikedByMe);

  const { isSignedIn } = useContext(UserContext);

  const formatter = new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    setFollow(artwork?.data?.Owner?.FollowedByMe);
  }, [artwork?.data?.Owner?.FollowedByMe]);

  useEffect(() => {
    setIsLiked(artwork?.data?.LikedByMe);
  }, [artwork?.data]);

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

  function toggleFollow() {
    redirectIfNotLoggedIn();
    follow(artwork.data.Owner.SocialId, !isFollowed);
    setFollow(!isFollowed);
  }

  // Like a post (feed item)
  // `isLike` states whether it's a like or an unlike
  function likeArtwork(isLike) {
    redirectIfNotLoggedIn();

    fetch(`${apiBaseUrl}/api/artworks/${artwork.data.Id}/like?mySocialId=${socialId.value}`, {
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
        setIsLiked(!isLiked)
        console.log(error);
      })
  }

  function toggleLike(event) {
    event.stopPropagation();

    likeArtwork(!isLiked);
    setIsLiked(!isLiked);
    !isLiked ? artwork.data.Likes++ : artwork.data.Likes--;
    !isLiked ? trackGoogleAnalytics(ActionType.GILLA_KONSTKORT, CategoryType.INTERACTIVE) : null
  }

  const likedColor = !isSignedIn.value ?
  'disabled' :
  isLiked ? "secondary" : "inherit";
  
  return (
    <Main wide>
      <Head>
        <meta property="og:title" content={staticArtwork?.Title} />
        <meta property="og:description" content={staticArtwork?.Description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${publicUrl}/art/${staticArtwork?.Id}`} />
        <meta property="og:image" content={`${bucketUrl}${staticArtwork?.PrimaryFile?.Name}`} />
      </Head>
      <div className={s.container}>
        <div className={s.backBtnContainer}>
          <IconButton
            onClick={() => router.back()}>
            <ArrowBackIcon />
          </IconButton>
        </div>

        {artwork.isLoading && <div>loading...</div>}
        {artwork.isError && <div>error...</div>}

        {artwork && artwork.data &&
          <>
            <div className={s.avatar}>
              <AvatarCard user={artwork.data.Owner}></AvatarCard>
              <Button
                className={s.followButton}
                variant={!isFollowed ? "contained" : "outlined"}
                color="primary"
                startIcon={!isFollowed ? <AddIcon /> : null}
                disableElevation
                rounded
                onClick={() => { toggleFollow(); !isFollowed ? trackGoogleAnalytics(ActionType.FÖLJ_KONSTKORT, CategoryType.INTERACTIVE) : null}}>
                {capitalizeFirst(
                  !isFollowed ?
                    t('common:words.follow') :
                    t('common:words.following')
                )}
              </Button>
            </div>
            <Paper classes={{ root: s.paper }}>
              <div className={s.imageContainer}>
                <img
                  src={`${bucketUrl}${artwork.data.PrimaryFile.Name}`}
                  className={s.primaryImage}
                />
              </div>
              <div className={s.actionBar}>
                <Button
                //  onClick={() => { toggleLike; !isLiked ? likeButton() : null}}
                 onClick={toggleLike}
                  startIcon={<FavoriteIcon color={likedColor} />}
                 >
                  {capitalizeFirst(t('common:like'))}
                </Button>
                {username.value !== artwork.data.Owner.Username &&
                  <Button
                    onClick={() => {
                      redirectIfNotLoggedIn({
                        pathname: "/messages",
                        query: {
                          artwork: encodeURIComponent(JSON.stringify({
                            title: artwork.data.Title,
                            creator: artwork.data.Owner.Username,
                            url: window.location.href
                          })),
                          referTo: artwork.data.Owner.SocialId
                        }
                      });
                      trackGoogleAnalytics(ActionType.KÖPFÖRFRÅGAN_PORTFOLIE, CategoryType.BUY);
                    }}
                    startIcon={<SendIcon color={"inherit"} />}>
                    {capitalizeFirst(t('common:purchaseRequest'))}
                  </Button>
                } 
              </div>
              <div className={s.infoBar}>
                {artwork.data.Likes > 0 &&
                  <span>{artwork.data.Likes} {t('peopleLikeThis')}</span>
                }
                <Box>
                  {artwork.data.SoldOut ? 
                    <span>{t('sold')}</span> : 
                    artwork.data.Price && artwork.data.Price != "0" ?
                      <span>{formatter.format(artwork.data.Price)} </span> :
                      <span>{t('priceOnRequest')}</span>
                  }
                  <div className={s.sizeBar}> 
                  {artwork.data.MultipleSizes ? 
                    t('multipleSizes') : 
                    artwork.data.Width && artwork.data.Height && artwork.data.Depth ? 
                      artwork.data.Width + 'x' + artwork.data.Height + 'x' + artwork.data.Depth + 'cm' : 
                      artwork.data.Width && artwork.data.Height ? 
                        artwork.data.Width + 'x' + artwork.data.Height + 'cm': 
                        null
                  }
                </div>
                </Box>
              </div>

              <Box textAlign="center" marginY={2} className={s.text}>
                {artwork.data.Title &&
                  <Typography variant="h3" component="h2" id="artwork-modal-title">
                    <Box fontWeight="500" fontFamily="LyonDisplay" marginBottom={2}>
                      {artwork.data.Title}
                    </Box>
                  </Typography>
                }
                {artwork.data.Description &&
                  <Typography variant="body1" id="artwork-modal-description">
                    {artwork.data.Description}
                  </Typography>
                }
              </Box>
              <Box className={s.extraImages}>
                {artwork.data.SecondaryFile &&
                  <div className={s.imageContainer}>
                    <img
                      src={`${bucketUrl}${artwork.data.SecondaryFile.Name}`}
                      className={s.extraImage}
                    />
                  </div>
                }
                {artwork.data.TertiaryFile &&
                  <div className={s.imageContainer}>
                    <img
                      src={`${bucketUrl}${artwork.data.TertiaryFile.Name}`}
                      className={s.extraImage}
                    />
                  </div>
                }
              </Box>
              <Box className={s.tagsContainer} marginBottom={2}>
                {Array.from(artwork.data.Tags).map((tag: string) => {
                  return <TagChip
                    key={tag}
                    title={tag}
                    onChipClick={null}
                    limitReached={true}>
                  </TagChip>;
                }
                )}
              </Box>
            </Paper>
          </>
        }
      </div>
    </Main>
  );
}

export async function getStaticProps({ locale, params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = new URL(`${apiBaseUrl}/api/artworks/${encodeURIComponent(params.id)}`);

  try {
    const artworkResponse = await fetch(url.href);
    const artwork = await artworkResponse.json();
    
    return {
      props: {
        artwork,
        locale: locale,
        ...await serverSideTranslations(locale, ['header', 'footer', 'art', 'common', 'tags', 'support', 'plans']),
      },
      revalidate: 10
    };
  } catch (error) {
    console.log(error);
  } 

  return {
    props: {
      artwork: { Id: params.id },
      locale: locale,
      ...await serverSideTranslations(locale, ['header', 'footer', 'art', 'common', 'tags', 'support', 'plans']),
    },
    revalidate: 10
  };
}

export const getStaticPaths = () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}
