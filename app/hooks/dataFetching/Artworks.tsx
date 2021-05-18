import useSWR from 'swr'
import { Artwork } from '../../models/Artwork';

const fetcher = url => fetch(url).then(r => r.json().then(data => data))

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

export function useGetArtworksForStartPage() {
  const url = new URL(`http://localhost:5001/api/start`);

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
