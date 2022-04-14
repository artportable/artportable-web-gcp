import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School';
import clsx from 'clsx'

import { useTranslation } from 'react-i18next';
import { styles } from './educationCard.css'

export default function EducationCard({ educations }) {
  const s = styles();
  const { t } = useTranslation('profile');

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('education')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
        {educations.sort((a, b) => a.From < b.From ? 1 : -1).map((e, i) =>
          <div className={s.container} key={i}>
            <SchoolIcon color="primary" className={s.icon}></SchoolIcon>
            <div className={s.textContainer}>
              <div>
                {e.Name}
              </div>
              <div className={clsx(s.yearsRow, (e.From === 0 || e.To === 0) && s.displayNone)}>
                <div className={s.years}>{e.From ? e.To ? e.From + " - " + e.To : e.From : e.To ? e.To : ' '}</div>
              </div>
            </div>
          </div>)}
      </CardContent>
    </Card>
  );
}