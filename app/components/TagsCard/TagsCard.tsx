import React from 'react';
import { Box, Card, CardContent, CardHeader, Chip } from '@material-ui/core'

import { useTranslation } from 'react-i18next';
import { styles } from './tagsCard.css';

export default function TagsCard({ tags }) {
  const s = styles();
  const { t } = useTranslation('profile');

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('techniqueTools')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
        <Box className={s.tagsContainer}>
          {tags.map((t, i) =>
            <Chip key={i} label={t.Tag} color="primary" size="small"></Chip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}