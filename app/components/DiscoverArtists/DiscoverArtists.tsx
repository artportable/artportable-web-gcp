import React from "react";
import DiscoverArtistCard from "../DiscoverArtistCard/DiscoverArtistCard";
import { Box } from "@material-ui/core";
import { styles } from "./discoverArtists.css";
import DiscoverArtistSkeletonCard from "../DiscoverArtistSkeletonCard/DiscoverArtistSkeletonCard";
import SearchField from "../SearchField/SearchField";


export default function DiscoverArtists({ artists, onFilter, onFollowClick, loadMoreElementRef, isLoading, loadMore }) {
  const s = styles();

  return (
    <Box>
      <div className={s.searchField}>
        <SearchField onFilter={onFilter}></SearchField>
      </div>

      {artists &&
        artists.map(a =>
          <DiscoverArtistCard key={a.Username} artist={a} onFollowClick={onFollowClick}></DiscoverArtistCard>
        )
      }
      {!isLoading && loadMore &&
        <div ref={loadMoreElementRef}>
          <DiscoverArtistSkeletonCard />
        </div>
      }
    </Box>
  );
}
