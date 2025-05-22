import { debounce } from "@material-ui/core/utils";
import { useEffect, useState } from "react";
import { useSWRInfinite } from "swr";
import { MutatorCallback } from "swr/dist/types";

const defaultOptions = {
  root: null,
  rootMargin: "0px 0px 600px 0px",
  threshold: 0,
};

const apiBaseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useInfiniteScroll = (
  loadMoreElement: React.MutableRefObject<Element>,
  options: IntersectionObserverInit = defaultOptions
) => {
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
      };
    }
  });

  return pageCount;
};

const _getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `${apiBaseurl}/api/Discover/artworks?page=${
    pageIndex + 1
  }&pageSize=10`;
};

const fetcher = (url) =>
  fetch(url).then((res) => {
    var links = undefined;
    if (res.headers.has("Link")) {
      links = res.headers
        .get("Link")
        .split(/(?!\B"[^"]*),(?![^"]*"\B)/)
        .reduce((links, part) => {
          const section = part.split(/(?!\B"[^"]*);(?![^"]*"\B)/);
          if (section.length < 2) {
            throw new Error("section could not be split on ';'");
          }
          const url = section[0].replace(/<(.*)>/, "$1").trim();
          const name = section[1].replace(/rel="(.*)"/, "$1").trim();

          links[name] = url;

          return links;
        }, {});
    }
    return res.json().then((value) => {
      return {
        data: value,
        ...links,
      };
    });
  });

export type Page = {
  first?: string;
  next?: string;
  previous?: string;
};
export type PageData<T> = {
  data?: T;
} & Page;

export interface useInfiniteScrollWithKeyResponse<T> {
  data: T[];
  isLoading: boolean;
  error?: Error;
  mutate: (
    data?:
      | PageData<T>[]
      | Promise<PageData<T>[]>
      | MutatorCallback<PageData<T>[]>,
    shouldRevalidate?: boolean
  ) => Promise<PageData<T>[]>;
}

export interface InfiniteScrollOptions extends IntersectionObserverInit {
  onError?: (error: Error) => void;
}

export type useInfiniteScrollWithKeyProps = <T>(
  loadMoreElement: React.MutableRefObject<Element>,
  getKey: (pageIndex: number, previousPageData: PageData<T>) => string,
  load?: any,
  options?: InfiniteScrollOptions
) => useInfiniteScrollWithKeyResponse<T>;

export const useInfiniteScrollWithKey: useInfiniteScrollWithKeyProps = <T>(
  loadMoreElement: React.MutableRefObject<Element>,
  getKey: (
    pageIndex: number,
    previousPageData: PageData<T>
  ) => string = _getKey,
  load?: any,
  options: InfiniteScrollOptions = defaultOptions
) => {
  const { data, size, setSize, mutate, error } = useSWRInfinite<PageData<T>, Error>(
    getKey,
    fetcher,
    { 
      initialSize: 1, 
      revalidateOnFocus: false,
      onError: options.onError
    }
  );
  const [currentRef, setCurrentRef] = useState(null);

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
      };
    }
  }, [load, data, loadMoreElement, loadMoreElement.current]);

  return {
    data: data ? [].concat(...data.map(({ data }) => data)) : [],
    isLoading: !data,
    error,
    mutate: mutate,
  };
};
