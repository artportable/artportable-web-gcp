import { styles } from './main.css'
import clsx from 'clsx'
import React from 'react';
import Header from '../Header/Header';

interface Props {
  children: any;
  wide?: boolean;
  noHeaderPadding?: boolean;
  fullWidth?: boolean;
}

export default function Main({ children, wide = false, noHeaderPadding = false, fullWidth = false }: Props) {
  const s = styles();

  return (
    <>
      <Header></Header>
      <div className={clsx(s.container, wide && s.wide, noHeaderPadding && s.noHeaderPadding, fullWidth && s.fullWidth)}>
        {children}
      </div>
    </>
  );
}

export const FullWidthBlock = ({ children }) => {
  const s = styles();
  return <div className={s.fullWidthBlock}>{children}</div>
}