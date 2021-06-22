import React, { useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Image from 'next/image'
import { styles } from './artworkStartItem.css'
import { Avatar, Paper, useTheme } from '@material-ui/core'
import Link from 'next/link'
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx'

import { useMainWidth } from '../../hooks/useWidth'

export default function ArtworkStartItem({ artwork }) {
  const s = styles();
  const breakpoint = useMainWidth();
  const theme = useTheme();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const imageWidth = getArtworkWidth(breakpoint.regular, theme.spacing(2));
  const [isLoaded, setIsLoaded] = useState(false);

  const imageHeight = (artwork.Image.Height / artwork.Image.Width) * imageWidth;
  const skeletonHeight = imageHeight + 4;

  return (
    <Paper variant="outlined" className={s.paper}>
      <div className={s.container}>
        <div>
          <img
              className={clsx(!isLoaded && s.hidden)} 
              src={`${bucketUrl}${artwork.Image.Name}`}
              alt="Artwork"
              width={imageWidth}
              height={imageHeight}
              onLoad={() => setIsLoaded(true)}
              ></img>
            
            <Skeleton
              variant="rect"
              animation="wave"
              className={clsx(isLoaded && s.hidden)}
              width={imageWidth} 
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

function getArtworkWidth(
  availableSpace: number, 
  spacing: number,
  minArtworkWidth: number = 200, 
  maxColumns: number = 6)
    : number {
  const getTotalSpacing = (cols) => (cols - 1) * spacing;
  const getAvailableArtworkSpace = 
    (availableSpace, cols = maxColumns) => availableSpace - getTotalSpacing(cols);
  const decimalColumns = getAvailableArtworkSpace(availableSpace) / minArtworkWidth;

  if(decimalColumns > maxColumns) {
    return getAvailableArtworkSpace(availableSpace) / maxColumns;    
  }

  const roundedDown = Math.floor(decimalColumns);
  return getAvailableArtworkSpace(availableSpace, roundedDown) / roundedDown;
}