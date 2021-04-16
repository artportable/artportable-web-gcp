import { Card, CardContent, CardHeader } from '@material-ui/core'

import { useTranslation } from 'react-i18next';

export default function CurrentExhibitionsCard({ exhibitions }) {
  const { t } = useTranslation('profile');

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('currentExhibitions')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
      {exhibitions.map(e =>
          <div>
            <p>{e.From.split('T')[0]} - {e.To.split('T')[0]}</p>
            <p>{e.Name}</p>
            <p>{e.Place}</p>
            <br/>
          </div>)}
      </CardContent>
    </Card>
  );
}