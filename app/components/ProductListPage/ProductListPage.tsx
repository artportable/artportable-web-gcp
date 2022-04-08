import { Chip, Link, Typography } from "@material-ui/core";
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
import { styles } from './productListPage.css'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Button from "../Button/Button";
import { useTranslation } from "next-i18next";

export default function ProductListPage({ productList, navBarItems }: { productList: ProductList, navBarItems: NavBarItem[] }) {
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const BaseUrl = process.env.NEXT_PUBLIC_URL;
  const [loadMoreArtworks, setLoadMoreArtworks] = useState<boolean>(true);
  const loadMoreArtworksElementRef = useRef(null);
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const { like } = usePostLike();
  const token = useContext(TokenContext);
  const { socialId } = useContext(UserContext);
  const rowWidth = useMainWidth().wide;
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const canonicalURL = publicUrl + router.asPath;
  const s = styles();
  const [toggleButton, setToggleButton] = useState(false);
  const { t } = useTranslation(['common']);

  function likeArtwork(artworkId, isLike) {
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId, token);
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
        <title>{productList?.metaTitle ?? "Artportable"}</title>
        <meta name="title" content={productList?.metaTitle ?? "Artportable"} />
        <meta name="description" content={productList?.metaDescription ?? ""} />

        <meta property="og:title" content={productList?.metaTitle ?? "Artportable"} />
        <meta property="og:description" content={productList?.metaDescription ?? ""} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BaseUrl + "/" + productList?.slug} />
        <meta property="og:image" content={productList?.ogImage?.formats?.medium?.url} />

        <link rel="canonical" href={canonicalURL} />
      </Head>
      {router.isFallback &&
        //implement good skeleton here
        <div>Loading...</div>
      }
      {!router.isFallback &&
        <>
          <div className={s.container}>
            <div className={s.imageDiv}>
              {productList.imageLink &&

                <Link href={`/${productList.imageLink}`}>
                  <a>
                    <img src={productList?.ogImage?.formats?.medium?.url} className={s.image} />
                  </a>
                </Link>
              }
              {productList.username &&
                <div className={s.createdBy}>
                  <Chip
                    onClick={(_) => router.push(`/profile/@${productList?.username}`)}
                    size="small"
                    classes={{
                      root: s.chip,
                    }}
                    label={productList?.user} />
                </div>
              }
              {productList.externalLink &&
                <div>
                  <a href={productList.externalLink} target="_blank">
                    <img src={productList?.ogImage?.formats?.medium?.url} className={s.image} />
                  </a>
                </div>
              }
              {!productList.externalLink && !productList.imageLink &&
                <div>
                    <img src={productList?.ogImage?.formats?.medium?.url} className={s.image} />
                </div>
              }

            </div>
            <div className={s.accordionDiv}>
              <Accordion
                className={s.accordion}
                elevation={0}
                onClick={() => setToggleButton(!toggleButton)}>
                <AccordionSummary className={s.accordionSummary}>
                  <div>
                    <div className={s.textDiv}>
                      <Typography className={s.header} variant="h1">{productList?.title}</Typography>
                    </div>
                    <div className={s.topDescription} dangerouslySetInnerHTML={{ __html: productList?.topDescription }} />
                    <div className={s.buttonDiv}>
                      {toggleButton ?
                        <Button
                          className={s.button}
                          size="small"
                          onClick={() => setToggleButton(!toggleButton)}
                          variant="outlined"
                          rounded
                          startIcon={<KeyboardArrowUpIcon />}>
                          {t('readLess')}
                        </Button>
                        :
                        <Button
                          className={s.button}
                          size="small"
                          onClick={() => setToggleButton(!toggleButton)}
                          variant="outlined"
                          rounded
                          startIcon={<KeyboardArrowDownIcon />}>
                          {t('readMore')}
                        </Button>}
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={s.description} dangerouslySetInnerHTML={{ __html: productList?.bottomDescription }} />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <DiscoverArt
            artworks={artworks}
            tags={null}
            onLike={likeArtwork}
            rowWidth={rowWidth}
            loadMoreElementRef={loadMoreArtworksElementRef}
            isLoading={isLoadingArtWorks}
            loadMore={loadMoreArtworks}
          />
        </>
      }
    </Main>
  )
}