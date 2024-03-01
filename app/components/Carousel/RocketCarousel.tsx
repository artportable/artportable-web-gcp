import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EmblaCarousel, { formatAwArtworkForEmbla } from "./Embla/EmblaCarousel"
import Artist from '../../models/Artist'

type Data = {
  forDesktop: boolean,
  artists: Artist[],
}

const RocketCarousel = (props: Data) => {
  const printsDataForCarousel = []

  return null

  return (
    <div>
      <EmblaCarousel
        slides={printsDataForCarousel}
        options={{
          align: 'start',
          loop: true,
        }}
        forDesktop={props.forDesktop}
      />
    </div>
  )
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       // ...await serverSideTranslations(locale, ['common', 'footer', 'header', 'gdpr', 'support', 'plans']),
//     },
//     revalidate: 60,
//   }
// }

export default RocketCarousel