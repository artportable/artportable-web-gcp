import useSWR from 'swr'
import { getFetcher } from '../../utils/util'
import { useGetToken } from '../useGetToken';

export function useFollowRecommendations(user) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const token = useGetToken();

  const { data, error } = useSWR(
    token ? [`${apiBaseUrl}/api/connections?myUsername=${user}`, token] : null,
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