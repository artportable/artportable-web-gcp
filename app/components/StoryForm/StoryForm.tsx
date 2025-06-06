import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";

import { styles } from "./storyForm.css";
import { useTranslation } from "next-i18next";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { Paper } from "@mui/material";

export default function StoryForm({
  title,
  setTitle,
  setDescription,
  setExhibition,
}) {
  const s = styles();
  const { t } = useTranslation("upload");

  return (
    <Box className={s.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={() => setExhibition(true)} />}
            label={t("exhibition")}
          />
        </FormGroup>
      </div>
      <Paper style={{ marginBottom: "20px" }}>
        <TextField
          id="headline"
          placeholder={t("headline")}
          required
          error={title ? false : true}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          inputProps={{ maxLength: 70 }}
          style={{ padding: "10px", marginBottom: "10px" }}
        />
      </Paper>
      <Paper style={{ marginBottom: "20px" }}>
        <TextField
          placeholder={t("story-description")}
          id="description"
          multiline
          fullWidth
          inputProps={{
            style: { minHeight: "500px", textAlign: "start" },
          }}
          onChange={(event) => setDescription(event.target.value)}
          style={{ padding: "10px", marginBottom: "10px" }}
        />
      </Paper>
    </Box>
  );
}
