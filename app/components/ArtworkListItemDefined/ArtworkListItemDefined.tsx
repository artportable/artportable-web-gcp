import FavoriteIcon from '@material-ui/icons/Favorite'
import { useContext, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { styles } from './artworkListItemDefined.css'
import { useEffect } from 'react'
import { UserContext } from '../../contexts/user-context'
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../utils/googleAnalytics'

export default function ArtworkListItemDefined({ 
  artwork,
  onLikeClick,
  height,
  width,
  topActions = undefined
}) {
  const s = styles();
  const [isLiked, setIsLiked] = useState(artwork.LikedByMe);

  const { isSignedIn } = useContext(UserContext);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const router = useRouter();
  const formatter = new Intl.NumberFormat(router.locale, {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    setIsLiked(artwork?.LikedByMe);
  }, [artwork?.LikedByMe]);

  function toggleLike(event) {
    event.stopPropagation();

    if(isSignedIn.value) {
      setIsLiked(!isLiked);
      artwork.LikedByMe = !isLiked;
      !isLiked ? artwork.Likes++ : artwork.Likes--;
      !isLiked ? trackGoogleAnalytics(ActionType.GILLA_PORTOFOLIE_UPPTÄCK, CategoryType.INTERACTIVE) : null
    }
    onLikeClick(artwork.Id, !isLiked);
  }

  const likedColor = !isSignedIn.value ?
    'disabled' :
    isLiked ? "secondary" : "inherit";

  if (width === null || height === null) return <></>;

  return (
    <div title={artwork.Title} className={s.container}>
      <div className={s.imageContainer}>
        <Link href={`/art/${artwork.Id}`}>
          <a>
            <img
              style={{
                width: width,
                height: height
              }}
              key={artwork?.PrimaryFile}
              src={`${bucketUrl}${artwork.PrimaryFile.Name}`}
            />
          </a>
        </Link>
        {topActions &&
          <div className={s.editOverlay}>
            <div className={s.topActions}>
              {topActions}
            </div>
          </div>
        }
      </div>
      <div className={s.titleAndLike}>
        <div className={s.info}>
          <div className={s.title}>{artwork.Title}</div>
          <div className={s.price}>{formatter.format(artwork.Price)}</div>
        </div>
        <div className={s.likeInline}>
          <div className={s.likeContainer}>
            <div className={s.likeCounter}>
              {artwork.Likes > 0 ? artwork.Likes : ''}
            </div>
            <IconButton
              className={s.likeButton}
              disableRipple
              disableFocusRipple
              onClick={toggleLike}>
              <FavoriteIcon fontSize={'small'} color={likedColor}/>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}