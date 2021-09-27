import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';

import styles from './warningMessage.css'

export default function Button(props) {
  const s = styles();
  const { t } = useTranslation(['upload']);

  return (
    <div className={s.information}>
      <ErrorOutlineIcon className={s.errorOutlineIcon} color="primary" style={{ fontSize: 24 }}></ErrorOutlineIcon>
      <div>
      <Typography className={s.informationText}>{t('informationOne')}</Typography>
      <Typography className={s.informationText}>{t('informationTwo')}</Typography>
      <Typography className={s.informationText}>{t('informationThree')}</Typography>
      </div>
    </div>
  );
}


