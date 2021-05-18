import React, { useState } from 'react'
import Main from '../app/components/Main/Main'
import TextCarousel from '../app/components/TextCarousel/TextCarousel'
import RadioButtonGroup from '../app/components/RadioButtonGroup/RadioButtonGroup'
import { styles } from '../styles/index.css';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Button from '../app/components/Button/Button'
import Link from 'next/link'
import { useGetArtworksForStartPage } from '../app/hooks/dataFetching/Artworks'
import ArtworkStartItem from '../app/components/ArtworkStartItem/ArtworkStartItem'

export default function Home( props ) {
  const s = styles();
  const { t } = useTranslation(['index', 'header']);

  const navItems = props.navItems;
  const tags = navItems.map(item => item.tag);
  const artworks = useGetArtworksForStartPage();
  const [currentTag, setCurrentTag] = useState(navItems[0].tag);

  return (
    <Main>
      <div className={s.container}>
        <div className={s.carouselContainer}>
          <TextCarousel show={currentTag} items={navItems}></TextCarousel>
          <RadioButtonGroup
            navOptions={tags}
            onNav={setCurrentTag}
          ></RadioButtonGroup>
        </div>
        <div className={s.artworks}>
          {artworks?.data && artworks.data.map(a =>
            <ArtworkStartItem artwork={a} key={a.Image.Name}></ArtworkStartItem>
          )}
        </div>
        <div className={s.welcomeToContainer}>
          <div className={s.welcomeTo}>
            <h1>{t('welcomeToTitle')}</h1>
            <p>{t('welcomeToParagraph')}</p>
            <Link href="/plans">
              <a>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  disableElevation
                  rounded>
                    {t('header:signUp')}
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
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

  return {
    props: {
      navItems,
      ...await serverSideTranslations(locale, ['header', 'index', 'tags']),
    },
  }
}
