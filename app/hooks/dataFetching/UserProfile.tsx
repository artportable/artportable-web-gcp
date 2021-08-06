import useSWR from 'swr'
import { getFetcher } from '../../utils/util'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export const getUserProfileSummaryUri = (user: string) => `${apiBaseUrl}/api/profile/${user}/summary`;
export function useGetUserProfileSummary(user) {
  const { data, error } = useSWR(
    getUserProfileSummaryUri(user),
    getFetcher(user),
    { 
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
    });

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export const getUserProfileUri = (user: string) => `${apiBaseUrl}/api/profile/${user}`;
export function useGetUserProfile(user) {
  const { data, error } = useSWR(
    getUserProfileUri(user),
    getFetcher(user),
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
  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}/similar`,
    getFetcher(user),
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
  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}/tags`,
    getFetcher(user),
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

export function useGetUserProfilePicture(user) {
  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}/profilepicture`,
    getFetcher(user, 'text'),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    profilePicture: data,
    isLoading: !error && !data,
    isError: error
  }
}