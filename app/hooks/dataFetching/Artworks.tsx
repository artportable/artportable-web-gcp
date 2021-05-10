import useSWR from 'swr'
import { Artwork } from '../../models/Artwork';
import { useMainWidth } from '../useWidth';

const fetcher = url => fetch(url).then(r => r.json().then(data => data))

export function useGetArtworkRows(owner = null) {
  const { data } = useGetArtworks(owner);
  const mainWidth = useMainWidth().wide;

  return getRows(data, mainWidth);
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
