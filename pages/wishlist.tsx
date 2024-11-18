import Main from "../app/components/Main/Main";
import ZendeskForm from "../app/components/ZendeskFormMenu/ZendeskFormMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/wishlist.css";
import { Box, Paper, Typography } from "@material-ui/core";
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
import Button from "../app/components/Button/Button";
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
  const { locale } = useRouter();
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

  function togglePurchaseRequestDialog() {
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen);
  }

  function purchaseRequest(artwork) {
    setSelectedArtwork(artwork);
    setPurchaseRequestDialogOpen(true);
  }
  useEffect(() => {
    console.log(favoriteArtworks);
  }, [favoriteArtworks]);
  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      try {
        const artworks = await Promise.all(
          favoriteIds.map(async (artworkId) => {
            const response = await fetch(
              `${apiBaseUrl}/api/Artworks/${artworkId}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch artwork with ID ${artworkId}`);
            }
            const data = await response.json();
            return data;
          })
        );
        setFavoriteArtworks(artworks);
        setError(null);
      } catch (err) {
        console.error("Error fetching artworks:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (favoriteIds && favoriteIds.length > 0) {
      fetchArtworks();
    } else {
      setFavoriteArtworks([]);
      setLoading(false);
    }
  }, [favoriteIds]);

  return (
    <Main fullWidth={true} noHeaderPadding navBarItems={navBarItems}>
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
        <header className={s.header}>
          <div className={s.titleText}>
            <h2 className={s.favoriteTitle}>{t("art:favoriteTitle")}</h2>
            <h4 className={s.favoriteText}>{t("art:favoritesText")}</h4>
          </div>
        </header>
        <article className={s.artworksContainer}>
          {loading ? (
            <></>
          ) : error ? (
            <p>Error loading artworks.</p>
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
                        quality={30}
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
                          {" " + artwork?.Price}{" "}
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
                              rounded
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
              </div>
            ))
          ) : (
            <p>No favorites to display.</p>
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
