import React from 'react'
import Box from '@material-ui/core/Box'
import MyArtStudioCard from '../MyArtStudioCard/MyArtStudioCard'
import SocialNetworksCard from '../SocialNetworksCard/SocialNetworksCard'
import TagsCard from '../TagsCard/TagsCard'
import InspiredByCard from '../InspiredByCard/InspiredByCard'
import EducationCard from '../EducationCard/EducationCard'
import CurrentExhibitionsCard from '../CurrentExhibitionsCard/CurrentExhibitionsCard'
import AboutCard from '../AboutCard/AboutCard'

import { styles } from './aboutMe.css'
import { useTranslation } from 'react-i18next';


export default function AboutMe({ userProfile }) {
  const s = styles();
  const { t } = useTranslation('profile');
  console.log(userProfile.data);

  return (
    <Box className={s.container}>
      <AboutCard userProfile={userProfile}></AboutCard>
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