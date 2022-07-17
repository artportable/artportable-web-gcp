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
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import VideoDialog from '../VideoDialog/VideoDialog';

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
    { name: "Hans Kolb", username: "hans.kolb", image: '/images/hans_kolb.jpg', imageLink: "art/09702d91-c8a9-45c7-adc7-e0e69d9172cd" },
    { name: "Gunilla Svärd", username: "gunilla.svard", image: '/images/gunilla_svard.jpg', imageLink: "art/728958ac-d50d-4a43-8206-7226604c97fa" },
    { name: "Olle Brandqvist", username: "olle.brandqvist", image: '/images/olle-brandqvist-4.jpg', imageLink: "art/fccc1122-5a85-4caf-968a-9cfd239a5337" },
    { name: "Regina Lund", username: "reginalund", image: '/images/regina.jpg', imageLink: "art/51a24252-7e0b-42cc-9a5f-62ab6b11dcac" },
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

  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  function toggleVideoDialog() {
    setOpenVideoDialog(!openVideoDialog);
  }


  const handleClickVideoDialog = () => {
    setOpenVideoDialog(true);
  };

  return (
    <div className={s.container}>
      <div className={s.flexContainer}>
        <div className={s.left}>
          <Typography variant="h1" className={s.headline}>
            {t('Hitta originalkonst')}
          </Typography>
          <Typography variant="h4" className={s.description}>
            {t('Ta en titt i galleriet med över 32000 konstverk')}
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
          <div className={s.videoDiv}>
            <PlayCircleFilledIcon />
            <Typography className={s.playText} onClick={() => { handleClickVideoDialog(); }}>
              {t('thisIsArtportable')}
            </Typography>

            <VideoDialog
              open={openVideoDialog}
              onClose={toggleVideoDialog}
            />
          </div>
        </div>

        <div className={s.right}>
          <div className={s.paintingContainer}>
            {!randomImage ? <Skeleton variant="rect" width={320} height={320} />
              :
              <>
                <Link href={`/${randomImage.imageLink}`}>
                  <a>
                    <div className={s.frame}>
                      <img
                        className={s.image}
                        src={(randomImage.artwork)}
                        alt={`${t("artworkFrom")} ${randomImage.username}`}
                        title={`${t("artworkFrom")} ${randomImage.username}`} />
                    </div>
                  </a>
                </Link>
                {randomImage.username &&
                  <div className={s.createdBy}>
                    <Chip
                      onClick={(_) => router.push(`/profile/@${randomImage.username}`)}
                      size="small"
                      classes={{
                        root: s.chip,
                      }}
                      label={randomImage.name} />
                  </div>
                }
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