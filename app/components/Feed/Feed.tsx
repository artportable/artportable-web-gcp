import React, { useEffect } from 'react';
import FeedCard from '../FeedCard/FeedCard';
import { useGetFeedItems } from '../../hooks/dataFetching/useGetFeedItems';
import { isNullOrUndefined } from '../../utils/util';

interface FeedProps {
  user: string,
  index: number,
  onLikeClick: any,
  fetchMorePosts: any,
  setFetchMorePosts: any
}

export default function Feed({ user, index, onLikeClick, fetchMorePosts, setFetchMorePosts }: FeedProps) {
  const page = index + 1;
  const { feed } = useGetFeedItems(user, page);

  useEffect(() => {
    if (isNullOrUndefined(feed)) {
      setFetchMorePosts(fetchMorePosts + 1);
    }
  }, [feed]);

  return (
    <>
      {user &&
        feed?.map(item => {
          return <FeedCard key={item.Item.Id} content={item} onLikeClick={onLikeClick}></FeedCard>
        })
      }
    </>
  );
}
