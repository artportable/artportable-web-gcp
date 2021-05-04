import React from "react";
import { Box } from "@material-ui/core";
import { styles } from "./discoverArtists.css";

export default function DiscoverArt({ }) {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;

  return (
    <Box>
      Discover new artists
    </Box>
  );
}