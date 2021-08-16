import { Typography, Chip } from '@material-ui/core';
import { styles } from './indexHero.css'
import { useTranslation } from "next-i18next";

import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'

export default function IndexHero() {
  const s = styles();
  const { t } = useTranslation('index');

  return (
    <div className={s.container}>
      <div className={s.flexContainer}>
          <div className={s.left}>
            <Typography variant="h1" className={s.headline}>
              {t('header')}
            </Typography> 
            <Typography variant="body2" className={s.description}>
              {t('subHeader')}
            </Typography>
          </div>
          <div className={s.right}>
            <div className={s.paintingContainer}>
              <div className={s.outerFrame}>
                <div className={s.innerFrame}>
                  <img className={s.boosted} src="/images/boosted-horses.png" alt="Hästar"/>
                </div>
              </div>
              <div className={s.createdBy}>
                <span>
                  Created by:
                </span>
                <Chip 
                  avatar={
                    <div className={s.chipAvatar}>
                      <ProfileAvatar size={25} profilePicture="d5f6f50a-a669-4f93-943c-0314305b0113.jpg" />
                    </div>
                  }
                  label="hej"
                  color="primary" />
              </div>
            </div>
          </div>
        </div>
        <img className={s.soffa} src="/images/art_soffa.png" alt="Soffa"/>
    </div>
    
  );
}
