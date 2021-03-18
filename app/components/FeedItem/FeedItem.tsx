import React from 'react';
import { styles } from './feedItem.css'
import { useTranslation } from "next-i18next";
import Card from "@material-ui/core/Card";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '../Button/Button';
import Image from 'next/image'
import { capitalizeFirst } from '../../utils/util';
import { CardActions, CardHeader, CardMedia } from '@material-ui/core';

export default function FeedItem({ content }) {
  const s = styles();
  const { t } = useTranslation(['feed']);

  return (
    <Card className={s.post}>
      <CardHeader
        avatar={
          <AccountCircleIcon color="secondary" style={{fontSize: 48}}></AccountCircleIcon>
        }
        title="Användarnamn"
        subheader={
          <div>
            <span>Plats</span>
            <span className={s.published}>4h sedan</span>
          </div>
        }
      />
      <CardMedia className={s.media}>
        <div className={s.primaryImage}>
          <Image src={`https://artportable-images.s3.eu-north-1.amazonaws.com/Images/43de8b65-8b19-4b87-ae3c-df97e18bd461.jpg`}
            alt="Image 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={s.secondaryImage}>
          <Image src={`https://artportable-images.s3.eu-north-1.amazonaws.com/Images/43de8b65-8b19-4b87-ae3c-df97e18bd461.jpg`}
            alt="Image 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={s.tertiaryImage}>
          <Image src={`https://artportable-images.s3.eu-north-1.amazonaws.com/Images/43de8b65-8b19-4b87-ae3c-df97e18bd461.jpg`}
            alt="Image 3"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardMedia>
      <CardActions>
        <Button startIcon={<FavoriteIcon/>}>
          {capitalizeFirst(t('like'))}
        </Button>
      </CardActions>
    </Card>
  );
}
