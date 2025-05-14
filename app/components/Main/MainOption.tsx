import { styles } from "./mainOption.css";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { NavBarItem } from "../../models/NavBarItem";
import ArtistNavbar from "../Navbar/ArtistNavbar";
import { UserContext } from "../../contexts/user-context";

interface Props {
  children: any;
  wide?: boolean;
  noHeaderPadding?: boolean;
  paddingForTrialBanner?: boolean;
  fullWidth?: boolean;
  isShow?: boolean;
  navBarItems?: NavBarItem[];
}

export default function Main({
  children,
  wide = false,
  noHeaderPadding = false,
  paddingForTrialBanner = false,
  fullWidth = false,
  isShow = true,
  navBarItems,
}: Props) {
  const s = styles();
  const { username, membership } = useContext(UserContext);
  const isArtist = membership.value >= 2;
  isShow ? <Footer /> : null;

  return (
    <>
      <Header navBarItems={navBarItems}></Header>
      <div
        className={clsx(s.container, {
          [s.wide]: wide,
          [s.noHeaderPadding]: noHeaderPadding,
          [s.paddingForTrialBanner]: paddingForTrialBanner,
          [s.fullWidth]: fullWidth,
        })}
      >
        {children}
      </div>
      {isShow ? <Footer /> : null}
      {isArtist && <ArtistNavbar username={username} />}
    </>
  );
}

export const FullWidthBlock = ({ children }) => {
  const s = styles();
  return <div className={s.fullWidthBlock}>{children}</div>;
};
