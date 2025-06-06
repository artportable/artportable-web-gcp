import useSWR from "swr";
import FetchData from "../../models/FetchData";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url) => fetch(url).then(res => res.json());

export const useGetFollowing = (username: string, doFetch: boolean = true): FetchData<any[]> => {
  const conditionalFetch = doFetch ? `${apiBaseUrl}/api/user/${username}/followees` : null;

  const { data, error } = useSWR(
    conditionalFetch,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    data: data?.map(u => ({
      username: u.Username,
      profilePicture: u.ProfilePicture,
      name: u.Name,
      surname: u.Surname
    })),
    loading: !error && !data,
    error: error
  }
}