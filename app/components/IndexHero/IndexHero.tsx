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
    { name: "janka-dimitrova", image: '/images/Ianka.png', profileImage: 'eac03d57-dd99-4b32-8b24-e256fbf65a25', imageLink: "eac03d57-dd99-4b32-8b24-e256fbf65a25"},
    { name: "solveig.christina.rosendal", image: '/images/solveig.jpg', profileImage: '27535714-c936-4035-b44f-ad0e26a2818c.jpg', imageLink: "15a2b5c2-b538-42e6-a029-c4606ce72371"},
    { name: "cecilia_bedoyaa", image: '/images/cecilia.jpg', profileImage: '5bd8753a-1a7b-4b8b-9ae1-c83c0f900844', imageLink: "5bd8753a-1a7b-4b8b-9ae1-c83c0f900844"},
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