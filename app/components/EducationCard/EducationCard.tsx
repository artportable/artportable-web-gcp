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
        {educations.map((e, i) =>
          <div className={s.container} key={i}>
            <SchoolIcon color="primary" className={s.icon}></SchoolIcon>
            <div className={s.textContainer}>
              <div className={clsx(s.yearsRow, (e.From === 0 || e.To === 0) && s.displayNone)}>
                <div className={s.years}>{e.From} - {e.To}</div>
              </div>
              <div>
                {e.Name}
              </div>
            </div>
          </div>)}
      </CardContent>
    </Card>
  );
}