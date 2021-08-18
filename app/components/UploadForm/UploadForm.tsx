import React from 'react'
import Box from '@material-ui/core/Box'

import { styles } from './uploadForm.css'
import { useTranslation } from 'react-i18next';
import { InputAdornment, TextField, Typography } from '@material-ui/core';
import TagChip from '../TagChip/TagChip';

export default function UploadForm({ setTitle, setDescription, setPrice, setSelectedTags, selectedTags, tags }) {
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
          onChange={(event) => setTitle(event.target.value)}
          required
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
              endAdornment: <InputAdornment position="end">SEK</InputAdornment>,
            }}
            fullWidth/>
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
