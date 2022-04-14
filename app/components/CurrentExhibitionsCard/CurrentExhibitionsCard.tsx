import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core'
import PaletteIcon from '@material-ui/icons/Palette';
import RoomIcon from '@material-ui/icons/Room';
import clsx from 'clsx'
import { isValid , parseISO, subYears } from 'date-fns'

import { useTranslation } from 'react-i18next';
import { styles } from './exhibitionsCard.css'

export default function CurrentExhibitionsCard({ exhibitions }) {
  const s = styles();
  const { t } = useTranslation('profile');

  const hasInvalidDate = (exhibition): boolean => {
    const parsedTo = parseISO(exhibition.To);
    const parsedFrom = parseISO(exhibition.From);
    const minimumYear = subYears(new Date(), 100).getFullYear();

    return (exhibition.To && (!isValid(parsedTo) || parsedTo.getFullYear() < minimumYear))
      || (exhibition.From && (!isValid(parsedFrom) || parsedFrom.getFullYear() < minimumYear));
  }

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('exhibitions')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
      {exhibitions.sort((a, b) => a.From < b.From ? 1 : -1).map((e, i) =>
          <div key={i} className={s.exhibition}>
            <PaletteIcon color="primary" className={s.icon}></PaletteIcon>
            <div className={s.textContainer}>
              <div>{e.Name}</div>
              <div className={clsx(s.datesRow, hasInvalidDate(e) && s.displayNone)}>
                <div className={s.dates}>{e.From ? e.To ? e.From.split('T')[0] + " - " + e.To.split('T')[0] : e.From.split('T')[0] : e.To ? e.To.split('T')[0] : ' '}</div>
              </div>
              <div className={clsx(s.location, e.Place === null && s.displayNone)}>
                <RoomIcon color="disabled" fontSize="inherit"></RoomIcon>
                <div className={s.locationText}>{e.Place}</div>
              </div>
            </div>
          </div>)}
      </CardContent>
    </Card>
  );
}