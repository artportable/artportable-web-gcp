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

export function getTimePassed(publishDate, t) {
  var now = new Date();
  publishDate = new Date(publishDate);

  // Calculate the difference in days
  var publishDateMidnight = new Date(
    publishDate.getFullYear(),
    publishDate.getMonth(),
    publishDate.getDate()
  );
  var nowDateMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  var daysDifference = Math.floor(
    (nowDateMidnight.getTime() - publishDateMidnight.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Format the time as HH:MM
  var hours = publishDate.getHours();
  var minutes = publishDate.getMinutes();
  var timeString =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes);

  // Check for today or yesterday
  if (daysDifference === 0) {
    return `${t("feed:idag")} ${timeString}`;
  } else if (daysDifference === 1) {
    return `${t("feed:igår")} ${timeString}`;
  } else {
    var day = publishDate.getDate();
    var month = publishDate.getMonth() + 1;
    var year = publishDate.getFullYear() % 100;

    var dateString =
      (day < 10 ? "0" + day : day) +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (year < 10 ? "0" + year : year);

    return dateString;
  }
}
