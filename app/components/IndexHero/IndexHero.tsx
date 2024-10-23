import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Chip,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { styles } from "./indexHero.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
import { useTranslation } from "next-i18next";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";

import Button from "../Button/Button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import clsx from "clsx";

import { styled } from "@mui/system";

interface RandomImageProps {
  artwork: string;
  username: string;
  imageLink: string;
  name: string;
  showroom: string;
}

export default function IndexHero() {
  const s = styles();
  const sShared = sharedStyles();
  const { t } = useTranslation("index");
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");
  const [randomImage, setRandomImage] = useState<
    RandomImageProps | undefined
  >();
  const [loading, setLoading] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);
  const [toggleButtonReviews, setToggleButtonReviews] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const expandButtonRef = useRef<HTMLInputElement>();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("smPlus"));
  const isTinyDevice = useMediaQuery(theme.breakpoints.down("xs"));

  const colors = [
    "#FFD18D",
    "#F5E8AC",
    "#DDB8F0",
    "#DBCFEA",
    "#DF958E",
    "#E8E9DD",
    "#EFC4B7",
  ];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((current) => (current + 1) % colors.length);
    }, 800);

    return () => clearInterval(intervalId);
  }, [colors.length]);

  const reviews = [
    {
      title: t("reviewOneTitle"),
      fullReview: t("reviewOneContent"),
    },
    {
      title: t("reviewTwoTitle"),
      fullReview: t("reviewTwoContent"),
    },
    {
      title: t("reviewThreeTitle"),
      fullReview: t("reviewThreeContent"),
    },

    {
      title: t("reviewFourTitle"),
      fullReview: t("reviewFourContent"),
    },
    {
      title: t("reviewFiveTitle"),
      fullReview: t("reviewFiveContent"),
    },
    // add more reviews here
  ];

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
      name: "STEPHAN NICOLAUS HÖRHAMMER",
      username: "stephannicolaushoerhammer",
      image: "/images/hoehammer.jpg",
      imageLink: "art/4f3d12c0-2f85-4b51-9957-fdd8d92363bd",
      showroom: `${t("showroom")}`,
    },
  ];

  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setRandomImage({
      artwork: images[randomImageIndex].image,
      username: images[randomImageIndex].username,
      imageLink: images[randomImageIndex].imageLink,
      name: images[randomImageIndex].name,
      showroom: images[randomImageIndex].showroom,
    });
  }, []);

  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  function toggleVideoDialog() {
    setOpenVideoDialog(!openVideoDialog);
  }

  const handleClickVideoDialog = () => {
    setOpenVideoDialog(true);
  };

  const expandAccordion = () => {
    // console.log('expandAccordion');
    // console.log('expandButtonRef', expandButtonRef);

    expandButtonRef?.current?.click();
    // if (expandButtonRef && expandButtonRef.current) {
    // }
  };

  return (
    <div className={s.container}>
      <div className={clsx(s.flexContainer, s.fullWidthContainer)}>
        <div className={s.left}>
          {/*<Typography variant="h2" className={s.description}>
            {t("Hitta originalkonst") + '!'}
          </Typography>*/}
          {/*<div className={s.headerButtonArtlover}>
            <Button
              // className={s.becomeMemberButton}
              className={clsx(sShared.largeButton, sShared.alwaysYellowButton)}
              size="medium"
              // variant="contained"
              color="primary"
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
              // className={s.buttonLabel}
              className={clsx(sShared.largeButton, sShared.greenButton)}
              size="small"
              // variant="contained"
              color="primary"
              rounded
              onClick={() => keycloak.login({ locale: router.locale })}
            >
              {t("logIn")}
            </Button>
          </div>*/}
          {/* 
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
          */}
          <div className={s.accordionDiv}>
            <Accordion className={s.accordion} elevation={0}>
              {/* AccordionSummary used for clicking with button through expandButtonRef. */}
              <AccordionSummary
                className={s.accordionSummary}
                style={{ display: "none" }}
                onClick={() => setToggleButton(!toggleButton)}
                ref={expandButtonRef}
              >
                {/*<div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
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
                        {t("readMoreOnly")}
                      </Button>
                    )}
                  </div>
                    </div>*/}
              </AccordionSummary>
              <AccordionDetails>
                <div className={s.detailsText}>
                  <div className={s.accordionDiv}>
                    <Accordion className={s.accordion} elevation={0}>
                      <AccordionSummary
                        className={s.accordionSummary}
                        onClick={() => setExpanded(!expanded)}
                      >
                        <div className={s.buttonDiv}>
                          {expanded ? (
                            <Button
                              className={s.button}
                              size="small"
                              onClick={() => setExpanded(!expanded)}
                              variant="outlined"
                              rounded
                              endIcon={<KeyboardArrowUpIcon />}
                              // Style for moving button down a bit.
                              style={{
                                position: "absolute",
                                top: "40px",
                                left: 0,
                              }}
                            >
                              {t("readLess")}
                            </Button>
                          ) : (
                            <Button
                              className={s.button}
                              size="small"
                              onClick={() => setExpanded(!expanded)}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              <img
                                src="/trustpilotvector.svg"
                                alt="Trustpilot logo"
                                style={{
                                  width: "60px",
                                  height: "auto",
                                  marginRight: "2px",
                                }}
                              />
                              <img
                                src="/trustpilot.svg"
                                alt="Trustpilot Stars"
                                style={{
                                  width: "100px",
                                  height: "auto",
                                  marginRight: "10px",
                                }}
                              />
                            </Button>
                          )}
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className={s.allReviews}>
                        {reviews.map((review, index) => (
                          <div key={index} className={s.reviewDiv}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src="/trustpilot.svg"
                                alt="Trustpilot Stars"
                                style={{
                                  width: "100px",
                                  height: "auto",
                                  marginRight: "10px",
                                }}
                              />
                              <Typography
                                variant="h6"
                                component="h2"
                                className={s.headingReview}
                              >
                                {review.title}
                              </Typography>
                            </div>
                            {expanded && (
                              <Typography className={s.accDescription}>
                                {review.fullReview}
                              </Typography>
                            )}
                          </div>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
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
                  <Typography variant="h5" component="h2" className={s.heading}>
                    {t("headline5")}
                  </Typography>
                  <Typography className={s.accDescription}>
                    {t("readDescription5")}
                  </Typography>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <div className={s.right}>
          {/*<div className={s.paintingContainer}>
            {!randomImage ? (
              <Skeleton variant="rect" width={120} height={120} />
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
          </div>*/}
          <div className={s.fullWidthImage}>
            <img
              src={
                isTinyDevice
                  ? "/images/not_logged_in.jpg"
                  : "/images/not_logged_in.jpg"
              }
              style={{
                objectPosition: isTinyDevice ? "50% 50%" : "50% 50%",
              }}
            />
            <div className={s.headlineContainer}>
              <Typography variant="h1" className={s.headline}>
                {t("nordensLargestArena")}{" "}
                <span>
                  <br />
                </span>
                {t("forArtistsAndArtLovers")}
              </Typography>
              <div className={s.desktopHeaderButtons}>
                <Button
                  className={clsx(
                    sShared.largeButton,
                    sShared.yellowButton,
                    sShared.noBorder
                  )}
                  style={{
                    minWidth: "200px",
                  }}
                  size="medium"
                  // variant="contained"
                  color="primary"
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
                {/*<Button
                  // className={s.buttonLabel}
                  className={clsx(sShared.hugeButton, sShared.greenButton, sShared.noBorder)}
                  size="small"
                  // variant="contained"
                  color="primary"
                  rounded
                  onClick={() => keycloak.login({ locale: router.locale })}
                >
                  {t("logIn")}
                </Button>*/}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className={s.readMoreButton}>
                <Button
                  size="small"
                  onClick={() => {
                    setToggleButton(!toggleButton);
                    expandAccordion();
                  }}
                  variant="outlined"
                  rounded
                  startIcon={
                    toggleButton ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )
                  }
                >
                  {toggleButton ? t("readLess") : t("readMoreOnly")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
<div style={{
        gridColumn: '1 / 4',
        height: '60vh',
        // display: 'flex',
        // flexFlow: 'column nowrap',
        }}>
          <img
            src={'/images/paintedhands.jpg'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 0%',
            }}
            />
        </div>
        <div style={{
          gridColumn: '2 / 3',
          textAlign: 'center',
        }}>
          <Typography
            variant="h1"
            style={{
              // color: 'white',
              fontWeight: '600',
            }}>
            {'Hitta originalkonst'}
          </Typography>
          <Typography
            variant="h4"
            style={{
              // fontWeight: 'normal',
            }}>
            {'Nordens största mötesplats för konstnärer och konstälskare'}
          </Typography>
        </div>
        */
