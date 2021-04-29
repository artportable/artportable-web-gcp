import React, { useState } from 'react';
import { styles } from './feedCard.css'
import { useTranslation } from "next-i18next";
import Card from "@material-ui/core/Card";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '../Button/Button';
import Image from 'next/image'
import Link from 'next/link'
import { capitalizeFirst } from '../../utils/util';
import { CardActions, CardHeader, CardMedia, Box, Avatar } from '@material-ui/core';
import { FeedItem } from '../../models/FeedItem';
import clsx from 'clsx'

interface FeedCardProps {
  content: FeedItem,
  onLikeClick: any,
}

export default function FeedCard({ content, onLikeClick }: FeedCardProps) {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;
  const [isLiked, setLike] = useState(content.LikedByMe);

  const elapsedTime = getElapsedTime(content.Published);

  const mediaClasses = clsx({
    [s.threeImages]: content.Item.TertiaryFile,
    [s.twoImages]: content.Item.SecondaryFile && !content.Item.TertiaryFile,
    [s.oneImage]: !content.Item.SecondaryFile && !content.Item.TertiaryFile
  },
  [s.media]);

  return (
    <Card>
      <Link href={`/@${content.User}`}>
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
                  style={{fontSize: 48}}
                />
              )
            }
            title={content.User}
            subheader={
              <Box>
                <span>{content.Location}</span>
                <span className={s.published}>{elapsedTime.Time} {t('common:timeUnit.' + elapsedTime.Unit)}</span>
              </Box>
            }
          />
        </a>
      </Link>
      <CardMedia className={mediaClasses}>
        <div className={s.primaryImage}>
          <Image src={`${bucketUrl}${content.Item.PrimaryFile.Name}`}
            alt="Primary image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {content.Item.SecondaryFile &&
          <div className={s.secondaryImage}>
            <Image src={`${bucketUrl}${content.Item.SecondaryFile.Name}`}
              alt="Secondary image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        }
        {content.Item.TertiaryFile &&
          <div className={s.tertiaryImage}>
            <Image src={`${bucketUrl}${content.Item.TertiaryFile.Name}`}
              alt="Tertiary image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        }
      </CardMedia>
      <CardActions className={s.cardActions}>
        <Button
          startIcon={<FavoriteIcon color={isLiked ? "secondary" : "inherit"}/>}
          onClick={() => {
            onLikeClick(content.Item.Id, !isLiked);
            setLike(!isLiked);
          } }>
          {capitalizeFirst(t('like'))}
        </Button>
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
