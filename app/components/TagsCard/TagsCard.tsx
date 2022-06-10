import React from 'react';
import { Box, Card, CardContent, CardHeader, Chip } from '@material-ui/core'

import { useTranslation } from 'next-i18next';
import { styles } from './tagsCard.css';
import TagChip from '../TagChip/TagChip';

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
          {Array.from(tags).map((tag: any) => tag.Tag).map((tag: string) =>
            {
              return <TagChip
                key={tag}
                title={tag}
                onChipClick={null}
                limitReached={true}>
              </TagChip>;
            }
          )}
        </Box>
      </CardContent>
    </Card>
  );
}