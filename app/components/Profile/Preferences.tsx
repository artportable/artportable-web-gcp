import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import clsx from 'clsx';
import Drawer from '@mui/material/Drawer';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import Divider from '@mui/material/Divider';
import Button from '../Button/Button';
import Spacer from "../LayoutComponents/Spacer";
import ColorPicker from "../Pickers/ColorPicker/ColorPicker";
import FontPicker from "../Pickers/FontPicker/FontPicker";
import LayoutPicker from '../Pickers/LayoutPicker/LayoutPicker';
import { styles } from './preferences.css';

export default function Preferences({ userProfile }) {
  const s = styles();
  const theme = useTheme();
  const largeDevice = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const anchor = 'left';
  const { t } = useTranslation(["profile"]);


  const COLORS = [
    { value: '#BCDFAE' }, // Green
    { value: '#C26D6D' }, // Red
    { value: '#34498A' }, // Blue
    { value: '#F7D0AE' }, // Beige
    { value: '#F8F3E6' }, // White
    { value: '#292929' }, // Black
  ];
  const SHADOWS = [
    { value: 'shadow', localeName: 'shadowsYes' },
    { value: 'none', localeName: 'shadowsNo' },
  ]
  const CORNERS = [
    { value: 'rounded', localeName: 'cornersYes' },
    { value: 'none', localeName: 'cornersNo' },
  ]
  const FRAMES = [
    { value: 'none', localeName: 'frameNone' },
    { value: 'this', localeName: 'frameThin' },
    { value: 'thick', localeName: 'frameThick' },
  ]
  const FONTS = [
    { value: 'gotham', localeName: 'Gotham', family: 'Gotham' },
    { value: 'gluten', localeName: 'Gluten', family: 'Gluten' },
    { value: 'kellySlab', localeName: 'KellySlab', family: 'KellySlab' },
    { value: 'barrio', localeName: 'Barrio', family: 'Barrio' },
    { value: 'caveat', localeName: 'Caveat', family: 'Caveat' },
    { value: 'jura', localeName: 'Jura', family: 'Jura' },
  ]

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedLayout, setSelectedLayout] = useState('');
  const [selectedShadow, setSelectedShadow] = useState('none');
  const [selectedCorners, setSelectedCorners] = useState('none');
  const [selectedFrame, setSelectedFrame] = useState('none');
  const [selectedFont, setSelectedFont] = useState('none');
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!selectedColor && userProfile?.ChosenColor) setSelectedColor(userProfile.ChosenColor);
    if (!selectedLayout && userProfile?.ChosenLayout) setSelectedLayout(userProfile.ChosenLayout);
    if (!selectedShadow && userProfile?.ChosenShadow) setSelectedShadow(userProfile.ChosenShadow);
    if (!selectedCorners && userProfile?.ChosenCorners) setSelectedCorners(userProfile.ChosenCorners);
    if (!selectedFrame && userProfile?.ChosenFrame) setSelectedFrame(userProfile.ChosenFrame);
    if (!selectedFont && userProfile?.ChosenFont) setSelectedFont(userProfile.ChosenFrame);
  }, [userProfile])

  const saveAndClose = async () => {
    let updateBody = {};
    if (selectedColor !== userProfile?.ChosenColor) updateBody['ChosenColor'] = selectedColor;
    if (selectedLayout !== userProfile?.ChosenLayout) updateBody['ChosenLayout'] = selectedLayout;
    if (selectedShadow !== userProfile?.ChosenShadow) updateBody['ChosenShadow'] = selectedShadow;
    if (selectedCorners !== userProfile?.ChosenCorners) updateBody['ChosenCorners'] = selectedCorners;
    if (selectedFrame !== userProfile?.ChosenFrame) updateBody['ChosenFrame'] = selectedFrame;
    if (selectedFont !== userProfile?.ChosenFont) updateBody['ChosenFont'] = selectedFont;

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
        }
        );

        if (!response.ok) {
          throw "Failed to save preferences: " + response.statusText
        }
      } catch (err) {
        console.error("Error in saveOrderClicked:", err);
      }
    } else {
      console.log('PREFERENCES NOT CHANGED');
    }
    setDrawerOpen(false);
  }

  return (
    <React.Fragment key={anchor}>
      <div className={s.openerSection}>
        <Spacer y={12} />
        <Button
          variant="outlined"
          rounded={true}
          className={s.profileButton}
          onClick={() => setDrawerOpen(true)}
          >
          {t('preferences.designPortfolio')}
        </Button>
        <Spacer y={12} />
      </div>
      <Drawer
        anchor={anchor}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        classes={{ paper: s.root }}
        PaperProps={{
          sx: {
            width: '100%',
          }
        }}>
        <div>{/* Need div around header or header height won't work. */}
          <div className={s.header}>
            <IconButton
              aria-label="close"
              className="close-button"
              onClick={() => setDrawerOpen(false)}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h1">
              {t('preferences.designYourPortfolio')}
            </Typography>
            <Button
              variant="outlined" rounded={true}
              className={clsx(s.profileButton, s.saveButtonDesktop)}
              onClick={() => saveAndClose()}
            >
              {t('preferences.save')}
            </Button>
          </div>

          <div className={s.content}>
            <Spacer y={!largeDevice ? 24 : 80} />
            <Typography variant="h2">
              {t('preferences.imageLayout')}
            </Typography>
            <Spacer y={!largeDevice ? 24 : 40} />
            <LayoutPicker
              selectedLayout={selectedLayout}
              setSelectedLayout={setSelectedLayout}
              t={t}
            />

            <Spacer y={!largeDevice ? 24 : 80} />
            <Typography variant="h2">
              {t('preferences.color')}
            </Typography>
            <Spacer y={!largeDevice ? 24 : 40} />
            <ColorPicker
              COLORS={COLORS}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              popupText="*Den färg du väljer visas som rubrikbakgrund högst upp på din konstportfolio och ger den en personlig touch.*"
            />

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

            <Spacer y={!largeDevice ? 32 : 80} />
            <Typography variant="h2">
              {t('preferences.font')}
            </Typography>
            <Spacer y={!largeDevice ? 24 : 40} />
            <FontPicker FONTS={FONTS} selectedFont={selectedFont} setSelectedFont={setSelectedFont} />

            <Spacer y={40} />
            <Button
              variant="outlined"
              rounded={true}
              className={clsx(s.profileButton, s.saveButtonMobile)}
              onClick={() => saveAndClose()}
            >
              {t('preferences.saveAndClose')}
            </Button>
            <Spacer y={!largeDevice ? 30 : 200} />
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  )
}