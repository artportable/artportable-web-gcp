import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json().then(data => data.map(mapToFeedItem)))

export function useGetFeedItems(page) {
  const { data, error } = useSWR(
    `http://localhost:5001/api/feed?page=${page}`,
    fetcher,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    feed: data,
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