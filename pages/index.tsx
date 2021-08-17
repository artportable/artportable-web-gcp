import React from 'react'
import Main, { FullWidthBlock } from '../app/components/Main/Main'
import { styles } from '../styles/index.css';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useGetArtworksForStartPage } from '../app/hooks/dataFetching/Artworks'
// import CarouselItem from '../app/components/CarouselItem/CarouselItem';
import IndexHero from '../app/components/IndexHero/IndexHero';
import IndexArtworksGrid from '../app/components/IndexArtworksGrid/IndexArtworksGrid';
// import Carousel from 'react-material-ui-carousel';
import Box from '@material-ui/core/Box';
import Price from '../app/models/Price';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export default function Home( props ) {
  const s = styles();
  const { t } = useTranslation(['index', 'header']);
  const temp = props.carouselItems;

  const i18nCarouselItems = temp.map((item, i) => ({
    ...item,
    header: t(`index:carouselItems.${i}.header`),
    subheader: t(`index:carouselItems.${i}.subheader`)
  }))
  const artworks = useGetArtworksForStartPage();

  return (
    <Main noHeaderPadding>
        {/* <Carousel autoPlay={false} navButtonsAlwaysInvisible={true} indicators={false}>
          {i18nCarouselItems.map( (item, i) =>
            <CarouselItem
              key={i}
              src={item.image}
              text={item.header}
              user={item.user} />
          )}
        </Carousel> */}
        <IndexHero></IndexHero>

      <Box className={s.artworkGrid}>
        <IndexArtworksGrid artworks={artworks} />
      </Box>
    </Main>
  );
}

export async function getStaticProps({locale}) {
  const carouselItems = [
    {
      image: `/images/index1_${locale}.jpg`,
      text: 'welcomeToTitle',
      subheader: 'subheaderTextCarouselOne',
    },
    // {
    //   image: `/images/index2_${locale}.jpg`,
    //   text:'Vardagsrum',
    //   subheader: 'subheaderTe',
    //   // user: {
    //   //   username: 'jimpa',
    //   //   profilepicture: 'd5f6f50a-a669-4f93-943c-0314305b0113.jpg'
    //   // }
    // },
    // {
    //   image: `/images/index3_${locale}.jpg`,
    //   text:'Avslappnande minimalism',
    // },
    // {
    //   image: `/images/index4_${locale}.jpg`,
    //   text:'Från jord till bord',
    //   // user: {
    //   //   username: 'sillynilly',
    //   //   profilepicture: '1a0d2b6e-562d-4bb0-8ca8-49871c84aa8e.jpg'
    //   // }
    // }
  ];

  return {
    props: {
      carouselItems,
      ...await serverSideTranslations(locale, ['header', 'index', 'tags', 'plans', 'common']),
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
