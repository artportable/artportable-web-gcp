import React, { useState } from 'react'
import Main, { GridRow } from '../app/components/Main/Main'
import { styles } from '../styles/index.css';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useGetArtworksForStartPage } from '../app/hooks/dataFetching/Artworks'
import PlanSelector from '../app/components/PlanSelector/PlanSelector';
import CarouselItem from '../app/components/CarouselItem/CarouselItem';
import IndexArtworksGrid from '../app/components/IndexArtworksGrid/IndexArtworksGrid';
import Carousel from 'react-material-ui-carousel';
import Box from '@material-ui/core/Box';

export default function Home( props ) {
  const s = styles();
  const { t } = useTranslation(['index', 'header']);

  const navItems = props.navItems;
  const tags = navItems.map(item => item.tag);
  const artworks = useGetArtworksForStartPage();
  const [currentTag, setCurrentTag] = useState(navItems[0].tag);

  return (
    <Main noHeaderPadding>
      <GridRow fullWidth>
          <Carousel>
            {props.carouselItems.map( (item, i) =>
              <CarouselItem
                key={i}
                src={item.image}
                text={item.text}
                user={item.user} />
            )}
          </Carousel>
      </GridRow>
      <GridRow>

        <Box marginTop={8}>
          <IndexArtworksGrid artworks={artworks} />
        </Box>

        <div className={s.welcomeToContainer}>
          <div className={s.welcomeTo}>
            <h1>{t('chooseMembership')}</h1>
            <p>{t('portfolioExplanation')}</p>
            <p>{t('memberExplanation')}</p>
          </div>
        </div>
        <div className={s.planSelector}>
          <PlanSelector priceData={props.priceData}></PlanSelector>
        </div>
      </GridRow>
    </Main>
  );
}

export async function getStaticProps({locale}) {
  const navItems = [
    {
      text: 'forYouWhoSwimIn', tag: 'acrylic'
    },
    {
      text: 'forYouWhoEat', tag:'oil'
    },
    {
      text: 'forYouWhoBreath', tag:'sea'
    },
    {
      text: 'forYouWhoHungerFor', tag:'summer'
    }
  ];
  const carouselItems = [
    {
      image: '/images/index1.jpg',
      text: 'welcomeToTitle',
      user: {
        username: 'jimpa',
        profilepicture: 'd5f6f50a-a669-4f93-943c-0314305b0113.jpg'
      }
    },
    {
      image: '/images/index2.jpg',
      text:'Förenkla dina konstköp från konstnärer du följer',
      user: {
        username: 'andersand',
        profilepicture: null
      }
    },
    {
      image: '/images/index3.jpg',
      text:'Avslappnande minimalism',
    },
    {
      image: '/images/index4.jpg',
      text:'Från jord till bord',
      user: {
        username: 'sillynilly',
        profilepicture: '1a0d2b6e-562d-4bb0-8ca8-49871c84aa8e.jpg'
      }
    }
  ];
  const priceData = await getPriceData();

  return {
    props: {
      navItems,
      carouselItems,
      priceData,
      ...await serverSideTranslations(locale, ['header', 'index', 'tags', 'plans', 'common']),
    },
  }
}

async function getPriceData() {
  try {
    const res = await fetch(`http://localhost:5001/api/payments/prices`);
    return await res?.json();
  } catch(e) {
    console.log('Could not fetch price info', e);
  }
}
