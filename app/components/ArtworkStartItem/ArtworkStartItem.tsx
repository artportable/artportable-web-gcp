import React, { useState } from 'react'
import { styles } from './artworkStartItem.css'
import Link from 'next/link'
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'


export default function ArtworkStartItem({ artwork, width }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const [isLoaded, setIsLoaded] = useState(false);

  const imageHeight = (artwork.Image.Height / artwork.Image.Width) * width;
  const skeletonHeight = imageHeight + 4;
  console.log(`${bucketUrl}${artwork?.ProfilePicture}`);

  return (
   
      <div className={s.container}>
        <div className={s.imageContainer}>
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
              <ProfileAvatar size={25} profilePicture={artwork?.ProfilePicture}/>
              <div className={s.username}>
                {artwork?.Username}
              </div>
            </div>
          </a>
        </Link>
      </div>
    
  );
}
