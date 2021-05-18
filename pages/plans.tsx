import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { styles } from '../styles/plans.css'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import React from 'react';
import PlanSelector from '../app/components/PlanSelector/PlanSelector';

export default function Plans({ priceData }) {
  const { t } = useTranslation(['plans', 'common', 'checkout']);
  const s = styles();

  return (
    <div className={s.plansRootContainer}>
      <div className={s.header}>
        <Typography variant="h1" align="center">
          <Box fontFamily="LyonDisplay" fontWeight="fontWeightMedium">
            {t('welcomeTo')}
          </Box>
        </Typography>
      </div>
      <div className={s.planSelector}>
        <Typography align="center" component="div">
          <Box fontWeight="fontWeightBold" marginBottom="15px"> {t('ourMemberships')}</Box>
        </Typography>
        <PlanSelector priceData={priceData}></PlanSelector>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  // @ts-ignore Used for ignoring cert validation, remove before prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
  
  const priceData = await getPriceData();

  return { 
    props: {
      priceData,
      ...await serverSideTranslations(locale, ['header', 'plans', 'common', 'checkout']),
    } 
  };
}

async function getPriceData() {
  try {
    const res = await fetch(`http://localhost:5001/api/payments/prices`);
    return await res?.json();
  } catch(e) {
    console.log('Could not fetch price info', e);
  }
}
