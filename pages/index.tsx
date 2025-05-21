import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/index.css";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  Suspense
} from "react";
import Main from "../app/components/Main/Main";
import { useTranslation } from "next-i18next";
import { useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useStore } from "react-redux";
import { LoadingContext } from "../app/contexts/loading-context";
import { UserContext } from "../app/contexts/user-context";
import Head from "next/head";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "../app/components/Button/Button";
import { useGetLatestArtworksForIndex } from "../app/hooks/dataFetching/Artworks";

// Dynamically import components
const IndexHeroRenewed = dynamic(() => import("../app/components/IndexHero/IndexHeroRenewed"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const IndexCategories = dynamic(() => import("../app/components/IndexHero/IndexCategories"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const StoryCarousel = dynamic(() => import("../app/components/Carousel/StoryCarousel"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const LatestCarousel = dynamic(() => import("../app/components/Carousel/LatestCarousel"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const CuratedCarousel = dynamic(() => import("../app/components/Carousel/CuratedCarousel"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const RocketCarousel = dynamic(() => import("../app/components/Carousel/RocketCarousel"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const IndexEditorial = dynamic(() => import("../app/components/IndexHero/IndexEditorial"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const Newsletter = dynamic(() => import("../app/components/NewsletterCard/NewsletterCard"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const IndexArtportable = dynamic(() => import("../app/components/IndexHero/IndexArtportable"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

export default function DiscoverPage({ navBarItems }) {
  const { t } = useTranslation([
    "index",
    "header",
    "plans",
    "common",
    "discover",
  ]);
  const s = styles();
  const store = useStore();
  const [visibleSections, setVisibleSections] = useState({
    rocket: false,
    latest: false,
    curated: false
  });

  const { username, socialId, isSignedIn } = useContext(UserContext);
  const dispatch = useDispatch();
  const publicUrl = process.env.NEXT_PUBLIC_URL;

  const { data, isLoading, isError } = useGetLatestArtworksForIndex();

  const [artworks, setArtworks] = useState(data);

  useEffect(() => {
    if (data?.artworks) {
      setArtworks(data?.artworks);
    }
  }, [data]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observers: { [key: string]: IntersectionObserver } = {};
    const sections = {
      rocket: document.querySelector('#rocket-carousel'),
      latest: document.querySelector('#latest-carousel'),
      curated: document.querySelector('#curated-carousel')
    };

    Object.entries(sections).forEach(([key, element]) => {
      if (element) {
        observers[key] = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => ({ ...prev, [key]: true }));
              observers[key].disconnect();
            }
          });
        }, observerOptions);

        observers[key].observe(element);
      }
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

  const scrollToNextSection = useCallback(() => {
    const nextSection = nextSectionRef.current;
    if (nextSection) {
      const topPosition =
        nextSection.getBoundingClientRect().top + window.pageYOffset;
      const headerOffset = 50;
      window.scrollTo({
        top: topPosition - headerOffset,
        behavior: "smooth",
      });
    }
  }, []);

  const nextSectionRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Main
      noHeaderPadding
      wide={true}
      isShow={true}
      navBarItems={navBarItems}
      fullWidth={false}
    >
      <Head>
        <title>{t("index:title")}</title>
        <meta name="description" content={t("index:description")} />
        <meta property="og:image" content="/images/artportable.jpg" />
        <meta
          name="keywords"
          content="konst, köpa konst, utställning, Galleri, oljemålningar, konstnär, tavlor"
        />

        <meta property="og:url" content="https://artportable.com/" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '331292174363133');
        fbq('track', 'PageView');
      `,
          }}
        />
      </Head>

      {!isSignedIn.value && (
        <IndexHeroRenewed onScrollDown={scrollToNextSection} />
      )}

      <div ref={nextSectionRef} style={{ marginTop: "30px" }}></div>

      <div className={s.headTitle}>{t("chosen")}</div>
      <div className={s.headText}>{t("chosenOne")}</div>
      <div
        style={{
          gridColumn: "1 / 4",
          width: !isMobile ? "90%" : "100%",
          margin: "0 auto",
        }}
      >
        <div id="rocket-carousel">
          {visibleSections.rocket && <RocketCarousel
            forDesktop={!isMobile}
            containerStyle={{ margin: "0px 0 0px 0" }}
          />}
        </div>
      </div>
      <Link href="/spotlight">
        <Button className={s.loginButton}>{t("common:seeCurated")}</Button>
      </Link>

      <div className={s.headTitle}>{t("chosenCategories")}</div>
      <div className={s.headText}>{t("chosenCategoriesText")}</div>
      <div style={{ gridColumn: "1 / 4", width: "100vw" }}>
        <IndexCategories />
      </div>
      <Link href="/discover">
        <Button className={s.loginButton}>{t("common:moreStyles")}</Button>
      </Link>

      <div className={s.headTitle}>{t("newIn")}</div>
      <div className={s.headText}>{t("newInText")}</div>
      <div
        style={{
          gridColumn: "1 / 4",
          width: !isMobile ? "90%" : "100%",
          margin: "0 auto",
        }}
      >
        <div id="latest-carousel">
          {visibleSections.latest && <LatestCarousel forDesktop={!isMobile} />}
        </div>
      </div>
      <Link href="/latestart">
        <Button className={s.loginButton}>{t("common:seeNew")}</Button>
      </Link>

      <div className={s.headTitle}>{t("titleHeader")}</div>
      <div className={s.headText}>{t("descriptionBody")}</div>
      <div
        style={{
          gridColumn: "1 / 4",
          width: !isMobile ? "90%" : "100%",
          margin: "0 auto",
        }}
      >
        <div id="curated-carousel">
          {visibleSections.curated && <CuratedCarousel forDesktop={!isMobile} />}
        </div>
      </div>
      <Link href="/curated">
        <Button className={s.loginButton}>{t("common:seeCurated")}</Button>
      </Link>
      <div className={s.headTitle}>Redaktionellt</div>
      <div className={s.headText}>
        Här lyfter vi konstnärer och verk som berör – och bjuder in dig att
        upptäcka människorna bakom konsten.
      </div>
      <IndexEditorial></IndexEditorial>
      {/* 
      <div className={s.headTitle}>{t("choosenArtist")}</div>
      <div className={s.headText}>{t("knowArtist")}</div>
      <div
        style={{
          gridColumn: "1 / 4",
          width: !isMobile ? "90%" : "100%",
          margin: "0 auto",
        }}
      >
        <DiscoverChosenArtists></DiscoverChosenArtists>
      </div> */}

      <div
        style={{
          gridColumn: "1 / 4",
          width: !isMobile ? "100%" : "100%",
          margin: "0 auto",
        }}
      >
        <IndexArtportable></IndexArtportable>
      </div>
      <Newsletter></Newsletter>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "art",
        "header",
        "footer",
        "common",
        "discover",
        "tags",
        "index",
        "plans",
        "feed",
      ])),
    },
    revalidate: 60,
  };
}
