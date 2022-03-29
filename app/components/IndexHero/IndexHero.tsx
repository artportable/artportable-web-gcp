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
    { name: "Larz Lindqvist", username: "larz.lindqvist", image: '/images/Larz_Lindqvist.jpg', imageLink: "art/84a8b101-8915-4d30-b58d-62e6dd9251fc" },
    { name: "Örjan Sätre", username: "orjan.satre", image: '/images/orjan_satre_03.jpg', imageLink: "art/c41303e9-6e30-4f28-b9cb-0b8025b2b8ff" },
    { name: "Ulrika Hegårdh", username: "ulrikahegardh", image: '/images/Ulrika_Hegardh.jpg', imageLink: "profile/@ulrikahegardh" },
    { name: "Evelyn Marchant", username: "evelyn.marchant", image: 'images/Evelyn_Marchant.jpg', imageLink: "art/4b4fd7a2-82af-44df-9e93-15a897da8651" },
    { name: "Pia Britton", username: "pia.britton", image: '/images/pia.jpg', imageLink: "art/e5981e02-4736-494f-a25c-8f09f13fe9bc" },
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