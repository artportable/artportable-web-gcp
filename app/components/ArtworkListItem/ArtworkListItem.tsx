import FavoriteIcon from '@material-ui/icons/Favorite'
import { useState } from 'react'
import { useStore } from 'react-redux'
import ShowArtworkModal from '../ShowArtworkModal/ShowArtworkModal'
import IconButton from '@material-ui/core/IconButton'
import { styles } from './artworkListItem.css'

export default function ArtworkListItem({ artwork, onLikeClick }) {
  const s = styles();
  const store = useStore();
  const [isLiked, setIsLiked] = useState(artwork.IsLikedByMe);
  const [showArtworkModal, setShowArtworkModal] = useState(false);

  const userId = store.getState()?.user?.id;
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  function toggleLike(event) {
    event.stopPropagation();

    setIsLiked(!isLiked);
    !isLiked ? artwork.Likes++ : artwork.Likes--;
    onLikeClick(artwork.Id, !isLiked);
  }

  function handleArtworkClick() {
    setShowArtworkModal(true);
  }

  const isLoggedIn = userId !== undefined;
  const likedColor = isLoggedIn ? 
    'disabled' : 
    isLiked ? "secondary" : "inherit";
  
  return (
    <>
      <div className={s.container} onClick={handleArtworkClick}> 
        <div className={s.imageContainer}>
          <img
            key={artwork?.PrimaryFile}
            src={`${bucketUrl}${artwork.PrimaryFile.Name}`}
          />
        </div>
        <div className={s.titleAndLike}>
          <div>{artwork.Title}</div>
          <div className={s.likeContainer}>
            {artwork.Likes > 0 ? artwork.Likes : ''}
            <IconButton
              className={s.likeButton}
              disableRipple
              disableFocusRipple
              onClick={toggleLike}>
                <FavoriteIcon color={likedColor}/>
            </IconButton>
          </div>
        </div>
      </div>
      <ShowArtworkModal 
        open={showArtworkModal} 
        setOpen={(v) => setShowArtworkModal(v)} 
        artwork={artwork}
        onLikeClick={onLikeClick} />
    </>
  );
}