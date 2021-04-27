import useSWR from 'swr'
import { Artwork } from '../../models/Artwork';
const fetcher = url => fetch(url).then(r => r.json().then(data => data))

export function useGetArtworks(owner) {
  const { data, error } = useSWR(
    `http://localhost:5001/api/artworks?owner=${owner}`,
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
