import Main from "../app/components/Main/Main";
import ZendeskForm from "../app/components/ZendeskFormMenu/ZendeskFormMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/wishlist.css";
import { Box, Paper, Typography, Button } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../app/contexts/FavoritesContext";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../app/contexts/user-context";
import { useGetArtwork } from "../app/hooks/dataFetching/Artworks";
import SendIcon from "@material-ui/icons/Send";
import PurchaseRequestDialog from "../app/components/PurchaseRequestDialog/PurchaseRequestDialog";
import { capitalizeFirst } from "../app/utils/util";
import { UrlObject } from "url";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../app/utils/googleAnalytics";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LikeArtworkButton from "../app/components/Button/LikeArtworkButton";
import { useGetUserProfileArtwork } from "../app/hooks/dataFetching/UserProfile";
import Link from "next/link";
import Image from "next/image";
import BannerText from "../app/components/BannerText/BannerText";
import Divider from "@mui/material/Divider";

export default function Wishlist({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation([
    "wishlist",
    "common",
    "header",
    "footer",
    "support",
    "plans",
    "art",
    "forms",
  ]);
  const router = useRouter();
  const { locale } = router;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketBaseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const { favoriteIds } = useContext(FavoritesContext);
  const { username } = useContext(UserContext);

  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] =
    useState(false);

  async function fetchArtworks() {
    setLoading(true);
    try {
      const artworks = await Promise.all(
        [...favoriteIds].reverse().map(async (artworkId) => {
          try {
            const response = await fetch(
              `${apiBaseUrl}/api/Artworks/${artworkId}`
            );
            if (!response.ok) {
              console.warn(`Failed to fetch artwork with ID ${artworkId}: ${response.status}`);
              return null;
            }
            const data = await response.json();
            return data;
          } catch (err) {
            console.warn(`Error fetching artwork with ID ${artworkId}:`, err);
            return null;
          }
        })
      );
      // Filter out any null values from failed fetches
      const validArtworks = artworks.filter(artwork => artwork !== null);
      setFavoriteArtworks(validArtworks);
      
      // Only set error if all artworks failed to load
      if (validArtworks.length === 0 && favoriteIds.length > 0) {
        setError(new Error("Failed to load any artworks"));
      } else {
        setError(null);
      }
    } catch (err) {
      console.error("Error in fetchArtworks:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (favoriteIds && favoriteIds.length > 0) {
      fetchArtworks();
    } else {
      setFavoriteArtworks([]);
      setLoading(false);
      setError(null);
    }
  }, [favoriteIds]);

  function togglePurchaseRequestDialog() {
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen);
  }

  function purchaseRequest(artwork) {
    setSelectedArtwork(artwork);
    setPurchaseRequestDialogOpen(true);
  }

  return (
    <Main fullWidth={true}  navBarItems={navBarItems}>
      <Head>
        <meta name="title" content={t("wishlist:wishlist")} />
        <meta name="description" content={t("wishlist:favoriteArtworks")} />
        <meta property="og:title" content={t("wishlist:wishlist")} />
        <meta
          property="og:description"
          content={t("wishlist:favoriteArtworks")}
        />
        <meta property="og:url" content="https://artportable.com/wishlist" />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />
        <link rel="canonical" href={`${publicUrl}/${locale}/support`} />
      </Head>
      <section className={s.container}>
     
        <BannerText
            title={t("art:favoriteTitle")}
            text={t("art:favoritesText")}
          ></BannerText>
        <article className={s.artworksContainer}>
          {loading ? (
            <></>
          ) : error ? (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '2rem' 
            }}>
              <Typography variant="body1" color="error">
                {t("common:errors.loadingArtworks")}
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  if (favoriteIds && favoriteIds.length > 0) {
                    fetchArtworks();
                  }
                }}
              >
                {t("common:actions.tryAgain")}
              </Button>
            </div>
          ) : favoriteArtworks.length > 0 ? (
            favoriteArtworks.map((artwork) => (
              <div>
                <section className={s.sectionWrapper}>
                  <div className={s.sectionOne}>
                    <a href={`${publicUrl}/art/${artwork?.Id}`}>
                      <Image
                        width={250}
                        height={200}
                        src={`${bucketBaseUrl}${artwork?.PrimaryFile.Name}`}
                        alt="favorite Artwork"
                        quality={10}
                      />
                    </a>
                    <div className={s.link}>
                      <div key={artwork.Id} className={s.sectionTwo}>
                        <div className={s.sectionTwoDiv}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <a
                              href={`${publicUrl}/art/${artwork?.Id}`}
                              className={s.linkTitle}
                            >
                              {" "}
                              {artwork.Title}
                            </a>
                            <div className={s.bookmarkIconTop}>
                              <LikeArtworkButton
                                artwork={{
                                  Id: artwork.Id,
                                  LikedByMe: false,
                                  Likes: 0,
                                }}
                              />
                            </div>
                          </div>
                          <p className={s.price}>
                            {" "}
                            {artwork.MultipleSizes
                              ? `` +
                                t("common:words.multipleSizes").toLowerCase() +
                                ""
                              : artwork.Width && artwork.Height && artwork.Depth
                              ? `` +
                                artwork.Width +
                                "x" +
                                artwork.Height +
                                "x" +
                                artwork.Depth +
                                "cm"
                              : artwork?.Width && artwork?.Height
                              ? `` + artwork.Width + "x" + artwork.Height + "cm"
                              : null}
                          </p>
                        </div>
                        <div className={s.sectionTwoDivTwo}>
                          <Link href={`/profile/@${artwork?.Owner?.Username}`}>
                            <a>
                              <div className={s.fullnameArtist}>
                                <div>
                                  {artwork?.Owner?.ProfilePicture && (
                                    <img
                                      alt="profile picture"
                                      className={s.imgClass}
                                      src={`${bucketBaseUrl}${artwork?.Owner?.ProfilePicture}`}
                                    ></img>
                                  )}
                                </div>
                                <div className={s.artistInfo}>
                                  <div>
                                    {artwork?.Owner?.Name?.toUpperCase()} {""}
                                    {artwork?.Owner?.Surname?.toUpperCase()}
                                  </div>
                                  <div
                                    style={{ color: "gray", fontSize: "10px" }}
                                  >
                                    {artwork?.Owner?.Title}
                                    {artwork?.Owner?.Location?.toUpperCase()}
                                  </div>
                                </div>
                              </div>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={s.sectionThree}>
                    <div className={s.priceContainer}>
                      {artwork?.SoldOut ? (
                        <>{t("common:words.sold")} </>
                      ) : artwork?.Price && artwork?.Price != "0" ? (
                        <span>
                          {Number(artwork?.Price).toLocaleString()}{" "}
                          {artwork?.Currency !== null
                            ? artwork?.Currency
                            : "SEK"}{" "}
                        </span>
                      ) : (
                        <span>{t("art:priceOnRequest")}</span>
                      )}
                    </div>

                    <div>
                      {username.value !== artwork?.Owner?.Username &&
                        !artwork.SoldOut && (
                          <Box>
                            <Button
                              className={s.purchaseRequestButton}
                              variant="contained"
                              disableElevation
                              onClick={() => {
                                purchaseRequest(artwork);
                                trackGoogleAnalytics(
                                  ActionType.PURCHASE_REQUEST_ARTWORK,
                                  CategoryType.BUY
                                );
                              }}
                              endIcon={<SendIcon color={"inherit"} />}
                            >
                              {capitalizeFirst(t("common:purchaseRequest"))}
                            </Button>
                          </Box>
                        )}
                    </div>
                    <div className={s.bookmarkIcon}>
                      <LikeArtworkButton
                        artwork={{
                          Id: artwork.Id,
                          LikedByMe: false,
                          Likes: 0,
                        }}
                      />
                    </div>
                  </div>
                </section>
                <div className={s.border} />
                <Divider></Divider>
              </div>
            ))
          ) : (
            <div className={s.emptyStateContainer}>
              <Typography variant="h6" className={s.emptyStateText}>
                {t("art:favoritesText")}
              </Typography>
              <Link href="/discover">
                <Button
                  variant="contained"
                  className={s.purchaseRequestButton}
                >
                  {t("header:findArt")}
                </Button>
              </Link>
            </div>
          )}

          {selectedArtwork && (
            <PurchaseRequestDialog
              open={purchaseRequestDialogOpen}
              onClose={() => setPurchaseRequestDialogOpen(false)}
              props={{  
                pathname: "/messages",
                title: selectedArtwork.Title,
                creator: selectedArtwork.Owner.Username,
                url: window.location.href,
                referTo: selectedArtwork.Owner.SocialId,
                imageUrl: bucketBaseUrl + selectedArtwork.PrimaryFile.Name,
              }}
            />
          )}
        </article>
      </section>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "header",
        "support",
        "footer",
        "support",
        "common",
        "plans",
        "art",
        "forms",
      ])),
    },
    revalidate: 60,
  };
}
