import React, { useEffect, useState } from "react";
import { styles } from "./feedCard.css";
import { useTranslation } from "next-i18next";
import Card from "@material-ui/core/Card";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendIcon from "@material-ui/icons/Send";
import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";
import { capitalizeFirst } from "../../utils/util";
import {
  CardActions,
  CardHeader,
  CardMedia,
  Box,
  Avatar,
} from "@material-ui/core";
import { FeedItem } from "../../models/FeedItem";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

interface FeedCardProps {
  content: FeedItem;
  onLikeClick: any;
}

export default function FeedCard({ content, onLikeClick }: FeedCardProps) {
  const s = styles();
  const { t } = useTranslation(["feed", "common"]);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const [isLiked, setLike] = useState(content.LikedByMe);
  const router = useRouter();
  const isDefaultLocale = router.locale === router.defaultLocale;
  const timePassed = getTimePassed(content.Published, t);
  const [totalLikes, setTotalLikes] = useState(content.Likes);

  const mediaClasses = clsx(
    {
      [s.threeImages]: content.Item.TertiaryFile,
      [s.twoImages]: content.Item.SecondaryFile && !content.Item.TertiaryFile,
      [s.oneImage]: !content.Item.SecondaryFile && !content.Item.TertiaryFile,
    },
    [s.media]
  );

  return (
    <Card>
      <Link href={`/profile/@${content.User}`}>
        <a>
          <CardHeader
            className={s.cardHeader}
            avatar={
              content?.ProfilePicture ? (
                <Avatar
                  src={`${bucketUrl}${content?.ProfilePicture}`}
                  alt="Profile picture"
                  style={{ height: "40px", width: "40px" }}
                />
              ) : (
                <AccountCircleIcon color="secondary" style={{ fontSize: 48 }} />
              )
            }
            title={`${content.Name} ${content.Surname}`}
            subheader={
              <Box>
                {content.Location && (
                  <span>
                    {content.Location}
                    <br />
                  </span>
                )}
                {timePassed.Time} {timePassed.Unit}
              </Box>
            }
          />
        </a>
      </Link>
      <CardMedia>
        <Link href={`/art/${content.Item.Id}`}>
          <a className={mediaClasses}>
            <div className={s.primaryImage}>
              <img
                className={s.image}
                src={`${bucketUrl}${content.Item.PrimaryFile.Name}`}
                alt="Primary image"
              />
            </div>
            {content.Item.SecondaryFile && (
              <div className={s.secondaryImage}>
                <img
                  className={s.image}
                  src={`${bucketUrl}${content.Item.SecondaryFile.Name}`}
                  alt="Primary image"
                />
              </div>
            )}
            {content.Item.TertiaryFile && (
              <div className={s.tertiaryImage}>
                <img
                  className={s.image}
                  src={`${bucketUrl}${content.Item.TertiaryFile.Name}`}
                  alt="Primary image"
                />
              </div>
            )}
          </a>
        </Link>
      </CardMedia>
      <CardActions className={s.cardActions}>
        <div className={s.likeInline}>
          <div className={s.likeContainer}>
            <div className={s.flexLikeCount}>
              <div className={s.likeCounter}>
                {totalLikes > 0 ? totalLikes : ""}
              </div>
            </div>
          </div>
        </div>
        <Button
          startIcon={
            isLiked ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderOutlinedIcon color="primary" />
            )
          }
          onClick={() => {
            onLikeClick(content.Item.Id, !isLiked);
            setLike(!isLiked);
            setTotalLikes(!isLiked ? totalLikes + 1 : totalLikes - 1);
          }}
        >
          {capitalizeFirst(t("common:like"))}
        </Button>
        <Link
          href={{
            pathname: "/messages",
            query: {
              artwork: Buffer.from(
                JSON.stringify({
                  title: content.Item.Title,
                  creator: content.User,
                  url: `${window.origin}${
                    isDefaultLocale ? "" : `/${router.locale}`
                  }/art/${content.Item.Id}`,
                })
              ).toString("base64"),
              referTo: content.User,
            },
          }}
          as={`/messages`}
        >
          <a>
            <Button
              startIcon={<SendIcon color={"inherit"} />}
              onClick={() =>
                trackGoogleAnalytics(
                  ActionType.PURCHASE_REQUEST_FEED,
                  CategoryType.BUY
                )
              }
            >
              {capitalizeFirst(t("common:purchaseRequest"))}
            </Button>
          </a>
        </Link>
      </CardActions>
    </Card>
  );
}

interface ElapsedTime {
  Time: number;
  Unit: string;
}

function getTimePassed(publishDate: Date, t) {
  var now = new Date();
  var seconds = Math.floor((now.getTime() - publishDate.getTime()) / 1000);

  if (seconds < 60) {
    return {
      Time: seconds,
      Unit: t("feed:seconds"),
    };
  }

  if (seconds < 3600) {
    var interval = seconds / 60;
    return {
      Time: Math.floor(interval),
      Unit: t("feed:minutes"),
    };
  }

  if (
    seconds < 86400 &&
    now.getDate() == publishDate.getDate() &&
    now.getMonth() == publishDate.getMonth() &&
    now.getFullYear() == publishDate.getFullYear()
  ) {
    var interval = seconds / 3600;
    return {
      Time: Math.floor(interval),
      Unit: t("feed:hours"),
    };
  }

  var interval = seconds / 31536000;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:year"),
    };
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:months"),
    };
  }

  interval = seconds / 604800;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:weeks"),
    };
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:days"),
    };
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:hours"),
    };
  }

  interval = seconds / 60;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: t("feed:minutes"),
    };
  }

  return {
    Time: Math.floor(seconds),
    Unit: t("feed:seconds"),
  };
}
