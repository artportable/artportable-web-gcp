import { useEffect, useState } from 'react'
import { Typography, Chip, Paper } from '@material-ui/core';
import { styles } from './indexHero.css'
import { useTranslation } from "next-i18next";
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from "next/router";

import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import Button from '../Button/Button'
import { FullWidthBlock } from '../Main/Main'
import { useGetArtwork } from '../../hooks/dataFetching/Artworks';

export default function IndexHero() {
  const s = styles();
  const { t } = useTranslation('index');
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  const [signUpRedirectHref, setSignUpRedirectHref] = useState('');
  const [randomImage, setRandomImage] = useState(null)
  const [randomUser, setRandomUser] = useState('')

  useEffect(() => {
    const isDefaultLocale = router.locale == router.defaultLocale;
    const redirectHref = `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/plans`
    setSignUpRedirectHref(redirectHref);
  }, []);

  const images = [
    { name: "jasonandersson", image: '/images/jason.jpg'},
    // { name: "erikart", image: '/images/frame_atle.png'},
    // { name: "charlottewennerberg", image: '/images/jason.jpg'},
    // { name: "berg", image: '/images/art_landing_horses_painting.png'},
  ];

  const user1 = 'image0-14-2.jpg'
  // const user2 = '4f5e8324-b2ef-4af5-a42f-21af6e79778b.jpg';
  // const user3 = 'b7e6c0e6-2ca7-4368-9a06-d21b67e2f6c8.jpg';
  // const user4 = 'c81096a9-d0e8-467f-9cd7-ea72f00c4b3e.jpg';

  const randomImageIndex = Math.floor(Math.random() * images.length);

  useEffect (() => {
    setRandomImage((images[randomImageIndex].image));
    setRandomUser((images[randomImageIndex].name))
  }, [])

  function getUserProfilImage() {
    if (randomUser === 'jasonandersson') {
      return user1;
    // } else if (randomUser === 'erikart') {
    //   return user2;
    // }else if (randomUser === 'charlottewennerberg') {
    //   return user3;
    // }else if (randomUser === 'berg') {
    //   return user4;
    }
  }

  const promotedUser = randomUser;

  return (
    <div className={s.container}>
      <div className={s.flexContainer}>
        <div>
          <div className={s.left}>
            <Typography variant="h1" className={s.headline}>
              {t('header')}
            </Typography>
            <Typography variant="body1" className={s.description}>
              {t('subHeader')}
            </Typography>
            <div className={s.signupButtonContainer}>
              <Button
                classes={{
                  label: s.buttonLabel
                }}
                size="small"
                variant="contained"
                color="primary"
                disableElevation
                rounded
                onClick={() => keycloak.register({
                  locale: router.locale,
                  redirectUri: signUpRedirectHref})}>
                {t('signUp')}
              </Button>
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.paintingContainer}>
            <Paper elevation={5}>
              <img 
                className={s.boosted} 
                src={(randomImage)} 
                alt={`${t("artworkFrom")} ${promotedUser}`}
                title={`${t("artworkFrom")} ${promotedUser}`}/>
            </Paper>
            <div className={s.createdBy}>
              <Chip
                onClick={(_) => router.push(`/profile/@${randomUser}`)}
                size="small"
                classes={{
                  root: s.chip,
                }}
                avatar={
                  <div className={s.chipAvatar}>
                    <ProfileAvatar size={19} profilePicture={getUserProfilImage()} />
                  </div>
                }
                label={promotedUser}/>
            </div>
          </div>
          <div>
            {/* <img className={s.sofaImage} src="/images/soffa-cropped-landing-hero.png"></img> */}
          </div>
        </div>
      </div>
    </div>
  );
}
