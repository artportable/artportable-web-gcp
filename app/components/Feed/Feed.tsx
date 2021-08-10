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
  entriesCount: any
  setEntriesCount: any
}

export default function Feed({ user, index, onLikeClick, fetchMorePosts, setFetchMorePosts, setEntriesCount, entriesCount }: FeedProps) {
  const page = index + 1;
  const { data, error } = useGetFeedItems(user, page);

  useEffect(() => {
    if (error) {
      setFetchMorePosts(false);
    }
    if (data) {
      if(data.length <= 0) {
        setFetchMorePosts(false);
      }
      setEntriesCount(entriesCount + data.length);
    }
  }, [data, error]);

  return (
    <>
      {user &&
        data?.map(item => {
          return <FeedCard key={item.Item.Id} content={item} onLikeClick={onLikeClick}></FeedCard>
        })
      }
    </>
  );
}
