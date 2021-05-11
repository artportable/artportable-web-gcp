import useSWR from 'swr'
import { Artwork } from '../../models/Artwork';
import { useMainWidth } from '../useWidth';

const fetcher = url => fetch(url).then(r => r.json().then(data => data))

export function useGetRows(artworks, height) {
  const mainWidth = useMainWidth().wide;

  return getRowsFromFiles(artworks, mainWidth, height);
}

export function useGetArtworkRows(owner = null) {
  const { data } = useGetArtworks(owner);
  const mainWidth = useMainWidth().wide;

  return getRowsFromArtwork(data, mainWidth);
}

export function useGetArtworks(owner = null) {
  const url = new URL("http://localhost:5001/api/artworks");
  if(owner !== null) {
    url.searchParams.append('owner', owner);
  }
  const { data, error } = useSWR(
    url.toString(),
    fetcher,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useGetTags() {
  const { data, error } = useSWR(
    `http://localhost:5001/api/artworks/tags`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export function usePostArtwork(artwork: Artwork, username: string) {
  fetch(`http://localhost:5001/api/artworks?myUsername=${username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(artwork)
  })
  .then(res => {
    return res.ok;
  })
  .catch(e => console.log(e));
}

export function useGetArtworksForDiscoverPage(tags: Array<string>) {
  const url = new URL(`http://localhost:5001/api/start`);
  tags.forEach(tag => {
    url.searchParams.append('tag', tag);
  });

  const { data, error } = useSWR(
    url.href,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}


function getRowsFromArtwork(artworks, rowWidth) {
  if (artworks === undefined) { return; }

  const normalized = normalizeHeights(artworks, artwork => artwork.PrimaryFile);

  return fillRows(normalized, rowWidth, 250);
}

function getRowsFromFiles(artworks, rowWidth, height) {
  if (artworks === undefined) { return; }

  const normalized = normalizeHeights(artworks, artwork => artwork, height);

  return fillRows(normalized, rowWidth, 250);
}

function normalizeHeights(artworks, fileGetter, height = 300) {
  return artworks.map(artwork => {
    const fileWidth = fileGetter(artwork).Width;
    const fileHeight = fileGetter(artwork).Height;
    const ratio = fileWidth / fileHeight;
    const newWidth = height * ratio;

    return { artwork, width: newWidth, height: height}
  });
}

function fillRows(normalizedArtworks, rowWidth, threshold) {
  const allowedMinWidth = rowWidth + threshold;
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
