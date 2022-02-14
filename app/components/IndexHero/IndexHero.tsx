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
    { name: "anders.malm", image: '/images/anders_malm.jpg', imageLink: "f08c9683-db20-44eb-bc83-e216e30af62f"},
    { name: "Gunilla.Iversen", image: '/images/gunilla_iversen.jpg', imageLink: "e63ed3be-25ea-4c73-ace3-5ff81ca66c77"},
    { name: "Susanne", image: '/images/susanne_strandhall.jpg', imageLink: "06606dbe-5c60-445b-8187-743a9f589ff3"},
    { name: "cecilia_bedoyaa", image: '/images/cecilia.jpg', imageLink: "5bd8753a-1a7b-4b8b-9ae1-c83c0f900844"},
    { name: "elsmarie.rannemalm", image: '/images/elsmarie_skymning.png', imageLink: "87eaeb65-98ff-4b30-9b22-632bc18fc1aa"},
    { name: "erik.mofjell", image: '/images/erik_mofjell.jpg', imageLink: "53e65a8d-a108-4894-81c2-3e7d10a3a9dd"},
    { name: "karinjohansson30", image: '/images/karin.jpg', imageLink: "76eccea3-a6c5-4036-a419-443678b1237b"},
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