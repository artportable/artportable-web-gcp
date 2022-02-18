import { Typography } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { UserContext } from "../../contexts/user-context";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { useMainWidth } from "../../hooks/useWidth";
import { Artwork } from "../../models/Artwork";
import { NavBarItem } from "../../models/NavBarItem";
import { ProductList } from "../../models/ProductList";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import Main from "../Main/Main";

export default function ProductListPage({ productList, navBarItems }: { productList: ProductList, navBarItems: NavBarItem[] }) {
  const router = useRouter()
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const BaseUrl = process.env.NEXT_PUBLIC_URL;
  const [loadMoreArtworks, setLoadMoreArtworks] = useState<boolean>(true);
  const loadMoreArtworksElementRef = useRef(null);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const { like } = usePostLike();
  const token = useContext(TokenContext);
  const { socialId } = useContext(UserContext);
  const rowWidth = useMainWidth().wide

  function likeArtwork(artworkId, isLike) {
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId, token);
  }
  function filter(tags: string[], searchQuery = "") {

  }

  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey<Artwork>(loadMoreArtworksElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        setLoadMoreArtworks(false);
        return null;
      }
      if (pageIndex == 0) {
        const url = new URL(`${apiBaseUrl}/api/discover/artworks/top`);
        if (productList?.tag)
          url.searchParams.append('tag', productList.tag);
        return url.href;
      }
      return previousPageData.next;
    })

  return (
    <Main wide={true} navBarItems={navBarItems}>
      <Head>
        <title>{productList?.metaTitle}</title>
        <meta name="title" content={productList?.metaTitle} />
        <meta name="description" content={productList?.metaDescription} />

        <meta property="og:title" content={productList?.metaTitle} />
        <meta property="og:description" content={productList?.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BaseUrl+"/"+productList?.slug} />
        <meta property="og:image" content={productList?.ogImage?.formats?.medium?.url} />

      </Head>
      {router.isFallback &&
        //implement good skeleton here
        <div>Loading...</div>
      }
      {!router.isFallback &&
        <>
          <Typography variant="h1">{productList?.title}</Typography>
          <div dangerouslySetInnerHTML={{ __html: productList?.topDescription }} />
          <DiscoverArt
            artworks={artworks}
            tags={null}
            onLike={likeArtwork}
            rowWidth={rowWidth}
            loadMoreElementRef={loadMoreArtworksElementRef}
            isLoading={isLoadingArtWorks}
            loadMore={loadMoreArtworks}
          />
          <div dangerouslySetInnerHTML={{ __html: productList?.bottomDescription }} />
        </>
      }
    </Main>
  )
}