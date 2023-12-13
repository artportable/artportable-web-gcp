import useSWR from "swr";
import { getFetcher, isNullOrUndefined } from "../../utils/util";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUserProfileSummaryUri = (user: string) =>
  `${apiBaseUrl}/api/profile/${user}/summary`;
export function useGetUserProfileSummary(user) {
  const { data, error } = useSWR(
    getUserProfileSummaryUri(user),
    getFetcher(user),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export const getUserProfileUri = (user: string, myUsername: string) =>
  !user ? null : `${apiBaseUrl}/api/profile/${user}?myUsername=${myUsername}`;
export function useGetUserProfile(user, myUsername) {
  const { data, error, mutate } = useSWR(
    getUserProfileUri(user, myUsername),
    getFetcher(user),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useGetSimilarPortfolios(user) {
  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}/similar`,
    getFetcher(user),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useGetUserProfileTags(user) {
  const { data, error } = useSWR(
    `${apiBaseUrl}/api/profile/${user}/tags`,
    getFetcher(user),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useGetUserProfilePicture(user) {
  const { data, error } = useSWR(
    user !== null ? `${apiBaseUrl}/api/profile/${user}/profilepicture` : null,
    getFetcher(user, "text"),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data: data,
    isLoading: !error && isNullOrUndefined(data),
    isError: error,
  };
}

// export function useUpdateProfilePicture(filename: string, username: string) {
//   fetch(`${apiBaseUrl}/api/artworks?myUsername=${username}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(artwork)
//   })
//   .then(res => {
//     return res.ok;
//   })
//   .catch(e => console.log(e));
// }
