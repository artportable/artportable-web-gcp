import React, { useContext, useEffect, useRef, useState } from "react";
import Feed from "../app/components/Feed/Feed";
import Head from "next/head";
import Link from "next/link";
import Main from "../app/components/Main/Main";
import Button from "../app/components/Button/Button";
import Box from "@material-ui/core/Box";
import ProfileCard from "../app/components/ProfileCard/ProfileCard";
import FollowSuggestionCard from "../app/components/FollowSuggestionCard/FollowSuggestionCard";
import FeedCardSkeleton from "../app/components/FeedCardSkeleton/FeedCardSkeleton";

import { styles } from "../styles/feed.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useFollowRecommendations } from "../app/hooks/dataFetching/useFollowRecommendations";
import {
  useGetUserProfilePicture,
  useGetUserProfileSummary,
} from "../app/hooks/dataFetching/UserProfile";
import { useInfiniteScroll } from "../app/hooks/useInfiniteScroll";

import { Membership } from "../app/models/Membership";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { TokenContext } from "../app/contexts/token-context";
import { UserContext } from "../app/contexts/user-context";
import { useRouter } from "next/router";
import { LoadingContext } from "../app/contexts/loading-context";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../app/utils/googleAnalytics";
import usePostLikeEmail from "../app/hooks/dataFetching/usePostLikeEmail";
import usePostFollow from "../app/hooks/dataFetching/usePostFollow";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import axios from "axios";
import { FeedItem } from "../app/models/FeedItem";
import { useGetTrendingArtworks } from "../app/hooks/dataFetching/Artworks";
import { Router } from "next/router";

export default function FeedPage({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["feed", "common"]);
  const { username, socialId, membership } = useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const token = useContext(TokenContext);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const userProfile = useGetUserProfileSummary(username.value);
  const { suggestedUsers } = useFollowRecommendations(username.value);
  const mdPlusScreenOrDown = useBreakpointDown("mdPlus");
  const xsScreenOrDown = useBreakpointDown("xs");

  const loadMoreElement = useRef(null);
  const [pages, setPages] = useState([]);
  const pageCount = useInfiniteScroll(loadMoreElement);
  const [fetchMorePosts, setFetchMorePosts] = useState(true);
  const [isNoPosts, setIsNoPosts] = useState(false);
  const [entriesCount, setEntriesCount] = useState(0);

  const router = useRouter();
  const { isSignedIn } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);

  const { likeEmail } = usePostLikeEmail();
  const { follow } = usePostFollow();
  const { data, isLoading, isError } = useGetTrendingArtworks();

  useEffect(() => {
    setLoading(true);

    const checkSignedInAsync = async () => {
      if (!isSignedIn.isPending) {
        if (!isSignedIn.value) {
          await router.push("/");
        }
        setLoading(false);
      }
    };

    checkSignedInAsync();
  }, [isSignedIn]);

  useEffect(() => {
    if (username.value) {
      var pageList = [];
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
            trendingArtworks={data}
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

  function followUser(userSocialId, isFollow) {
    follow(userSocialId, isFollow, socialId.value, token);
  }

  function likePost(content, isLike) {
    likeEmail(content, isLike);
  }

  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main wide={mdPlusScreenOrDown ? true : false} navBarItems={navBarItems}>
        <div className={s.margin}></div>
        {!loading && (
          <Box className={s.feedContainer}>
            {!xsScreenOrDown && (
              <div className={s.sidebarLeft}>
                <div className={s.colLeft}>
                  <ProfileCard
                    userProfile={userProfile}
                    userProfilePicture={profilePicture}
                  ></ProfileCard>
                  {/*{membership.value > Membership.Base &&
                  <Link href="/upload">
                    <a>
                      <Button
                        className={s.uploadArtButton}
                        size="small"
                        variant="contained"
                        color="primary"
                        rounded
                        onClick={trackGoogleAnalytics(ActionType.UPLOAD_IMAGE_FEED, CategoryType.INTERACTIVE)}
                        disableElevation>
                        {t('uploadNewWorkOfArt')}
                      </Button>
                    </a>
                  </Link>
                }*/}
                  {/* <NewsletterCard></NewsletterCard> */}
                </div>
                <div className={s.colFollow}>
                  <FollowSuggestionCard
                    suggestedUsers={suggestedUsers}
                    onFollowClick={followUser}
                  ></FollowSuggestionCard>
                </div>
              </div>
            )}
            <div className={s.colFeed}>
              <>
                {pages}
                <>
                  <div ref={loadMoreElement}>
                    <FeedCardSkeleton></FeedCardSkeleton>
                  </div>
                </>
              </>
            </div>
          </Box>
        )}
      </Main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "feed",
        "support",
        "plans",
        "forms",
      ])),
    },
    revalidate: 60,
  };
}
