import Image from 'next/image'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import MyArtStudioCard from '../MyArtStudioCard/MyArtStudioCard'
import SocialNetworksCard from '../SocialNetworksCard/SocialNetworksCard'
import TagsCard from '../TagsCard/TagsCard'
import InspiredByCard from '../InspiredByCard/InspiredByCard'
import EducationCard from '../EducationCard/EducationCard'
import CurrentExhibitionsCard from '../CurrentExhibitionsCard/CurrentExhibitionsCard'

import { styles } from './aboutMe.css'
import { CardContent, CardHeader, Typography } from '@material-ui/core'


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
        <MyArtStudioCard userProfile={userProfile}></MyArtStudioCard>
        <TagsCard userProfile={userProfile}></TagsCard>
        <InspiredByCard userProfile={userProfile}></InspiredByCard>
        <EducationCard userProfile={userProfile}></EducationCard>
        <CurrentExhibitionsCard userProfile={userProfile}></CurrentExhibitionsCard>
        <SocialNetworksCard userProfile={userProfile}></SocialNetworksCard>
      </Box>
    </Box>
  );
}