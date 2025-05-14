import FavoriteIcon from "@material-ui/icons/Favorite";
import { useContext, useState } from "react";
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
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import TagChip from "../TagChip/TagChip";
import { getTimePassed } from "../../hooks/dataFetching/Artworks";
import { styles } from "./artworkListItem.css";
import LikeArtworkButton from "../Button/LikeArtworkButton";
import { useGetUserProfileSummary } from "../../hooks/dataFetching/UserProfile";
import Image from "next/image";
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

  const { t } = useTranslation(["art", "common", "tags", "feed"]);

  const [isLiked, setIsLiked] = useState(artwork.LikedByMe);

  const { isSignedIn } = useContext(UserContext);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const publicUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const excludedCurrencyCodes = ["SEK", "NOK", "DKK"];

  const profileUser = useGetUserProfileSummary(artwork?.Username);

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
    format: (value: number) =>
      Number(value)
        .toLocaleString("sv-SE")
        .replace(/\u00A0/g, " "),
  };

  if (artwork.Currency && !excludedCurrencyCodes.includes(artwork.Currency)) {
    priceFormatter = {
      format: (value: number) =>
        formatter.format(value).replace(/\u00A0/g, " "), // Ensure spaces are normal spaces
    };
  } else {
    priceFormatter = {
      format: (value: number) =>
        `${Number(value)
          .toLocaleString("sv-SE")
          .replace(/\u00A0/g, " ")} ${artwork.Currency || "SEK"}`,
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
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <Link href={`/art/${artwork.Id}`}>
          <a className="relative">
            <Image
              width={width}
              height={height}
              alt={artwork?.Title ? artwork?.Title : "artwork"}
              key={artwork?.PrimaryFile?.Name}
              src={`${bucketUrl}${artwork.PrimaryFile?.Name}`}
              unoptimized
              priority
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
            {/* <div
              style={{
                fontSize: "12px",
                fontFamily: "Roboto",
                fontWeight: 300,
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
            </div> */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
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
            {/* <div
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                fontFamily: "Roboto",
                fontWeight: 300,
              }}
            >
              {artwork?.Title}
            </div> */}
            <span className={s.sizesArt}>
              {artwork.MultipleSizes
                ? " " + t("common:words.multipleSizes").toLowerCase() + ""
                : artwork.Width && artwork.Height && artwork.Depth
                ? " " + artwork.Width + "x" + artwork.Height + "cm"
                : artwork.Width && artwork.Height
                ? " " + artwork.Width + "x" + artwork.Height + "cm"
                : null}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
