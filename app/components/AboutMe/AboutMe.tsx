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

  const data = userProfile.data;

  return ( // TODO: Handle potential errors
    <Box className={s.container}>
      <AboutCard data={data}></AboutCard>
      <Box className={s.rightCol}>
        {data.Studio && <MyArtStudioCard data={data.Studio}></MyArtStudioCard>}
        <TagsCard userProfile={userProfile}></TagsCard>
        {data.InspiredBy && <InspiredByCard text={data.InspiredBy}></InspiredByCard>}
        {data.Educations?.length > 0 && <EducationCard educations={data.Educations}></EducationCard>}
        {data.Exhibitions?.length > 0 && <CurrentExhibitionsCard exhibitions={data.Exhibitions}></CurrentExhibitionsCard>}
        {data.SocialMedia && <SocialNetworksCard data={data.SocialMedia}></SocialNetworksCard>}
      </Box>
    </Box>
  );
}