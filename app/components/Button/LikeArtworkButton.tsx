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
  const [isHovered, setHovered] = useState(false); // New state for hover effect
  const token = useContext(TokenContext);
  const { isSignedIn } = useContext(UserContext);
  const { openLoginDialog } = useContext(LoginContext);
  const s = styles({ isLiked });
  const handleLike = (e) => {
    e.preventDefault();
    if (!isSignedIn.value) {
      return openLoginDialog();
    }
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);

    setTotalLikes(newLikeState ? totalLikes + 1 : totalLikes - 1);
    like(artwork?.Id, !isLiked, socialId.value, token);
  };

  return (
    <div className={s.likeButtonParent}>
      <div>
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
      <div style={{ marginLeft: "2px" }}>
        <span>{totalLikes}</span>
      </div>
    </div>
  );
}
