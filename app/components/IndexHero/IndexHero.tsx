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
  name: string;
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
    if (randomImage === { artwork: '', username: '', imageLink: '', name: '' }) {
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
    { name: "Viggo Carlsen", username: "Viggo.Carlsen", image: '/images/Viggo_Carlsen.jpg', imageLink: "8b505381-7319-4589-933c-a5e0c10aba52" },
    { name: "Örjan Sätre", username: "orjan.satre", image: '/images/Orjan_Satre.jpg', imageLink: "0e3d73bd-2b4f-4ef4-97bf-02d2b35b21a3" },
    { name: "Felicia Adérian", username: "feliciaaderian", image: '/images/felicia_adrén.jpg', imageLink: "853261f1-a9be-4607-a74d-895f897f92ca" },
    { name: "Gunilla Svärd", username: "gunilla.svard", image: 'images/gunilla_svard.jpg', imageLink: "3216b830-a1c5-423c-a73e-3f52995648f4" },
    { name: "Coila Coats Matton", username: "coila.matton", image: '/images/Coila_Mattsson.jpg', imageLink: "e0a139f1-1fe7-4a49-85f0-9830636e0b5f" },
  ]

  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setRandomImage(({
      artwork: (images[randomImageIndex].image),
      username: (images[randomImageIndex].username),
      imageLink: (images[randomImageIndex].imageLink),
      name: (images[randomImageIndex].name)
    }));
  }, [])


  return (
    <div className={s.container}>
      <div className={s.flexContainer}>
        <div className={s.left}>
          <Typography variant="h1" className={s.headline}>
            {t('Hitta originalkonst')}
          </Typography>
          <Typography variant="h4" className={s.description}>
            {t('Ta en titt i galleriet med över 28000 konstverk')}
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
                <Link href={`/art/${randomImage.imageLink}`}>
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
                    label={randomImage.name} />
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