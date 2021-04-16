import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardContent, CardHeader, Icon } from '@material-ui/core'
import React from 'react';

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
        {educations.map(e =>
          <div>
            <div className={s.yearsRow}>
              <Icon color="primary" className={s.icon}>
                <FontAwesomeIcon icon={["fas", "graduation-cap"]} size="xs"/>
              </Icon>
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