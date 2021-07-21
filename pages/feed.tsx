import React, { useEffect, useRef, useState } from 'react';
import Feed from '../app/components/Feed/Feed';
import Head from 'next/head'
import Link from 'next/link'
import Main from '../app/components/Main/Main'
import Button from '../app/components/Button/Button'
import Box from '@material-ui/core/Box'
import ProfileCard from '../app/components/ProfileCard/ProfileCard'
import FollowSuggestionCard from '../app/components/FollowSuggestionCard/FollowSuggestionCard'
import NewsletterCard from '../app/components/NewsletterCard/NewsletterCard'
import FeedCardSkeleton from '../app/components/FeedCardSkeleton/FeedCardSkeleton'

import { styles } from '../styles/feed.css';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useFollowRecommendations } from '../app/hooks/dataFetching/useFollowRecommendations';
import { debounce } from '@material-ui/core/utils';
import { useStore } from 'react-redux';
import { useGetUserProfileSummary } from '../app/hooks/dataFetching/UserProfile';
import { useRouter } from 'next/router';
import { useInfiniteScroll } from '../app/hooks/useInfiniteScroll';
import { useIsAuthenticated } from '../app/hooks/useIsAuthenticated';

export default function FeedPage() {
  const s = styles();
  const store = useStore();
  const router = useRouter();
  const { t } = useTranslation(['feed', 'common']);
  const { isAuthenticated } = useIsAuthenticated();;
  const myUsername = store.getState()?.user?.username;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  const userProfile = useGetUserProfileSummary(myUsername);
  const { suggestedUsers } = useFollowRecommendations(myUsername);

  const loadMoreElement = useRef(null);
  const pages = [];
  const pageCount = useInfiniteScroll(loadMoreElement);

  for (let i = 0; i < pageCount; i++) {
    pages.push(<Feed key={i} user={myUsername} index={i} onLikeClick={likePost}></Feed>);
  }

  function follow(username) {
    fetch(`${apiBaseUrl}/api/connections/${username}?myUsername=${myUsername}`, {
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

  // Like a post (feed item)
  // `isLike` states whether it's a like or an unlike
  function likePost(contentId, isLike) {
    fetch(`${apiBaseUrl}/api/artworks/${contentId}/like?myUsername=${myUsername}`, {
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

  useEffect(() => {
    // TODO: Do redirect of unauthed users in a better way
    if (!isAuthenticated) {
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Box className={s.feedContainer}>
          <div className={s.colLeft}>
            <ProfileCard userProfile={userProfile}></ProfileCard>
            <Link href="/upload">
              <a>
                <Button
                  className={s.uploadArtButton}
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation>
                    {t('uploadNewWorkOfArt')}
                </Button>
              </a>
            </Link>
            <NewsletterCard></NewsletterCard>
          </div>
          <div className={s.colFeed}>
            {myUsername ? (
              <>
                {pages}
                <div ref={loadMoreElement}>
                  <FeedCardSkeleton></FeedCardSkeleton>
                </div>
              </>
            ) : (<p>No posts to show...</p>)}
          </div>
          <div className={s.colRight}>
            <FollowSuggestionCard suggestedUsers={suggestedUsers} onFollowClick={follow}></FollowSuggestionCard>
          </div>
        </Box>
      </Main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'feed']),
    }
  }
}
