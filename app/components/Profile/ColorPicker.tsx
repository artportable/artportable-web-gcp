import React, { useContext, useEffect, useState } from "react";

export default function ColorPicker({ COLORS, selectedColor, setSelectedColor }) {
  return (
    <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
    }}>
      {COLORS.map(color => {
        const isSelected = color.bg === selectedColor;
        const borderWidth = 4;

        return (
          <div
            onClick={() => setSelectedColor(color.bg)}
            style={{
              width: 70,
              height: 70,
              margin: isSelected ? 0 : borderWidth,
              border: isSelected ? `${borderWidth}px solid ${color.border}` : 'none',
              borderRadius: '50%',
              boxSizing: 'content-box',
              backgroundColor: color.bg,
              cursor: 'pointer',
            }}
          />
        )
      })}
    </div>
  )
}