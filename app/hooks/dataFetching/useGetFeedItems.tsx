import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json().then(data => data.map(mapToFeedItem)))

export function useGetFeedItems(user, page) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  if (!user) {
    return {
      feed: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `${apiBaseUrl}/api/feed?page=${page}&myUsername=${user}`,
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