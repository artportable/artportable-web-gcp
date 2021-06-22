import React, { useState } from "react";
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
import { useStore } from "react-redux";

export default function ArtworkPage() {
  const s = styles();
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const store = useStore();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  const { id } = router.query
  const artwork = useGetArtwork(id as string);
  const username = store.getState()?.user?.username;

  const [isFollowed, setFollow] = useState(false); // TODO: Fetch and initialize with FollowedByMe

  function follow(userToFollow) {
    if (username === null || username === undefined) {
      return; // TODO: Display modal to sign up
    }

    fetch(`${apiBaseUrl}/api/connections/${userToFollow}?myUsername=${username}`, {
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
              variant="contained"
              color="primary"
              disabled={isFollowed}
              startIcon={!isFollowed ? <AddIcon/> : null}
              disableElevation
              rounded
              onClick={() => {
                follow(artwork.data.Owner.Username);
                setFollow(true);
              }}>
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
              {artwork.data.Tags?.map((tag: string) =>
                <Chip key={tag} label={tag} color="primary" className={s.chip}></Chip>
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
      ...await serverSideTranslations(locale, ['header', 'common']),
    }
  };
}

export const getStaticPaths = async () => {  
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
 }
}
