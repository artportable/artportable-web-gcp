import { Card, CardContent, CardHeader } from '@material-ui/core'

import { useTranslation } from 'react-i18next';

export default function EducationCard({ educations }) {
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
            <p>{e.From} - {e.To}</p>
            <p>{e.Name}</p>
            <br/>
          </div>)}
      </CardContent>
    </Card>
  );
}