import useSWR from "swr";
import { ArtworkForCreation } from "../../models/Artwork";

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

export function useGetArtworks(owner = null, myUsername: string = null) {
  const url = new URL(`${apiBaseUrl}/api/artworks?myUsername=${myUsername}`);
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

export function useGetArtwork(id: string, myUsername: string = null) {
  const url = new URL(
    `${apiBaseUrl}/api/artworks/${id}?myUsername=${myUsername}`
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

export function useGetTags() {
  const { data, error } = useSWR(`${apiBaseUrl}/api/artworks/tags`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function usePostArtwork(
  artwork: ArtworkForCreation,
  socialId: string,
  token: string
) {
  return await fetch(`${apiBaseUrl}/api/artworks?mySocialId=${socialId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(artwork),
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e)
      return false;
    });
}

export function useGetArtworksForStartPage() {
  const url = new URL(`${apiBaseUrl}/api/start`);

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
export function useGetTrendingArtworks() {
  const url = new URL(`${apiBaseUrl}/api/discover/artworks/trending`);

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

  var interval = seconds / 60;
  if (interval < 1) {
    return {
      Time: Math.floor(seconds),
      Unit: t("feed:seconds"),
    };
  } else if (interval < 60) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:minutes"),
    };
  }

  interval = interval / 60;
  if (interval < 24) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:hours"),
    };
  }

  interval = interval / 24;
  if (interval < 7) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:days"),
    };
  }

  interval = interval / 7;
  if (interval < 4) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:weeks"),
    };
  }

  interval = interval / 4;
  if (interval < 12) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:months"),
    };
  }

  interval = interval / 12;
  return {
    Time: Math.floor(interval),
    Unit: t("feed:years"),
  };
}
