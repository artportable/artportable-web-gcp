import React, { useState, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import usePostLikeEmail from "../../hooks/dataFetching/usePostLikeEmail";
import { UserContext } from "../../contexts/user-context";
import { styles } from "./likebutton.css";

export default function LikeButton({ content }: { content: any }) {
  const [isLiked, setLike] = useState(content.LikedByMe);
  const [isHovered, setHovered] = useState(false); // New state for hover effect
  const [totalLikes, setTotalLikes] = useState(content.Likes);
  const { likeEmail } = usePostLikeEmail();
  const { isSignedIn } = useContext(UserContext);
  const s = styles({ isLiked });

  const handleLikeClick = (e) => {
    e.preventDefault();
    if (!isSignedIn.value) {
      likeEmail(content.Item, content.isLike);
      return;
    }

    const newLikeState = !isLiked;
    setLike(newLikeState);

    // Update total likes only when toggling the like status
    setTotalLikes(newLikeState ? totalLikes + 1 : totalLikes - 1);

    // Make API call to register the like/unlike
    likeEmail(content.Item, newLikeState);
  };

  return (
    <div>
      <IconButton
        className={s.likeButton}
        onClick={handleLikeClick}
        onMouseEnter={() => setHovered(true)} // Set hover state to true on mouse enter
        onMouseLeave={() => setHovered(false)} // Set hover state to false on mouse leave
      >
        {isLiked || isHovered ? ( // Show filled icon if liked or hovered
          <FavoriteIcon /> // Filled heart icon
        ) : (
          <FavoriteBorderOutlinedIcon /> // Outlined heart icon
        )}
      </IconButton>
    </div>
  );
}
