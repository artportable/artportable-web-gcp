import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Image from 'next/image'
import { styles } from './artworkStartItem.css'
import { Avatar } from '@material-ui/core';
import Link from 'next/link';

export default function ArtworkStartItem({ artwork }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;
  const imageWidth = 200;

  return (
    <div className={s.container}>
      <div className={s.image}>
        <Image src={`${bucketUrl}${artwork.Image.Name}`}
            alt="Artwork"
            width={imageWidth+"px"}
            height={(artwork.Image.Height / artwork.Image.Width) * imageWidth}
            objectFit="cover"></Image>
      </div>
      <Link href={`/@${artwork.Username}`}>
        <a>
          <div className={s.footer}>
            {artwork?.ProfilePicture ? (
              <Avatar src={`${bucketUrl}${artwork?.ProfilePicture}`}
                alt="Profile picture"
                style={{ height: '24px', width: '24px' }}
              />
            ) : (
              <AccountCircleIcon
                color="secondary"
                style={{fontSize: 28}}
              />
            )}
            <div className={s.username}>
              {artwork?.Username}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}