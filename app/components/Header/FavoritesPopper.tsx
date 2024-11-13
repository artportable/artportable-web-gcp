import { Link } from "@material-ui/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function FavoritesPopper({ id }) {
  const { t } = useTranslation(["art", "common", "tags", "forms", "upload"]);
  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketBaseUrl =
    "https://artportabletest-cdn.azureedge.net/artportable-test/images/";

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      try {
        const artworks = await Promise.all(
          id.slice(0, 3).map(async (artworkId) => {
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
      <section>
        <h4>Mina favoriter </h4>
        <div>
          {loading ? (
            <p>...</p>
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
                  }}
                >
                  <img
                    width={50}
                    height={50}
                    src={`${bucketBaseUrl}${artwork?.PrimaryFile.Name}`}
                    alt="k"
                  />
                  <a href={`${publicUrl}/art/${artwork?.Id}`}>
                    <div key={artwork.Id}>
                      <p
                        style={{
                          fontSize: "16px",
                          marginLeft: "10px",
                          marginBottom: "0px",
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
        </div>
      </section>
    </>
  );
}
