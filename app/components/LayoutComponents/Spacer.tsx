import React from 'react'

type SpacerProps = {
  y?: string | number,
  x?: string | number,
  color?: string,
}

const Spacer = ({
  y = '0px',
  x = '100%',
  color = 'transparent',
}: SpacerProps) => (
  <div style={{
    position: 'relative',
    height: y,
    width: x,
    backgroundColor: color,
  }} />
)

export default Spacer
