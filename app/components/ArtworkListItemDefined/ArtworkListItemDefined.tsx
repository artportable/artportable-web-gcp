import FavoriteIcon from '@material-ui/icons/Favorite'
import { useState } from 'react'
import ShowArtworkModal from '../ShowArtworkModal/ShowArtworkModal'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Link from 'next/link'
import { styles } from './artworkListItemDefined.css'
import { useUser } from '../../hooks/useUser'

export default function ArtworkListItemDefined({ artwork, onLikeClick, height, width }) {
  const s = styles();
  const [isLiked, setIsLiked] = useState(artwork.IsLikedByMe);

  const { isSignedIn } = useUser();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;

  function toggleLike(event) {
    event.stopPropagation();

    setIsLiked(!isLiked);
    !isLiked ? artwork.Likes++ : artwork.Likes--;
    onLikeClick(artwork.Id, !isLiked);
  }

  const likedColor = !isSignedIn ?
    'disabled' : 
    isLiked ? "secondary" : "inherit";

  if(width === null || height === null) return  <></>;

  return (
    <>
      <Paper title={artwork.Title} variant="outlined" className={s.container}>
        <div className={s.imageContainer}>
          <Link href={`/art/${artwork.Id}`}>
            <a>
              <img
                key={artwork?.PrimaryFile}
                width={width}
                height={height}
                src={`${bucketUrl}${artwork.PrimaryFile.Name}`}
              />
            </a>
          </Link>
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
    </>
  );
}