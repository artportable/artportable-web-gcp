import useSWR from "swr";

interface ConnectionData {
  followers: number;
  following: number;
}

interface FetchResponse {
  data: ConnectionData | null;
  loading: boolean;
  error: any;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const useGetConnectionsCount = (username: string): FetchResponse => {
  const conditionalFetch = `${apiBaseUrl}/api/user/${username}/connectionscount`;

  const { data, error } = useSWR(
    conditionalFetch,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data: data ? {
      followers: data.Followers,
      following: data.Followees
    } : null,
    loading: !error && !data,
    error: error
  };
};
