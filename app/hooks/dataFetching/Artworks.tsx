import useSWR from "swr";
import { ArtworkForCreation } from "../../models/Artwork";

const fetcher = (url) => fetch(url).then((r) => r.json().then((data) => data));
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

export function usePostArtwork(
  artwork: ArtworkForCreation,
  socialId: string,
  token: string
) {
  fetch(`${apiBaseUrl}/api/artworks?mySocialId=${socialId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(artwork),
  })
    .then((res) => {
      return res.ok;
    })
    .catch((e) => console.log(e));
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
