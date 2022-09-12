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
    { name: "Thorulf Löfstedt", username: "thorulf.lofstedt", image: '/images/thorulf_lofstedt.jpg', imageLink: "art/02ac0b26-a7f7-4d4e-999f-79d0796c90e2" },
    { name: "Karen Mølgaard", username: "karen.molgaard", image: '/images/karen_molgaard_lighthouse.jpg', imageLink: "art/e1394b9f-97e0-4553-af8f-d81a1b38c541" },
    { name: "Kenneth Karlsson", username: "kenneth.karlsson", image: '/images/kenneth_karlsson.jpg', imageLink: "art/feb4bef6-e3b4-43df-adca-6f5fc0f6123e" },
    { name: "Inger Klintstam", username: "inger.klintstam", image: '/images/inger_klintstam.jpg', imageLink: "art/fbaabe8c-1bcb-4144-be64-341b4c10d972" },
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
            {t('Ta en titt i galleriet med över 35000 konstverk')}
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