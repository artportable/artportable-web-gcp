import React, { useContext, useEffect, useState } from "react";
import clsx from 'clsx';
// import { itemsToRows } from "../../../utils/layoutUtils";
// import { styles } from '../../Profile/preferences.css';
import { styles } from './colorpicker.css';

interface Props {
  COLORS: any[]
  selectedColor: string
  setSelectedColor: Function
  popupText?: string
}

export default function ColorPicker(props: Props) {
  const { COLORS, selectedColor, setSelectedColor, popupText, } = props;
  const [popupOpen, setPopupOpen] = useState(false);
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
          />
        )
      })}
      {/* {popupText &&
        <div
          onClick={() => setPopupOpen(!popupOpen)}
          style={{
            position: 'absolute',
            top: 0,
            right: 10,
            height: 20,
            width: 20,
            padding: 5,
            border: '1px solid black',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
        >
          <span>i</span>
          {popupOpen &&
            <div
              onClick={() => setPopupOpen(false)}
              style={{
                position: 'absolute',
                top: 0,
                right: 10,
                // height: 20,
                width: 200,
                padding: 5,
                border: '1px solid black',
                // borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              {popupText}
            </div>
          }
        </div>
      } */}
    </div>
  )
}