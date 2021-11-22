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
  const [randomImage, setRandomImage] = useState({ artwork: '', username: '', profileImage: ''})

  useEffect(() => {
    const isDefaultLocale = router.locale == router.defaultLocale;
    const redirectHref = `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/plans`
    setSignUpRedirectHref(redirectHref);
  }, []);

  //List with current artists
  const images = [
    { name: "jasonandersson", image: '/images/jason.jpg', profileImage: '4f5e8324-b2ef-4af5-a42f-21af6e79778b.jpg'},
  ];

  useEffect (() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setRandomImage(({
      artwork: (images[randomImageIndex].image), 
      username: (images[randomImageIndex].name), 
      profileImage: (images[randomImageIndex].profileImage)}));
  }, [])

  const promotedUser = randomImage.username;

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
                src={(randomImage.artwork)} 
                alt={`${t("artworkFrom")} ${promotedUser}`}
                title={`${t("artworkFrom")} ${promotedUser}`}/>
            </Paper>
            <div className={s.createdBy}>
              <Chip
                onClick={(_) => router.push(`/profile/@${promotedUser}`)}
                size="small"
                classes={{
                  root: s.chip,
                }}
                avatar={
                  <div className={s.chipAvatar}>
                    <ProfileAvatar size={19} profilePicture={randomImage.profileImage} />
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
