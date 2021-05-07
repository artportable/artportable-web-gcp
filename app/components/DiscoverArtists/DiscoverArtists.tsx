import React from "react";
import DiscoverArtistCard from "../DiscoverArtistCard/DiscoverArtistCard";
import { Box } from "@material-ui/core";

export default function DiscoverArtists({ artists, onFollowClick }) {
  return (
    <Box>
      <h1>Konstnärer vi tror du hade gillat</h1>
      {artists.map(a =>
        <DiscoverArtistCard artist={a} onFollowClick={onFollowClick}></DiscoverArtistCard>
      )}
    </Box>
  );
}
