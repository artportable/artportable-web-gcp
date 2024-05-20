import { useCallback } from "react";
import useRefreshToken from "../useRefreshToken";
import {
  sendArtworkLikedEmail,
} from '../../../app/utils/emailUtil';

const usePostLike = () => {
  const { refreshToken } = useRefreshToken();

  const like = useCallback((artworkId, isLiked: boolean, socialId, token) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    refreshToken().then(() =>
      fetch(`${apiBaseUrl}/api/artworks/${artworkId}/like?mySocialId=${socialId}`, {
        method: isLiked ? 'POST' : 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }))
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
          throw response;
        }

        if (isLiked) {
          // sendArtworkLikedEmail(isLiked, {}, {
          //   likedByFirstName: '',
          //   likedByLastName: '',
          //   likedByUsername: '',
          // });

          // sendArtworkLikedEmail(!isLiked, artwork.data, {
          //   likedByFirstName: given_name.value,
          //   likedByLastName: family_name.value,
          //   likedByUsername: username.value,
          // });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return {
    like,
  }

};

export default usePostLike;