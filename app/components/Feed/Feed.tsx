import React from 'react';
import FeedCard from '../FeedCard/FeedCard';
import { useGetFeedItems } from '../../hooks/dataFetching/useGetFeedItems';

interface FeedProps {
  userId: string,
  index: number,
}

export default function Feed({ userId, index }: FeedProps) {
  const page = index + 1;
  const { feed } = useGetFeedItems(userId, page);

  return (
    <>
      {userId &&
        feed?.map(item => {
          return <FeedCard key={item.Item.Id} content={item}></FeedCard>
        })
      }
    </>
  );
}
