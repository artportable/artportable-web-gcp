import React, { useContext, useEffect, useState } from "react";
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

export default function ArtworkPage(props) {
  const s = styles();
  const { t } = useTranslation(['art', 'common', 'tags']);
  const router = useRouter();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { id } = router.query
  const { username } = useContext(UserContext);
  const artwork = useGetArtwork(id as string, username.value);
  const token = useContext(TokenContext);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();

  const [isFollowed, setFollow] = useState(artwork?.data?.Owner?.FollowedByMe); // TODO: Fetch and initialize with FollowedByMe
  const [isLiked, setIsLiked] = useState(artwork?.data?.LikedByMe);

  const formatter = new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: 'SEK',
  });

  useEffect(() => {
    setFollow(artwork?.data?.Owner?.FollowedByMe);
  }, [artwork?.data?.Owner?.FollowedByMe]);

  useEffect(() => {
    setIsLiked(artwork?.data?.LikedByMe);
  }, [artwork?.data]);

  function follow(userToFollow, isFollow) {
    if (username.value === null || username.value === undefined) {
      return; // TODO: Display modal to sign up
    }

    fetch(`${apiBaseUrl}/api/connections/${userToFollow}?myUsername=${username.value}`, {
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
    follow(artwork.data.Owner.Username, !isFollowed);
    setFollow(!isFollowed);
  }

  // Like a post (feed item)
  // `isLike` states whether it's a like or an unlike
  function likeArtwork(isLike) {
    redirectIfNotLoggedIn();

    fetch(`${apiBaseUrl}/api/artworks/${artwork.data.Id}/like?myUsername=${username.value}`, {
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
  }

  return (
    <Main wide>
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
                onClick={toggleFollow}>
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
                  startIcon={<FavoriteIcon color={isLiked ? "secondary" : "inherit"} />}
                  onClick={toggleLike}>
                  {capitalizeFirst(t('common:like'))}
                </Button>
                {username.value !== artwork.data.Owner.Username &&
                  <Link
                    href={{
                      pathname: "/messages",
                      query: {
                        artwork: btoa(JSON.stringify({
                          title: artwork.data.Title,
                          creator: artwork.data.Owner.Username,
                          url: window.location.href
                        })),
                        referTo: artwork.data.Owner.KeycloakId
                      }
                    }}
                    as={`/messages`}
                  >
                    <a>
                      <Button
                        onClick={() => redirectIfNotLoggedIn()}
                        startIcon={<SendIcon color={"inherit"} />}>
                        {capitalizeFirst(t('common:purchaseRequest'))}
                      </Button>
                    </a>
                  </Link>
                }
              </div>
              <div className={s.infoBar}>
                {artwork.data.Likes > 0 &&
                  <p>{artwork.data.Likes} {t('peopleLikeThis')}</p>
                }
                {artwork.data.Price &&
                  <p>{formatter.format(artwork.data.Price)} </p>
                }
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale: locale,
      ...await serverSideTranslations(locale, ['header', 'footer', 'art', 'common', 'tags']),
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
