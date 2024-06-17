import React, { useContext, useEffect, useState } from "react";
import clsx from 'clsx';
import {
  Typography,
} from "@material-ui/core";
import { styles } from './fontpicker.css';

interface Props {
  FONTS: any[]
  selectedFont: string
  setSelectedFont: Function
  userProfile: any,
}

export default function FontPicker(props: Props) {
  const { FONTS, selectedFont, setSelectedFont, userProfile, } = props;
  const s = styles();

  return (
    <div className={s.fontPicker}>
      <div className={s.fontPickerItems}>
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
                  fontFamily: font.value,
                }}>{ 'Aa' }</span>
              {/*
              Show artists namn in selected font below insted of showing the name of the font.
              <div
                className={s.fontName}
                style={{
                  fontFamily: font.value,
                }}>{font.localeName}</div>
              */}
            </div>
          )
        })}
      </div>
      <Typography
        variant="h5"
        component="h1"
        style={{
          width: '100%',
          fontFamily: selectedFont,
          wordWrap: 'break-word',
        }}>
        {userProfile?.Name}{" "}
        {userProfile?.Surname &&
          userProfile?.Surname}{" "}
      </Typography>
    </div>
  )
}