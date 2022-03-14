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
    { name: "Marit Stjernberg", username: "marit.stjernberg", image: '/images/Marit.jpg', imageLink: "c4f7d8a0-0686-4443-8836-d9b0d08f336d"},
    { name: "Atle Reilo", username: "atle.reilo", image: '/images/Atle_Reilo.jpg', imageLink: "442555ed-5673-4356-98a3-7e9abec67454"},
    { name: "Pia Britton", username: "pia.britton", image: '/images/Pia_Britton.jpg', imageLink: "eb2655e2-ea20-4517-8f6b-89bf2b4df8e3"},
    { name: "Veslemøy Vangsnes", username: "veslemoy.vangsnes", image: '/images/Vesle.jpg', imageLink: "f2375c7b-6c54-4b51-85f4-84a7fee2c6a9"},
    { name: "Vanja Antonsson", username: "vanja.antonsson", image: '/images/Vanja_Antonsen.jpg', imageLink: "ef617c82-66cd-4e7a-ad5c-4d3a1407ca2b"},
    { name: "Coila Coats Matton", username: "coila.matton", image: '/images/Coila_Mattsson.jpg', imageLink: "e0a139f1-1fe7-4a49-85f0-9830636e0b5f"},
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
              {t('Ta en titt i galleriet med över 27500 konstverk')}
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