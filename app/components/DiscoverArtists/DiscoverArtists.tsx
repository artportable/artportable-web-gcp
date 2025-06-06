import React, { useEffect, useState } from "react";
import DiscoverArtistCard from "../DiscoverArtistCard/DiscoverArtistCard";
import { Box, Typography } from "@material-ui/core";
import { styles } from "./discoverArtists.css";
import DiscoverArtistSkeletonCard from "../DiscoverArtistSkeletonCard/DiscoverArtistSkeletonCard";
import axios from "axios";
import Artists from "../Artists/Artists";
import { useTranslation } from "next-i18next";
import ArtistsIndex from "../Artists/ArtistsIndex";

export default function DiscoverArtists({
  onFollowClick,
  loadMoreElementRef,
  isLoading,
  loadMore,
}) {
  const { t } = useTranslation(["discover"]);
  const s = styles();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  //const apiBaseUrlImages = process.env.NEXT_PUBLIC_BUCKET_URL;

  const [monthlyArtist, setMonthlyArtist] = useState(null);

  const getMonthlyArtists = async () => {
    const getData = await axios.get(
      `${apiBaseUrl}/api/discover/monthlyArtists`
    );
    setMonthlyArtist(getData.data);
  };

  useEffect(() => {
    getMonthlyArtists();
  }, []);

  return (
    <Box>
      <ArtistsIndex showAllFromStart={false} />
    </Box>
  );
}
