import { useEffect, useState } from "react";
import {
  Typography,
  Chip,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { styles } from "./indexHero.css";
import { useTranslation } from "next-i18next";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import Skeleton from "@material-ui/lab/Skeleton";
import Link from "next/link";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import Button from "../Button/Button";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import VideoDialog from "../VideoDialog/VideoDialog";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

interface RandomImageProps {
  artwork: string;
  username: string;
  imageLink: string;
  name: string;
}

export default function IndexHero() {
  const s = styles();
  const { t } = useTranslation("index");
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");
  const [randomImage, setRandomImage] = useState<
    RandomImageProps | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    setLoading(randomImage === null);
    const isDefaultLocale = router.locale == router.defaultLocale;
    const redirectHref = `${window.origin}${
      isDefaultLocale ? "" : `/${router.locale}`
    }/plans`;
    setSignUpRedirectHref(redirectHref);
  }, [randomImage, router.locale, router.defaultLocale]);
  //List with current promoted artists
  const images = [
    {
      name: "Annica Hallman",
      username: "Annica.b",
      image: "/images/annica_hallman_gloria.jpg",
      imageLink: "art/403e95ed-221d-4990-9019-aa8be6094289",
    },
    {
      name: "Susanna Kiander",
      username: "sanna.kiander",
      image: "/images/susanna_kiander_stripee.jpg",
      imageLink: "art/5d0d1a76-b6d9-4be2-b26c-2312087b7f88su",
    },
    {
      name: "Christina Ganslandt",
      username: "christina.ganslandt",
      image: "/images/christina_granslandt_folder.jpg",
      /*imageLink: "art/cdaba6d4-3d31-47f6-86ef-2ac47cd3c9c3",*/
    },
    {
      name: "Solveig Riis",
      username: "solveig.riis",
      image: "/images/solveig_17_maj.jpg",
      imageLink: "art/521fd314-916b-4566-a68e-730163e6aabb",
    },
    {
      name: "Atle Reilo",
      username: "atle.reilo",
      image: "/images/atle17maj.jpg",
      imageLink: "art/2990b312-9649-4233-8305-bc53b0594241",
    },
  ];

  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setRandomImage({
      artwork: images[randomImageIndex].image,
      username: images[randomImageIndex].username,
      imageLink: images[randomImageIndex].imageLink,
      name: images[randomImageIndex].name,
    });
  }, []);

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
            {t("Hitta originalkonst")}
          </Typography>
          <Typography variant="h4" className={s.description}>
            {t("Ta en titt i galleriet med över 37000 konstverk")}
          </Typography>
          <div className={s.headerButtonArtlover}>
            <Button
              classes={{
                label: s.buttonLabel,
              }}
              className={s.becomeMemberButton}
              size="small"
              variant="contained"
              color="primary"
              disableElevation
              rounded
              onClick={() =>
                keycloak.register({
                  locale: router.locale,
                  redirectUri: signUpRedirectHref,
                })
              }
            >
              {t("signUp")}
            </Button>
            <Button
              classes={{
                label: s.buttonLabel,
              }}
              size="small"
              variant="outlined"
              disableElevation
              rounded
              onClick={() => keycloak.login({ locale: router.locale })}
            >
              {t("logIn")}
            </Button>
          </div>
          <div className={s.videoDiv}>
            <PlayCircleFilledIcon />
            <Typography
              className={s.playText}
              onClick={() => {
                handleClickVideoDialog();
              }}
            >
              {t("thisIsArtportable")}
            </Typography>

            <VideoDialog open={openVideoDialog} onClose={toggleVideoDialog} />
          </div>
          <div className={s.accordionDiv}>
            <Accordion className={s.accordion} elevation={0}>
              <AccordionSummary
                className={s.accordionSummary}
                onClick={() => setToggleButton(!toggleButton)}
              >
                <div>
                  <div className={s.buttonDiv}>
                    {toggleButton ? (
                      <Button
                        className={s.button}
                        size="small"
                        onClick={() => setToggleButton(!toggleButton)}
                        variant="outlined"
                        rounded
                        startIcon={<KeyboardArrowUpIcon />}
                      >
                        {t("readLess")}
                      </Button>
                    ) : (
                      <Button
                        className={s.button}
                        size="small"
                        onClick={() => setToggleButton(!toggleButton)}
                        variant="outlined"
                        rounded
                        startIcon={<KeyboardArrowDownIcon />}
                      >
                        {t("readMore")}
                      </Button>
                    )}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className={s.detailsText}>
                  <Typography variant="h5" component="h2" className={s.heading}>
                    {t("headline")}
                  </Typography>
                  <Typography className={s.accDescription}>
                    {t("readDescription")}
                  </Typography>
                  <Typography variant="h5" component="h2" className={s.heading}>
                    {t("headline2")}
                  </Typography>
                  <Typography className={s.accDescription}>
                    {t("readDescription2")}
                  </Typography>
                  <Typography variant="h5" component="h2" className={s.heading}>
                    {t("headline3")}
                  </Typography>
                  <Typography className={s.accDescription}>
                    {t("readDescription3")}
                  </Typography>
                  <Typography variant="h5" component="h2" className={s.heading}>
                    {t("headline4")}
                  </Typography>
                  <Typography className={s.accDescription}>
                    {t("readDescription4")}
                  </Typography>

                  <Accordion className={s.accordion} elevation={0}>
                    <AccordionSummary
                      expandIcon={<KeyboardArrowDownIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{t("ads")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        <Typography
                          variant="h5"
                          component="h2"
                          className={s.headingAd}
                        >
                          {t("headlineAd")}
                        </Typography>
                        <div className={s.adContent}>
                          <a
                            href="https://utländskacasino.net/"
                            target="_blank"
                          >
                            <img
                              className={s.imageAd}
                              src={"/images/utlandskacasino_net.jpg"}
                              alt="utländskacasino.net"
                              title=""
                            />
                          </a>
                        </div>

                        <Typography
                          variant="h5"
                          component="h2"
                          className={s.headingAd}
                        >
                          {t("headlineAd")}
                        </Typography>
                        <div className={s.adContent2}>
                          <div>
                            <Typography>
                              <a
                                className={s.linkColor}
                                href="https://goplay.se/casinon/"
                                target="_blank"
                              >
                                Goplay.se
                              </a>{" "}
                              informerar om online casino.
                            </Typography>
                          </div>
                        </div>

                        <Typography
                          variant="h5"
                          component="h2"
                          className={s.headingAd}
                        >
                          {t("headlineAd")}
                        </Typography>
                        <div className={s.adContent2}>
                          <div>
                            <Typography>
                              Allt om utländska casinon hittar du på
                              <a
                                className={s.linkColor}
                                href="https://spelpressen.se/casino-reportage/casino-utan-svensk-licens"
                                target="_blank"
                              >
                                {" "}
                                Spelpressens sida
                              </a>{" "}
                              här.
                            </Typography>
                          </div>
                        </div>
                        <Typography
                          variant="h5"
                          component="h2"
                          className={s.headingAd}
                        >
                          {t("headlineAd")}
                        </Typography>
                        <div className={s.adContent}>
                          <a
                            href="https://onlinecasinos.se/casino-utan-svensk-licens"
                            target="_blank"
                          >
                            <img
                              className={s.imageAd}
                              src={"/images/OCSLOGO.svg"}
                              alt="OCS"
                              title=""
                            />
                          </a>
                        </div>
                        <Typography
                          variant="h5"
                          component="h2"
                          className={s.headingAd}
                        >
                          {t("headlineAd")}
                        </Typography>
                        <div className={s.adContent2}>
                          <div> 
                            <Typography>
                              <a
                                className={s.linkColor}
                                href=" https://passagen.se/casino-utan-svensk-licens/"
                                target="_blank"
                              >
                                Casinon utan Svensk Licens med Trustly
                              </a>{" "}
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
            {!randomImage ? (
              <Skeleton variant="rect" width={320} height={320} />
            ) : (
              <>
                <Link href={`/${randomImage.imageLink}`}>
                  <a>
                    <div className={s.frame}>
                      <img
                        className={s.image}
                        src={randomImage.artwork}
                        alt={`${t("artworkFrom")} ${randomImage.username}`}
                        title={`${t("artworkFrom")} ${randomImage.username}`}
                      />
                    </div>
                  </a>
                </Link>
                {randomImage.username && (
                  <div className={s.createdBy}>
                    <Chip
                      onClick={(_) =>
                        router.push(`/profile/@${randomImage.username}`)
                      }
                      size="small"
                      classes={{
                        root: s.chip,
                      }}
                      label={randomImage.name}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
