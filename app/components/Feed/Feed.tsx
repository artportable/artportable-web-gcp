import React from 'react';
import FeedCard from '../FeedCard/FeedCard';
import { useGetFeedItems } from '../../hooks/dataFetching/useGetFeedItems';

interface FeedProps {
  user: string,
  index: number,
  onLikeClick: any,
}

export default function Feed({ user, index, onLikeClick }: FeedProps) {
  const page = index + 1;
  const { feed } = useGetFeedItems(user, page);

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
