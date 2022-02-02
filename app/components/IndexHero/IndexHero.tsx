import { useEffect, useState } from 'react'
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
    if (randomImage === { artwork: '', username: '', profileImage: '', imageLink: '' }) {
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
    { name: "janka-dimitrova", image: '/images/Ianka.png', profileImage: 'PROFILE-PICTURE20-30.jpg', imageLink: "eac03d57-dd99-4b32-8b24-e256fbf65a25"},
    { name: "kathrin.gorczak", image: '/images/kathrin.jpg', profileImage: 'f1dfdac8-caf6-49a1-8eb6-af305dc34771.jpg', imageLink: "1bd04126-2077-43a8-902c-9fbba7593265"},
    { name: "katarina.storalm", image: '/images/katarina.jpg', profileImage: 'fb76286c-2fdf-4964-8a86-5d0f8aea6135.jpg', imageLink: "82d47d82-a866-45d2-8768-4a42898de6da"},
    { name: "ajohansson193", image: '/images/annamaria.jpg', profileImage: 'PROFILE-PICTURE16-72.jpg', imageLink: "88ae6dd6-04b0-49c8-a194-eb1fee7b82b4"},
    { name: "malin.ekstrom", image: '/images/malin.jpg', profileImage: '5654a156-d902-4b4c-9ec5-d9faa79a8bcd.jpg', imageLink: "fe4a6e67-fef2-4420-94d7-1738dce27f43"},
  ];

  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setRandomImage(({
      artwork: (images[randomImageIndex].image),
      username: (images[randomImageIndex].name),
      profileImage: (images[randomImageIndex].profileImage),
      imageLink: (images[randomImageIndex].imageLink)
    }));
  }, [])   


  return (
    <div className={s.container}>
      <div className={s.flexContainer}>

          <div className={s.left}>
            <Typography variant="h1" className={s.headline}>
              {t('header')}
            </Typography>
            <Typography variant="h4" className={s.description}>
              {t('subHeader')}
            </Typography>
            {/* <div className={s.flexheaderButton}> */}
              <div className={s.headerButtonArtlover}>
                {/* <Typography variant="subtitle1" component="h2" className={s.subHeadline}>
                  {t('artLoverHeader')}<span className='bigger'>{t('artloverPrice')}</span>{t('artloverSek')}
                </Typography> */}
                <Button
                // {clsx(s.mobile, s.flexItem)}
                  classes={{
                    label: s.buttonLabel
                  }}
                  className={s.becomeMemberButton}
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                  rounded
                  onClick={() => keycloak.register({
                    locale: router.locale,
                    redirectUri: signUpRedirectHref
                  })}>
                  {t('signUp')}
                </Button>
              {/* </div> */}
               {/* <div className={s.headerButtonArtist}> */}
               {/* <Typography variant="subtitle1" component="h2" className={s.subHeadline} >
                  {t('artistHeader')}<span className='bigger'>{t('artistPrice')}</span>{t('artistSek')}
                </Typography> */}
                <Button
                  classes={{
                    label: s.buttonLabel
                  }}
                  size="small"
                  variant="outlined"
                  color="black"
                  disableElevation
                  rounded
                  onClick={() => keycloak.login({ locale: router.locale })}>
                  {t('logIn')}
                </Button>
              </div>
            {/* </div> */}
          </div>
        
        <div className={s.right}>
          <div className={s.paintingContainer}>
            {!randomImage ? <Skeleton variant="rect" width={320} height={320} />
              :
              <>
                {/* <Paper elevation={5}> */}
                  <Link href={`/art/${randomImage.imageLink}`}>
                    <a>
                      <img
                        className={s.boosted}
                        src={(randomImage.artwork)}
                        alt={`${t("artworkFrom")} ${randomImage.username}`}
                        title={`${t("artworkFrom")} ${randomImage.username}`} />
                    </a>
                  </Link>

                {/* </Paper> */}
                <div className={s.createdBy}>
                  <Chip
                    onClick={(_) => router.push(`/profile/@${randomImage.username}`)}
                    size="small"
                    classes={{
                      root: s.chip,
                    }}
                    // avatar={
                    //   <div className={s.chipAvatar}>
                    //     <ProfileAvatar size={19} profilePicture={randomImage.profileImage} />
                    //   </div>
                    // }
                    label={randomImage.username} />
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