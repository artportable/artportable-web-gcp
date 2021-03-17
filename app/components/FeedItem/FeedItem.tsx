import React from 'react';
import { styles } from './feedItem.css'
import { useTranslation } from "next-i18next";
import Card from "@material-ui/core/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import Image from 'next/image'

export default function FeedItem({ content }) {
  const s = styles();
  const { t } = useTranslation(['feed']);

  return (
    <Card className={s.post}>
      <div className={s.postContainer}>
        <div className={s.topBar}>
          <FontAwesomeIcon icon='user-circle' size='3x' style={{color:"#6DB65B"}}/>
          <div className={s.userInfo}>
            <div className={s.username}>Användarnamn</div>
            <div className={s.locationAndPublishedInfo}>
              <div>Plats</div>
              <div className={s.published}>4h sedan</div>
            </div>
          </div>
        </div>
        <div className={s.images}>
          <div className={s.imageContainer}>
            <Image src={`https://artportable-images.s3.eu-north-1.amazonaws.com/Images/43de8b65-8b19-4b87-ae3c-df97e18bd461.jpg`}
              alt="Image 1"
              width={500}
              height={200}
            />
            </div>
          <div className={s.bottomImages}>
            <div className={s.imageContainer}>
              <Image src={`https://artportable-images.s3.eu-north-1.amazonaws.com/Images/43de8b65-8b19-4b87-ae3c-df97e18bd461.jpg`}
                alt="Image 1"
                width={240}
                height={100}
              />
            </div>
            <div className={s.imageContainer}>
              <Image src={`https://artportable-images.s3.eu-north-1.amazonaws.com/Images/43de8b65-8b19-4b87-ae3c-df97e18bd461.jpg`}
                alt="Image 1"
                width={240}
                height={100}
              />
            </div>
          </div>
        </div>
        <div className={s.bottomBar}>
          <Button>
            <FontAwesomeIcon icon='heart' style={{color:"gray"}}/>
            <div className={s.likeText}>{t('like')}</div>
          </Button>
        </div>
      </div>
    </Card>
  );
}
