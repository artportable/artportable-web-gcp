import React from 'react';
import { styles } from './carouselItem.css';
import Image from 'next/image'
import { Avatar, Chip, Typography, Box, Paper } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Link from 'next/link';
import { useTranslation } from 'next-i18next'

export default function CarouselItem({ src, text, subheader, user = null }) {
  const s = styles();
  const { t } = useTranslation(['index', 'header']);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;

  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <img className={s.carouselImage}
          src={src}
          alt={text}
        />
      </div>
      {/* <Paper variant="outlined" className={s.text} classes={{ root: s.paperOverride }}>
        <Typography variant="h1">
          <Box className={s.textHeader} fontWeight="500" textAlign="center">
            {t(text)}
          </Box>
        </Typography>
        <Box className={s.textBody}>
          {t(subheader)}
        </Box>
      </Paper> */}
      {user && 
        <div className={s.user}>
          <Link href={`/profile/@${user.username}`}>
            <a>
              <Chip
                clickable
                avatar={user.profilepicture ?
                  <Avatar
                    src={`${bucketUrl}${user.profilepicture}`}
                    alt="Profile picture"
                  /> :
                  <AccountCircleIcon
                    color="secondary"
                  />
                }
                label={user.username}
              />
            </a>
          </Link>
        </div>
      }
    </div>
  );
}