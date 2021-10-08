import useSWR from "swr";
import { getFetcher } from "../../utils/util";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useGetUsernameFromSocialId(socialId) {
  const url = new URL(`${apiBaseUrl}/api/User/username`);
  url.searchParams.append('socialId', socialId);

  const { data, error } = useSWR(
    socialId !== null ? url.href : null,
    getFetcher(socialId, 'text'),
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