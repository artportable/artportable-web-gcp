import React, { useEffect, useState } from "react";
import DiscoverArtistCard from "../DiscoverArtistCard/DiscoverArtistCard";
import { Box, Typography } from "@material-ui/core";
import { styles } from "./discoverChosenArtist.css";
import DiscoverArtistSkeletonCard from "../DiscoverArtistSkeletonCard/DiscoverArtistSkeletonCard";
import axios from "axios";
import Artists from "../Artists/Artists";
import { useTranslation } from "next-i18next";

export default function DiscoverChosenArtists({}) {
  const { t } = useTranslation(["discover"]);
  const s = styles();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiBucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const [monthlyArtist, setMonthlyArtist] = useState([]);

  const getMonthlyArtists = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/discover/monthlyArtists?page=1&pageSize=100`
      );

      setMonthlyArtist(response.data);
    } catch (error) {
      console.error("Error fetching monthly artists:", error);
    }
  };

  useEffect(() => {
    getMonthlyArtists();
  }, []);

  return (
    <div className={s.container}>
      {monthlyArtist?.map((monthly) => (
        <div key={monthly?.Owner?.SocialId}>
          {/* {monthly?.Username} */}
          <div className={s.items}>
            <a href={`/profile/@${monthly?.Username}`}>
              <div className={s.frame}>
                <img
                  className={s.image}
                  src={`${apiBucketUrl}${monthly?.ProfilePicture}`}
                  alt="arist image"
                />
              </div>
            </a>
            <div className={s.artist}>
              <a href={`/profile/@${monthly?.Username}`}>
                {monthly?.Name} {monthly?.Surname}
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
