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
      console.log(e);
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

export function useGetLatestArtworksForIndex() {
  const url = new URL(`${apiBaseUrl}/api/Discover/artworks/latest`);
  url.searchParams.append("page", "1");
  url.searchParams.append("pageSize", "4");

  const { data, error } = useSWR(url.href, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 10000, // Automatically re-fetch every 10 seconds
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useGetPromotedArtworks(
  myUsername: string = null,
  page: number = null,
  pageSize: number = null
) {
  const url = new URL(`${apiBaseUrl}/api/Discover/artworks/promoted`);

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

import { useCallback } from "react";

const usePromoteArtwork = () => {
  const promoteArtwork = useCallback(
    async (artworkId, token, promote = true, promotionDuration) => {
      const url = `${apiBaseUrl}/api/Artworks/promote/${artworkId}`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Promoted: promote,
          PromotionDurationInMonths: promotionDuration,
        }),
      };

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error promoting artwork:", errorData);
          return false;
        }

        const data = await response.json();
        console.log(data);

        return data;
      } catch (error) {
        console.error("Error promoting artwork:", error);
        return false;
      }
    },
    []
  );

  return { promoteArtwork };
};

export default usePromoteArtwork;

const useBoostArtwork = () => {
  const boostArtwork = useCallback(async (artworkId: string, token: string) => {
    const url = `${apiBaseUrl}/api/artworks/${artworkId}/boost`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // if your API uses cookie-based auth, uncomment:
      // credentials: "include",
    };

    try {
      const res = await fetch(url, options);

      if (res.status === 401) {
        // handle unauthorized however you like (e.g. redirect to login)
        throw new Error("Unauthorized");
      }

      if (!res.ok) {
        const err = await res.json();
        console.error("Error boosting artwork:", err);
        throw new Error("Boost failed");
      }

      return await res.json();
    } catch (error) {
      console.error("useBoostArtwork:", error);
      return false;
    }
  }, []);

  return { boostArtwork };
};

export { useBoostArtwork };

const useUnboostArtwork = () => {
  const unboostArtwork = useCallback(
    async (artworkId: string, token: string) => {
      const url = `${apiBaseUrl}/api/artworks/${artworkId}/boost`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // credentials: "include" // if you need cookies
      });

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      if (!res.ok) {
        const err = await res.json();
        console.error("Error unboosting artwork:", err);
        return false;
      }
      return await res.json();
    },
    []
  );

  return { unboostArtwork };
};

export { useUnboostArtwork };

import { DateTime } from "luxon";

export function getTimePassed(publishDate: string | Date, t: Function) {
  // Define the timezone you want to display in
  const displayTimeZone = "Europe/Stockholm";

  // Parse the publishDate string
  // Assume the publishDate is in UTC if it lacks timezone information
  let publishDateTime: DateTime;

  if (typeof publishDate === "string") {
    // If the date string lacks timezone info, assume it's in UTC
    publishDateTime = DateTime.fromISO(publishDate, { zone: "utc" });
  } else if (publishDate instanceof Date) {
    publishDateTime = DateTime.fromJSDate(publishDate, { zone: "utc" });
  } else {
    throw new Error("Invalid publishDate format");
  }

  publishDateTime = publishDateTime.setZone(displayTimeZone);
  const now = DateTime.now().setZone(displayTimeZone);
  const daysDifference =
    now.startOf("day").diff(publishDateTime.startOf("day"), "days").toObject()
      .days || 0;

  const timeString = publishDateTime.toFormat("HH:mm");

  if (daysDifference === 0) {
    return `${t("feed:today")} ${timeString}`;
  } else if (daysDifference === 1) {
    return `${t("feed:yesterday")} ${timeString}`;
  } else {
    // Format the date as DD-MM-YY
    const dateString = publishDateTime.toFormat("dd-MM-yy");
    return dateString;
  }
}
