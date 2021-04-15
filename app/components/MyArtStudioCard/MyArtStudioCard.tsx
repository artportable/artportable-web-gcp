import { Card, CardContent, CardHeader } from '@material-ui/core'

import { useTranslation } from 'react-i18next';

export default function MyArtStudioCard({ userProfile }) {
  const { t } = useTranslation('profile');

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('myArtStudio')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>Content</CardContent>
    </Card>
  );
}