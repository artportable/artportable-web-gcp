import Head from 'next/head'
import Main from '../app/components/Main/Main'
import Box from '@material-ui/core/Box'
import ProfileCard from '../app/components/ProfileCard/ProfileCard'

import { styles } from '../styles/feed.css';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";


export default function Feed() {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);
  const user = {
    username: "mrArtist",
    shortDescription: "I like painting in nature",
    location: "Gibraltar",
    followers: 13,
    follows: 15,
    worksOfArt: 22
  }

  return (
    <>
      <Head>
        <title>Artportable</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Box className={s.feedContainer}>
          <div className={s.colLeft}>
            <ProfileCard userId={''} user={user}></ProfileCard>
          </div>
          <div className={s.colFeed}>feed</div>
          <div className={s.colRight}>right</div>
        </Box>
      </Main>
    </>
  );
}


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'feed']),
    }
  }
}