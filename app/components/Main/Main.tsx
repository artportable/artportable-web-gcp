import { styles } from './main.css'
import clsx from 'clsx'
import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { NavBarItem } from '../../models/NavBarItem';

interface Props {
  children: any;
  wide?: boolean;
  noHeaderPadding?: boolean;
  fullWidth?: boolean;
  isShow?: boolean;
  navBarItems?: NavBarItem[];
}


export default function Main({ children, wide = false, noHeaderPadding = false, fullWidth = false, isShow = true, navBarItems}: Props) {
  const s = styles();
  isShow ? <Footer /> : null;

  return (
    <>
      <Header navBarItems={navBarItems}></Header>
      <div className={clsx(s.container, wide && s.wide, noHeaderPadding && s.noHeaderPadding, fullWidth && s.fullWidth)}>
        {children}
      </div>
      {isShow ? <Footer /> : null}
    </>
  );
}

export const FullWidthBlock = ({ children }) => {
  const s = styles();
  return <div className={s.fullWidthBlock}>{children}</div>
}