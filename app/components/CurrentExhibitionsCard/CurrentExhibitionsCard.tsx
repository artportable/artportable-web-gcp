import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core'
import PaletteIcon from '@material-ui/icons/Palette';
import RoomIcon from '@material-ui/icons/Room';

import { useTranslation } from 'react-i18next';
import { styles } from './exhibitionsCard.css'

export default function CurrentExhibitionsCard({ exhibitions }) {
  const s = styles();
  const { t } = useTranslation('profile');

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('currentExhibitions')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
      {exhibitions.map(e =>
          <div className={s.exhibition}>
            <div className={s.datesRow}>
              <PaletteIcon color="primary" className={s.icon}></PaletteIcon>
              <div className={s.dates}>{e.From.split('T')[0]} - {e.To.split('T')[0]}</div>
            </div>
            <div className={s.title}>{e.Name}</div>
            <div className={s.location}>
              <RoomIcon color="disabled" fontSize="inherit"></RoomIcon>
              <div className={s.locationText}>{e.Place}</div>
            </div>
          </div>)}
      </CardContent>
    </Card>
  );
}