import React, { useContext, useEffect } from "react";
import FeedCard from "../FeedCard/FeedCard";
import { useGetFeedItems } from "../../hooks/dataFetching/useGetFeedItems";
import { isNullOrUndefined } from "../../utils/util";
import InviteFriendsFeed from "../InviteFriends/InviteFriendsFeed";
import { styles } from "./feed.css";
import TrendingArtworksCard from "../TrendingArtworks/TrendingArtworksCard";
import { UserContext } from "../../../app/contexts/user-context";

interface FeedProps {
  user: string;
  index: number;
  onLikeClick: any;
  fetchMorePosts: any;
  setFetchMorePosts: any;
  entriesCount: any;
  setEntriesCount: any;
  trendingArtworks: any;
}

export default function Feed({
  user,
  index,
  onLikeClick,
  fetchMorePosts,
  setFetchMorePosts,
  setEntriesCount,
  entriesCount,
  trendingArtworks,
}: FeedProps) {
  const page = index + 1;
  const { data, error } = useGetFeedItems(user, page);
  const s = styles();
  const { username, socialId, isSignedIn } = useContext(UserContext);

  useEffect(() => {
    if (error) {
      setFetchMorePosts(false);
    }
    if (data) {
      if (data.length <= 0) {
        setFetchMorePosts(false);
      }
      setEntriesCount(entriesCount + data.length);
    }
  }, [data, error]);

  const random = Math.random();
  const isTrendingArtworksFirst = random >= 0.5;

  return (
    <>
      <div className={s.divInviteButton}>
        <InviteFriendsFeed />
      </div>
      {isTrendingArtworksFirst ? (
        <>
          <TrendingArtworksCard />
          {user &&
            data
              ?.filter((item) => item.User !== username.value)
              .map((item) => (
                <FeedCard
                  key={item.Item.Id}
                  content={item}
                  onLikeClick={onLikeClick}
                />
              ))}
        </>
      ) : (
        <>
          {user &&
            data
              ?.filter((item) => item.User !== username.value)
              .map((item) => (
                <FeedCard
                  key={item.Item.Id}
                  content={item}
                  onLikeClick={onLikeClick}
                />
              ))}
          <TrendingArtworksCard />
        </>
      )}
    </>
  );
}
