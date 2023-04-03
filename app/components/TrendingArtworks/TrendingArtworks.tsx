import { styles } from "./trendingArtworks.css";
import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  Box,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import clsx from "clsx";
import { useRouter } from "next/router";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SendIcon from "@material-ui/icons/Send";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import { capitalizeFirst } from "../../utils/util";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { TokenContext } from "../../contexts/token-context";
import { UserContext } from "../../contexts/user-context";
import { getTimePassed } from "../../hooks/dataFetching/Artworks";

export default function TrendingArtworks({ artwork, onLikeClick }) {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const s = styles();
  const { t } = useTranslation(["feed", "common"]);
  const [isLiked, setLike] = useState(artwork.LikedByMe);
  const router = useRouter();
  const isDefaultLocale = router.locale === router.defaultLocale;
  const [totalLikes, setTotalLikes] = useState(artwork.Likes);
  const timePassed = getTimePassed(artwork?.Published, t);
  const { like } = usePostLike();
  const token = useContext(TokenContext);
  function likePost(artworkId, isLike) {
    like(artworkId, isLike, artwork.Owner.SocialId, token);
  }

  const mediaClasses = clsx(
    {
      [s.threeImages]: artwork.TertiaryFile,
      [s.twoImages]: artwork.SecondaryFile && !artwork.TertiaryFile,
      [s.oneImage]: !artwork.SecondaryFile && !artwork.TertiaryFile,
    },
    [s.media]
  );

  return (
    <Card className={s.cardLayout}>
      <Link href={`/profile/@${artwork?.Owner.Username}`}>
        <a>
          <div className={s.cardHeaderContainer}>
            <CardHeader
              className={s.cardHeader}
              avatar={
                artwork?.ProfilePicture ? (
                  <Avatar
                    src={`${bucketUrl}${artwork?.ProfilePicture}`}
                    alt="Profile picture"
                    style={{ height: "40px", width: "40px" }}
                  />
                ) : (
                  <AccountCircleIcon
                    color="secondary"
                    style={{ fontSize: 48 }}
                  />
                )
              }
              title={`${artwork.Name} ${artwork.Surname}`}
              subheader={
                <Box>
                  {artwork.Owner.Location && (
                    <span>
                      {artwork.Owner.Location}
                      <br />
                      {timePassed.Time} {timePassed.Unit}
                    </span>
                  )}
                </Box>
              }
            />
            <Box>
              <p>{t("trendingArtFeed")}</p>
            </Box>
          </div>
        </a>
      </Link>

      <CardMedia>
        <Link href={`/art/${artwork.Id}`}>
          <a className={mediaClasses}>
            <div className={s.primaryImage}>
              <img
                className={s.image}
                src={`${bucketUrl}${artwork?.PrimaryFile.Name}`}
                key={artwork?.PrimaryFile}
              />
            </div>
            {artwork.SecondaryFile && (
              <div className={s.secondaryImage}>
                <img
                  className={s.image}
                  src={`${bucketUrl}${artwork.SecondaryFile.Name}`}
                  alt="Primary image"
                />
              </div>
            )}
            {artwork.TertiaryFile && (
              <div className={s.tertiaryImage}>
                <img
                  className={s.image}
                  src={`${bucketUrl}${artwork.TertiaryFile.Name}`}
                  alt="Primary image"
                />
              </div>
            )}
          </a>
        </Link>
      </CardMedia>
      <CardActions className={s.cardActions}>
        <div className={s.likeCountContainer}>
          <Button
            className={s.likeButton}
            type="button"
            startIcon={
              isLiked ? (
                <FavoriteIcon color="primary" />
              ) : (
                <FavoriteBorderOutlinedIcon color="primary" />
              )
            }
            onClick={(event) => {
              event.preventDefault();
              likePost(artwork.Id, !isLiked);
              setLike(!isLiked);
              setTotalLikes(!isLiked ? totalLikes + 1 : totalLikes - 1);
            }}
          ></Button>
          <div className={s.likeInline}>{totalLikes > 0 ? totalLikes : ""}</div>
        </div>
        <Link
          href={{
            pathname: "/messages",
            query: {
              artwork: Buffer.from(
                JSON.stringify({
                  title: artwork.Title,
                  creator: artwork.User,
                  url: `${window.origin}${
                    isDefaultLocale ? "" : `/${router.locale}`
                  }/art/${artwork.Id}`,
                })
              ).toString("base64"),
              referTo: artwork.User,
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
