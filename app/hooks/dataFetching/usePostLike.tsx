import { useCallback } from "react";
import useRefreshToken from "../useRefreshToken";

const usePostLike = () => {
  const { refreshToken } = useRefreshToken();

  const like = useCallback((artworkId, isLiked: boolean, socialId, token) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    refreshToken()
      .then(() =>
        fetch(
          `${apiBaseUrl}/api/artworks/${artworkId}/like?mySocialId=${socialId}`,
          {
            method: isLiked ? "POST" : "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      )
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
          throw response;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    like,
  };
};

export default usePostLike;
