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
import { useGetUserProfileSummary } from '../app/hooks/dataFetching/UserProfile';
import { useInfiniteScroll } from '../app/hooks/useInfiniteScroll';
import { useUser } from '../app/hooks/useUser';
import { Membership } from '../app/models/Membership';

export default function FeedPage() {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);
  const { username, membership } = useUser();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  const userProfile = useGetUserProfileSummary(username);
  const { suggestedUsers } = useFollowRecommendations(username);

  const loadMoreElement = useRef(null);
  const pages = [];
  const pageCount = useInfiniteScroll(loadMoreElement);
  const [fetchMorePosts, setFetchMorePosts] = useState(true);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [entriesCount, setEntriesCount] = useState(0);

  if (username) {
    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <Feed key={i} user={username} index={i} onLikeClick={likePost} fetchMorePosts={fetchMorePosts} entriesCount={entriesCount} setEntriesCount={setEntriesCount} setFetchMorePosts={setFetchMorePosts}></Feed>
      );
    }
  }

  useEffect(() => {
    if (!fetchMorePosts && entriesCount <= 0) {
      setIsNoPosts(true);
    }
  }, [fetchMorePosts]);

  function follow(user) {
    fetch(`${apiBaseUrl}/api/connections/${user}?myUsername=${username}`, {
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
    fetch(`${apiBaseUrl}/api/artworks/${contentId}/like?myUsername=${username}`, {
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
            {membership === Membership.PortfolioPremium &&
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
            }
            {/* <NewsletterCard></NewsletterCard> */}
          </div>
          <div className={s.colFeed}>
            {(username && !isNoPosts) ? (
              <>
                {pages}
                {(fetchMorePosts) &&
                  <>
                    <div ref={loadMoreElement}>
                      <FeedCardSkeleton></FeedCardSkeleton>
                    </div>
                  </>
                }
              </>
            ) : (<p>{t('noPosts')}</p>)}

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
