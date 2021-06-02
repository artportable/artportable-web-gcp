import { Avatar, Box, Link, Typography, Paper } from '@material-ui/core';
import React from 'react';
import { styles } from './similarPortfolio.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function SimilarPortfolio({ data }) {
  const s = styles();

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;

  return (
    <Paper variant="outlined" className={s.card}>
      <Link href={`/@${data?.Username}`} >
        
          <div className={s.imageGrid}>
            {data.Artworks[0] &&
              <div className={s.first}>
                <img className={s.image}
                  src={`${bucketUrl}${data.Artworks[0].Name}`}
                  alt="Portfolio image"
                />
              </div>
            }
            {data.Artworks[1] &&
              <div className={s.second}>
                <img className={s.image}
                  src={`${bucketUrl}${data.Artworks[1].Name}`}
                  alt="Portfolio image"
                />
              </div>
            }
            {data.Artworks[2] &&
              <div className={s.third}>
                <img className= {s.image}
                  src={`${bucketUrl}${data.Artworks[2].Name}`}
                  alt="Portfolio image"
                />
              </div>
            }
            {data.Artworks[3] &&
              <div className={s.forth}>
                <img className= {s.image}
                  src={`${bucketUrl}${data.Artworks[3].Name}`}
                  alt="Portfolio image"
                />
              </div>
            }
            {data.Artworks[4] &&
              <div className={s.fifth}>
                <img className={s.image}
                  src={`${bucketUrl}${data.Artworks[4].Name}`}
                  alt="Portfolio image"
                />
              </div>
            }
          </div>
        
      </Link>
      <div className={s.footer}>
          <Link href={`/@${data?.Username}`}>
            
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
            
          </Link>
        <Box fontWeight="fontWeightBold">
          <Typography variant="subtitle1">
            <Link href={`/@${data?.Username}`} style={{ textDecoration: 'none', color: 'black' }}>
              
                {data?.Username}
            
            </Link>
          </Typography>
        </Box>
      </div>
    </Paper>
  );
}
