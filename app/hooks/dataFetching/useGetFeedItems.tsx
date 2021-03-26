import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

export function useGetFeedItems() {
  const { data, error } = useSWR(
    `http://localhost:5001/api/feed`, 
    fetcher,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    feed: data?.map(mapToFeedItem),
    isLoading: !error && !data,
    isError: error
  }
}

function mapToFeedItem(feedItem) {
  return {
    ...feedItem,
    Published: new Date(feedItem.Published),
  };
}