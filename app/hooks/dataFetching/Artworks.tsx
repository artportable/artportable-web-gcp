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
    // If publishDate is a Date object, convert it to Luxon DateTime in UTC
    publishDateTime = DateTime.fromJSDate(publishDate, { zone: "utc" });
  } else {
    // Handle invalid date inputs
    throw new Error("Invalid publishDate format");
  }

  // Convert publishDateTime to the display timezone
  publishDateTime = publishDateTime.setZone(displayTimeZone);

  // Get the current time in the display timezone
  const now = DateTime.now().setZone(displayTimeZone);

  // Calculate the difference in days
  const daysDifference =
    now.startOf("day").diff(publishDateTime.startOf("day"), "days").toObject()
      .days || 0;

  // Format the time as HH:mm
  const timeString = publishDateTime.toFormat("HH:mm");

  // Check for today or yesterday
  if (daysDifference === 0) {
    return `${t("feed:idag")} ${timeString}`;
  } else if (daysDifference === 1) {
    return `${t("feed:igår")} ${timeString}`;
  } else {
    // Format the date as DD-MM-YY
    const dateString = publishDateTime.toFormat("dd-MM-yy");
    return dateString;
  }
}
