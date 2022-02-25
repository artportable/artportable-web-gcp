import { useTranslation } from 'next-i18next';
import { styles } from './alert.css'

export default function Alert(){
  const s = styles();
  const { t } = useTranslation(['header']);

  return(
    <div className={s.container}>
      {t('alert')}
    </div>
  )
}