import useSWR from "swr";
import { StoryForCreation } from "../../models/Story";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Fetcher error:", errorData);
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.json();
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useGetStories(owner = null, myUsername: string = null) {
  const url = new URL(`${apiBaseUrl}/api/stories?myUsername=${myUsername}`);
  if (owner !== null) {
    url.searchParams.append("owner", owner);
  }
  const { data, error, mutate } = useSWR(url.toString(), fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}

export function useGetLatestStories(page: number) {
  const stories = 12;
  const url = new URL(`${apiBaseUrl}/api/stories/latest?page=${page}&pageSize=${stories}`);
  const { data, error, mutate } = useSWR(url.toString(), fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
}

export function useGetStory(id: string, myUsername: string = null) {
  const url = new URL(
    `${apiBaseUrl}/api/stories/${id}?myUsername=${myUsername}`
  );

  const { data, error } = useSWR(url.href, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

// export async function usePostStory(
//   story: StoryForCreation,
//   socialId: string,
//   token: string
// ) {
//   const response = await fetch(`${apiBaseUrl}/api/stories?mySocialId=${socialId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(story),
//   })
//     .then((res) => {
//       console.log(res.ok)
//       return res.json();
//     })
//     .catch((e) => console.log(e));
// }

export async function usePostStory(
  story: StoryForCreation,
  socialId: string,
  token: string
) {
  try {
    const response = await fetch(`${apiBaseUrl}/api/stories?mySocialId=${socialId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(story),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data); // Log the parsed response data

    return data; // Return the data if needed
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
