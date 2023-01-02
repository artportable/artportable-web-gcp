import React, { useState } from 'react'
import Box from '@material-ui/core/Box'

import { styles } from './uploadForm.css'
import { useTranslation } from 'next-i18next';
import { Checkbox, FormControlLabel, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import TagChip from '../TagChip/TagChip';

export default function UploadForm({ title, setTitle, setDescription,currency, setPrice, setCurrency, soldOutChecked, setSoldOutChecked, multipleSizesChecked, setMultipleSizesChecked, width, setWidth, height, setHeight, setDepth, setSelectedTags, selectedTags, tags }) {
  const s = styles();
  const { t } = useTranslation('upload');

  const onChipClick = (title: string, isSelected: boolean) => {
    if (!isSelected) // Remove tag
    {
      setSelectedTags(selectedTags.filter(e => e !== title));
    }
    else // Add tag
    {
      setSelectedTags([...selectedTags, title]);
    }
  }

  return (
    <Box className={s.container}>
      <Box>
        <TextField
          id="title"
          label={t('title')}
          required
          error = {title ? false : true} 
          onChange={(event) => setTitle(event.target.value)}
          fullWidth/>
        <TextField
          id="description"
          label={t('description')}
          multiline
          rows={4}
          fullWidth
          onChange={(event) => setDescription(event.target.value)}/>
        <TextField
          id="price"
          label={t('price')}
          onChange={(event) => setPrice(parseInt(event.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">
                <Select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  label={t('currency')}
                >
                  <MenuItem value="SEK">SEK</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                </Select>
            </InputAdornment>,
          }}
          fullWidth/>
          <FormControlLabel
            control={<Checkbox checked={soldOutChecked} onChange={(event) => setSoldOutChecked(event.target.checked)} />}
            label={t('common:words.soldOut')}
          />

        {!multipleSizesChecked ?
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                id="width"
                label={t('width')}
                required
                error = {width ? false : true}
                onChange={(event) => setWidth(parseInt(event.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                style={{display: 'flex'}}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="height"
                label={t('height')}
                required
                error = {height ? false : true}
                onChange={(event) => setHeight(parseInt(event.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                style={{display: 'flex'}}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                id="depth"
                label={t('depth')}
                onChange={(event) => setDepth(parseInt(event.target.value))}
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
                style={{display: 'flex'}}/>
            </Grid>
          </Grid>
          : <></>}
          <Grid>
          <FormControlLabel
              control={<Checkbox checked={multipleSizesChecked} onChange={(event) => setMultipleSizesChecked(event.target.checked)} />}
              label={t('common:words.multipleSizes')}
            />
          </Grid>
      </Box>
      <Box className={s.tags}>
        <Typography variant="h4" className={s.tagTitle}>
          {t('tags')}
        </Typography>
        {Array.from(tags).map((tag: string) =>
          {
            return <TagChip
              key={tag}
              title={tag}
              onChipClick={onChipClick}
              limitReached={selectedTags.length >= 5}>
            </TagChip>;
          }
        )}
      </Box>
    </Box>
  );
}
