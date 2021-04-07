import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json().then(data => data))

export function useGetArtworks() {
  const { data, error } = useSWR(
    `http://localhost:5001/api/artworks`,
    fetcher,
    { 
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  return {
    artworks: data,
    isLoading: !error && !data,
    isError: error
  }
}
