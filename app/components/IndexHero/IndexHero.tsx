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
    { name: "ceciliasetterdahl", image: '/images/cecilia_setterdahl.jpg', profileImage: 'PROFILE-PICTURE15.jpg', imageLink: "9899aa73-d1ed-41ac-bdf9-4bbe24ffb53f"},
    { name: "rene.jacobsen", image: '/images/rene.jpg', profileImage: '98eb5478-868a-4aac-a90c-2445f1f73a94.jpg', imageLink: "3293112f-8f5d-49ff-814f-42b067359b2e"},
    { name: "ruben.madsen", image: '/images/ruben.jpg', profileImage: '9f9a60f1-f16f-42d0-b1be-a823a8e743f1.jpg', imageLink: "0899b50c-73a7-4a8c-a3d3-7d2f87b54fcf"},
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
