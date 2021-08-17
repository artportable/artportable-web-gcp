import useSWR from 'swr'
import { useGetToken } from '../useGetToken';
const fetcher = (url, token) => fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(r => r.json().then(data => data.map(mapToFeedItem)))

export function useGetFeedItems(user, page) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const token = useGetToken();

  return useSWR(
    token || user ? [`${apiBaseUrl}/api/feed?page=${page}&myUsername=${user}`, token] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
}

function mapToFeedItem(feedItem) {
  return {
    ...feedItem,
    Published: new Date(feedItem.Published),
  };
}