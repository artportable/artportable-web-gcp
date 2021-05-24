import React from 'react';
import { styles } from './carouselItem.css';
import Image from 'next/image'
import { Avatar, Chip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Link from 'next/link';

export default function CarouselItem({ src, text, user = null }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  return (
    <div className={s.container}>
      <Image
        src={src}
        alt={text}
        width={1500}
        height={1000}
      ></Image>
      <div className={s.text}>{text}</div>
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