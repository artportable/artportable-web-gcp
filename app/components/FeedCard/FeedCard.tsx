import React, { useEffect, useState } from "react";
import { styles } from "./feedCard.css";
import { useTranslation } from "next-i18next";
import Card from "@material-ui/core/Card";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendIcon from "@material-ui/icons/Send";
import Image from "../../models/Image";
import Link from "next/link";
import { capitalizeFirst } from "../../utils/util";
import {
  CardActions,
  CardHeader,
  CardMedia,
  Box,
  Avatar,
  Button,
} from "@material-ui/core";
import { FeedItem } from "../../models/FeedItem";
import clsx from "clsx";
import { useRouter } from "next/router";

import axios from "axios";
import PurchaseRequestDialog from "../PurchaseRequestDialog/PurchaseRequestDialog";
import {

  useGetUserProfileSummary,
  useGetUserProfilePicture,
} from "../../hooks/dataFetching/UserProfile";
import LikeArtworkButton from "../Button/LikeArtworkButton";
interface FeedCardProps {
  content: FeedItem;
  onLikeClick: Function;
}
function FeedCard({ content, onLikeClick }: FeedCardProps) {
  const s = styles();
  const { t } = useTranslation(["feed", "common"]);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL; // profile pic
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isLiked, setLike] = useState(content.LikedByMe);
  const router = useRouter();
  const isDefaultLocale = router.locale === router.defaultLocale;
  const timePassed = getTimePassed(content.Published, t);
  const [totalLikes, setTotalLikes] = useState(content.Likes);
  const [artworkData, setArtworkData] = useState(null);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const userProfileSummary = useGetUserProfileSummary(content?.User);
  const [isLoading, setIsLoading] = useState(true);
  const [isSoldOut, setIsSoldOut] = useState(false);
  useEffect(() => {
    console.log(content);
  }, []);

  useEffect(() => {
    if (userProfileSummary) {
      setIsLoading(false);
    }
  }, [userProfileSummary]);

  async function isSold() {
    const theData = await axios.get(
      `${apiUrl}/api/artworks/${content?.Item?.Id}`
    );

    setIsSoldOut(theData.data.SoldOut);
  }

  useEffect(() => {
    isSold();
  }, [content]);

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
    const url = `${publicUrl}/art/${content?.Item?.Id}`;
    referTo = userProfileSummary.data.SocialId;
    setPurchaseRequestDialogData({
      title: title,
      creator: creator,
      url: url,
      referTo: referTo,
      imageurl: imageurl,
    });
    togglePurchaseRequestDialog();
  }

  const mediaClasses = clsx(
    {
      [s.threeImages]: content.Item.TertiaryFile,
      [s.twoImages]: content.Item.SecondaryFile && !content.Item.TertiaryFile,
      [s.oneImage]: !content.Item.SecondaryFile && !content.Item.TertiaryFile,
    },
    [s.media]
  );

  const getArtworkPrice = async () => {
    const data = await axios.get(`${apiUrl}/api/Artworks/${content?.Item?.Id}`);
    setArtworkData(data.data);
  };

  useEffect(() => {
    getArtworkPrice();
  }, []);

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
        <LikeArtworkButton artwork={content.Item}></LikeArtworkButton>
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
                className={s.purchaseRequestButton}
                onClick={() => {
                  onPurchaseRequestClick(
                    content.Item.Title,
                    `${content.Name} ${content.Surname}`,
                    `${publicUrl}/art/${content?.Item?.Id}`,
                    userProfileSummary.data.SocialId,
                    `${bucketUrl}${content?.Item.Id}`
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

export default React.memo(FeedCard);

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
