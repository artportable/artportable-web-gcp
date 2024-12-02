import React, { useState } from "react";
import Box from "@material-ui/core/Box";

import { styles } from "./uploadForm.css";
import { useTranslation } from "next-i18next";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import TagChip from "../TagChip/TagChip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import UploadMessage from "../WarningMessage/UploadMessage";

export default function UploadForm({
  title,
  setTitle,
  setDescription,
  currency,
  setPrice,
  setCurrency,
  signedByArtist,
  setSignedByArtist,
  frameIncluded,
  setFrameIncluded,
  soldOutChecked,
  setSoldOutChecked,
  multipleSizesChecked,
  setMultipleSizesChecked,
  width,
  setWidth,
  height,
  setHeight,
  setDepth,
  setSelectedTags,
  selectedTags,
  tags,
}) {
  const s = styles();
  const { t } = useTranslation("upload");

  const onChipClick = (title: string, isSelected: boolean) => {
    if (!isSelected) {
      // Remove tag
      setSelectedTags(selectedTags.filter((e) => e !== title));
    } // Add tag
    else {
      setSelectedTags([...selectedTags, title]);
    }
  };

  return (
    <Box className={s.container}>
      <Box className={s.formFields}>
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
          minRows={4}
          maxRows={4}
          fullWidth
          onChange={(event) => setDescription(event.target.value)}
        />

        {!multipleSizesChecked ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                id="width"
                label={t("width")}
                required
                error={width ? false : true}
                onChange={(event) => setWidth(parseInt(event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                style={{ display: "flex" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="height"
                label={t("height")}
                required
                error={height ? false : true}
                onChange={(event) => setHeight(parseInt(event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                style={{ display: "flex" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="depth"
                label={t("depth")}
                onChange={(event) => setDepth(parseInt(event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
                style={{ display: "flex" }}
              />
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        <Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={multipleSizesChecked}
                onChange={(event) =>
                  setMultipleSizesChecked(event.target.checked)
                }
              />
            }
            label={t("common:words.multipleSizes")}
          />
        </Grid>

        <TextField
          id="price"
          label={t("price")}
          onChange={(event) => setPrice(parseInt(event.target.value))}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  label={t("currency")}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="SEK">SEK</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                  <MenuItem value="DKK">DKK</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={soldOutChecked}
              onChange={(event) => setSoldOutChecked(event.target.checked)}
            />
          }
          label={t("common:words.soldOut")}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={frameIncluded}
              onChange={(event) => setFrameIncluded(event.target.checked)}
            />
          }
          label={"Frame included"}
        />

        <div style={{ marginTop: "20px" }}>
          <InputLabel>{t("signature")}</InputLabel>
          <Select
            value={signedByArtist}
            onChange={(event) => {
              event.stopPropagation();
              setSignedByArtist(event.target.value);
            }}
            MenuProps={{ disableScrollLock: true }}
            fullWidth
          >
            <MenuItem value="handSigned">{t("handSigned")}</MenuItem>
            <MenuItem value="signatureOnReverse">
              {t("signatureOnReverse")}
            </MenuItem>
            <MenuItem value="digitallySigned">{t("digitallySigned")}</MenuItem>
            <MenuItem value="notSigned">{t("notSigned")}</MenuItem>
          </Select>
        </div>
      </Box>

      <Box className={s.tags}>
        <UploadMessage></UploadMessage>
        <Typography variant="h4" className={s.tagTitle}>
          {t("tags")}
        </Typography>
        {Array.from(tags).map((tag: string) => {
          return (
            <TagChip
              key={tag}
              title={tag}
              onChipClick={onChipClick}
              limitReached={selectedTags.length >= 5}
              isSmall={false}
            ></TagChip>
          );
        })}
      </Box>
    </Box>
  );
}
