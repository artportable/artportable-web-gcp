import Main from '../app/components/Main/Main'
import TextCarousel from '../app/components/TextCarousel/TextCarousel'
import RadioButtonGroup from '../app/components/RadioButtonGroup/RadioButtonGroup'
import { useState } from 'react'
import s from '../styles/Home.module.css'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Home( props ) {
  const navItems = props.navItems;
  const [currentTag, setCurrentTag] = useState(navItems[0].tag);

  return (
    <>
      <Main>
        <div className={s.carouselContainer}>
          <TextCarousel show={currentTag} items={navItems}></TextCarousel>
          <RadioButtonGroup
            navOptions={navItems.map(item => item.tag)}
            onNav={setCurrentTag}
          ></RadioButtonGroup>
        </div>
        <h1>Our images &rarr;</h1>
      </Main>
    </>
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
