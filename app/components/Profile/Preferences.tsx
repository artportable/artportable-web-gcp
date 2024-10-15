import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import Drawer from "@mui/material/Drawer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@material-ui/icons/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Divider from "@mui/material/Divider";
import Button from "../Button/Button";
import Spacer from "../LayoutComponents/Spacer";
import ColorPicker from "../Pickers/ColorPicker/ColorPicker";
import FontPicker from "../Pickers/FontPicker/FontPicker";
import LayoutPicker from "../Pickers/LayoutPicker/LayoutPicker";
import TooltipPopup from "../Popups/TooltipPopup";
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";
import { useGetUserProfile } from "../../hooks/dataFetching/UserProfile";
import { UserContext } from "../../contexts/user-context";
import { styles } from "./preferences.css";

export default function Preferences({ getUserProfile, isPremium }) {
  const s = styles();
  const { t } = useTranslation(["profile"]);
  const theme = useTheme();
  const anchor = "left";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const largeDevice = useMediaQuery(theme.breakpoints.up("md"));
  const { username } = useContext(UserContext);
  const profileUser = useGetProfileUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [selectedLayout, setSelectedLayout] = useState("dynamic-grid");
  const [selectedFont, setSelectedFont] = useState("gotham");
  const [selectedShadow, setSelectedShadow] = useState("none");
  const [selectedCorners, setSelectedCorners] = useState("none");
  const [selectedFrame, setSelectedFrame] = useState("none");
  const [prefsHasChanges, setPrefsHasChanges] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const userProfile = getUserProfile?.data;
  const chosenColor = userProfile?.ChosenColor || "#FDF9F7";

  const layoutContainerStyle = {
    height: 150,
    padding: "0 10px",
    boxSizing: "border-box",
    display: "flex",
  };
  const layoutStyle = {
    backgroundColor: "#D9D9D9",
  };
  const evenRowStyle = {
    ...layoutStyle,
    height: "calc(33.33% - 8px)",
    width: "calc(50% - 5px)",
  };
  const dynamicGridStyle = {
    ...layoutStyle,
    width: "calc(50% - 5px)",
  };
  const oneTwoStyle = {
    ...layoutStyle,
  };
  const LAYOUTS = [
    {
      value: "evenRows",
      localeName: "layoutEvenRows",
      elements: (
        <div
          style={{
            ...(layoutContainerStyle as React.CSSProperties), // Cast to prevent linting error.
            // boxSizing: sizingBox,
            flexFlow: "row wrap",
            justifyContent: "space-between",
          }}
        >
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
          <div style={evenRowStyle}></div>
        </div>
      ),
    },
    {
      value: "dynamicGrid",
      localeName: "layoutDynamicGrid",
      elements: (
        <div
          style={{
            ...(layoutContainerStyle as React.CSSProperties), // Cast to prevent linting error.
            flexFlow: "column wrap",
          }}
        >
          <div
            style={{ ...dynamicGridStyle, height: "calc(66.66% - 6px)" }}
          ></div>
          <div
            style={{
              ...dynamicGridStyle,
              height: "calc(33.33% - 10px)",
              marginTop: 6,
            }}
          ></div>
          <div
            style={{
              ...dynamicGridStyle,
              height: "calc(33.33% - 6px)",
              marginLeft: 10,
            }}
          ></div>
          <div
            style={{
              ...dynamicGridStyle,
              height: "calc(66.66% - 10px)",
              marginLeft: 10,
              marginTop: 6,
            }}
          ></div>
        </div>
      ),
    },
    {
      value: "twoOne",
      localeName: "layoutTwoOne",
      elements: (
        <div
          style={{
            ...(layoutContainerStyle as React.CSSProperties), // Cast to prevent linting error.
            flexFlow: "row wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              ...layoutStyle,
              height: "calc(33.33% - 6px)",
              width: "calc(50% - 5px)",
            }}
          ></div>
          <div
            style={{
              ...layoutStyle,
              height: "calc(33.33% - 6px)",
              width: "calc(50% - 5px)",
            }}
          ></div>
          <div
            style={{
              ...layoutStyle,
              height: "calc(66.66% - 10px)",
              width: "100%",
            }}
          ></div>
        </div>
      ),
    },
    {
      value: "oneLarge",
      localeName: "layoutOneLarge",
      elements: (
        <div style={layoutContainerStyle as React.CSSProperties}>
          {/* Cast to prevent linting error. */}
          <div
            style={{
              ...layoutStyle,
              height: "calc(100% - 10px)",
              width: "100%",
            }}
          ></div>
        </div>
      ),
    },
  ];

  const COLORS = [
    { value: "#000000" }, // Black
    { value: "#FDF9F7" }, // Beige, same as rest of page
    { value: "#A9D8D8" }, // Turquoise
    { value: "#9EBD9F" }, // Green
    { value: "#ED9C62" }, // Orange
    { value: "#BEA0CD" }, // Purple
  ];
  const SHADOWS = [
    { value: "shadow", localeName: "shadowsYes" },
    { value: "none", localeName: "shadowsNo" },
  ];
  const CORNERS = [
    { value: "rounded", localeName: "cornersYes" },
    { value: "none", localeName: "cornersNo" },
  ];
  const FRAMES = [
    { value: "none", localeName: "frameNone" },
    { value: "thin", localeName: "frameThin" },
    { value: "thick", localeName: "frameThick" },
  ];
  // Value is same family names as in globals.css
  const FONTS = [
    { value: "Gotham", localeName: "Gotham" },
    { value: "Gluten", localeName: "Gluten" },
    { value: "KellySlab", localeName: "KellySlab" },
    { value: "Barrio", localeName: "Barrio" },
    { value: "Caveat", localeName: "Caveat" },
    { value: "Jura", localeName: "Jura" },
  ];

  // Initialize preferences with value from user.
  useEffect(() => {
    if (!userProfile) return;
    if (userProfile?.ChosenColor) setSelectedColor(userProfile.ChosenColor);
    if (userProfile?.ChosenLayout) setSelectedLayout(userProfile.ChosenLayout);
    if (userProfile?.ChosenFont) setSelectedFont(userProfile.ChosenFont);
    if (userProfile?.ChosenShadow) setSelectedShadow(userProfile.ChosenShadow);
    if (userProfile?.ChosenCorners)
      setSelectedCorners(userProfile.ChosenCorners);
    if (userProfile?.ChosenFrame) setSelectedFrame(userProfile.ChosenFrame);
  }, [userProfile]);

  const saveAndClose = async () => {
    let updateBody = {};
    if (selectedColor !== userProfile?.ChosenColor)
      updateBody["ChosenColor"] = selectedColor;
    if (selectedLayout !== userProfile?.ChosenLayout)
      updateBody["ChosenLayout"] = selectedLayout;
    if (selectedShadow !== userProfile?.ChosenShadow)
      updateBody["ChosenShadow"] = selectedShadow;
    if (selectedCorners !== userProfile?.ChosenCorners)
      updateBody["ChosenCorners"] = selectedCorners;
    if (selectedFrame !== userProfile?.ChosenFrame)
      updateBody["ChosenFrame"] = selectedFrame;
    if (selectedFont !== userProfile?.ChosenFont)
      updateBody["ChosenFont"] = selectedFont;

    if (Object.keys(updateBody).length > 0) {
      let url = new URL(`${apiBaseUrl}/api/profile/${userProfile.Username}`);
      const callURL = url.href;
      try {
        const response = await fetch(callURL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateBody),
        });

        if (!response.ok) {
          throw "Failed to save preferences: " + response.statusText;
        }

        getUserProfile.mutate();
      } catch (err) {
        console.error("Error in saveOrderClicked:", err);
      }
    } else {
      console.log("PREFERENCES NOT CHANGED");
    }
    setDrawerOpen(false);
  };

  if (!isPremium) {
    return (
      <div
        className={clsx(s.openerSection, {
          [s.openerDarkBackground]: chosenColor === "#000000",
        })}
        style={{
          textAlign: "right",
          paddingRight: 35,
          backgroundColor: chosenColor,
        }}
      >
        <Spacer y={4} />

        <EditProfileDialog
          userProfile={getUserProfile?.data}
          isButton={true}
          buttonStyle={{
            position: "absolute",
            top: 23,
            right: 20,
            zIndex: 10,
            cursor: "pointer",
          }}
        />
        <Spacer y={12} />
      </div>
    );
  }

  // For Premium
  return (
    <React.Fragment key={anchor}>
      <div
        className={clsx(s.openerSection, {
          [s.openerDarkBackground]: chosenColor === "#000000",
        })}
        style={{
          backgroundColor: chosenColor,
          // borderBottom: `1px inset ${chosenColor}`,
        }}
      >
        <Spacer y={12} />

        <Button
          variant="outlined"
          rounded={true}
          className={s.profileButton}
          onClick={() => setDrawerOpen(true)}
        >
          {t("preferences.designPortfolio")}
        </Button>

        {/* Later will have three dots open a Drawer with edit profile / share portfolio / qr code.
        For now put put three dots button in EditPorfileDialog and open profile edit only. */}
        {/* <MoreHorizIcon
          onClick={() => setShareMenuOpen(true)}
          style={{
            position: 'absolute',
            top: 23,
            right: 20,
            zIndex: 10,
            cursor: 'pointer',
          }}
        />
        <Drawer
          // classes={{ paper: s.container }}
          anchor="top"
          open={shareMenuOpen}
          onClose={() => setShareMenuOpen(false)}
          ModalProps={{ keepMounted: true }}
        >
          <EditProfileDialog userProfile={userProfile} isMenuItem={true} closeMenu={() => setShareMenuOpen(false)} />
          <MenuItem onClick={() => setShareMenuOpen(false)}>*Dela portfolio*</MenuItem>
          <MenuItem onClick={() => setShareMenuOpen(false)}>*QR-kod <QrCodeIcon/></MenuItem>
        </Drawer> */}
        <EditProfileDialog
          userProfile={getUserProfile?.data}
          isButton={false}
          isDotsButton={true}
          buttonStyle={{
            position: "absolute",
            top: 23,
            right: 20,
            zIndex: 10,
            cursor: "pointer",
          }}
        />
        <Spacer y={12} />
      </div>
      <Drawer
        anchor={anchor}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        classes={{ paper: s.root }}
        PaperProps={{
          sx: {
            width: "100%",
          },
        }}
      >
        <div>
          {/* Need div around header or header height won't work. */}
          <div className={s.header}>
            <IconButton
              aria-label="close"
              className="close-button"
              onClick={() => setDrawerOpen(false)}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h1">
              {t("preferences.designYourPortfolio")}
            </Typography>
            <Button
              variant="outlined"
              rounded={true}
              className={clsx(s.profileButton, s.saveButtonDesktop)}
              onClick={() => saveAndClose()}
              disabled={!prefsHasChanges && false}
            >
              {t("preferences.save")}
            </Button>
          </div>

          <div className={s.content}>
            {/* Select Layout */}
            {/* <Spacer y={!largeDevice ? 24 : 80} />
            <Typography variant="h2">
              {t('preferences.imageLayout')}
            </Typography>
            <Spacer y={!largeDevice ? 24 : 40} />
            <LayoutPicker
              LAYOUTS={LAYOUTS}
              selectedLayout={selectedLayout}
              setSelectedLayout={setSelectedLayout}
              t={t}
            /> */}

            <Spacer y={!largeDevice ? 24 : 80} />
            <div
              style={{
                position: "relative",
                alignSelf: "flex-start",
              }}
            >
              <Typography variant="h2">{t("preferences.color")}</Typography>
              <IconButton
                aria-label="close"
                onClick={() => setTooltipOpen(true)}
                style={{
                  position: "absolute",
                  left: "calc(100% + 10px)",
                  top: "-15px",
                }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </div>
            <Spacer y={!largeDevice ? 24 : 40} />
            <ColorPicker
              COLORS={COLORS}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
            <TooltipPopup
              isOpen={tooltipOpen}
              doClose={() => setTooltipOpen(false)}
              content={
                <p
                  style={{
                    margin: "0 0 12px 0",
                  }}
                >
                  {t("preferences.colorTooltip")}
                </p>
              }
            />

            {/* Select Image Style with shadows/corners/frame. */}
            {/*
            <Spacer y={!largeDevice ? 32 : 80} />
            <Typography variant="h2">
              {t('preferences.imageStyle')}
            </Typography>

            <div className={s.styleDropdownContainer}>
              <Spacer y={!largeDevice ? 24 : 40} />
              <Typography variant="h3">
                {t('preferences.shadows')}
              </Typography>
              <Spacer y={10} />
              <Select
                value={selectedShadow}
                onChange={(e) => setSelectedShadow(e.target.value)}
                className={s.styleDropdown}
              >
                {SHADOWS.map(shadow => {
                  return (
                    <MenuItem value={shadow.value} className={s.dropDownItem} key={shadow.value}>{t(`preferences.${shadow.localeName}`)}</MenuItem>
                  )
                })}
              </Select>
            </div>

            <div className={s.styleDropdownContainer}>
              <Spacer y={10} />
              <Typography variant="h3">
                {t('preferences.corners')}
              </Typography>
              <Spacer y={10} />
              <Select
                value={selectedCorners}
                onChange={(e) => setSelectedCorners(e.target.value)}
                className={s.styleDropdown}
              >
                {CORNERS.map(corner => {
                  return (
                    <MenuItem value={corner.value} className={s.dropDownItem} key={corner.value}>{t(`preferences.${corner.localeName}`)}</MenuItem>
                  )
                })}
              </Select>
            </div>

            <div className={s.styleDropdownContainer}>
              <Spacer y={10} />
              <Typography variant="h3">
                {t('preferences.frame')}
              </Typography>
              <Spacer y={10} />
              <Select
                value={selectedFrame}
                onChange={(e) => setSelectedFrame(e.target.value)}
                className={s.styleDropdown}
              >
                {FRAMES.map(frame => {
                  return (
                    <MenuItem value={frame.value} className={s.dropDownItem} key={frame.value}>{t(`preferences.${frame.localeName}`)}</MenuItem>
                  )
                })}
              </Select>
            </div>
            */}

            <Spacer y={!largeDevice ? 32 : 80} />
            <Typography variant="h2">{t("preferences.font")}</Typography>
            <Spacer y={!largeDevice ? 24 : 40} />
            <FontPicker
              FONTS={FONTS}
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
              userProfile={userProfile}
            />

            <Spacer y={40} />
            <Button
              variant="outlined"
              rounded={true}
              className={clsx(s.profileButton, s.saveButtonMobile)}
              onClick={() => saveAndClose()}
              disabled={!prefsHasChanges && false}
            >
              {t("preferences.saveAndClose")}
            </Button>
            <Spacer y={!largeDevice ? 30 : 200} />
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
