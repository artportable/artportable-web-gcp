import React, { useContext, useEffect, useState, Fragment } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Main from "../../app/components/Main/Main";
import { useGetArtwork } from "../../app/hooks/dataFetching/Artworks";
import {
  Badge,
  Box,
  IconButton,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { styles } from "../../styles/art.css";
import { capitalizeFirst } from "../../app/utils/util";
import Button from "../../app/components/Button/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import Link from "next/link";
import { TokenContext } from "../../app/contexts/token-context";
import { UserContext } from "../../app/contexts/user-context";
import { useRedirectToLoginIfNotLoggedIn } from "../../app/hooks/useRedirectToLoginIfNotLoggedIn";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../app/utils/googleAnalytics";
import { UrlObject } from "url";
import PurchaseRequestDialog from "../../app/components/PurchaseRequestDialog/PurchaseRequestDialog";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import usePostLike from "../../app/hooks/dataFetching/usePostLike";
import usePostFollow from "../../app/hooks/dataFetching/usePostFollow";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import { RWebShare } from "react-web-share";

import AboutCardArtwork from "../../app/components/AboutCardArtwork/AboutCardArtwork";
import { useGetUserProfileArtwork } from "../../app/hooks/dataFetching/UserProfile";
import Carousel from "react-material-ui-carousel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import TagChip from "../../app/components/TagChip/TagChip";
import usePromoteArtwork from "../../app/hooks/dataFetching/Artworks";
import { Membership } from "../../app/models/Membership";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

export default function ArtworkPage(props) {
  const s = styles();
  const { t } = useTranslation(["art", "common", "tags"]);
  const router = useRouter();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const staticArtwork = props.artwork;
  const navBarItems = props.navBarItems;
  const canonicalURL = publicUrl + router.asPath;

  const { id } = router.query;
  const { username, socialId, membership } = useContext(UserContext);
  const artwork = useGetArtwork(id as string, username.value);
  const token = useContext(TokenContext);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();

  const { like } = usePostLike();
  const { follow } = usePostFollow();

  const [isFollowed, setFollow] = useState(artwork?.data?.Owner?.FollowedByMe);
  const [isLiked, setIsLiked] = useState(artwork?.data?.LikedByMe);

  const { isSignedIn } = useContext(UserContext);
  const [artworkOwner, setArtworkOwner] = useState(
    artwork?.data?.Owner?.Username
  );

  const { promoteArtwork } = usePromoteArtwork();

  const [showPromoteDialog, setShowPromoteDialog] = useState(false);

  const togglePromoteDialog = () => {
    setShowPromoteDialog(!showPromoteDialog);
  };

  const handlePromote = async () => {
    if (!token) return;
    const result = await promoteArtwork(artwork?.data?.Id, token, true);
  };

  const userProfile = useGetUserProfileArtwork(artworkOwner);

  useEffect(() => {
    setArtworkOwner(
      (prevUsername) => artwork?.data?.Owner?.Username || prevUsername
    );
  }, [artwork, username.value]);

  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] =
    useState(false);

  useEffect(() => {
    setFollow(artwork?.data?.Owner?.FollowedByMe);
  }, [artwork?.data?.Owner?.FollowedByMe]);

  useEffect(() => {
    setIsLiked(artwork?.data?.LikedByMe);
  }, [artwork?.data]);

  function togglePurchaseRequestDialog() {
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen);
  }

  function purchaseRequest(originalRedirect?: UrlObject | string) {
    togglePurchaseRequestDialog();
  }

  function toggleFollow() {
    redirectIfNotLoggedIn();
    follow(artwork.data.Owner.SocialId, !isFollowed, socialId.value, token);
    setFollow(!isFollowed);
  }

  function likeArtwork(isLike) {
    redirectIfNotLoggedIn();
    like(artwork.data.Id, isLike, socialId.value, token);
  }

  function toggleLike(event) {
    event.stopPropagation();
    likeArtwork(!isLiked);
    setIsLiked(!isLiked);
    !isLiked ? artwork.data.Likes++ : artwork.data.Likes--;
    !isLiked
      ? trackGoogleAnalytics(ActionType.LIKE_ARTWORK, CategoryType.INTERACTIVE)
      : null;
  }

  const likedFilled = !isSignedIn.value ? (
    <FavoriteBorderOutlinedIcon color="primary" />
  ) : isLiked ? (
    <FavoriteIcon color="primary" />
  ) : (
    <FavoriteBorderOutlinedIcon color="primary" />
  );

  const artworkUrl = `https://artportable.com/art/${artwork?.data?.Id}`;
  const shareArtworkTitle = artwork?.data?.Title
    ? `${t("common:share")}"${artwork?.data?.Title}"`
    : `${t("common:share")}`;
  const shareArtworkText = `${t("common:checkThisArtwork")}"${
    artwork?.data?.Title
  }"${t("common:atArtportable")}`;

  const images: (string | undefined)[] = [
    artwork?.data?.PrimaryFile?.Name,
    artwork?.data?.SecondaryFile?.Name,
    artwork?.data?.TertiaryFile?.Name,
  ];

  const filteredImages: string[] = images.filter(
    (image) => image !== undefined
  ) as string[];

  function renderWithLineBreaks(text) {
    if (!text) {
      return null;
    }

    return text.split("\n").map((str, index, array) => (
      <Fragment key={index}>
        {str}
        {index === array.length - 1 ? null : <br />}
      </Fragment>
    ));
  }

  return (
    <Main wide navBarItems={navBarItems}>
      <Head>
        <title>{staticArtwork?.Title ?? "Artportable"}</title>
        <meta
          name="title"
          content={
            staticArtwork?.Owner?.Name + " " + staticArtwork?.Owner?.Surname ??
            "Artportable"
          }
        />
        <meta name="description" content={staticArtwork?.Title ?? ""} />
        <meta
          property="og:title"
          content={
            staticArtwork?.Owner?.Name + " " + staticArtwork?.Owner?.Surname ??
            "Artportable"
          }
        />
        <meta property="og:description" content={staticArtwork?.Title ?? ""} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${publicUrl}/art/${staticArtwork?.Id}`}
        />
        <meta
          property="og:image"
          content={`${bucketUrl}${staticArtwork?.PrimaryFile?.Name}`}
        />

        <link rel="canonical" href={canonicalURL} />
      </Head>

      {artwork && artwork.data && (
        <>
          <div>
            <Paper
              style={{
                backgroundColor: "transparent",
              }}
            >
              <div className={s.artworkWrapper}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Dialog
                    open={showPromoteDialog}
                    onClose={togglePromoteDialog}
                  >
                    <DialogTitle>Confirm Promotion</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Är du säker på att du vill skicka verket till hus&hem? "
                        {artwork?.data?.Title}"?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={togglePromoteDialog}>Cancel</Button>
                      <Button
                        onClick={() => {
                          handlePromote();
                          togglePromoteDialog();
                        }}
                        color="primary"
                        autoFocus
                      >
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <div className={s.imageContainer}>
                    {artwork?.data?.SecondaryFile ? (
                      <div>
                        <Carousel autoPlay={false}>
                          {filteredImages.map((image, i) => {
                            return (
                              <img
                                key={i}
                                className={s.primaryImage}
                                src={`${bucketUrl}${image}`}
                                alt={`${
                                  artwork?.data?.Title
                                    ? artwork?.data?.Title
                                    : "artwork image"
                                }`}
                              />
                            );
                          })}
                        </Carousel>
                      </div>
                    ) : (
                      <img
                        className={s.primaryImage}
                        src={`${bucketUrl}${artwork?.data?.PrimaryFile.Name}`}
                        alt={`${
                          artwork?.data?.Title
                            ? artwork?.data?.Title
                            : "artwork image"
                        }`}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div>
                      <IconButton onClick={() => router.back()}>
                        <ArrowBackIcon />
                      </IconButton>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      {artwork.data.Width > 0 && artwork.data.Height > 0 && (
                        <div>
                          <a href={`/tool/${artwork.data.Id}`}>
                            <Button style={{ fontWeight: "400" }}>
                              {t("room")}
                            </Button>
                          </a>
                        </div>
                      )}
                      <div>
                        <RWebShare
                          data={{
                            text: shareArtworkText,
                            url: artworkUrl,
                            title: shareArtworkTitle,
                          }}
                          onClick={() =>
                            trackGoogleAnalytics(ActionType.SHARE_ARTWORK)
                          }
                        >
                          <Button style={{ fontWeight: "400" }}>
                            {t("art:share")}
                          </Button>
                        </RWebShare>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <div>
                          <IconButton
                            className={s.likeButton}
                            disableRipple
                            disableFocusRipple
                            onClick={toggleLike}
                            aria-label="like button"
                          >
                            {likedFilled}
                          </IconButton>
                        </div>
                        <div className={s.likeCounter}>
                          {artwork.data.Likes > 0 && (
                            <div>{artwork.data.Likes}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INFO HERE */}

                <div className={s.artworkInfoWrapper}>
                  <div className={s.artInfo}>
                    {membership.value > 4 && (
                      <div style={{ margin: "20px" }}>
                        <Button
                          onClick={togglePromoteDialog}
                          variant="contained"
                          color="secondary"
                        >
                          Hus&Hem
                        </Button>
                      </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        href={`/profile/@${artwork?.data?.Owner?.Username}`}
                      >
                        <a>
                          <div className={s.text}>
                            <span className={s.username}>
                              {`${artwork?.data?.Owner?.Name.toUpperCase()} ${artwork?.data?.Owner?.Surname.toUpperCase()}`}
                            </span>
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div>
                      <Typography className={s.text}>
                        {artwork?.data?.Title && (
                          <span className={s.title}>
                            {artwork?.data?.Title}
                          </span>
                        )}
                      </Typography>
                    </div>
                    <div className={s.text}>
                      <div className={s.sizes}>
                        {artwork.data.MultipleSizes
                          ? `${t("art:size")}:  (` +
                            t("common:words.multipleSizes").toLowerCase() +
                            ")"
                          : artwork.data.Width &&
                            artwork.data.Height &&
                            artwork.data.Depth
                          ? `${t("art:size")}:  (` +
                            artwork.data.Width +
                            "x" +
                            artwork.data.Height +
                            "x" +
                            artwork.data.Depth +
                            "cm)"
                          : artwork?.data?.Width && artwork?.data?.Height
                          ? `${t("art:size")}:  (` +
                            artwork.data.Width +
                            "x" +
                            artwork.data.Height +
                            "cm)"
                          : null}
                      </div>
                    </div>

                    <div className={s.priceContainer}>
                      {artwork.data.SoldOut ? (
                        <>{t("common:words.sold")} </>
                      ) : artwork.data.Price && artwork.data.Price != "0" ? (
                        <span>
                          {t("art:artworkPrice")}:{" " + artwork.data.Price}{" "}
                          {artwork.data.Currency !== null
                            ? artwork.data.Currency
                            : "SEK"}{" "}
                        </span>
                      ) : (
                        <span>{t("priceOnRequest")}</span>
                      )}
                    </div>
                    <div>
                      <div>
                        {username.value !== artwork.data.Owner.Username &&
                          !artwork.data.SoldOut && (
                            <Box>
                              <Button
                                className={s.purchaseRequestButton}
                                variant="contained"
                                rounded
                                disableElevation
                                onClick={() => {
                                  purchaseRequest({
                                    pathname: "/messages",
                                    query: {
                                      artwork: encodeURIComponent(
                                        JSON.stringify({
                                          title: artwork.data.Title,
                                          creator: artwork.data.Owner.Username,
                                          url: window.location.href,
                                        })
                                      ),
                                      referTo: artwork.data.Owner.SocialId,
                                    },
                                  });
                                  trackGoogleAnalytics(
                                    ActionType.PURCHASE_REQUEST_ARTWORK,
                                    CategoryType.BUY
                                  );
                                }}
                                endIcon={<SendIcon color={"inherit"} />}
                              >
                                {capitalizeFirst(t("common:purchaseRequest"))}
                              </Button>

                              <PurchaseRequestDialog
                                open={purchaseRequestDialogOpen}
                                onClose={togglePurchaseRequestDialog}
                                props={{
                                  pathname: "/messages",
                                  title: artwork.data.Title,
                                  creator: artwork.data.Owner.Username,
                                  url: window.location.href,
                                  referTo: artwork.data.Owner.SocialId,
                                  imageUrl:
                                    bucketUrl + artwork.data.PrimaryFile.Name,
                                }}
                              />
                            </Box>
                          )}
                      </div>
                    </div>
                    <Box className={s.tagsContainer}>
                      {Array.from(artwork?.data?.Tags).map((tag: string) => {
                        return (
                          <TagChip
                            key={tag}
                            title={tag}
                            onChipClick={null}
                            limitReached={true}
                            variant="outlined"
                            isSmall={true}
                          />
                        );
                      })}
                    </Box>
                    {artwork?.data?.Description && (
                      <div className={s.accordionDiv}>
                        <Accordion elevation={0} className={s.infoAccordion}>
                          <AccordionSummary
                            className={s.accordionSummary}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{t("art:moreInfo")}</Typography>
                          </AccordionSummary>

                          <AccordionDetails className={s.accordionDetails}>
                            <Typography className={s.typography}>
                              {artwork?.data?.Description}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
            <div>
              <div className={s.tabPanel}>
                <div style={{ backgroundColor: "transparent" }}>
                  <div>
                    <Paper
                      style={{
                        background: "transparent",
                        margin: "0px",
                      }}
                    >
                      <div className={s.artistSection}>
                        <div className={s.left}>
                          <div
                            style={{
                              padding: "0px",
                              background: "transparent",
                              margin: "10px",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Link
                                  href={`/profile/@${artwork?.data?.Owner?.Username}`}
                                >
                                  <a>
                                    <div className={s.fullnameArtist}>
                                      <div>
                                        {userProfile?.data?.ProfilePicture && (
                                          <img
                                            alt="profile picture"
                                            className={s.imgClass}
                                            src={`${bucketUrl}${userProfile?.data?.ProfilePicture}`}
                                          ></img>
                                        )}
                                      </div>
                                      <div className={s.nameSurname}>
                                        {userProfile?.data?.Name?.toUpperCase()}{" "}
                                        {""}
                                        {userProfile?.data?.Surname?.toUpperCase()}
                                        {userProfile?.data?.Country &&
                                          userProfile?.data?.City && (
                                            <div style={{ fontSize: "10px" }}>
                                              {userProfile?.data?.Country}
                                              {", "}
                                              {userProfile?.data?.City}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <div
                              style={{ marginTop: "20px", fontStyle: "italic" }}
                            >
                              {renderWithLineBreaks(userProfile?.data?.About)}
                              <Divider style={{ marginTop: "20px" }}></Divider>
                            </div>
                          </div>
                        </div>
                        <div className={s.right}>
                          <AboutCardArtwork
                            data={artwork?.data}
                          ></AboutCardArtwork>
                        </div>
                      </div>
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Main>
  );
}

export async function getServerSideProps({ locale, params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = new URL(
    `${apiBaseUrl}/api/artworks/${encodeURIComponent(params.id)}`
  );
  const navBarItems = await getNavBarItems();

  try {
    const artworkResponse = await fetch(url.href, {});
    const artwork = await artworkResponse.json();

    return {
      props: {
        // fetch timeout
        navBarItems: navBarItems,
        artwork,
        locale: locale,
        ...(await serverSideTranslations(locale, [
          "header",
          "footer",
          "art",
          "common",
          "tags",
          "support",
          "plans",
        ])),
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      // fetch timeout
      navBarItems: navBarItems,
      artwork: { Id: params.id },
      locale: locale,
      ...(await serverSideTranslations(locale, [
        "header",
        "footer",
        "art",
        "common",
        "tags",
        "support",
        "plans",
      ])),
    },
  };
}
