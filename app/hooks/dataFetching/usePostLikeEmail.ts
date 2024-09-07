import { useCallback, useContext } from "react";
import { config } from "../../../config";
import useRefreshToken from "../useRefreshToken";
import { UserContext } from "../../contexts/user-context";
import { LoginContext } from "../../contexts/login-context";
import { TokenContext } from "../../contexts/token-context";
import { formatUserName } from "../../utils/util";

const usePostLikeEmail = () => {
  const { refreshToken } = useRefreshToken();
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const { openLoginDialog } = useContext(LoginContext);

  const likeEmail = useCallback(
    async (artwork, isLiked: boolean) => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      if (!user?.isSignedIn.value) {
        return openLoginDialog();
      }

      try {
        await refreshToken();

        // Create/delete like for an artwork.
        const response = await fetch(
          `${apiBaseUrl}/api/artworks/${artwork.Id}/like?mySocialId=${user.socialId.value}`,
          {
            method: isLiked ? "POST" : "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.log(response.statusText);
          throw response;
        }
      } catch (err) {
        console.error("Error in usePostLikeEmail:", err.message);
        throw err;
      }

      // Below code for sending artist an email when someone ilkes one of their artworks.
      // Artists can only receive max one artwork liked email per day. Checking for it when sending in Artworks API.

      // Only send emails when liked.
      if (!isLiked) {
        return;
      }

      const userName = user?.username?.value;
      const artistUserName = artwork?.Owner?.Username;
      const likedByArtist = artistUserName === userName;

      // Don't send email if artist likes their own artwork.
      if (likedByArtist) return;

      const artistEndpoint = `${apiBaseUrl}/api/profile/${artistUserName}`;
      let artist = null;
      try {
        await fetch(artistEndpoint)
          .then((res) => res.clone().json())
          .then((response) => {
            artist = response;
          });
      } catch (err) {
        return console.error(err);
      }

      // artwork?.Owner.Email exists on /feed page, but not when liking on other pages.
      const artistEmail = artist.Email; // Email not set on data.Owner, get from fetched artist.
      const emailDeclinedArtworkUpload = artist?.EmailDeclinedArtworkUpload; // Email declined data not set on data.Owner, get from fetched artist.

      if (!artistEmail || emailDeclinedArtworkUpload) return;

      const imageURL = config.BUCKET_URL + artwork.PrimaryFile.Name;
      const webbURL = config.WEBB_URL + "/art/" + artwork.Id;
      const likedByURL = config.WEBB_URL + "/profile/@" + userName;
      const unsubscribeURL = config.WEBB_URL + "/notifications?type=like";

      const emailData = {
        ...artwork,
        ...{
          ImageURL: imageURL,
          WebbURL: webbURL,
          UnsubscribeURL: unsubscribeURL,
          LikedByUser: formatUserName(
            user?.given_name?.value,
            user?.family_name?.value
          ),
          LikedByURL: likedByURL,
        },
      };

      // Send email to artist. Using Artworks API.
      const mailEndpoint = `${config.ARTWORKS_API_BASE}/artportable/artwork-liked-ap`;
      let mailResult = null;
      try {
        await fetch(mailEndpoint, {
          body: JSON.stringify({
            artwork: emailData,
            artistEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then((res) => res.clone().json())
          .then((response) => {
            mailResult = response;
          });
      } catch (err) {
        return console.error(err);
      }
    },
    [user, token, openLoginDialog]
  );

  return {
    likeEmail,
  };
};

export default usePostLikeEmail;
