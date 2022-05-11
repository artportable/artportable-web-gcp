import FavoriteIcon from '@material-ui/icons/Favorite'
import { useContext, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from "next-i18next"
import { styles } from './artworkListItemDefined.css'
import { useEffect } from 'react'
import { UserContext } from '../../contexts/user-context'
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../utils/googleAnalytics'
import Button from "../Button/Button";
import { capitalizeFirst } from "../../../app/utils/util";
import SendIcon from '@material-ui/icons/Send';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

export default function ArtworkListItemDefined({
  artwork,
  onLikeClick,
  onPurchaseRequestClick,
  purchaseRequestAction,
  height,
  width,
  topActions = undefined
}) {
  const s = styles();
  const { t } = useTranslation(['art', 'common']);
  const [isLiked, setIsLiked] = useState(artwork.LikedByMe);

  const { isSignedIn, username } = useContext(UserContext);
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

    if (isSignedIn.value) {
      setIsLiked(!isLiked);
      artwork.LikedByMe = !isLiked;
      !isLiked ? artwork.Likes++ : artwork.Likes--;
      !isLiked ? trackGoogleAnalytics(ActionType.LIKE_PORTFOLIO_DISCOVER, CategoryType.INTERACTIVE) : null
    }
    onLikeClick(artwork.Id, !isLiked);
  }

  const likedFilled = !isSignedIn.value ?
    <FavoriteBorderOutlinedIcon color="primary" /> :
    isLiked ? <FavoriteIcon color="primary" /> : <FavoriteBorderOutlinedIcon color="primary" />;

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
          <Link href={`/profile/@${artwork.Username}`}>
            <a>
              <div className={s.name}>
                {`${artwork.Name} ${artwork.Surname}`}
              </div>
            </a>
          </Link>
          <div className={s.title}>
            {artwork.Title ? artwork.Title : t('untitled')}
            <span className={s.size}>
              {artwork.MultipleSizes ?
                " (" + t('common:words.multipleSizes').toLowerCase() + ")" :
                artwork.Width && artwork.Height && artwork.Depth ?
                  " (" + artwork.Width + 'x' + artwork.Height + 'x' + artwork.Depth + 'cm)' :
                  artwork.Width && artwork.Height ?
                    " (" + artwork.Width + 'x' + artwork.Height + 'cm)' :
                    null}
            </span>
          </div>
          <div className={s.price}>
            {artwork.SoldOut ? <><div className={s.soldMark} />{t('common:words.sold')} </> :
              artwork.Price && artwork.Price != "0" ?
                formatter.format(artwork.Price) :
                t('priceOnRequest')}
          </div>
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
              {likedFilled}
            </IconButton>
          </div>
        </div>
      </div>
      {/* <div>
        <a href={`/tool/${artwork.Id}`}>
          <Button>
            Ramverkstad
          </Button>
        </a>
      </div> */}
<div className={s.purchaseFrameTool}>
      {
        username.value != artwork.Owner.Username && !artwork.SoldOut &&
        <Button
          className={s.purchaseRequestButton}
          onClick={() => {
            onPurchaseRequestClick(
              artwork.Title,
              artwork.Owner.Username,
              artwork.Id,
              artwork.Owner.SocialId,
              bucketUrl + artwork.PrimaryFile.Name
            );
            trackGoogleAnalytics(purchaseRequestAction ? purchaseRequestAction : ActionType.PURCHASE_REQUEST_LIST, CategoryType.BUY);
          }}
          variant="outlined"
          rounded
          startIcon={<SendIcon color={"inherit"} />}>
          {capitalizeFirst(t('common:purchaseRequest'))}
        </Button>
      }
      {
        artwork.Width && artwork.Height &&
      <div>
        <a href={`/tool/${artwork.Id}`}>
          <Button 
          variant="outlined"
          rounded>
            Ramverkstad
          </Button>
        </a>
      </div>
      }
      </div>
    </div>
  );
}