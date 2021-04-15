import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import Image from 'next/image'
import { styles } from './aboutCard.css'
import RoomIcon from '@material-ui/icons/Room';

import { useTranslation } from 'react-i18next';

export default function AboutCard({ data }) {
  const s = styles();
  const { t } = useTranslation('profile');
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  return (
    <Card elevation={2} className={s.mainCard}>
        <CardContent className={s.mainCardContent}>
          {data?.ProfilePicture &&
            <Image
              src={`${bucketUrl}${data.ProfilePicture}`}
              height={400}
              width={300}
              objectFit="cover">
            </Image>
          }
          <Box>
            <Typography variant="h4">
              <Box fontWeight="500" fontFamily="LyonDisplay">
                {`${data.Name} ${data.Surname}`}
              </Box>
            </Typography>
            <Typography>
              <Box fontWeight="500" fontFamily="LyonDisplay">
                {`${data.Title}`}
              </Box>
            </Typography>
            <Typography>
              <Box fontWeight="500" fontFamily="LyonDisplay">
              <RoomIcon color="secondary"></RoomIcon>
                {`${data.Location}`}
              </Box>
            </Typography>
            <Box paddingTop={1}>
              {data.About}
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
}
