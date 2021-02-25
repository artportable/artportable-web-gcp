import Head from 'next/head'
import Main from '../app/components/Main/Main'
import Image from 'next/image'


import Carousel from '../app/components/Carousel/Carousel'
import TextCarousel from '../app/components/TextCarousel/TextCarousel'
import RadioButtonGroup from '../app/components/RadioButtonGroup/RadioButtonGroup'
import { useState } from 'react'



export default function Home( props ) {
  const [currentShowing, setCurrentShowing] = useState(props.carouselNavOptions[0].tag)
  const navOptions = props.carouselNavOptions.map(navOption => navOption.tag);
  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p>
          Get started by editing{' '}
          <code>pages/index.js</code>
        </p>

        <div>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>

            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>

            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>

            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
            <h3>Our images &rarr;</h3>
            {props.data?.map(img =>
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
        </div>
        <TextCarousel show={currentShowing} objects={props.carouselNavOptions}></TextCarousel>

        <RadioButtonGroup navOptions={navOptions} onNav={setCurrentShowing}></RadioButtonGroup>

      </Main>
    </>
  )
}

export async function getStaticProps(context) {
  // @ts-ignore Used for ignoring cert validation, remove before prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

  try {
    const res = await fetch(`https://localhost:5001/api/user/imgs`);
    const data = await res?.json()

    // If no data, show a 404 page instead
    if (!data) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        data,
        carouselNavOptions: [
          {
            text: 'För dig som badar i', tag: 'Akvarell' 
          },
          { 
            text: 'För dig som äter', tag:'Olja'
          }
        ] 
      },
    }
  } catch(e) {
    console.log('Something went wrong!');
    return { props: {
      carouselNavOptions: [
        {
          text: 'För dig som badar i', tag: 'Akvarell' 
        },
        { 
          text: 'För dig som äter', tag:'Olja'
        }
      ] 
    } };
  }
}
