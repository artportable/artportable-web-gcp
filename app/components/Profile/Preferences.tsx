import React, { useContext, useEffect, useState } from "react";
import Drawer from '@mui/material/Drawer';
import Button from "../Button/Button";
import ColorPicker from "./ColorPicker";

export default function Preferences({ userProfile }) {
  // const s = styles();
  // const { t } = useTranslation(["profile", "common"]);
  // const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // const { username } = useContext(UserContext);
  // const token = useContext(TokenContext);
  // const { refreshToken } = useRefreshToken();
  console.log('userProfile', userProfile);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const anchor = 'left';

  const COLORS = [
    { bg: '#BCDFAE', border: '#000000' }, // Green
    { bg: '#C26D6D', border: '#000000' }, // Red
    { bg: '#34498A', border: '#ffc229' }, // Blue
    { bg: '#F7D0AE', border: '#000000' }, // Beige
    { bg: '#F8F3E6', border: '#000000' }, // White
    { bg: '#292929', border: '#ffc229' }, // Black
  ];
  const [selectedColor, setSelectedColor] = useState('');
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!selectedColor && userProfile?.ChosenColor) {
      setSelectedColor(userProfile.ChosenColor);
    }
  }, [userProfile])

  const saveAndClose = async () => {
    if (selectedColor !== userProfile?.ChosenColor) {
      let url = new URL(`${apiBaseUrl}/api/profile/${userProfile.Username}`);
      const callURL = url.href;
      try {
        const response = await fetch(callURL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              { ChosenColor: selectedColor}
            ),
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
      <Button variant="outlined" rounded={true} onClick={() => setDrawerOpen(true)}>Designa portfolio</Button>
      <Drawer
        anchor={anchor}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
          }
        }}>
        <Button onClick={() => setDrawerOpen(false)}>*Close*</Button>
        <h1>Preferences</h1>
        <h1>Color</h1>
        <ColorPicker COLORS={COLORS} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        <Button variant="outlined" rounded={true} onClick={() => saveAndClose()}>Save and close</Button>
      </Drawer>
    </React.Fragment>
  )
}