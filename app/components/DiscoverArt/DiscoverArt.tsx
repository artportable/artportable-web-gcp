import React from "react";
import { Box } from "@material-ui/core";
import { styles } from "./discoverArt.css";
import { useGetArtworkRows } from "../../hooks/dataFetching/Artworks";
import ArtworkListItemDefined from "../ArtworkListItemDefined/ArtworkListItemDefined";
import { useStore } from 'react-redux';

export default function DiscoverArt({ }) {
  const s = styles();
  const store = useStore();
  const rows = useGetArtworkRows();

  const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_AWS;
  const username = store.getState()?.user?.username;

  function onLikeClick(artworkId, isLike) {
    fetch(`http://localhost:5001/api/artworks/${artworkId}/like?myUsername=${username}`, {
      method: isLike ? 'POST' : 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        console.log(response.statusText);
        throw response;
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  if(rows === undefined) { return <></>}
  return (
    <Box className={s.rowsContainer}>
      {rows?.map((row, i) => 
        <div className={s.row} key={i}>
          {row.map(artwork => 
            <ArtworkListItemDefined 
              key={artwork.artwork.Id}
              width={artwork.width}
              height={artwork.height}
              artwork={artwork.artwork} 
              onLikeClick={onLikeClick} />
          )}
        </div>
      )}
    </Box>
  );
}
