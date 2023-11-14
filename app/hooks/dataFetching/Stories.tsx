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

export function usePostStory(
  story: StoryForCreation,
  socialId: string,
  token: string
) {
  fetch(`${apiBaseUrl}/api/stories?mySocialId=${socialId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(story),
  })
    .then((res) => {
      return res.ok;
    })
    .catch((e) => console.log(e));
}

//remove??
export function getTimePassed(publishDate, t) {
  var now = new Date();
  publishDate = new Date(publishDate);
  var seconds = Math.floor((now.getTime() - publishDate.getTime()) / 1000);

  if (seconds < 60) {
    return {
      Time: seconds,
      Unit: t("feed:seconds"),
    };
  }

  if (seconds < 3600) {
    var interval = seconds / 60;
    return {
      Time: Math.floor(interval),
      Unit: t("feed:minutes"),
    };
  }

  if (
    seconds < 86400 &&
    now.getDate() == publishDate.getDate() &&
    now.getMonth() == publishDate.getMonth() &&
    now.getFullYear() == publishDate.getFullYear()
  ) {
    var interval = seconds / 3600;
    return {
      Time: Math.floor(interval),
      Unit: t("feed:hours"),
    };
  }

  var interval = seconds / 31536000;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:year"),
    };
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:months"),
    };
  }

  interval = seconds / 604800;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:weeks"),
    };
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:days"),
    };
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:hours"),
    };
  }

  interval = seconds / 60;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:minutes"),
    };
  }

  return {
    Time: Math.floor(seconds),
    Unit: t("feed:seconds"),
  };
}
