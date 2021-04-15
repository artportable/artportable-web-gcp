import { Avatar, Box, Link, Typography } from '@material-ui/core';
import React from 'react';
import { styles } from './similarPortfolio.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Image from 'next/image';

export default function SimilarPortfolio({ data }) {
  const s = styles();

  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  return (
    <div className={s.card}>
      <div className={s.images}>
        <div className={s.imageGrid}>
          {data.Artworks[0] &&
            <div className={s.first}>
              <Image src={`${bucketUrl}${data.Artworks[0]}`}
                alt="Portfolio image"
                height="200"
                width="200"
              />
            </div>
          }
          {data.Artworks[1] &&
            <div className={s.second}>
              <Image src={`${bucketUrl}${data.Artworks[1]}`}
                alt="Portfolio image"
                height="100"
                width="100"
              />
            </div>
          }
          {data.Artworks[2] &&
            <div className={s.third}>
              <Image src={`${bucketUrl}${data.Artworks[2]}`}
                alt="Portfolio image"
                height="100"
                width="100"
              />
            </div>
          }
          {data.Artworks[3] &&
            <div className={s.forth}>
              <Image src={`${bucketUrl}${data.Artworks[3]}`}
                alt="Portfolio image"
                height="100"
                width="100"
              />
            </div>
          }
          {data.Artworks[4] &&
            <div className={s.fifth}>
              <Image src={`${bucketUrl}${data.Artworks[4]}`}
                alt="Portfolio image"
                height="100"
                width="100"
              />
            </div>
          }
        </div>
      </div>
      <div className={s.footer}>
        <div className={s.avatar}>
          <Link href={`/@${data?.Username}`}>
            <a>
              {data?.ProfilePicture ? (
                <Avatar src={`${bucketUrl}${data?.ProfilePicture}`}
                  alt="Profile picture"
                  style={{ height: '40px', width: '40px' }}
                />
              ) : (
                <AccountCircleIcon
                  color="secondary"
                  style={{fontSize: 48}}
                />
              )}
            </a>
          </Link>
        </div>
        <Box fontWeight="fontWeightBold">
          <Typography variant="subtitle1">
            <Link href={`/@${data?.Username}`} style={{ textDecoration: 'none', color: 'black' }}>
              <a>
                {data?.Username}
              </a>
            </Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
}
