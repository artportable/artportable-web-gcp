import { Link } from "@material-ui/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { styles } from "./favoritesPopper.css";

export default function FavoritesPopper({ id }) {
  const s = styles();
  const { t } = useTranslation([
    "art",
    "common",
    "tags",
    "forms",
    "upload",
    "header",
  ]);
  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketBaseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      try {
        const artworks = await Promise.all(
          id.slice(0, 5).map(async (artworkId) => {
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

    if (id && id.length > 0) {
      fetchArtworks();
    } else {
      setFavoriteArtworks([]);
      setLoading(false);
    }
  }, [id]);

  return (
    <>
      <section className={s.container}>
        <div
          style={{
            textAlign: "center",
            fontSize: "16px",
            marginBottom: "10px",
            marginTop: "10px",
            fontWeight: "normal",
          }}
        >
          {t("header:myFavorites")}
        </div>
        <div>
          {loading ? (
            <></>
          ) : error ? (
            <p>Error loading artworks.</p>
          ) : favoriteArtworks.length > 0 ? (
            favoriteArtworks.map((artwork, i) => (
              <div>
                <section
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "10px",
                    borderBottom:
                      i < favoriteArtworks.length - 1
                        ? "1px solid #ccc"
                        : "none",
                    paddingBottom: "10px",
                  }}
                >
                  <Image
                    width={100}
                    height={80}
                    src={`${bucketBaseUrl}${artwork?.PrimaryFile.Name}`}
                    alt="favorite Artwork"
                    style={{ marginBottom: "20px" }}
                  />
                  <a
                    className={s.link}
                    href={`${publicUrl}/art/${artwork?.Id}`}
                  >
                    <div key={artwork.Id}>
                      <p
                        style={{
                          fontSize: "13px",
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
                          fontSize: "12px",
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
          {id.length > 4 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link href="/wishlist" className={s.buttonViewMore}>
                <a>{t("header:viewAll")}</a>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
