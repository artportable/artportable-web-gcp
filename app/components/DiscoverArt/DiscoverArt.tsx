import React from "react";
import { Box } from "@material-ui/core";
import { styles } from "./discoverArt.css";
import { useGetArtworks } from "../../hooks/dataFetching/Artworks";
import ArtworkListItemDefined from "../ArtworkListItemDefined/ArtworkListItemDefined";
import { useStore } from 'react-redux';
import { useMainWidth, useWidth } from '../../hooks/useWidth';



export default function DiscoverArt({ }) {
  const s = styles();
  const store = useStore();
  const { data } = useGetArtworks();
  const mainWidth = useMainWidth().wide;

  const rows = getRows(data, mainWidth);

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

function getRows(artworks, rowWidth) {
  if (artworks === undefined) { return; }

  const normalized = normalizeHeights(artworks);

  return fillRows(normalized, rowWidth, 100);
}

function normalizeHeights(artworks) {
  const defaultHeight = 300;

  return artworks.map(artwork => {
    const ratio = artwork.PrimaryFile.Width / artwork.PrimaryFile.Height;

    const newWidth = defaultHeight * ratio;

    return { artwork, width: newWidth, height: defaultHeight}
  });
}

function fillRows(normalizedArtworks, rowWidth, threshold) {
  const allowedMinWidth = rowWidth;
  const slimmed = normalizedArtworks.slice(0, 20);
  const rows = [];

  let currentRow = [];
  
  slimmed.forEach(normalizedArtwork => {
    const aggregateWidth = currentRow.reduce((accumulated, curr) => accumulated + curr.width, 0);
    const aggregateSpacings = (currentRow.length - 1) * 16;
    const totalWidth = aggregateWidth + aggregateSpacings;


    if(totalWidth < allowedMinWidth) {
      currentRow.push(normalizedArtwork);
    } else {
      rows.push(currentRow);
      currentRow = [];
      currentRow.push(normalizedArtwork);
    }
  });

  rows.push(currentRow);

  return rows;
}

function checkIfArtworkFitsInRow() {}