import useSWR from 'swr'
import { getFetcher } from '../../utils/util'

export function useFollowRecommendations(user) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  const { data, error } = useSWR(
    `${apiBaseUrl}/api/connections?myUsername=${user}`,
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