import { useContext } from 'react';
import useSWR from 'swr'
import { TokenContext } from '../../contexts/token-context';
import { getFetcher } from '../../utils/util'


export function useFollowRecommendations(user) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const token = useContext(TokenContext);

  const { data, error } = useSWR(
    token && user ? [`${apiBaseUrl}/api/connections?myUsername=${user}`, token] : null,
    getFetcher(user),
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    suggestedUsers: data,
    isLoading: !error && !data,
    isError: error
  }
}