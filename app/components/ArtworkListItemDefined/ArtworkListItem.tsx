import FavoriteIcon from "@material-ui/icons/Favorite";
import { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { i18n, useTranslation } from "next-i18next";
import { useEffect } from "react";
import clsx from "clsx";
import { UserContext } from "../../contexts/user-context";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import Button from "../Button/Button";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
// import { Locales } from "../../models/i18n/locales";
import { useRedirectToLoginIfNotLoggedIn } from "../../../app/hooks/useRedirectToLoginIfNotLoggedIn";
import { RWebShare } from "react-web-share";
import ShareIcon from "@material-ui/icons/Share";
import TagChip from "../TagChip/TagChip";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";
import { getTimePassed } from "../../hooks/dataFetching/Artworks";
import { styles } from "./artworkListItem.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
import LikeArtworkButton from "../Button/LikeArtworkButton";
import { getUserProfileSummaryUri } from "../../hooks/dataFetching/UserProfile";
import { useGetUserProfileSummary } from "../../hooks/dataFetching/UserProfile";

export default function ArtworkListItem({
  artwork,
  onLikeClick,
  onPurchaseRequestClick,
  purchaseRequestAction,
  height,
  width,
  topActions = undefined,
}) {
  const s = styles();
  const sShared = sharedStyles();
  const { t } = useTranslation(["art", "common", "tags", "feed"]);

  const [isLiked, setIsLiked] = useState(artwork.LikedByMe);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();

  const { isSignedIn } = useContext(UserContext);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const publicUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const timePassed = getTimePassed(artwork?.Published, t);

  const router = useRouter();
  const excludedCurrencyCodes = ["SEK", "NOK", "DKK"];

  const profileUser = useGetUserProfileSummary(artwork?.Username);
  useEffect(() => {
    console.log(profileUser?.data?.City);
  }, []);

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

    fetchData();
  }, [artwork?.Username]);

  const sortTagsByLength = (a, b) => {
    // Sort tags from smallest to longest. Translate tags before sorting.
    const translatedA = t(`tags:${a}`);
    const translatedB = t(`tags:${b}`);

    if (translatedA.length < translatedB.length) return -1;
    if (translatedA.length > translatedB.length) return 1;
    return 0;
  };

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
          </a>
        </Link>

        <div className={clsx(s.infoRow, s.bottomInfoRow)}>
          <div
            className={clsx(s.bottomLeft, s.tagsContainer, {
              [s.fullWidthInfo]: !isNew,
            })}
          >
            {Array.from(artwork.Tags)
              .slice(0, artwork.Tags.some((tag) => tag.length > 8) ? 2 : 4)
              .sort(sortTagsByLength)
              .map((tag: string) => {
                return (
                  <TagChip
                    key={tag}
                    title={tag}
                    onChipClick={null}
                    limitReached={true}
                    variant="outlined"
                    isSmall={true}
                    grayChip={true}
                  ></TagChip>
                );
              })}
          </div>

          <div className={s.bottomRight}>
            {isNew && <div className={s.newUser}>{t("common:newMember")}</div>}
          </div>
        </div>
      </div>

      <div className={s.footer}>
        <div className={s.footerRow}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "gray",
                fontSize: "12px",
                fontFamily: "Gotham",
              }}
            >
              {profileUser?.data?.City === null ? (
                <div>{t("art:missingPosition")}</div>
              ) : (
                <div>{profileUser?.data?.City}</div>
              )}
            </div>
            <div
              style={{
                color: "gray",
                fontSize: "12px",
                fontFamily: "Gotham",
              }}
            >
              {getTimePassed(artwork?.Published, t)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Link href={`/profile/@${artwork.Username}`}>
              <a>
                <div className={s.name}>
                  <div>{`${artwork.Name} ${artwork.Surname}`}</div>
                </div>
              </a>
            </Link>
            <div style={{ fontSize: "12px", fontStyle: "italic" }}>
              {artwork?.Title}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className={s.price}>
            {artwork.SoldOut ? (
              <>{t("common:words.sold")} </>
            ) : artwork.Price && artwork.Price != "0" ? (
              formattedPrice.replace(/,/g, "")
            ) : (
              t("priceOnRequest")
            )}
          </div>
          <LikeArtworkButton artwork={artwork}></LikeArtworkButton>
        </div>
      </div>
    </div>
  );
}
