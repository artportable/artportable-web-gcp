import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

export function useFollowRecommendations(userId) {
  if (!userId) {
    return {
      suggestedUsers: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `http://localhost:5001/api/recommendations?userId=${userId}`, 
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