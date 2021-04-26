import React, { useState } from 'react';
import { Chip } from '@material-ui/core'
import { LocalOffer } from '@material-ui/icons';

import { styles } from './tagChip.css';

export default function TagChip({title, onChipClick, ...props}) {
  const s = styles();
  const [isSelected, setIsSelected] = useState(false);

  const onClick = () => {
    onChipClick(title, !isSelected);
    setIsSelected(!isSelected);
  }

  return (
    <Chip
      label={title}
      key={title}
      icon={<LocalOffer />} 
      className={s.chip}
      size="small"
      color= {isSelected ? "primary" : "default"}
      onClick={onClick}
    />
  );
}
