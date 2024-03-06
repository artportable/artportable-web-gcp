import React, { useState, useContext } from 'react'
import IconButton from "@material-ui/core/IconButton"
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { TokenContext } from "../../contexts/token-context";
import { UserContext } from "../../contexts/user-context";
import { styles } from "./likebutton.css";

export default function LikeButton({ content }: { content: any }) {
  const [isLiked, setLike] = useState(content.LikedByMe);
  const [totalLikes, setTotalLikes] = useState(content.Likes);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const { like } = usePostLike();
  const token = useContext(TokenContext);
  const { socialId } = useContext(UserContext);
  const s = styles()

  // socialId={socialId.value}

  function likeArtwork(artworkId, isLike, e) {
    e.preventDefault();
    redirectIfNotLoggedIn();

    // console.log('artworkId', artworkId);
    // console.log('isLike', isLike);
    // console.log('socialId', socialId);
    // console.log('token', token);
    
    like(artworkId, isLike, socialId.value, token);
  }

  return (
    <IconButton
      className={s.likeButton}
      onClick={(e) => {
        likeArtwork(content.Item.Id, !isLiked, e);
        setLike(!isLiked);
        setTotalLikes(!isLiked ? totalLikes + 1 : totalLikes - 1);
      }}
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

