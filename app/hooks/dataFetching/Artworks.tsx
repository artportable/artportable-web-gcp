import useSWR from 'swr'
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
