import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import { MenuContexts } from "../../contexts/menu-contexts";
import { styles } from "./artistnavbar.css";

export default function ArtistNavbar({ username }) {
  const s = styles();
  const { t } = useTranslation(["header", "support"]);

  const router = useRouter();

  const { openEditArtworkMenu } = useContext(MenuContexts);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ top: "auto", bottom: 0 }}
        style={{ top: "auto", bottom: 0 }} // When on start page and reloading, gets sent to /feed, sx style disappears and navbar ends up on top of page. Set style instead of sx.
        className={s.appbar}
      >
        <Toolbar variant="dense" className={s.toolbar}>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => router.push("/")}
            disabled={router.pathname === "/"}
          >
            <HomeOutlinedIcon color="inherit" />
            <Typography variant="body2" color="inherit" component="div">
              {t("header:startPage")}
            </Typography>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => router.push("/feed")}
            disabled={router.pathname === "/feed"}
          >
            <PhotoLibraryOutlinedIcon color="inherit" />
            <Typography variant="body2" color="inherit" component="div">
              {t("header:flow")}
            </Typography>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => router.push(`/upload`)}
          >
            <AddBoxOutlinedIcon color="inherit" />
            <Typography variant="body2" color="inherit" component="div">
              {t("header:uploadArtwork")}
            </Typography>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => router.push(`/profile/@${username.value}`)}
            disabled={router.pathname.indexOf("/profile/") === 0}
          >
            <PortraitOutlinedIcon color="inherit" />
            <Typography variant="body2" color="inherit" component="div">
              {t("header:portfolio")}
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
