import React from 'react';
import FeedCard from '../FeedCard/FeedCard';
import { useGetFeedItems } from '../../hooks/dataFetching/useGetFeedItems';

interface FeedProps {
  // items: FeedItem[],
  index: number,
}

export default function Feed({ index }: FeedProps) {
  //TODO: Use index for pagination
  const { feed } = useGetFeedItems();

  return (
    <>
      {feed?.map(item => {
        return <FeedCard key={item.Item.Id} content={item}></FeedCard>
      })}
    </>
  );
}
