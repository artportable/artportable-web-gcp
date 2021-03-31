import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Button from '../Button/Button'
import { styles } from './newsletterCard.css'

import { useTranslation } from 'react-i18next';

export default function NewsletterCard() {
  const s = styles();
  const { t } = useTranslation(['feed']);

  return (
    <Card className={s.card}>
      <CardHeader         
        title={t('stayUpToDate')} 
        titleTypographyProps={{ variant: "subtitle2" }}>
      </CardHeader>
      <CardContent>
        <Typography className={s.cardText} variant="h4" component="p">
          {t('artPortableNewsLetterRegisterToGetUpdates')}.
        </Typography>
        <Input className={s.textField} placeholder={t('enterEmailHere')} fullWidth />
        <Typography variant="caption" className={s.unsubscribeText}>Lorem ipsum, you can always unsubscribe dolor ipsum etc etc</Typography>
      </CardContent>
      <CardActions>
        <Button className={s.button} variant="outlined" rounded>{t('register')}</Button>
      </CardActions>
    </Card>
  );
}