import React from "react";
import { Box } from "@material-ui/core";
import { styles } from "./discoverArt.css";
import { useGetArtworks } from "../../hooks/dataFetching/Artworks";
import ArtworkListItem from "../ArtworkListItem/ArtworkListItem";
import { useStore } from 'react-redux';
import { useMainWidth, useWidth } from '../../hooks/useWidth';



export default function DiscoverArt({ }) {
  const s = styles();
  const store = useStore();
  const { data } = useGetArtworks();
  const mainWidth = useMainWidth();

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

  return (
    <Box>
      {mainWidth}
      <Box className={s.grid}>
        {data?.map(artwork => 
          <ArtworkListItem 
            key={artwork.Id} 
            artwork={artwork} 
            onLikeClick={onLikeClick} />)}
      </Box>
    </Box>
  );
}

function getRows(artworks, rowWidth) {
  if (artworks === undefined) { return; }

  const normalized = normalizeHeights(artworks);

  const rows = fillRows(normalized, rowWidth, 100);
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
  const allowedMinWidth = rowWidth - threshold;
  const rows = [];

  let currentRow = [];

  normalizedArtworks.forEach(normalizedArtwork => {
    const aggregateWidth = currentRow.reduce((accumulated, curr) => accumulated + curr.width, 0);
    const aggregateSpacings = (currentRow.length - 1) * 16;
    const totalWidth = aggregateWidth + aggregateSpacings;


    if(totalWidth < allowedMinWidth) {
      currentRow.push(normalizedArtwork);
    } else {
      rows.push(currentRow);
      currentRow = [];
      rows.push(currentRow);
      currentRow.push(normalizedArtwork);
    }
  });
}

function checkIfArtworkFitsInRow() {}