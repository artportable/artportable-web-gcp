import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { styles } from "./aboutCardArtwork.css";
import RoomIcon from "@material-ui/icons/Room";
import { useTranslation } from "next-i18next";
import SocialNetworksCard from "../SocialNetworksCard/SocialNetworksCard";
import InspiredByCard from "../InspiredByCard/InspiredByCard";
import { isNullOrUndefined } from "../../utils/util";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useGetArtworks } from "../../hooks/dataFetching/Artworks";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

const AboutCardArtwork = ({ data }) => {
  const s = styles();
  const { t } = useTranslation(["art", "profile", "tags"]);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const [artistUsername, setArtistUsername] = useState(data?.Owner.Username);
  const artworks = useGetArtworks(artistUsername);
  const router = useRouter();

  useEffect(() => {
    setArtistUsername((prevUsername) => data?.Owner?.Username || prevUsername);
  }, [data, artistUsername, artworks]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "100%",
          fontFamily: "Roboto",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              marginTop: "0vh",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gap: "10px",
              gridAutoRows: "minmax(100px, auto)",
            }}
          >
            {artworks?.data?.slice(0, 6).map((artwork) => (
              <Link
                key={artwork.Id} // Provide a unique key for each Link
                href={`/art/${artwork.Id}`}
              >
                <a>
                  <img
                    src={`${bucketUrl}${artwork.PrimaryFile?.Name}`}
                    alt={artwork.Title}
                    style={{
                      width: "100%",
                      height: "100%", // Set height to 100% to fill the grid item
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      objectFit: "cover",
                    }}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Link href={`/profile/@${artistUsername}`}>
            <a>
              <Button
                style={{
                  marginTop: "10px",
                  color: "black",
                }}
              >
                {t("art:viewPortfolio")}
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

const MemoizedAboutCardArtwork = React.memo(AboutCardArtwork);

export default MemoizedAboutCardArtwork;
