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

export function getTimePassed(publishDate: string | Date, t: Function) {
  const timeZone = "Europe/Stockholm"; // Set your local timezone

  // Parse publishDate and adjust to the specified timezone
  const publishDateInTimeZone = new Date(
    new Date(publishDate).toLocaleString("en-US", { timeZone })
  );

  // Get the current time in the specified timezone
  const now = new Date();
  const nowInTimeZone = new Date(now.toLocaleString("en-US", { timeZone }));

  // Calculate the difference in days
  const publishDateMidnight = new Date(
    publishDateInTimeZone.getFullYear(),
    publishDateInTimeZone.getMonth(),
    publishDateInTimeZone.getDate()
  );
  const nowDateMidnight = new Date(
    nowInTimeZone.getFullYear(),
    nowInTimeZone.getMonth(),
    nowInTimeZone.getDate()
  );

  // Use .getTime() to get numeric timestamps
  const daysDifference = Math.floor(
    (nowDateMidnight.getTime() - publishDateMidnight.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Format the time as HH:MM in the specified timezone
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  };
  const timeString = publishDateInTimeZone.toLocaleTimeString("sv-SE", options);

  // Check for today or yesterday
  if (daysDifference === 0) {
    return `${t("feed:today")} ${timeString}`;
  } else if (daysDifference === 1) {
    return `${t("feed:yesterday")} ${timeString}`;
  } else {
    // Format the date as DD-MM-YY in the specified timezone
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      timeZone,
    };
    const dateString = publishDateInTimeZone.toLocaleDateString(
      "sv-SE",
      dateOptions
    );
    return dateString;
  }
}
