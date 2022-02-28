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
    if (randomImage === { artwork: '', username: '', imageLink: '' }) {
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
    { name: "lagerzz", image: '/images/carl_lagercrantz_second.jpg', imageLink: "art/b30a5786-5f44-4231-bb05-b11ef079b2f6"},
    { name: "mike.eriksson", image: '/images/mike_eriksson.jpg', imageLink: "art/de2a5833-9bb9-431d-810c-7909894dd0d6"},
    { name: "olle.brandqvist", image: '/images/Olle_Brandqvist_ny.jpg', imageLink: "profile/@olle.brandqvist"},
    { name: "nordstrandmarie", image: '/images/marie_nordstrand.jpg', imageLink: "art/b52807f2-8497-4722-b535-ad9a2cdfcf89"},
    { name: "gunilla.svard", image: '/images/gunilla_svard_house.jpg', imageLink: "art/3b0b0caf-510f-4d91-a1f4-597866abca5f"},
    // { name: "margareta.karlsson", image: '/images/margareta.jpg', imageLink: "93a9d756-7708-48b1-a65d-54903714ec58"},
    // { name: "erik.mofjell", image: '/images/erik_mofjell.jpg', imageLink: "53e65a8d-a108-4894-81c2-3e7d10a3a9dd"},
    // { name: "karinjohansson30", image: '/images/karin.jpg', imageLink: "76eccea3-a6c5-4036-a419-443678b1237b"},
  ]

  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setRandomImage(({
      artwork: (images[randomImageIndex].image),
      username: (images[randomImageIndex].name),
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
              <div className={s.headerButtonArtlover}>
                <Button
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
                <Button
                  classes={{
                    label: s.buttonLabel
                  }}
                  size="small"
                  variant="outlined"
                  disableElevation
                  rounded
                  onClick={() => keycloak.login({ locale: router.locale })}>
                  {t('logIn')}
                </Button>
              </div>
          </div>
        
        <div className={s.right}>
          <div className={s.paintingContainer}>
            {!randomImage ? <Skeleton variant="rect" width={320} height={320} />
              :
              <>
                  <Link href={`/${randomImage.imageLink}`}>
                    <a>
                      <img
                        className={s.boosted}
                        src={(randomImage.artwork)}
                        alt={`${t("artworkFrom")} ${randomImage.username}`}
                        title={`${t("artworkFrom")} ${randomImage.username}`} />
                    </a>
                  </Link>
                <div className={s.createdBy}>
                  <Chip
                    onClick={(_) => router.push(`/profile/@${randomImage.username}`)}
                    size="small"
                    classes={{
                      root: s.chip,
                    }}
                    label={randomImage.username} />
                </div>
              </>
            }
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}