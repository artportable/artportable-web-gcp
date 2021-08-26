import { useEffect, useState } from 'react'
import { useGetToken } from './useGetToken'
import useSWR from 'swr'


export function useGetActivityToken(username, isSignedIn) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  // const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
  // const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  // const activityClientRef = useRef(StreamChat.getInstance(apiKey));
  const token = useGetToken();
  // const [streamToken, setStreamToken] = useState('');

  const shouldFetch = username && isSignedIn && token;

  const fetcher = url => fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(r => r.json().then(data => data))

  const { data, error } = useSWR(
    shouldFetch ? `${apiBaseUrl}/api/activity/connect?username=${username}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    token: data?.Token,
    isLoading: !error && !data,
    isError: error
  }
}
