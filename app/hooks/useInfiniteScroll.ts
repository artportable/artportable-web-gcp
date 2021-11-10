import { debounce } from '@material-ui/core/utils';
import { useEffect, useState } from 'react'
import { useSWRInfinite } from 'swr'

const defaultOptions = {
  root: null,
  rootMargin: '0px 0px 600px 0px',
  threshold: 0
}

const apiBaseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useInfiniteScroll = (
  loadMoreElement: React.MutableRefObject<Element>,
  options: IntersectionObserverInit = defaultOptions) => {

  const [pageCount, setPageCount] = useState(1);

  const callback = debounce((entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      return;
    }

    setPageCount(pageCount + 1);

  }, 500);

  useEffect(() => {
    if (loadMoreElement !== null) {
      const observer = new IntersectionObserver(callback, options);

      if (loadMoreElement.current) {
        observer.observe(loadMoreElement.current);
      }

      return () => {
        if (loadMoreElement.current) {
          observer.unobserve(loadMoreElement.current);
        }
      }
    }
  });

  return pageCount;
}

const _getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) { return null; }

  return `${apiBaseurl}/api/Discover/artworks?page=${pageIndex + 1}&pageSize=10`;
}

const fetcher = url => fetch(url).then(res => {
  var links = undefined;
  if (res.headers.has('Link')) {
    links = res.headers.get('Link').split(/(?!\B"[^"]*),(?![^"]*"\B)/).reduce((links, part) => {
      const section = part.split(/(?!\B"[^"]*);(?![^"]*"\B)/);
      if (section.length < 2) {
        throw new Error("section could not be split on ';'");
      }
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();

      links[name] = url;

      return links;
    }, {});
  }
  return res.json().then(value => {
    return {
      data: value,
      ...links
    };
  });
});


export interface PageData {
  data?: any;
  first?: string;
  next?: string;
  previous?: string;
}

export const useInfiniteScrollWithKey = (
  loadMoreElement: React.MutableRefObject<Element>,
  getKey: (pageIndex: number, previousPageData: PageData) => string = _getKey,
  activeTab : any,
  options: IntersectionObserverInit = defaultOptions,
) => {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher, { initialSize: 1, revalidateOnFocus: false });
  const [ currentRef, setCurrentRef ] = useState(null);

  const callback = debounce((entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      return;
    }

    setSize(size + 1);

  }, 500);

  useEffect(() => {
    if (loadMoreElement && loadMoreElement.current) {

      const observer = new IntersectionObserver(callback, options);
      if (loadMoreElement.current) {
        observer.observe(loadMoreElement.current);
        setCurrentRef(loadMoreElement.current); 
      }

      return () => {
        if (loadMoreElement.current) {
          observer.unobserve(loadMoreElement.current);
        }
      }
    }
  }, [activeTab, data, loadMoreElement, loadMoreElement.current]);
  return {
    data: data ? [].concat(...data.map(({ data }) => data)) : [],
    size, setSize,
    isLoading: !data
  };
}
