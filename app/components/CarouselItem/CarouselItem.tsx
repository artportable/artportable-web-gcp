import React from 'react';
import { styles } from './carouselItem.css';
import Image from 'next/image'
import { Avatar, Chip, Typography, Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Link from 'next/link';

export default function CarouselItem({ src, text, user = null }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <Image
          src={src}
          alt={text}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <Typography variant="h1" className={s.text}>
        <Box fontWeight="500" fontFamily="LyonDisplay">
          {text}
        </Box>
      </Typography>
      {user && 
        <div className={s.user}>
          <Link href={`/@${user.username}`}>
            <a>
              <Chip
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