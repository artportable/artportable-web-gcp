import React, { useContext, useEffect, useRef, useState } from 'react';
import Feed from '../app/components/Feed/Feed';
import Head from 'next/head'
import Link from 'next/link'
import Main from '../app/components/Main/Main'
import Button from '../app/components/Button/Button'
import Box from '@material-ui/core/Box'
import ProfileCard from '../app/components/ProfileCard/ProfileCard'
import FollowSuggestionCard from '../app/components/FollowSuggestionCard/FollowSuggestionCard'
import FeedCardSkeleton from '../app/components/FeedCardSkeleton/FeedCardSkeleton'

import { styles } from '../styles/feed.css';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useFollowRecommendations } from '../app/hooks/dataFetching/useFollowRecommendations';
import { useGetUserProfilePicture, useGetUserProfileSummary } from '../app/hooks/dataFetching/UserProfile';
import { useInfiniteScroll } from '../app/hooks/useInfiniteScroll';

import { Membership } from '../app/models/Membership';
import { useBreakpointDown } from '../app/hooks/useBreakpointDown'
import { TokenContext } from '../app/contexts/token-context';
import { UserContext } from '../app/contexts/user-context';

export default function FeedPage() {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);
  const { username, membership } = useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const token = useContext(TokenContext);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const userProfile = useGetUserProfileSummary(username.value);
  const { suggestedUsers } = useFollowRecommendations(username.value);
  const mdPlusScreenOrDown = useBreakpointDown('mdPlus');

  const loadMoreElement = useRef(null);
  const [pages, setPages] = useState([]);
  const pageCount = useInfiniteScroll(loadMoreElement); 
  const [fetchMorePosts, setFetchMorePosts] = useState(true);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [entriesCount, setEntriesCount] = useState(0);


  useEffect(() => {
    if (username.value) {
      var pageList = []
      for (let i = 0; i < pageCount; i++) {
        pageList.push(
          <Feed 
            key={i} 
            user={username.value} 
            index={i} 
            onLikeClick={likePost} 
            fetchMorePosts={fetchMorePosts} 
            entriesCount={entriesCount} 
            setEntriesCount={setEntriesCount} 
            setFetchMorePosts={setFetchMorePosts}
          />
        );
      }
      setPages(pageList);
    }
  }, [username.value, pageCount]);

  useEffect(() => {
    if (!fetchMorePosts && entriesCount <= 0) {
      setIsNoPosts(true);
    }
  }, [fetchMorePosts]);

  function follow(user, isFollow) {
    fetch(`${apiBaseUrl}/api/connections/${user}?myUsername=${username.value}`, {
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

  // Like a post (feed item)
  // `isLike` states whether it's a like or an unlike
  function likePost(contentId, isLike) {
    fetch(`${apiBaseUrl}/api/artworks/${contentId}/like?myUsername=${username.value}`, {
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
        console.log(error);
      })
  }

  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main wide={mdPlusScreenOrDown ? true : false}>
        <Box className={s.feedContainer}>
          {!mdPlusScreenOrDown && 
            <div className={s.colLeft}>
              <ProfileCard userProfile={userProfile} userProfilePicture={profilePicture}></ProfileCard>
              {membership.value === Membership.PortfolioPremium &&
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
          }
          <div className={s.colFeed}>
            {(username.value && !isNoPosts) ? (
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
      ...await serverSideTranslations(locale, ['common', 'header', 'footer', 'feed']),
    }
  }
}
