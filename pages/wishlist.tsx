import Main from "../app/components/Main/Main";
import ZendeskForm from "../app/components/ZendeskFormMenu/ZendeskFormMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/wishlist.css";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../app/contexts/FavoritesContext";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { faSmile } from "@fortawesome/free-solid-svg-icons";

export default function Wishlist({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["wishlist"]);
  const { locale } = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketBaseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const { favoriteIds } = useContext(FavoritesContext);

  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <meta name="title" content={t("contactUs")} />
        <meta name="description" content={t("yourWelcome")} />
        <meta property="og:title" content={t("contactUs")} />
        <meta property="og:description" content={t("yourWelcome")} />
        <meta property="og:url" content="https://artportable.com/wishlist" />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />
        <link rel="canonical" href={`${publicUrl}/${locale}/support`} />
      </Head>
      <section className={s.container}>
        <header className={s.header}>
          <h2 className={s.favoriteTitle}>My Favorites</h2>
          <h4 className={s.favoriteText}>
            Your Favorites are only temporarily saved. To keep them saved,
            create an account
          </h4>
        </header>
        <article className={s.artworksContainer}>
          {loading ? (
            <></>
          ) : error ? (
            <p>Error loading artworks.</p>
          ) : favoriteArtworks.length > 0 ? (
            favoriteArtworks.map((artwork) => (
              <div>
                <section
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <img
                    width={100}
                    height={100}
                    src={`${bucketBaseUrl}${artwork?.PrimaryFile.Name}`}
                    alt="favorite Artwork"
                  />
                  <a
                    className={s.link}
                    href={`${publicUrl}/art/${artwork?.Id}`}
                  >
                    <div key={artwork.Id}>
                      <p
                        style={{
                          fontSize: "26px",
                          marginLeft: "10px",
                          marginBottom: "0px",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {artwork.Title}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          marginLeft: "10px",
                          paddingTop: "0px",
                          marginTop: "0px",
                        }}
                      >
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
                    <div>
                      <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                    </div>
                  </a>
                </section>
              </div>
            ))
          ) : (
            <p>No favorites to display.</p>
          )}
          {/* {id.length > 3 && (
            <Link href="/favorites">
              <a>View All</a>
            </Link>
          )} */}
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
      ])),
    },
    revalidate: 60,
  };
}
