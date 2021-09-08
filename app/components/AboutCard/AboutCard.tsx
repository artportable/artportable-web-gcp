import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { styles } from './aboutCard.css'
import RoomIcon from '@material-ui/icons/Room';

import { useTranslation } from 'react-i18next';

export default function AboutCard({ data, userProfilePicture }) {
  const s = styles();
  const { t } = useTranslation('profile');
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <Card elevation={2} className={s.mainCard}>
        <CardContent className={s.mainCardContent}>
          <div>
            {userProfilePicture &&
              <img
                className={s.profilePicture}
                src={`${bucketUrl}${userProfilePicture}`}>
              </img>
            }
          </div>
          <Box maxWidth='70%' flexBasis="100%">
            <Typography variant="h4">
              <Box fontWeight="500" fontFamily="LyonDisplay">
                {`${data?.Name} ${data?.Surname}`}
              </Box>
            </Typography>
            {data?.Title &&
              <Typography className={s.artistTitle}>
                {`${data?.Title}`}
              </Typography>
            }
            {data?.Location &&
              <Typography className={s.location}>
                <RoomIcon color="secondary" fontSize="small"></RoomIcon>
                {`${data?.Location}`}
              </Typography>
            }
            <Box paddingTop={1}>
              <Typography variant="body1">
                {data?.About}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
}
