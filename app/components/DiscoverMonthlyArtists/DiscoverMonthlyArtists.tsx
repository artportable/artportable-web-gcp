import React from "react";
import DiscoverMonthlyArtistCard from "../DiscoverMonthlyArtistCard/DiscoverMonthlyArtistCard";
import { Box } from "@material-ui/core";
import { styles } from "./discoverMonthlyArtists.css";
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
          <DiscoverMonthlyArtistCard key={a.Username} artist={a} onFollowClick={onFollowClick}></DiscoverMonthlyArtistCard>
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
