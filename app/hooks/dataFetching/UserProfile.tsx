import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json());

export function useGetUserProfileSummary(userId) {
  if (!userId) {
    return {
      data: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `http://localhost:5001/api/profile/${userId}/summary`,
    fetcher,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useGetUserProfile(userId) {
  if (!userId) {
    return {
      data: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `http://localhost:5001/api/profile/${userId}`,
    fetcher,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
