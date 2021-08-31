import React from 'react'
import Main, { FullWidthBlock } from '../app/components/Main/Main'
import { styles } from '../styles/index.css';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useGetArtworksForStartPage } from '../app/hooks/dataFetching/Artworks'
import IndexHero from '../app/components/IndexHero/IndexHero';
import IndexArtworksGrid from '../app/components/IndexArtworksGrid/IndexArtworksGrid';
import Box from '@material-ui/core/Box';
import Price from '../app/models/Price';
import PlanSelector from '../app/components/PlanSelector/PlanSelector';
import { Typography } from '@material-ui/core';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export default function Home( props ) {
  const s = styles();
  const { t } = useTranslation(['index', 'header', 'plans']);
  const artworks = useGetArtworksForStartPage();

  return (
    <Main noHeaderPadding>
      <IndexHero></IndexHero>
      <Box className={s.artworkGrid}>
        <IndexArtworksGrid artworks={artworks} />
      </Box>

      <div className={s.welcomeToTexts}>
        <Typography className={s.header} variant="h2" component="h1">{t('plans:welcomeTo')}</Typography>
        <Typography className={s.description} variant="body1">{t('plans:artPortableDescription')}</Typography>
        <Typography className={s.ourMemberships} variant="subtitle1">{t('plans:ourMemberships')}</Typography>
      </div>
      <FullWidthBlock>
        <PlanSelector priceData={props.priceData} landingPageMode></PlanSelector>
      </FullWidthBlock>
      
    </Main>
  );
}

export async function getStaticProps({locale}) {
  return {
    props: {
      priceData: await getPriceData(),
      ...await serverSideTranslations(locale, ['header', 'footer', 'index', 'tags', 'plans', 'common']),
    },
  }
}

// NOT USED ATM
async function getPriceData() {
  const freeYearPlan: Price =
    {
      amount: 0,
      currency: 'sek',
      id: 'free_month',
      product: 'free',
      productKey: 'free',
      recurringInterval: 'month'
    };
    const freeMonthPlan: Price =
    {
      amount: 0,
      currency: 'sek',
      id: 'free_year',
      product: 'free',
      productKey: 'free',
      recurringInterval: 'year'
    };

  try {
    return (
      fetch(`${apiBaseUrl}/api/payments/prices`)
      .then((response) => {
        return response.json();
      })
      .then((result: Array<Price>) => {
        result.push(freeYearPlan);
        result.push(freeMonthPlan);

        return result;
      })
    )
  } catch(e) {
    console.log('Could not fetch price info', e);
  }
}
