import React, { useState } from "react";
import { Chip } from "@material-ui/core";
import { LocalOffer } from "@material-ui/icons";
import clsx from 'clsx'

import { styles } from "./tagChip.css";
import { useTranslation } from "next-i18next";

export default function TagChip({
  title,
  onChipClick,
  limitReached,
  isSmall,
  grayChip = false,
  ...muiButtonProps
}) {
  const s = styles();
  const { t } = useTranslation("tags");
  const [isSelected, setIsSelected] = useState(false);

  const chipClass = isSmall ? s.smallTag : s.chip;

  const onClick = () => {
    if (limitReached && !isSelected) return;

    onChipClick(title, !isSelected);
    setIsSelected(!isSelected);
  };

  return (
    <Chip
      {...muiButtonProps}
      label={t(title)}
      key={title}
      className={clsx(chipClass, {
        [s.isGray]: grayChip,
      })}
      size="small"
      color={
        onChipClick === null ? "primary" : isSelected ? "primary" : "default"
      }
      clickable={onChipClick !== null}
      onClick={onClick}
    />
  );
}
