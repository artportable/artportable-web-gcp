import React from 'react';
import { Card, CardContent, CardHeader, Icon } from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School';

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
          <div key={i}>
            <div className={s.yearsRow}>
              <SchoolIcon color="primary" className={s.icon}></SchoolIcon>
              <div className={s.years}>{e.From} - {e.To}</div>
            </div>
            <div className={s.title}>
              {e.Name}
            </div>
            <br/>
          </div>)}
      </CardContent>
    </Card>
  );
}