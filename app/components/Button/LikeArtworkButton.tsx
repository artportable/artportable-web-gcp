// LikeArtworkButton.tsx
import React, { useState, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { UserContext } from "../../contexts/user-context";
import { TokenContext } from "../../contexts/token-context";
import { LoginContext } from "../../contexts/login-context";
import { styles } from "./likeArtworkButton.css";
import { FavoritesContext } from "../../contexts/FavoritesContext";

interface ArtworkProps {
  artwork: {
    Id: string;
    LikedByMe?: boolean;
    Likes?: number;
  };
}

export default function LikeArtworkButton({ artwork }: ArtworkProps) {
  const { like } = usePostLike();
  const { socialId } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState<boolean>(!!artwork?.LikedByMe);
  const [totalLikes, setTotalLikes] = useState<number>(artwork?.Likes || 0);
  const [isHovered, setHovered] = useState<boolean>(false);
  const token = useContext(TokenContext);
  const { isSignedIn } = useContext(UserContext);
  const { openLoginDialog } = useContext(LoginContext);
  const s = styles({ isLiked });

  const { favoriteIds, updateFavorites } = useContext(FavoritesContext);
  const artworkId = String(artwork?.Id);

  const isFavorite = favoriteIds.includes(artworkId);

  const handleToggleFavorite = () => {
    let updatedFavorites: string[];
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favoriteIds.filter((id) => id !== artworkId);
    } else {
      // Add to favorites
      updatedFavorites = [...favoriteIds, artworkId];
    }
    updateFavorites(updatedFavorites);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isSignedIn.value) {
      return openLoginDialog();
    }
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);

    setTotalLikes(newLikeState ? totalLikes + 1 : totalLikes - 1);
    like(artworkId, !isLiked, socialId.value, token);
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
            onClick={handleToggleFavorite}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {isFavorite || isHovered ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </IconButton>
        )}

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

      </div>
      {isSignedIn.value && (
        <div style={{ marginLeft: "2px" }}>
          <span>{totalLikes}</span>
        </div>
      )}
    </div>
  );
}
