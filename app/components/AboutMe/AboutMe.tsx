import Image from 'next/image'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'

import { styles } from './aboutMe.css'
import { CardContent, CardHeader, Typography } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import HttpsIcon from '@material-ui/icons/Https'
import Icon from '@material-ui/core/Icon';

import { useTranslation } from 'react-i18next';

export default function AboutMe({ userProfile }) {
  const s = styles();
  const { t } = useTranslation('profile');
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;
  console.log(userProfile.data);
  return (
    <Box className={s.container}>
      <Card elevation={2} className={s.mainCard}>
        <CardContent className={s.mainCardContent}>
          {userProfile.data?.ProfilePicture &&
            <Image 
              src="https://artportable-images.s3.eu-north-1.amazonaws.com/Images/1a0d2b6e-562d-4bb0-8ca8-49871c84aa8e.jpg"
              // src={`${bucketUrl}${userProfile?.ProfilePicture}`}
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
              {userProfile.data.Headline}
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Box className={s.rightCol}>
        <Card elevation={2}>
          <CardContent>Atelje</CardContent>
        </Card>
        <Card elevation={2}>
          <CardContent>Teknik/Verktyg</CardContent>
        </Card>
        <Card elevation={2}>
          <CardContent>Inspireras av</CardContent>
        </Card>
        <Card elevation={2}>
          <CardContent>Utbildning</CardContent>
        </Card>
        <Card elevation={2}>
          <CardContent>Aktuella utställningar</CardContent>
        </Card>
        <Card elevation={2}>
          <CardHeader 
            title={t('socialNetworks')} 
            titleTypographyProps={{ variant: "subtitle1"}}>
          </CardHeader>
          <CardContent>
            <Box>
              <InstagramIcon color="primary"></InstagramIcon>
            </Box>
            <Box>
              <FacebookIcon color="primary"></FacebookIcon>
            </Box>
            <Box>
              <LinkedInIcon color="primary"></LinkedInIcon>
            </Box>
            <Box>
              <Icon className="fab fa-dribbble" color="primary"></Icon>
            </Box>
            <Box>
              <Icon className="fab fa-dribbble" color="primary"></Icon>
            </Box>
            <Box>
              <HttpsIcon color="primary"></HttpsIcon>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}