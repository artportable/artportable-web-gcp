import { useCallback } from "react";
import useRefreshToken from "../useRefreshToken";

const useLikeArtwork = () => {
  const { refreshToken } = useRefreshToken();

  const like = useCallback(
    (artworkId, isLiked: boolean, socialId, token) => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      refreshToken()
        .then(() => {
          const url = `${apiBaseUrl}/api/Artworks/${artworkId}/like?mySocialId=${socialId}`;
          const method = isLiked ? "POST" : "DELETE";
          return fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .then((response) => {
          if (!response.ok) {
            console.log("Failed to like the artwork:", response.statusText);
            throw new Error("Failed to like the artwork");
          }
          return response.json(); // Assuming the server might return some data
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error liking the artwork:", error);
        });
    },
    [refreshToken]
  ); // Include refreshToken in the dependency array

  return { like };
};

export default useLikeArtwork;
