import { debounce } from '@material-ui/core/utils';
import { useEffect, useState } from 'react'

const defaultOptions = {
  root: null,
  rootMargin: '0px',
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