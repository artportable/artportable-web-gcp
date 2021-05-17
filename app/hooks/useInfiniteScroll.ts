import { debounce } from '@material-ui/core/utils';
import { useEffect, useState } from 'react'
import { useSWRInfinite } from 'swr'

const defaultOptions = {
  root: null,
  rootMargin: '0px 0px 600px 0px',
  threshold: 0
}

export const useInfiniteScroll = (
  loadMoreElement: React.MutableRefObject<Element>,
  options: IntersectionObserverInit = defaultOptions) => {

  const [pageCount, setPageCount] = useState(1);

  const callback = debounce((entries) => {
    const [ entry ] = entries;
    if(!entry.isIntersecting) {
      return;
    }

    setPageCount(pageCount + 1);
    
  }, 500);

  useEffect(() => {
    if(loadMoreElement !== null) {
      const observer = new IntersectionObserver(callback, options);
  
      if(loadMoreElement.current) {
        observer.observe(loadMoreElement.current);
      }
  
      return () => {
        if(loadMoreElement.current) {
          observer.unobserve(loadMoreElement.current);
        }
      }
    }
  });

  return pageCount;
}

const _getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) { return null; }

  return `http://localhost:5001/api/Discover/artworks?page=${pageIndex + 1}&pageSize=10`;
}

const fetcher = url => fetch(url).then(res => res.json());


export const useInfiniteScroll2 = (
  loadMoreElement: React.MutableRefObject<Element>, 
  getKey: (pageIndex: number, previousPageData: unknown[]) => string = _getKey,
  options: IntersectionObserverInit = defaultOptions,
) => {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher, { initialSize: 1 , revalidateOnFocus: false});

  const callback = debounce((entries) => {
    const [ entry ] = entries;
    console.log(entries, 'entries');
    if(!entry.isIntersecting) {
      return;
    }

    setSize(size + 1);

  }, 500);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
      if(loadMoreElement.current) {
        observer.observe(loadMoreElement.current);
      }

      return () => {
        if(loadMoreElement.current) {
          observer.unobserve(loadMoreElement.current);
          observer.disconnect();
        }
      }
  });

  return {
    data: data ? [].concat(...data) : [],
    size, setSize
  };
}
