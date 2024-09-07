import { styles } from "./trendingArtworks.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
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
import usePostLikeEmail from "../../hooks/dataFetching/usePostLikeEmail";
import { getTimePassed } from "../../hooks/dataFetching/Artworks";
import axios from "axios";
import PurchaseRequestDialog from "../PurchaseRequestDialog/PurchaseRequestDialog";
import { useGetUserProfileSummary } from "../../hooks/dataFetching/UserProfile";
import LikeArtworkButton from "../Button/LikeArtworkButton";

export default function TrendingArtworks({ artwork }) {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const s = styles();
  const sShared = sharedStyles();
  const { t } = useTranslation(["feed", "common"]);
  const [isLiked, setLike] = useState(artwork.LikedByMe);
  const router = useRouter();
  const isDefaultLocale = router.locale === router.defaultLocale;
  const [totalLikes, setTotalLikes] = useState(artwork.Likes);
  const timePassed = getTimePassed(artwork?.Published, t);
  const { likeEmail } = usePostLikeEmail();
  const [artworkData, setArtworkData] = useState(null);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const userProfileSummary = useGetUserProfileSummary(artwork?.Owner?.Username);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    if (userProfileSummary) {
      setIsLoading(false);
    }
  }, [userProfileSummary]);

  async function isSold() {
    const theData = await axios.get(`${apiUrl}/api/artworks/${artwork?.Id}`);

    setIsSoldOut(theData.data.SoldOut);
  }

  useEffect(() => {
    isSold();
  }, [artwork]);

  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] =
    useState(false);
  const [purchaseRequestDialogData, setPurchaseRequestDialogData] = useState({
    title: "",
    creator: "",
    url: "",
    referTo: "",
    imageurl: "",
  });

  function togglePurchaseRequestDialog() {
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen);
  }

  function onPurchaseRequestClick(
    title: string,
    creator: string,
    artworkId: string,
    referTo: string,
    imageurl: string
  ) {
    const url = `${publicUrl}/art/${artwork?.Id}`;
    referTo = userProfileSummary.data?.SocialId;
    setPurchaseRequestDialogData({
      title: title,
      creator: creator,
      url: url,
      referTo: referTo,
      imageurl: imageurl,
    });
    togglePurchaseRequestDialog();
  }

  function likePost(artwork, isLike) {
    likeEmail(artwork, isLike);
  }

  const mediaClasses = clsx(
    {
      [s.threeImages]: artwork.TertiaryFile,
      [s.twoImages]: artwork.SecondaryFile && !artwork.TertiaryFile,
      [s.oneImage]: !artwork.SecondaryFile && !artwork.TertiaryFile,
    },
    [s.media]
  );

  const getArtworkPrice = async () => {
    const data = await axios.get(`${apiUrl}/api/Artworks/${artwork?.Id}`);
    setArtworkData(data.data);
  };

  useEffect(() => {
    getArtworkPrice();
  }, []);

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
                alt={`${artwork?.Title ? artwork?.Title : "artwork"}`}
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
        <LikeArtworkButton artwork={artwork}></LikeArtworkButton>
        <div className={s.pricePurchase}>
          <div className={s.priceTag}>
            {artworkData?.SoldOut ? (
              <>
                <div className={s.soldMark}></div>
                <div>{t("common:words.sold")} </div>
              </>
            ) : artworkData?.Price && artworkData?.Price != "0" ? (
              <span>
                {artworkData?.Price}{" "}
                {artworkData?.Currency !== null ? artworkData?.Currency : "SEK"}{" "}
              </span>
            ) : (
              <span>{t("priceOnRequest")}</span>
            )}
          </div>

          {!isSoldOut && (
            <>
              <Button
                className={clsx(sShared.smallButton, sShared.yellowButton)}
                onClick={() => {
                  onPurchaseRequestClick(
                    artwork.Title,
                    `${artwork.Name} ${artwork.Surname}`,
                    `${publicUrl}/art/${artworkData?.Id}`,
                    userProfileSummary.data?.SocialId,
                    `${bucketUrl}${artworkData?.PrimaryFile?.Name}`
                  );
                }}
              >
                {capitalizeFirst(t("common:purchaseRequest"))}
              </Button>
              <PurchaseRequestDialog
                open={purchaseRequestDialogOpen}
                onClose={togglePurchaseRequestDialog}
                props={{
                  title: purchaseRequestDialogData.title,
                  creator: purchaseRequestDialogData.creator,
                  url: purchaseRequestDialogData.url,
                  referTo: purchaseRequestDialogData.referTo,
                  imageUrl: purchaseRequestDialogData.imageurl,
                }}
              />
            </>
          )}
        </div>
      </CardActions>
    </Card>
  );
}
