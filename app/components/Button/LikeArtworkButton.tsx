import React, { useState, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { UserContext } from "../../contexts/user-context";
import { TokenContext } from "../../contexts/token-context";
import { LoginContext } from "../../contexts/login-context";
import { styles } from "./likeArtworkButton.css";

export default function LikeArtworkButton({ artwork }: { artwork: any }) {
  const { like } = usePostLike();
  const { socialId } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(artwork?.LikedByMe);
  const [totalLikes, setTotalLikes] = useState(artwork?.Likes);
  const [isHovered, setHovered] = useState(false);
  const token = useContext(TokenContext);
  const { isSignedIn } = useContext(UserContext);
  const { openLoginDialog } = useContext(LoginContext);
  const s = styles({ isLiked });
  const artworkId = String(artwork?.Id);

  const handleLike = (e) => {
    e.preventDefault();
    if (!isSignedIn.value) {
      return openLoginDialog();
    }
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);

    setTotalLikes(newLikeState ? totalLikes + 1 : totalLikes - 1);
    like(artworkId, !isLiked, socialId.value, token);
  };

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const favArt = localStorage.getItem("favoriteArt");
      let favArtArray: string[] = [];

      if (favArt) {
        try {
          favArtArray.push(JSON.parse(favArt));
        } catch (e) {
          console.error("Error parsing favoriteArt from localStorage:", e);
          // Optionally remove the invalid item from localStorage
          localStorage.removeItem("favoriteArt");
        }
      }

      setItems(favArtArray);
    }
  }, []);

  const favorites = items.includes(artworkId);

  const handleToggleFavourite = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      let updatedItems: string[];

      if (favorites) {
        // Remove the artwork from favorites
        updatedItems = items.filter((id) => id !== artworkId);
      } else {
        // Add the artwork to favorites
        updatedItems = [...items, artworkId];
      }

      try {
        localStorage.setItem("favoriteArt", JSON.stringify(updatedItems));
      } catch (e) {
        console.error("Error setting favoriteArt in localStorage:", e);
      }

      setItems(updatedItems);
    }
  };

  return (
    <div className={s.likeButtonParent}>
      <div>
        {isSignedIn.value ? (
          <IconButton
            className={s.likeButton}
            onClick={handleLike}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {isLiked || isHovered ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        ) : (
          <IconButton
            className={s.likeButton}
            onClick={handleToggleFavourite}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {favorites || isHovered ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        )}
      </div>
      {isSignedIn.value && (
        <div style={{ marginLeft: "2px" }}>
          <span>{totalLikes}</span>
        </div>
      )}
    </div>
  );
}
