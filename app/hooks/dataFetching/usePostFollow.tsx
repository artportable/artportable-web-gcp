import { useCallback } from "react";
import useRefreshToken from "../useRefreshToken";


const usePostFollow = () => {
  const { refreshToken } = useRefreshToken();

  const follow = useCallback((userToFollow, isFollowing, socialId, token) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    refreshToken().then(() =>
      fetch(`${apiBaseUrl}/api/connections/${userToFollow}?mySocialId=${socialId}`, {
        method: isFollowing ? 'POST' : 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }))
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
    follow,
  };

};

export default usePostFollow;