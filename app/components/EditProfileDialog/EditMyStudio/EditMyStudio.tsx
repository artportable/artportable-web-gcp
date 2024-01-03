import { useState } from "react";
import Button from "../../Button/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import { TextField, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { styles } from "./editMyStudio.css";

export const EditMyStudio = ({ profile, setProfile }) => {
  const s = styles();
  const { t } = useTranslation("profile");

  const [hasStudio, setHasStudio] = useState(profile?.studio);

  const setStudioName = (newName: string) => {
    setProfile({
      ...profile,
      studio: {
        ...profile.studio,
        Text: newName,
      },
    });
  };

  const setStudioLocation = (newLocation: string) => {
    setProfile({
      ...profile,
      studio: {
        ...profile.studio,
        Location: newLocation,
      },
    });
  };

  const removeStudio = () => {
    setProfile({
      ...profile,
      studio: {
        ...profile.studio,
        Text: "",
        Location: "",
      },
    });
    setHasStudio(false);
  };

  return (
    <>
      <div className={s.headerContainer}>
        <Typography variant="subtitle2" component="h4">
          {t("myArtStudio")}
        </Typography>

        {!profile.studio.Location && !profile.studio.Text ? (
          <Button
            variant="text"
            color="primary"
            startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
            onClick={() => setHasStudio(true)}
          >
            {t("addStudio")}
          </Button>
        ) : (
          <Button
            variant="text"
            startIcon={<DeleteIcon color="error" />}
            onClick={() => removeStudio()}
          >
            {t("remove")}
          </Button>
        )}
      </div>

      {hasStudio && (
        <div className={s.fieldsContainer}>
          <TextField
            label={t("name")}
            defaultValue={profile?.studio?.Text}
            onChange={(event) => setStudioName(event.target.value)}
            inputProps={{ maxLength: 140 }}
          />

          <TextField
            label={t("place")}
            defaultValue={profile?.studio?.Location}
            onChange={(event) => setStudioLocation(event.target.value)}
            inputProps={{ maxLength: 140 }}
          />
        </div>
      )}
    </>
  );
};
