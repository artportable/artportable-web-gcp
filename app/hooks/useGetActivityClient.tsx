import { useContext } from 'react'
import useSWR from 'swr'
import { TokenContext } from '../contexts/token-context';


export function useGetActivityToken(username, isSignedIn) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = useContext(TokenContext);

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
