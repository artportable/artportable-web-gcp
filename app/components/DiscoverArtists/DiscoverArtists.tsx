import React, { useEffect, useState } from "react";
import DiscoverArtistCard from "../DiscoverArtistCard/DiscoverArtistCard";
import { Box, Typography } from "@material-ui/core";
import { styles } from "./discoverArtists.css";
import DiscoverArtistSkeletonCard from "../DiscoverArtistSkeletonCard/DiscoverArtistSkeletonCard";
import axios from "axios";
import Artists from "../Artists/Artists";
import { useTranslation } from "next-i18next";

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
      <Artists />
      <div className={s.titleEmblem}>
        <Typography className={s.title}>
          {t("discover:monthlyArtist")}
        </Typography>
      </div>
      <div className={s.discoverArtistWrapper}>
        {monthlyArtist &&
          monthlyArtist?.map((artist, index) => (
            <div>
              <DiscoverArtistCard
                key={index}
                artist={artist}
                onFollowClick={onFollowClick}
              />
            </div>
          ))}
      </div>
      {isLoading && loadMore && (
        <div ref={loadMoreElementRef}>
          <DiscoverArtistSkeletonCard />
        </div>
      )}
    </Box>
  );
}
