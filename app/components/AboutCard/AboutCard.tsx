import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { styles } from './aboutCard.css'
import RoomIcon from '@material-ui/icons/Room';

import { useTranslation } from 'next-i18next';
import SocialNetworksCard from '../SocialNetworksCard/SocialNetworksCard';
import InspiredByCard from '../InspiredByCard/InspiredByCard';

export default function AboutCard({ data, userProfilePicture }) {
  const s = styles();
  const { t } = useTranslation('profile');
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <Card elevation={0} className={s.mainCard}>
        <CardContent className={s.mainCardContent}>
          <div className={s.profilePictureDiv}>
            {userProfilePicture &&
              <img
                className={s.profilePicture}
                src={`${bucketUrl}${userProfilePicture}`}>
              </img>
            }
          </div>
          <Box className={s.textContent} maxWidth='70%' flexBasis="100%">
            {data?.Title &&
              <Typography className={s.artistTitle}>
                {`${data?.Title}`}
              </Typography>
            }
            {data?.Headline &&
              <Typography className={s.artistHeadline}>
                {`${data?.Headline}`}
              </Typography>
            }
            {data?.Location &&
              <Typography className={s.location}>
                <RoomIcon color="primary" fontSize="small" className={s.locationPin}></RoomIcon>
                {`${data?.Location}`}
              </Typography>
            }
            {data?.SocialMedia && <SocialNetworksCard data={data?.SocialMedia}></SocialNetworksCard>}
            <Box paddingTop={1}>
              <Typography className={s.about} variant="body1" style={{ margin: '0'}}>
                {data?.About}
              </Typography>
            </Box>
            {data?.InspiredBy && (<InspiredByCard text={data?.InspiredBy}></InspiredByCard>)}
          </Box>
        </CardContent>
      </Card>
  );
}
