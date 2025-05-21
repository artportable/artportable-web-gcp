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
      setError(null);
      try {
        if (!Array.isArray(id) || id.length === 0) {
          setFavoriteArtworks([]);
          return;
        }

        const validIds = id.slice(0, 5).filter(artworkId => 
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(artworkId)
        );

        if (validIds.length === 0) {
          setFavoriteArtworks([]);
          return;
        }

        const artworks = await Promise.all(
          validIds.map(async (artworkId) => {
            const response = await fetch(
              `${apiBaseUrl}/api/Artworks/${artworkId}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch artwork with ID ${artworkId}: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
          })
        );
        
        const validArtworks = artworks.filter(artwork => artwork != null);
        setFavoriteArtworks(validArtworks);
      } catch (err) {
        console.error("Error fetching artworks:", err);
        setError(err.message || "Failed to load artworks");
      } finally {
        setLoading(false);
      }
    }

    fetchArtworks();
  }, [id, apiBaseUrl]);

  return (
    <>
      <section className={s.container}>
        <div className={s.title}>
          {t("header:myFavorites")}
        </div>
        <div>
          {loading ? (
            <p className={s.loadingText}>Loading...</p>
          ) : error ? (
            <p className={s.errorText}>{error}</p>
          ) : favoriteArtworks.length > 0 ? (
            favoriteArtworks.map((artwork, i) => (
              <div key={artwork.Id}>
                <section className={s.artworkSection}>
                  <Image
                    width={100}
                    height={80}
                    src={`${bucketBaseUrl}${artwork?.PrimaryFile.Name}`}
                    alt={artwork?.Title || "Favorite Artwork"}
                    className={s.artworkImage}
                    quality={10}
                  />
                  <a
                    className={s.link}
                    href={`${publicUrl}/art/${artwork?.Id}`}
                  >
                    <div>
                      <p className={s.artworkTitle}>
                        {artwork.Title}
                      </p>
                      <p className={s.artworkDimensions}>
                        {artwork.MultipleSizes
                          ? t("common:words.multipleSizes").toLowerCase()
                          : artwork.Width && artwork.Height && artwork.Depth
                          ? `${artwork.Width}x${artwork.Height}x${artwork.Depth}cm`
                          : artwork?.Width && artwork?.Height
                          ? `${artwork.Width}x${artwork.Height}cm`
                          : null}
                      </p>
                    </div>
                    <div>
                      <KeyboardArrowRightIcon />
                    </div>
                  </a>
                </section>
              </div>
            ))
          ) : (
            <p className={s.noFavoritesText}>{t("header:noFavorites")}</p>
          )}
          {id && id.length > 4 && (
            <div className={s.viewAllContainer}>
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
