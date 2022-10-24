import { useEffect, useState } from 'react'
import { Typography, Chip, Paper, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
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
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

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
  const [toggleButton, setToggleButton] = useState(false);

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
    { name: "Lo Fehrling", username: "lo", image: '/images/lo_fehrling.jpg', imageLink: "art/79eda7b1-f008-4d8e-bd67-d7c62d388855" },
    { name: "Kurt Forsberg", username: "kurt.forsberg", image: '/images/kurt_forsberg.jpg', imageLink: "art/666a17cb-da1c-49a6-bb1d-1432dabfed5d" },
    { name: "Nathalie Tsikritea", username: "nattiz_t", image: '/images/nathalie_tsikritea.jpg', imageLink: "art/1fde2bb7-804a-4906-8b00-ce3e18f4de63" },
    { name: "Thorulf Lofstedt", username: "thorulf.lofstedt", image: '/images/thorulf_lofstedt.jpg', imageLink: "art/02ac0b26-a7f7-4d4e-999f-79d0796c90e2" },
    { name: "Ralph Castellan", username: "rc-art", image: '/images/ralph_castellan.jpg', imageLink: "art/f67d95aa-95af-46da-9f3e-4192cb1fc01e" },
    { name: "Inger Klintstam", username: "inger.klintstam", image: '/images/inger_klintstam_you.jpg', imageLink: "art/6a3d4cf1-2ec1-4ded-9118-1110384d3e88" },
    { name: "Matilda Skoglund", username: "matilda.skoglund", image: '/images/matilda_skoglund_jarnet.jpg', imageLink: "art/df4080d9-f847-4e79-8910-d3c30abaebea" },
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
            {t('Ta en titt i galleriet med över 37000 konstverk')}
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
          <div className={s.accordionDiv}>
              <Accordion
                className={s.accordion}
                elevation={0}>
                <AccordionSummary className={s.accordionSummary}
                onClick={() => setToggleButton(!toggleButton)}>
                  <div>
                    <div className={s.buttonDiv}>
                      {toggleButton ?
                        <Button
                          className={s.button}
                          size="small"
                          onClick={() => setToggleButton(!toggleButton)}
                          variant="outlined"
                          rounded
                          startIcon={<KeyboardArrowUpIcon />}>
                          {t('readLess')}
                        </Button>
                        :
                        <Button
                          className={s.button}
                          size="small"
                          onClick={() => setToggleButton(!toggleButton)}
                          variant="outlined"
                          rounded
                          startIcon={<KeyboardArrowDownIcon />}>
                          {t('readMore')}
                        </Button>}
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <div className={s.detailsText}>
                <Typography variant="h5" component="h2" className={s.heading}>{t('headline')}</Typography>
                <Typography className={s.accDescription}>{t('readDescription')}</Typography>
                <Typography variant="h5" component="h2" className={s.heading}>{t('headline2')}</Typography>
                <Typography className={s.accDescription}>{t('readDescription2')}</Typography>
                <Typography variant="h5" component="h2" className={s.heading}>{t('headline3')}</Typography>
                <Typography className={s.accDescription}>{t('readDescription3')}</Typography>
                <Typography variant="h5" component="h2" className={s.heading}>{t('headline4')}</Typography>
                <Typography className={s.accDescription}>{t('readDescription4')}</Typography>
              
              <Accordion className={s.accordion} elevation={0}>
               <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{t('ads')}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div>
                <Typography variant="h5" component="h2" className={s.headingAd}>{t('headlineAd')}</Typography>
                <div className={s.adContent}>
                <a href="https://utländskacasino.net/" target="_blank">
                  <img
                  className={s.imageAd}
                  src={'/images/utlandskacasino_net.jpg'}
                  alt="utländskacasino.net"
                  title="" />
                </a>
                </div>
                
                <Typography variant="h5" component="h2" className={s.headingAd}>{t('headlineAd')}</Typography>
                <div className={s.adContent2}>
                <div>
                  <Typography>
                  <a className={s.linkColor} href="https://goplay.se/casinon/" target="_blank">Goplay.se</a>  informerar om online casino.
                  </Typography>
                </div>
                </div>

                <Typography variant="h5" component="h2" className={s.headingAd}>{t('headlineAd')}</Typography>
                <div className={s.adContent2}>
                <div>
                  <Typography>
                  Allt om utländska casinon hittar du på
                  <a className={s.linkColor}
                  href="https://spelpressen.se/casino-reportage/casino-utan-svensk-licens"
                  target="_blank"> Spelpressens sida</a> här.
                  </Typography>
                </div>
                </div>
                </div>
                </AccordionDetails>
                </Accordion>
                </div> 
                </AccordionDetails>
              </Accordion>
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