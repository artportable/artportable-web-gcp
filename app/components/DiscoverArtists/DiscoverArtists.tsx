import React, { useState } from "react";
import DiscoverArtistCard from "../DiscoverArtistCard/DiscoverArtistCard";
import { Box, TextField } from "@material-ui/core";
import { styles } from "./discoverArtists.css";


export default function DiscoverArtists({ artists, onFollowClick, onSearch }) {
  const s = styles();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box>
      <div className={s.searchField}>
        {/* <SearchBar
          value={searchQuery}
          onChange={(query) => setSearchQuery(query)}
          onRequestSearch={() => onSearch(searchQuery)}
      ></SearchBar> */}
      </div>
      {artists &&
        artists.map(a =>
          <DiscoverArtistCard key={a.Username} artist={a} onFollowClick={onFollowClick}></DiscoverArtistCard>
        )
      }
    </Box>
  );
}
