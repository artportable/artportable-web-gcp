import React, { useContext, useEffect, useState } from "react";
import clsx from 'clsx';
import { styles } from './layoutpicker.css';

export default function LayoutPicker({ selectedLayout, setSelectedLayout, t }) {
  const s = styles();

  const layoutContainerStyle = {
    height: 150,
    padding: '0 10px',
    'box-sizing': 'border-box',
    display: 'flex',
  }
  const layoutStyle = {
    backgroundColor: '#D9D9D9',
  }
  const evenRowStyle = {
    ...layoutStyle,
    height: 'calc(33.33% - 8px)',
    width: 'calc(50% - 5px)',
  }
  const dynamicGridStyle = {
    ...layoutStyle,
    width: 'calc(50% - 5px)',
  }
  const oneTwoStyle = {
    ...layoutStyle,
  }

  const LAYOUTS = [
    {
      value: 'even-rows', localeName: 'layoutEvenRows', elements: (
        <div style={{
          ...layoutContainerStyle,
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
        }}>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
        </div>
      )
    },
    {
      value: 'dynamic-grid', localeName: 'layoutDynamicGrid', elements: (
        <div style={{
          ...layoutContainerStyle,
          flexFlow: 'column wrap',
        }}>
          <div style={{ ...dynamicGridStyle, height: 'calc(66.66% - 6px)' }}></div>
          <div style={{ ...dynamicGridStyle, height: 'calc(33.33% - 10px)', marginTop: 6, }}></div>
          <div style={{ ...dynamicGridStyle, height: 'calc(33.33% - 6px)', marginLeft: 10, }}></div>
          <div style={{ ...dynamicGridStyle, height: 'calc(66.66% - 10px)', marginLeft: 10, marginTop: 6, }}></div>
        </div>
      )
    },
    {
      value: 'two-one', localeName: 'layoutTwoOne', elements: (
        <div style={{
          ...layoutContainerStyle,
          flexFlow: 'row wrap',
          justifyContent: 'space-between',
        }}>
          <div style={{ ...layoutStyle, height: 'calc(33.33% - 6px)', width: 'calc(50% - 5px)' }}></div>
          <div style={{ ...layoutStyle, height: 'calc(33.33% - 6px)', width: 'calc(50% - 5px)' }}></div>
          <div style={{ ...layoutStyle, height: 'calc(66.66% - 10px)', width: '100%' }}></div>
        </div>
      )
    },
    {
      value: 'one-large', localeName: 'layoutOneLarge', elements: (
        <div style={layoutContainerStyle}>
          <div style={{ ...layoutStyle, height: 'calc(100% - 10px)', width: '100%' }}></div>
        </div>
      )
    },
  ]

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