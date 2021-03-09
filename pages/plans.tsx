import Typography from '@material-ui/core/Typography';
import Button from '../app/components/Button/Button';
import s from '../styles/plans.module.css'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Plans() {
  const { t } = useTranslation('plans');

  return (
    <>
      <div className={s.plansRootContainer}>
        <div className={s.steps}></div>
        <div className={s.header}>
          <Typography variant="h1">
            {t('welcomeTo')}
          </Typography>
          
        </div>
        <div className={s.paymentOptions}></div>
        <div className={s.options}></div>
        <div className={s.navigation}>
          <Button></Button>
          <Button></Button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      ...await serverSideTranslations(locale, ['header', 'plans']),
    } 
  };
}