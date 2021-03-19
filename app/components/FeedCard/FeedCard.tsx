import React from 'react';
import { styles } from './feedCard.css'
import { useTranslation } from "next-i18next";
import Card from "@material-ui/core/Card";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '../Button/Button';
import Image from 'next/image'
import { capitalizeFirst } from '../../utils/util';
import { CardActions, CardHeader, CardMedia, Box } from '@material-ui/core';
import { FeedItem } from '../../models/FeedItem';
import clsx from 'clsx'

interface FeedCardProps {
  content: FeedItem
}

export default function FeedCard({ content }: FeedCardProps) {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);
  const bucketUrl = 'https://artportable-images.s3.eu-north-1.amazonaws.com/Images/';

  const elapsedTime = getElapsedTime(content.Published);

  const mediaClasses = clsx({
    [s.threeImages]: content.Item.TertiaryFile,
    [s.twoImages]: content.Item.SecondaryFile && !content.Item.TertiaryFile,
    [s.oneImage]: !content.Item.SecondaryFile && !content.Item.TertiaryFile
  },
  [s.media]);

  return (
    <Card className={s.post}>
      <CardHeader
        className={s.cardHeader}
        avatar={
          <AccountCircleIcon color="secondary" style={{fontSize: 48}}></AccountCircleIcon>
        }
        title={content.User}
        subheader={
          <Box mb={1}>
            <span>{content.Location}</span>
            <span className={s.published}>{elapsedTime.Time} {t('common:timeUnit.' + elapsedTime.Unit)}</span>
          </Box>
        }
      />
      <CardMedia className={mediaClasses}>
        <div className={s.primaryImage}>
          <Image src={`${bucketUrl}${content.Item.PrimaryFile}`}
            alt="Primary image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {content.Item.SecondaryFile &&
          <div className={s.secondaryImage}>
            <Image src={`${bucketUrl}${content.Item.SecondaryFile}`}
              alt="Secondary image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        }
        {content.Item.TertiaryFile &&
          <div className={s.tertiaryImage}>
            <Image src={`${bucketUrl}${content.Item.TertiaryFile}`}
              alt="Tertiary image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        }
      </CardMedia>
      <CardActions>
        <Button startIcon={<FavoriteIcon/>}>
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
