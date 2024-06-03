import React, { useContext, useEffect, useState } from "react";
import clsx from 'clsx';
import { styles } from './fontpicker.css';

interface Props {
  FONTS: any[]
  selectedFont: string
  setSelectedFont: Function
}

export default function FontPicker(props: Props) {
  const { FONTS, selectedFont, setSelectedFont, } = props;
  const s = styles();

  return (
    <div className={s.fontPicker}
>
      {FONTS.map(font => {
        const isSelected = font.value === selectedFont;
        const borderWidth = 2;

        return (
          <div
            onClick={() => setSelectedFont(font.value)}
            className={clsx(s.fontPickerItem, {
              [s.fontPickerItemSelected]: isSelected,
            })}
            key={font.value}
          >
            <span
              className={s.fontExample}
              style={{
                fontFamily: font.family,
              }}>{ 'Aa' }</span>
            <div
              className={s.fontName}
              style={{
                fontFamily: font.family,
              }}>{font.localeName}</div>
          </div>
        )
      })}
    </div>
  )
}