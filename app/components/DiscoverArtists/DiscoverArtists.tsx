import React, { useEffect, useState } from "react";
import DiscoverArtistCard from "../DiscoverArtistCard/DiscoverArtistCard";
import { Box } from "@material-ui/core";
import { styles } from "./discoverArtists.css";
import DiscoverArtistSkeletonCard from "../DiscoverArtistSkeletonCard/DiscoverArtistSkeletonCard";
import SearchField from "../SearchField/SearchField";
import axios from "axios";
import Artists from "../Artists/Artists";

export default function DiscoverArtists({
  artists,
  onFilter,
  onFollowClick,
  loadMoreElementRef,
  isLoading,
  loadMore,
  tagPlaceholder,
}) {
  const s = styles();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiBaseUrlImages = process.env.NEXT_PUBLIC_BUCKET_URL;

  const [monthlyArtist, setMonthlyArtist] = useState(null);


  const getMonthlyArtists = async () => {
    const getData = await axios.get(`${apiBaseUrl}/api/discover/monthlyArtists`);
    setMonthlyArtist(getData.data);

  }

  useEffect(() => {
    getMonthlyArtists();
  }, []);

  useEffect(() => {
  }, [monthlyArtist]);

  return (
    <Box>
      <Artists />
      <div style={{ marginBottom: "40px", marginTop: "40px", fontSize: "30px", fontWeight: "bold", display:'flex', flexWrap:'wrap', alignItems:'center' }}>MÅNADENS KONSTNÄR
      <img
      src="/Artportable_Emblem_Gold.svg"
      alt="Logo Artportable"
      className={s.emblem} />
      </div>
      <div className={s.discoverArtistWrapper}>
        {monthlyArtist &&
          monthlyArtist?.map((artist, index) => (
            <div style={{ width: '' }}>
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