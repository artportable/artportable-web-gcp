import FavoriteIcon from '@material-ui/icons/Favorite'
import { useState } from 'react'
import { useStore } from 'react-redux'
import ShowArtworkModal from '../ShowArtworkModal/ShowArtworkModal'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { styles } from './artworkListItemDefined.css'

export default function ArtworkListItemDefined({ artwork, onLikeClick, height, width }) {
  const s = styles();
  const store = useStore();
  const [isLiked, setIsLiked] = useState(artwork.IsLikedByMe);
  const [showArtworkModal, setShowArtworkModal] = useState(false);

  const isSignedIn = store.getState()?.user?.isSignedIn;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;

  function toggleLike(event) {
    event.stopPropagation();

    setIsLiked(!isLiked);
    !isLiked ? artwork.Likes++ : artwork.Likes--;
    onLikeClick(artwork.Id, !isLiked);
  }

  function handleArtworkClick() {
    setShowArtworkModal(true);
  }

  const likedColor = !isSignedIn ?
    'disabled' : 
    isLiked ? "secondary" : "inherit";

  if(width === null || height === null) return  <></>;

  return (
    <>
      <Paper variant="outlined" className={s.container}>
        <div className={s.imageContainer} onClick={handleArtworkClick}>
          <img
            key={artwork?.PrimaryFile}
            width={width}
            height={height}
            src={`${bucketUrl}${artwork.PrimaryFile.Name}`}
          />
        </div>
        <div className={s.titleAndLike}>
          <div className={s.title}>{artwork.Title}</div>
          <div className={s.likeInline}>
            <div className={s.likeContainer}>
              {artwork.Likes > 0 ? artwork.Likes : ''}
              <IconButton
                className={s.likeButton}
                disableRipple
                disableFocusRipple
                disabled={!isSignedIn}
                onClick={toggleLike}>
                  <FavoriteIcon color={likedColor}/>
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
      <ShowArtworkModal 
        open={showArtworkModal} 
        setOpen={(v) => setShowArtworkModal(v)} 
        artwork={artwork}
        onLikeClick={onLikeClick} />
    </>
  );
}