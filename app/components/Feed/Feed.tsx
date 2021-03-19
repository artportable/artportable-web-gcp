import React from 'react';
import FeedCard from '../FeedCard/FeedCard';
import { FeedItem } from '../../models/FeedItem'

interface FeedProps {
  items: FeedItem[]
}

export default function Feed({ items }: FeedProps) {

  return (
    <>
      {items.map(item => {
        return <FeedCard key={item.Item.Id} content={item}></FeedCard>
      })}
    </>
  );
}
