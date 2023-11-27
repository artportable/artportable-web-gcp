import React, { useState } from "react";
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
        id="title"
        label={t("title")}
        required
        error={title ? false : true}
        onChange={(event) => setTitle(event.target.value)}
        fullWidth
      />
      <TextField
        id="description"
        label={t("description")}
        multiline
        fullWidth
        inputProps={{
          style: { minHeight: '530px', textAlign: 'start' },
        }}
        onChange={(event) => setDescription(event.target.value)}
      />
    </Box>
  );
}
