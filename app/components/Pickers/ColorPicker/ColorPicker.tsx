import React, { useContext, useEffect, useState } from "react";
import clsx from 'clsx';
import { styles } from './colorpicker.css';

interface Props {
  COLORS: any[]
  selectedColor: string
  setSelectedColor: Function
  // popupText?: string
}
// popupText="*Den färg du väljer visas som rubrikbakgrund högst upp på din konstportfolio och ger den en personlig touch.*"

export default function ColorPicker(props: Props) {
  const { COLORS, selectedColor, setSelectedColor } = props;
  const s = styles({bgColor:'green'});

  return (
    <div className={s.colorPicker}>
      {COLORS.map(color => {
        const isSelected = color.value === selectedColor;
        const borderWidth = 4;

        return (
          <div
            onClick={() => setSelectedColor(color.value)}
            className={clsx(s.colorPickerItem, {
              [s.colorPickerItemSelected]: isSelected,
            })}
            style={{
              borderColor: isSelected ? 'black' : 'transparent',
              backgroundColor: color.value,
            }}
            key={color.value}
          />
        )
      })}
    </div>
  )
}