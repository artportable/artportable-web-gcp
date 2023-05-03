import React, { useContext, useEffect, useMemo } from "react";
import FeedCard from "../FeedCard/FeedCard";
import { useGetFeedItems } from "../../hooks/dataFetching/useGetFeedItems";
import InviteFriendsFeed from "../InviteFriends/InviteFriendsFeed";
import { styles } from "./feed.css";
import TrendingArtworksCard from "../TrendingArtworks/TrendingArtworksCard";
import { UserContext } from "../../contexts/user-context";

type FeedProps = {
  user: string;
  index: number;
  onLikeClick: (id: string) => void;
  fetchMorePosts: boolean;
  setFetchMorePosts: (fetchMore: boolean) => void;
  entriesCount: number;
  setEntriesCount: (count: number) => void;
  trendingArtworks: any;
};

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
  const { username } = useContext(UserContext);

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

  const isTrendingArtworksFirst = useMemo(() => Math.random() >= 0.5, []);

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
