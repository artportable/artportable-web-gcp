import FavoriteIcon from '@material-ui/icons/Favorite'
import { useState } from 'react'
import { useStore } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import { styles } from './artworkListItem.css'
import { initializeStore } from '../../redux/store'

export default function ArtworkListItem({ artwork, isLikedByMe }) {
  const s = styles();
  const store = useStore();
  const [isLiked, setLike] = useState(isLikedByMe);

  const userId = store.getState()?.user?.id;
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  function onLikeClick(event, newValue) {

  }

  const isLoggedIn = userId !== undefined;
  const likedColor = isLoggedIn ? 
    'disabled' : 
    isLiked ? "secondary" : "inherit";
  
  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <img
          key={artwork?.PrimaryFile}
          src={`${bucketUrl}${artwork.PrimaryFile}`}
        />
      </div>
      <div className={s.titleAndLike}>
        <div>{artwork.Title}</div>
        <div className={s.likeContainer}>
          {artwork.Likes}
          <IconButton
            className={s.likeButton}
            disableRipple
            disableFocusRipple
            disabled
            onClick={() => {
              onLikeClick(artwork.Id, !isLiked);
              setLike(!isLiked);
            }}>
              <FavoriteIcon color={likedColor}/>
          </IconButton>
        </div>
      </div>
    </div>
  );
}