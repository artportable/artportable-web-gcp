import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { useGetTrendingArtworks } from "../../hooks/dataFetching/Artworks";
import TrendingArtworks from "./TrendingArtworks";

export default function TrendingArtworksCard() {
  const { data, isLoading, isError } = useGetTrendingArtworks();
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomArtwork = data[randomIndex];

      if (!trendingData.some((artwork) => artwork.id === randomArtwork.id)) {
        setTrendingData([randomArtwork]);
      }
    }
  }, [data, isLoading, isError, trendingData]);

  return (
    <>
      {trendingData.map((artwork, index) => (
        <Card key={index}>
          <TrendingArtworks artwork={artwork} />
        </Card>
      ))}
    </>
  );
}
