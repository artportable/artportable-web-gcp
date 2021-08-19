import React, { useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { styles } from './artworkStartItem.css'
import { Avatar, Paper } from '@material-ui/core'
import Link from 'next/link'
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx'


export default function ArtworkStartItem({ artwork, width }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const [isLoaded, setIsLoaded] = useState(false);

  const imageHeight = (artwork.Image.Height / artwork.Image.Width) * width;
  const skeletonHeight = imageHeight + 4;

  return (
    <Paper variant="outlined" className={s.paper}>
      <div className={s.container}>
        <div>
          <Link href={`/art/${artwork.ArtworkId}`}>
            <a>
              <img
                  className={clsx(!isLoaded && s.hidden)}
                  src={`${bucketUrl}${artwork.Image.Name}`}
                  alt="Artwork"
                  width={width === 0 ? "100%" : width}
                  height={width === 0 ? "100%" : imageHeight}
                  onLoad={() => setIsLoaded(true)}
                ></img>
              </a>
            </Link>
            
            <Skeleton
              variant="rect"
              animation="wave"
              className={clsx(isLoaded && s.hidden)}
              width={width} 
              height={skeletonHeight}>
            </Skeleton>
        </div>
        <Link href={`/profile/@${artwork.Username}`}>
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
    </Paper>
  );
}
