import { Box, Card, CardContent, Typography } from '@material-ui/core'
import Image from 'next/image'
import { styles } from './aboutCard.css'
import React from 'react';

import { useTranslation } from 'react-i18next';

export default function AboutCard({ userProfile }) {
  const s = styles();
  const { t } = useTranslation('profile');
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  return (
    <Card elevation={2} className={s.mainCard}>
        <CardContent className={s.mainCardContent}>
          {userProfile.data?.ProfilePicture &&
            <Image 
              src="https://artportable-images.s3.eu-north-1.amazonaws.com/Images/1a0d2b6e-562d-4bb0-8ca8-49871c84aa8e.jpg"
              // src={`${bucketUrl}${userProfile.data.ProfilePicture}`}
              height={400}
              width={300}
              objectFit="cover"
              objectPosition="-250px 0px">
            </Image>
          }
          <Box>
            <Typography variant="h4">
              <Box fontWeight="500" fontFamily="LyonDisplay">
                {`${userProfile.data.Name} ${userProfile.data.Surname}`}
              </Box>
            </Typography>
            <Box paddingTop={1}>
              {userProfile.data.About}
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
}
