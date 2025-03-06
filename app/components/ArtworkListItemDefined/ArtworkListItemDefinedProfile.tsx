import FavoriteIcon from "@material-ui/icons/Favorite";
import { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { i18n, useTranslation } from "next-i18next";
import { styles } from "./artworkListItemDefined.css";
import { useEffect } from "react";
import { UserContext } from "../../contexts/user-context";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";

import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

import TagChip from "../TagChip/TagChip";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";
import Image from "next/image";
export default function ArtworkListItemDefinedProfile({
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
  const { t } = useTranslation(["art", "common"]);

  const [isLiked, setIsLiked] = useState(artwork.LikedByMe);

  const { isSignedIn, username } = useContext(UserContext);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

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
    onLikeClick(artwork, !isLiked);
  }

  const likedFilled = !isSignedIn.value ? (
    <FavoriteBorderOutlinedIcon color="primary" />
  ) : isLiked ? (
    <FavoriteIcon color="primary" />
  ) : (
    <FavoriteBorderOutlinedIcon color="primary" />
  );

  if (width === null || height === null) return <></>;

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
            {!indexPage && (
              <div className={s.infoHover}>
                <div className={s.infoWrapper}>
                  <div className={s.titleHover}>
                    {artwork.Title ? artwork.Title : t("untitled")}
                  </div>
                  <div className={s.priceHover}>
                    {artwork?.SoldOut ? (
                      <>{t("common:words.sold")} </>
                    ) : artwork?.Price && artwork?.Price !== "0" ? (
                      <span>
                        {t("art:artworkPrice")}:{" "}
                        {Number(artwork?.Price)
                          .toLocaleString("sv-SE")
                          .replace(/\u00A0/g, " ")}{" "}
                        {artwork?.Currency !== null ? artwork?.Currency : "SEK"}{" "}
                      </span>
                    ) : (
                      <span>{t("priceOnRequest")}</span>
                    )}
                  </div>

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
              </div>
            )}
          </a>
        </Link>
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
          <div className={s.desktopEditButton}>
            {topActions && (
              <div className={s.likeButton}>
                <div>{topActions}</div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
