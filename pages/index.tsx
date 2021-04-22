import Head from 'next/head'
import Main from '../app/components/Main/Main'
import Image from 'next/image'
import TextCarousel from '../app/components/TextCarousel/TextCarousel'
import RadioButtonGroup from '../app/components/RadioButtonGroup/RadioButtonGroup'
import { useState } from 'react'
import s from '../styles/Home.module.css'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Home( props ) {
  const [currentShowing, setCurrentShowing] = useState(props.carouselNavOptions[0].tag);
  const images = props.data?.filter((image) => image.Tags.includes(currentShowing));
  const navOptions = props.carouselNavOptions.map(navOption => navOption.tag);
  const { t } = useTranslation(['header']);
  
  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <div className={s.textCarouselContainer}>
          <TextCarousel show={currentShowing} objects={props.carouselNavOptions}></TextCarousel>
          <RadioButtonGroup navOptions={navOptions} onNav={setCurrentShowing}></RadioButtonGroup>
        </div>
        <h1>Our images &rarr;</h1>
            
        {images?.map(img =>
          <div key={img?.Id}>
            {img?.Title}
            <br/>
            <Image src={`https://artportable-images.s3.eu-north-1.amazonaws.com/Images/${img?.FileName}`}
                  alt="Logo Artportable"
                  width={500}
                  height={300}
            />
          </div>
        )}
      </Main>
    </>
  );
}

export async function getStaticProps({context, locale}) {
  // @ts-ignore Used for ignoring cert validation, remove before prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
  const carouselNavOptions = [
    {
      text: 'För dig som badar i', tag: 'acrylic' 
    },
    { 
      text: 'För dig som äter', tag:'oil'
    }
  ];

  return {
    props: {
      carouselNavOptions,
      ...await serverSideTranslations(locale, ['header']),
    },
  }
}
