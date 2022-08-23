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
import { Badge } from '@material-ui/core'
import { sv } from 'date-fns/locale';
import { Locales } from '../../models/i18n/locales'
import { useRedirectToLoginIfNotLoggedIn } from '../../../app/hooks/useRedirectToLoginIfNotLoggedIn'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatIcon from '@material-ui/icons/Chat';
import { RWebShare } from 'react-web-share'
import ShareIcon from '@material-ui/icons/Share';

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
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();

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
  const artworkUrl = `https://artportable.com/art/${artwork?.Id}`
  const shareArtworkTitle = artwork?.Title ? `${t('common:share')}"${artwork?.Title}"`: `${t('common:share')}`;
  const shareArtworkText = `${t('common:checkThisArtwork')}"${artwork?.Title}"${t('common:atArtportable')}`

  const likedFilled = !isSignedIn.value ?
    <FavoriteBorderOutlinedIcon color="primary" /> :
    isLiked ? <FavoriteIcon color="primary" /> : <FavoriteBorderOutlinedIcon color="primary" />;

  if (width === null || height === null) return <></>;

  return (
    <div className={s.container}>
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
            <RWebShare
              data={{
                text: shareArtworkText,
                url: artworkUrl,
                title: shareArtworkTitle,
              }}
              onClick={() => trackGoogleAnalytics(ActionType.SHARE_ARTWORK)}
            >
              <IconButton className={s.shareButton} >
                <ShareIcon style={{ fontSize: '21px' }} />
              </IconButton>
            </RWebShare>
            <div title={t('common:sendMessage')}>
              <a>
                <IconButton className={s.chatButton} aria-label="account" onClick={() => {
                  redirectIfNotLoggedIn({
                    pathname: "/messages",
                    query: {
                      referTo: artwork.Owner.SocialId
                    }
                  });
                  trackGoogleAnalytics(ActionType.SEND_MESSAGE, CategoryType.INTERACTIVE)
                }}>
                  <ChatBubbleOutlineIcon style={{ fontSize: '23px' }} />
                </IconButton>
              </a>
            </div>
            <div className={s.flexLikeCount}>
              <IconButton
                className={s.likeButton}
                disableRipple
                disableFocusRipple
                onClick={toggleLike}>
                {likedFilled}
              </IconButton>
              <div className={s.likeCounter}>
                {artwork.Likes > 0 ? artwork.Likes : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.purchaseFrameTool}>
        {
          username.value != artwork.Owner.Username && !artwork.SoldOut &&
          <Button
            className={router.locale === Locales.sv ? s.purchaseRequestButtonSv : s.purchaseRequestButtonEn}
            purchaseRequestButton
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
          >
            {t('request')}
          </Button>
        }
       {artwork.Width > 0 && artwork.Height > 0 && 
        <div className={s.roomDiv}>
          <a href={`/tool/${artwork.Id}`}>
              <Button
                className={router.locale === Locales.sv ? s.roomButtonSv : s.roomButtonEn}
                rounded>
                {t('room')}
              </Button>
          </a>
        </div>
        }
      </div>
    </div>
  );
}