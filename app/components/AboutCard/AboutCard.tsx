import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { styles } from './aboutCard.css'
import RoomIcon from '@material-ui/icons/Room';

import { useTranslation } from 'react-i18next';

export default function AboutCard({ data }) {
  const s = styles();
  const { t } = useTranslation('profile');
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;

  return (
    <Card elevation={2} className={s.mainCard}>
        <CardContent className={s.mainCardContent}>
          <div>
            {data?.ProfilePicture &&
              <img
                src={`${bucketUrl}${data.ProfilePicture}`}
                width={300}>
              </img>
            }
          </div>
          <Box maxWidth='70%'>
            <Typography variant="h4">
              <Box fontWeight="500" fontFamily="LyonDisplay">
                {`${data.Name} ${data.Surname}`}
              </Box>
            </Typography>
            <Typography>
              <Box fontWeight="500" fontFamily="LyonDisplay" marginBottom={1}>
                {`${data.Title}`}
              </Box>
            </Typography>
            <Typography>
              <Box className={s.location}>
                <RoomIcon color="secondary" fontSize="small"></RoomIcon>
                {`${data.Location}`}
              </Box>
            </Typography>
            <Box paddingTop={1}>
              <Typography variant="body1">
                {data.About}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
}
