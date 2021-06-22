import useSWR from 'swr'
import { ArtworkForCreation } from '../../models/Artwork';

const fetcher = url => fetch(url).then(r => r.json().then(data => data))
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export function useGetArtworks(owner = null) {
  const url = new URL(`${apiBaseUrl}/api/artworks`);
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

export function useGetArtwork(id: string) {
  const url = new URL(`${apiBaseUrl}/api/artworks/${id}`);

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

export function useGetTags() {
  const { data, error } = useSWR(
    `${apiBaseUrl}/api/artworks/tags`,
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

export function usePostArtwork(artwork: ArtworkForCreation, username: string) {
  fetch(`${apiBaseUrl}/api/artworks?myUsername=${username}`, {
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
  const url = new URL(`${apiBaseUrl}/api/start`);

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
