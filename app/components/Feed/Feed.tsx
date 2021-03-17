import React from 'react';
import FeedItem from '../FeedItem/FeedItem';

export default function Feed({ items }) {

  return (
    <>
      {items.map(item => {
        return <FeedItem content={item}></FeedItem>
      })}
    </>
  );
}