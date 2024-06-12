import React, { useContext, useEffect, useState } from "react";
import clsx from 'clsx';
import { styles } from './layoutpicker.css';

export default function LayoutPicker({ LAYOUTS, selectedLayout, setSelectedLayout, t }) {
  const s = styles();

  return (
    <div
      className={s.layoutPicker}>
      {LAYOUTS.map(layout => {
        const isSelected = layout.value === selectedLayout;
        const borderWidth = 4;

        return (
          <div
            onClick={() => setSelectedLayout(layout.value)}
            className={clsx(s.layoutPickerItem, {
              [s.layoutPickerItemSelected]: isSelected,
            })}
            key={layout.value}
          >
            <h4 style={{
              margin: 0,
              padding: '6px 10px 2px',
              fontSize: 12,
              fontWeight: 500,
            }}>{t(`preferences.${layout.localeName}`)}</h4>
            {layout.elements}
          </div>
        )
      })}
    </div>
  )
}