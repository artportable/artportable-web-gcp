import FavoriteIcon from "@material-ui/icons/Favorite";
import { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { i18n, useTranslation } from "next-i18next";
import { styles } from "./artworkListItemDefined.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
import { useEffect } from "react";
import clsx from "clsx";
import { UserContext } from "../../contexts/user-context";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import Button from "../Button/Button";
import { capitalizeFirst } from "../../../app/utils/util";
import SendIcon from "@material-ui/icons/Send";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { Badge, Box, Chip } from "@material-ui/core";
import { sv } from "date-fns/locale";
import { Locales } from "../../models/i18n/locales";
import { useRedirectToLoginIfNotLoggedIn } from "../../../app/hooks/useRedirectToLoginIfNotLoggedIn";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ChatIcon from "@material-ui/icons/Chat";
import { RWebShare } from "react-web-share";
import ShareIcon from "@material-ui/icons/Share";
import MuiButton from "@material-ui/core/Button";
import TagChip from "../TagChip/TagChip";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";
import { getTimePassed } from "../../hooks/dataFetching/Artworks";

export default function ArtworkListItemDefined({
  artwork,
  onLikeClick,
  onPurchaseRequestClick,
  purchaseRequestAction,
  height,
  width,
  topActions = undefined,
  indexPage,
}) {
  const s = styles();
  const sShared = sharedStyles();
  const { t } = useTranslation(["art", "common"]);

  const [isLiked, setIsLiked] = useState(artwork.LikedByMe);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();

  const { isSignedIn, username } = useContext(UserContext);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const publicUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const timePassed = getTimePassed(artwork?.Published, t);

  const router = useRouter();
  const excludedCurrencyCodes = ["SEK", "NOK", "DKK"];

  const profileUser = useGetProfileUser();

  const isMyProfile = profileUser === username.value;

  // TODO: Use getFormatter function in utils/formatUtils.tsx instead.
  function getFormatter(
    languageCode: string,
    currency: string | null
  ): Intl.NumberFormat {
    if (currency === null) {
      return new Intl.NumberFormat(languageCode, {
        style: "currency",
        currency: "SEK",
        currencyDisplay: "code",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
    if (languageCode === "sv") {
      return new Intl.NumberFormat("sv", {
        style: "currency",
        currency: artwork.Currency,
        currencyDisplay: "code",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: artwork.Currency,
        currencyDisplay: "code",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }
  }
  const languageCode = i18n.language;
  const formatter = getFormatter(languageCode, artwork.Currency);

  let priceFormatter = {
    format: (value: number) => formatter.format(value),
  };
  if (artwork.Currency && !excludedCurrencyCodes.includes(artwork.Currency)) {
    priceFormatter = {
      format: (value: number) => formatter.format(value),
    };
  } else {
    priceFormatter = {
      format: (value: number) => `${value} ${artwork.Currency || "SEK"}`,
    };
  }

  const formattedPrice = priceFormatter.format(artwork.Price);

  useEffect(() => {
    setIsLiked(artwork?.LikedByMe);
  }, [artwork?.LikedByMe]);

  function toggleLike(event) {
    event.stopPropagation();

    if (isSignedIn.value) {
      setIsLiked(!isLiked);
      artwork.LikedByMe = !isLiked;
      !isLiked ? artwork.Likes++ : artwork.Likes--;
      !isLiked
        ? trackGoogleAnalytics(
            ActionType.LIKE_PORTFOLIO_DISCOVER,
            CategoryType.INTERACTIVE
          )
        : null;
    }
    onLikeClick(artwork.Id, !isLiked);
  }
  const artworkUrl = `https://artportable.com/art/${artwork?.Id}`;
  const shareArtworkTitle = artwork?.Title
    ? `${t("common:share")}"${artwork?.Title}"`
    : `${t("common:share")}`;
  const shareArtworkText = `${t("common:checkThisArtwork")}"${
    artwork?.Title
  }"${t("common:atArtportable")}`;

  const likedFilled = !isSignedIn.value ? (
    <FavoriteBorderOutlinedIcon color="primary" />
  ) : isLiked ? (
    <FavoriteIcon color="primary" />
  ) : (
    <FavoriteBorderOutlinedIcon color="primary" />
  );

  if (width === null || height === null) return <></>;

  const [isNew, setIsNew] = useState(false);

  function isNewUser(createdDate) {
    if (!createdDate) return false;

    const truncatedDate = createdDate.slice(0, 23) + "Z";

    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const parsedDate = new Date(truncatedDate);
    const dateDifference = currentDate.getTime() - parsedDate.getTime();

    return dateDifference <= oneMonthInMilliseconds;
  }

  useEffect(() => {
    async function fetchData() {
      if (indexPage) {
        try {
          const response = await fetch(
            `${publicUrl}/api/artists/${artwork?.Username}`
          );
          if (response.ok) {
            const jsonData = await response.json();
            if (isNewUser(jsonData.Created)) {
              setIsNew(true);
            }
          } else {
            console.error(response.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, [artwork?.Username]);

  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <Link href={`/art/${artwork.Id}`}>
          <a>
            <img
              width={width}
              height={height}
              alt={`${artwork?.Title ? artwork?.Title : "artwork"}`}
              key={artwork?.PrimaryFile}
              src={`${bucketUrl}${artwork.PrimaryFile.Name}`}
            />

            {/* om man inte är på indexsidan, utan på profilsidan */}
            {!indexPage && (
              <div className={s.infoHover}>
                <div className={s.infoWrapper}>
                  <div className={s.titleHover}>
                    {artwork.Title ? artwork.Title : t("untitled")}
                  </div>
                  <div className={s.priceHover}>
                    {artwork.SoldOut ? (
                      <>
                        <div />
                        {t("common:words.sold")}{" "}
                      </>
                    ) : artwork.Price && artwork.Price !== "0" ? (
                      formattedPrice.replace(/,/g, "")
                    ) : (
                      t("priceOnRequest")
                    )}
                  </div>

                  <div></div>
                  <EastOutlinedIcon style={{ marginBottom: "12px" }} />
                </div>
                <div className={s.tagsWrapper}>
                  {Array.from(artwork.Tags)
                    .slice(
                      0,
                      artwork.Tags.some((tag) => tag.length > 8) ? 2 : 4
                    )
                    .map((tag: string) => (
                      <TagChip
                        key={tag}
                        title={tag}
                        onChipClick={null}
                        limitReached
                        variant="outlined"
                        isSmall
                      />
                    ))}
                </div>
                {/* <div
                  style={{
                    marginTop: '1vh',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: '1600',
                    backgroundColor: 'red',

                  }}
                >
                  <IconButton
                    className={s.likeButton}
                    disableRipple
                    onClick={toggleLike}
                  >
                    {likedFilled}
                    <div
                      style={{
                        fontSize: '2em',
                        marginLeft: '2px',
                        color: '#000000',
                        fontWeight: 'light'
                      }}
                    >
                      {artwork && artwork.Likes > 0 ? artwork.Likes : ''}
                    </div>
                  </IconButton>
                </div> */}
              </div>
            )}
          </a>
        </Link>

        {indexPage && (
          <div className={s.newUserWrapper}>
            {isNew && <div className={s.newUser}>{t("common:newMember")}</div>}
          </div>
        )}
      </div>
      {!indexPage && !isMyProfile ? (
        <div className={s.desktopLikeTitle}>
          <div className={s.titleMobile}>
            {artwork && artwork.Title ? artwork.Title : t("untitled")}
          </div>

          <IconButton
            aria-label="like"
            className={s.likeButton}
            onClick={toggleLike}
          >
            {likedFilled}
            <div className={s.likeMobile}>
              {artwork && artwork.Likes > 0 ? artwork.Likes : ""}
            </div>
          </IconButton>
        </div>
      ) : (
        !indexPage &&
        isMyProfile && (
          <div className={s.desktopLikeTitle}>
            <div></div>
            {topActions && (
              <div className={s.likeButton}>
                <div>{topActions}</div>
              </div>
            )}
          </div>
        )
      )}

      {indexPage && (
        <div className={s.infoContainer}>
          <div className={s.nameTitleLike}>
            <div className={s.titleAndLike}>
              <div className={s.info}>
                <Link href={`/profile/@${artwork.Username}`}>
                  <a>
                    <div className={s.name}>
                      {`${artwork.Name} ${artwork.Surname}`}
                      <span
                        style={{
                          marginLeft: "5px",
                          color: "gray",
                          fontSize: "12px",
                          fontFamily: "Gotham",
                        }}
                      >
                        {"•"} {timePassed.Time}
                        {timePassed.Unit}
                      </span>
                    </div>
                  </a>
                </Link>
              </div>
              <div className={s.likeInline}>
                <div className={s.likeContainer}>
                  <div className={s.flexLikeCount}>
                    <RWebShare
                      data={{
                        text: shareArtworkText,
                        url: artworkUrl,
                        title: shareArtworkTitle,
                      }}
                      onClick={() =>
                        trackGoogleAnalytics(ActionType.SHARE_ARTWORK)
                      }
                    >
                      <IconButton aria-label="share" className={s.shareButton}>
                        <ShareIcon style={{ fontSize: "21px" }} />
                      </IconButton>
                    </RWebShare>
                    <div title={t("common:sendMessage")}>
                      <IconButton
                        className={s.chatButton}
                        aria-label="account"
                        onClick={() => {
                          redirectIfNotLoggedIn({
                            pathname: "/messages",
                            query: {
                              referTo: artwork.Owner.SocialId,
                            },
                          });
                          trackGoogleAnalytics(
                            ActionType.SEND_MESSAGE,
                            CategoryType.INTERACTIVE
                          );
                        }}
                      >
                        <MessageRoundedIcon style={{ fontSize: "23px" }} />
                      </IconButton>
                    </div>

                    <IconButton
                      aria-label="like"
                      className={s.likeButton}
                      disableRipple
                      onClick={toggleLike}
                    >
                      {likedFilled}
                    </IconButton>
                    <div className={s.likeCounter}>
                      {artwork.Likes > 0 ? artwork.Likes : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.titleTagsContainer}>
              <div className={s.title}>
                {artwork.Title ? artwork.Title : t("untitled")}
                <span className={s.sizesArt}>
                  {artwork.MultipleSizes
                    ? " (" + t("common:words.multipleSizes").toLowerCase() + ")"
                    : artwork.Width && artwork.Height && artwork.Depth
                    ? " (" +
                      artwork.Width +
                      "x" +
                      artwork.Height +
                      "x" +
                      artwork.Depth +
                      "cm)"
                    : artwork.Width && artwork.Height
                    ? " (" + artwork.Width + "x" + artwork.Height + "cm)"
                    : null}
                </span>
              </div>
              <div className={s.tagsContainer}>
                {Array.from(artwork.Tags)
                  .slice(0, artwork.Tags.some((tag) => tag.length > 8) ? 2 : 4)
                  .map((tag: string) => {
                    return (
                      <TagChip
                        key={tag}
                        title={tag}
                        onChipClick={null}
                        limitReached={true}
                        variant="outlined"
                        isSmall={true}
                      ></TagChip>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className={s.inLine}>
            <div className={s.price}>
              {artwork.SoldOut ? (
                <>
                  <div className={s.soldMark} />
                  {t("common:words.sold")}{" "}
                </>
              ) : artwork.Price && artwork.Price != "0" ? (
                formattedPrice.replace(/,/g, "")
              ) : (
                t("priceOnRequest")
              )}
            </div>

            <div className={s.rum}>
              {username.value != artwork.Owner.Username && !artwork.SoldOut && (
                <Button
                  className={clsx(sShared.smallButton, sShared.yellowButton)}
                  // className={
                  //   router.locale === Locales.sv
                  //     ? s.purchaseRequestButtonSv
                  //     : s.purchaseRequestButtonEn
                  // }
                  onClick={() => {
                    onPurchaseRequestClick(
                      artwork.Title,
                      artwork.Owner.Username,
                      artwork.Id,
                      artwork.Owner.SocialId,
                      bucketUrl + artwork.PrimaryFile.Name
                    );
                    trackGoogleAnalytics(
                      purchaseRequestAction
                        ? purchaseRequestAction
                        : ActionType.PURCHASE_REQUEST_LIST,
                      CategoryType.BUY
                    );
                  }}
                  variant="outlined"
                  rounded
                >
                  {t("request")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
