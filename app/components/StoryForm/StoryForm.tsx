import React from "react";
import Box from "@material-ui/core/Box";

import { styles } from "./storyForm.css";
import { useTranslation } from "next-i18next";
import { TextField } from "@material-ui/core";

export default function StoryForm({
  title,
  setTitle,
  setDescription,
}) {
  const s = styles();
  const { t } = useTranslation("upload");


  return (
    <Box className={s.container}>
      <TextField
        id="headline"
        label={t("headline")}
        required
        error={title ? false : true}
        onChange={(event) => setTitle(event.target.value)}
        fullWidth
      />
      <TextField
        placeholder={t("placeholder")}
        id="description"
        multiline
        fullWidth
        inputProps={{
          style: { minHeight: '500px', textAlign: 'start' },
        }}
        onChange={(event) => setDescription(event.target.value)}
      />
    </Box>
  );
}
