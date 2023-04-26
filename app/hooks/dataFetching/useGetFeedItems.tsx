import { useContext } from "react";
import useSWR from "swr";
import { TokenContext } from "../../contexts/token-context";

const fetcher = (url, token) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json().then((data) => data.map(mapToFeedItem)));

export function useGetFeedItems(user, page) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = useContext(TokenContext);

  return useSWR(
    token && user
      ? [`${apiBaseUrl}/api/feed?page=${page}&myUsername=${user}`, token]
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}

function mapToFeedItem(feedItem) {
  return {
    ...feedItem,
    Published: new Date(feedItem.Published),
  };
}
