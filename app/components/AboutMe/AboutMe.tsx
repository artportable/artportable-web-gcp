import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import MyArtStudioCard from "../MyArtStudioCard/MyArtStudioCard";
import TagsCard from "../TagsCard/TagsCard";
import InspiredByCard from "../InspiredByCard/InspiredByCard";
import EducationCard from "../EducationCard/EducationCard";
import CurrentExhibitionsCard from "../CurrentExhibitionsCard/CurrentExhibitionsCard";
import AboutCard from "../AboutCard/AboutCard";

import { styles } from "./aboutMe.css";
import { useTranslation } from "next-i18next";

export default function AboutMe({
  userProfile,
  userProfilePicture,
  tags,
  isMyProfile,
  onUpdateProfilePicture,
}) {
  const s = styles();
  const { t } = useTranslation(["profile", "tags"]);

  const data = userProfile.data;

  return (
    // TODO: Handle potential errors
    <Box className={s.container}>
      <AboutCard
        data={data}
        userProfilePicture={userProfilePicture}
        isMyProfile={isMyProfile}
        tags={undefined}
        onUpdateProfilePicture={onUpdateProfilePicture}
      ></AboutCard>
      <Box className={s.rightCol}>
        {(data?.Studio?.Location || data?.Studio?.Text) && (
          <MyArtStudioCard data={data?.Studio}></MyArtStudioCard>
        )}
        {tags?.length > 0 && <TagsCard tags={tags}></TagsCard>}
        {data?.Exhibitions?.length > 0 && (
          <CurrentExhibitionsCard
            exhibitions={data?.Exhibitions}
          ></CurrentExhibitionsCard>
        )}
        {data?.Educations?.length > 0 && (
          <EducationCard educations={data?.Educations}></EducationCard>
        )}
      </Box>
    </Box>
  );
}
