import React, { useState, useContext } from 'react'
import IconButton from "@material-ui/core/IconButton"
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import usePostLikeEmail from "../../hooks/dataFetching/usePostLikeEmail";
import { UserContext } from "../../contexts/user-context";
import { styles } from "./likebutton.css";

export default function LikeButton({ content }: { content: any }) {
  const [isLiked, setLike] = useState(content.LikedByMe);
  const [totalLikes, setTotalLikes] = useState(content.Likes);
  const { likeEmail } = usePostLikeEmail();
  const { isSignedIn } = useContext(UserContext);
  const s = styles()
  
  function likeArtwork(artwork, isLike, e) {
    e.preventDefault();

    if (isSignedIn.value) {
      setLike(!isLiked);
      setTotalLikes(!isLiked ? totalLikes + 1 : totalLikes - 1);
    }
    likeEmail(artwork, isLike);
  }

  return (
    <IconButton
      className={s.likeButton}
      onClick={(e) => likeArtwork(content.Item, !isLiked, e)}
    >
    {
      isLiked ? (
        <FavoriteIcon color="primary" />
      ) : (
        <FavoriteBorderOutlinedIcon color="primary" />
      )
    }
    </IconButton>
  )
}

