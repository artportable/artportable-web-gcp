import React, { useState } from 'react';
import { styles } from './feedCard.css'
import { useTranslation } from "next-i18next";
import Card from "@material-ui/core/Card";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import Button from '../Button/Button';
import Image from 'next/image'
import Link from 'next/link'
import { capitalizeFirst } from '../../utils/util';
import { CardActions, CardHeader, CardMedia, Box, Avatar } from '@material-ui/core';
import { FeedItem } from '../../models/FeedItem';
import clsx from 'clsx'
import { useRouter } from 'next/router';
import * as gtag from '../../../lib/gtag'

interface FeedCardProps {
  content: FeedItem,
  onLikeClick: any,
}

export default function FeedCard({ content, onLikeClick }: FeedCardProps) {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const [isLiked, setLike] = useState(content.LikedByMe);
  const router = useRouter();
  const isDefaultLocale = router.locale === router.defaultLocale;
  const elapsedTime = getElapsedTime(content.Published);

  const mediaClasses = clsx({
    [s.threeImages]: content.Item.TertiaryFile,
    [s.twoImages]: content.Item.SecondaryFile && !content.Item.TertiaryFile,
    [s.oneImage]: !content.Item.SecondaryFile && !content.Item.TertiaryFile
  },
    [s.media]);

  const purchaseRequest = () => {
    gtag.event({
      action: "purchase_request",
      category: "buy",
      label: "",
      value: ""
    })

  }

  return (
    <Card>
      <Link href={`/profile/@${content.User}`}>
        <a>
          <CardHeader
            className={s.cardHeader}
            avatar={
              content?.ProfilePicture ? (
                <Avatar src={`${bucketUrl}${content?.ProfilePicture}`}
                  alt="Profile picture"
                  style={{ height: '40px', width: '40px' }}
                />
              ) : (
                <AccountCircleIcon
                  color="secondary"
                  style={{ fontSize: 48 }}
                />
              )
            }
            title={content.User}
            subheader={
              <Box>
                <span>{content.Location}</span>
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
            {content.Item.SecondaryFile &&
              <div className={s.secondaryImage}>
                <img
                  className={s.image}
                  src={`${bucketUrl}${content.Item.SecondaryFile.Name}`}
                  alt="Primary image"
                />
              </div>
            }
            {content.Item.TertiaryFile &&
              <div className={s.tertiaryImage}>
                <img
                  className={s.image}
                  src={`${bucketUrl}${content.Item.TertiaryFile.Name}`}
                  alt="Primary image"
                />
              </div>
            }
          </a>
        </Link>
        </CardMedia>
      <CardActions className={s.cardActions}>
        <Button
          startIcon={<FavoriteIcon color={isLiked ? "secondary" : "inherit"} />}
          onClick={() => {
            onLikeClick(content.Item.Id, !isLiked);
            setLike(!isLiked);
          }}>
          {capitalizeFirst(t('common:like'))}
        </Button>
        <Link
          href={{
            pathname: "/messages",
            query: {
              artwork: Buffer.from(JSON.stringify({
                title: content.Item.Title,
                creator: content.User,
                url: `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/art/${content.Item.Id}`
              })).toString('base64'),
              referTo: content.User
            }
          }}
          as={`/messages`}
        >
          <a>
            <Button 
              startIcon={<SendIcon color={"inherit"} />}
              onClick={() => purchaseRequest()}>
              {capitalizeFirst(t('common:purchaseRequest'))}
            </Button>
          </a>
        </Link>
      </CardActions>
    </Card>
  );
}

function getElapsedTime(publishDate: Date): ElapsedTime {
  var seconds = Math.floor((Date.now() - publishDate.getTime()) / 1000);

  var interval = seconds / 31536000;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: "year"
    }
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: "month"
    }
  }

  interval = seconds / 604800;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: "week"
    }
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: "day"
    }
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: "hour"
    }
  }

  interval = seconds / 60;
  if (interval > 1) {
    return {
      Time: Math.floor(interval),
      Unit: "minute"
    }
  }

  return {
    Time: Math.floor(seconds),
    Unit: "second"
  }
}

interface ElapsedTime {
  Time: number;
  Unit: string;
}
