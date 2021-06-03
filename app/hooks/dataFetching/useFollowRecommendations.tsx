import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

export function useFollowRecommendations(user) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  if (!user) {
    return {
      suggestedUsers: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `${apiBaseUrl}/api/connections?myUsername=${user}`,
    fetcher,
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