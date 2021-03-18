import React from 'react';
import FeedCard from '../FeedCard/FeedCard';

export default function Feed({ items }) {

  return (
    <>
      {items.map(item => {
        return <FeedCard content={item}></FeedCard>
      })}
    </>
  );
}