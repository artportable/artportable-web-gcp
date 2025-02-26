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
      console.log("API Response:", response.data); // Check structure
      setMonthlyArtist(response.data);
    } catch (error) {
      console.error("Error fetching monthly artists:", error);
    }
  };

  useEffect(() => {
    getMonthlyArtists();
  }, []);

  useEffect(() => {
    console.log(monthlyArtist);
  }, [monthlyArtist]);

  function clsx(bottomDiv: string, staffDiv: string): string {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      style={{
        width: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {monthlyArtist?.map((monthly) => (
        <div key={monthly?.Owner?.SocialId}>
          {/* {monthly?.Username} */}
          <div style={{ width: "250px", height: "250px", margin: "20px" }}>
            <a href={`/profile/@${monthly?.Username}`}>
              <div className={s.frame}>
                <img
                  className={s.image}
                  src={`${apiBucketUrl}${monthly?.ProfilePicture}`}
                  alt="arist image"
                  title=""
                />
              </div>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
