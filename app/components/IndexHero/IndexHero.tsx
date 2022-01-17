import { useEffect, useState} from 'react'
import { Typography, Chip, Paper } from '@material-ui/core';
import { styles } from './indexHero.css'
import { useTranslation } from "next-i18next";
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from "next/router";
import Skeleton from '@material-ui/lab/Skeleton'
import Link from 'next/link'

import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import Button from '../Button/Button'

interface RandomImageProps {
  artwork: string;
  username: string;
  profileImage: string;
  imageLink: string;
}

export default function IndexHero() {
  const s = styles();
  const { t } = useTranslation('index');
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  const [signUpRedirectHref, setSignUpRedirectHref] = useState('');
  const [randomImage, setRandomImage] = useState<RandomImageProps | undefined>()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (randomImage === { artwork: '', username: '', profileImage: '', imageLink: ''}){
      setLoading(true)
    } else {
      setLoading(false)
    }
    
    const isDefaultLocale = router.locale == router.defaultLocale;
    const redirectHref = `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/plans`
    setSignUpRedirectHref(redirectHref);
  }, []);

  //List with current promoted artists
  const images = [
    { name: "gunilla.svard", image: '/images/gunilla_svard.jpg', profileImage: '7d441716-f2ce-4d01-be44-ce8af4e3d0a9.jpg', imageLink: "3216b830-a1c5-423c-a73e-3f52995648f4"},
    { name: "viveca.berg", image: '/images/viveca_berg.jpg', profileImage: '333a35cc-19eb-4329-8568-35c5cb19690e.jpg', imageLink: "956ecb81-8118-491e-a541-9b5a6d99c1c5"},
    { name: "kathrin.gorczak", image: '/images/kathrin_gorczak.jpg', profileImage: 'f1dfdac8-caf6-49a1-8eb6-af305dc34771.jpg', imageLink: "1bd04126-2077-43a8-902c-9fbba7593265"},
    { name: "inger.dillan.antonsen", image: '/images/inger_dillan_antonsen.jpg', profileImage: 'Inger-i-New-York-2016-1-2.jpg', imageLink: "8dc0324a-a10e-4b0b-967b-d50d79610b41"}
  ];

  useEffect (() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setRandomImage(({
      artwork: (images[randomImageIndex].image), 
      username: (images[randomImageIndex].name), 
      profileImage: (images[randomImageIndex].profileImage),
      imageLink: (images[randomImageIndex].imageLink)}));
  }, [])


  return (
    <div className={s.container}>
      <div className={s.flexContainer}>
        <div>
          <div className={s.left}>
            <Typography variant="h1" className={s.headline}>
              {t('header')}
            </Typography>
            <Typography variant="h4" className={s.description}>
              {t('subHeader')}<br></br>{t('subHeader2')}
            </Typography>
            <div className={s.flexheaderButton}>
              <div className={s.headerButtonArtlover}>     
            <Typography variant="subtitle1" component="h2" className={s.subHeadline}>
            {t('artLoverHeader')}<span className='bigger'>{t('artloverPrice')}</span>{t('artloverSek')}
            </Typography> 
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
                {t('artloverButton')}
              </Button>
            </div>   
            <div className={s.headerButtonArtist}>
            <Typography variant="subtitle1" component="h2"className={s.subHeadline} >
            {t('artistHeader')}<span className='bigger'>{t('artistPrice')}</span>{t('artistSek')}
            </Typography>
              <Button
                classes={{
                  label: s.buttonLabel
                }}
                size="small"
                variant="outlined"
                color="primary"
                disableElevation
                rounded
                onClick={() => keycloak.register({
                  locale: router.locale,
                  redirectUri: signUpRedirectHref})}>
                {t('artistButton')}
              </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={s.right}>
          <div className={s.paintingContainer}>
          {!randomImage ? <Skeleton variant="rect" width={320} height={320} /> 
          :
          <>
            <Paper elevation={5}>
            <Link href={`/art/${randomImage.imageLink}`}>
              <a>
                <img 
                  className={s.boosted} 
                  src={(randomImage.artwork)} 
                  alt={`${t("artworkFrom")} ${randomImage.username}`}
                  title={`${t("artworkFrom")} ${randomImage.username}`}/>
              </a>
            </Link>
              
            </Paper>
            <div className={s.createdBy}>
              <Chip
                onClick={(_) => router.push(`/profile/@${randomImage.username}`)}
                size="small"
                classes={{
                  root: s.chip,
                }}
                avatar={
                  <div className={s.chipAvatar}>
                    <ProfileAvatar size={19} profilePicture={randomImage.profileImage} />
                  </div>
                }
                label={randomImage.username}/>
            </div>
            </>
            }
          </div>
          <div>
            {/* <img className={s.sofaImage} src="/images/soffa-cropped-landing-hero.png"></img> */}
          </div>
        </div>
      </div>
    </div>
  );
}