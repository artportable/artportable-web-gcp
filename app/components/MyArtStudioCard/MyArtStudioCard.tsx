import { Card, CardContent, CardHeader } from '@material-ui/core'

import { useTranslation } from 'next-i18next';

export default function MyArtStudioCard({ data }) {
  const { t } = useTranslation('profile');

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('myArtStudio')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
        <div>{data.Text}</div>
        <div style={{fontStyle: "italic"}}>{data.Location}</div>
      </CardContent>
    </Card>
  );
}