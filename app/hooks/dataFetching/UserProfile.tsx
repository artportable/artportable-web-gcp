import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json());
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export function useGetUserProfileSummary(user) {
  if (!user) {
    return {
      data: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}/summary`,
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

export function useGetUserProfile(user) {
  if (!user) {
    return {
      data: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}`,
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

export function useGetSimilarPortfolios(user) {
  if (!user) {
    return {
      data: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}/similar`,
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

export function useGetUserProfileTags(user) {
  if (!user) {
    return {
      data: null,
      isLoading: false,
      isError: true
    }
  }

  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}/tags`,
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
