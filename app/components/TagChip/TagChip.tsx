import React, { useState } from 'react';
import { Chip } from '@material-ui/core'
import { LocalOffer } from '@material-ui/icons';

import { styles } from './tagChip.css';
import { useTranslation } from 'next-i18next';

export default function TagChip({title, onChipClick, limitReached, ...muiButtonProps}) {
  const s = styles();
  const { t } = useTranslation('tags');
  const [isSelected, setIsSelected] = useState(false);

  const onClick = () => {
    if (limitReached && !isSelected)
      return;

    onChipClick(title, !isSelected);
    setIsSelected(!isSelected);
  }

  return (
    <Chip
      {...muiButtonProps}
      label={t(title)}
      key={title}
      className={s.chip}
      size="small"
      color= {onChipClick === null ? 'primary' : (isSelected ? "primary" : "default")}
      clickable={onChipClick !== null}
      onClick={onClick}
    />
  );
}
