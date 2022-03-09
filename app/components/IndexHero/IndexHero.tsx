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
    { name: "marit.stjernberg", image: '/images/Marit_Stjernberg.jpg', imageLink: "art/ac380033-88a0-43d0-8090-f019f7ae5c45"},
    { name: "atle.reilo", image: '/images/Atle_Reilo.jpg', imageLink: "art/442555ed-5673-4356-98a3-7e9abec67454"},
    { name: "pia.britton", image: '/images/Pia_Britton.jpg', imageLink: "art/eb2655e2-ea20-4517-8f6b-89bf2b4df8e3"},
    { name: "veslemoy.vangsnes", image: '/images/Veslemøy_Vangsnes.jpg', imageLink: "art/cd7c9a38-fafd-4037-bac7-1312f9ad9177"},
    { name: "vanja.antonsson", image: '/images/Vanja_Antonsen.jpg', imageLink: "art/ef617c82-66cd-4e7a-ad5c-4d3a1407ca2b"},
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
              {t('Hitta originalkonst')}
            </Typography>
            <Typography variant="h4" className={s.description}>
              {t('Ta en titt i galleriet med över 27000 konstverk')}
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