import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Main from "../../app/components/Main/Main";
import { useGetArtwork } from "../../app/hooks/dataFetching/Artworks";
import { Box, Chip, Paper, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { styles } from "../../styles/art.css";
import { capitalizeFirst } from "../../app/utils/util";
import Button from "../../app/components/Button/Button";
import AvatarCard from "../../app/components/AvatarCard/AvatarCard";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { useStore } from "react-redux";
import { useUser } from "../../app/hooks/useUser";
import TagChip from "../../app/components/TagChip/TagChip";

export default function ArtworkPage(props) {
  const s = styles();
  const { t } = useTranslation(['art', 'common', 'tags']);
  const router = useRouter();
  const store = useStore();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  const { id } = router.query
  const { username } = useUser();
  const artwork = useGetArtwork(id as string, username);

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
    if (username === null || username === undefined) {
      return; // TODO: Display modal to sign up
    }

    fetch(`${apiBaseUrl}/api/connections/${userToFollow}?myUsername=${username}`, {
      method: isFollow ? 'POST' : 'DELETE',
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
    follow(artwork.data.Owner.Username, !isFollowed);
    setFollow(!isFollowed);
  }

  // Like a post (feed item)
  // `isLike` states whether it's a like or an unlike
  function likeArtwork(isLike) {
    if (username === null || username === undefined) {
      return; // TODO: Display modal to sign up
    }

    fetch(`${apiBaseUrl}/api/artworks/${artwork.data.Id}/like?myUsername=${username}`, {
      method: isLike ? 'POST' : 'DELETE',
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

  return (
    <Main>
      {artwork.isLoading && <div>loading...</div>}
      {artwork.isError && <div>error...</div>}

      {artwork && artwork.data &&
        <div className={s.container}>
          <div className={s.avatar}>
            <AvatarCard user={artwork.data.Owner}></AvatarCard>
            <Button
              className={s.followButton}
              variant={!isFollowed ? "contained" : "outlined"}
              color="primary"
              startIcon={!isFollowed ? <AddIcon/> : null}
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
          <Paper className={s.card}>
            <div className={s.imageContainer}>
              <img
                src={`${bucketUrl}${artwork.data.PrimaryFile.Name}`}
                className={s.primaryImage}
                width={artwork.data.PrimaryFile.Width > artwork.data.PrimaryFile.Height ? artwork.data.PrimaryFile.Width : null}
                height={artwork.data.PrimaryFile.Height > artwork.data.PrimaryFile.Width ? artwork.data.PrimaryFile.Height : null}
              />
            </div>
            <div className={s.actionBar}>
              <Button
                startIcon={<FavoriteIcon color={isLiked ? "secondary" : "inherit"}/>}
                onClick={() => {
                  likeArtwork(!isLiked);
                  setIsLiked(!isLiked);
                } }>
                {capitalizeFirst(t('like'))}
              </Button>
              {/* <Button // TODO: Implement Share functionality
                variant="outlined"
                size='small'
                color="primary"
                disableElevation
                rounded
                startIcon={<ShareIcon/>}>
                  Share
              </Button> */}
            </div>
            <div className={s.infoBar}>
              {artwork.data.Likes > 0 &&
                <p>{artwork.data.Likes} {t('peopleLikeThis')}</p>
              }
              <p>{formatter.format(artwork.data.Price)} </p>
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
              {Array.from(artwork.data.Tags).map((tag: string) =>
                {
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
        </div>
      }
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      locale: locale,
      ...await serverSideTranslations(locale, ['header', 'art', 'common', 'tags']),
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
