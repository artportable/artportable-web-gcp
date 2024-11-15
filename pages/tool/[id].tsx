import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Main from "../../app/components/Main/Main";
import { useGetArtwork } from "../../app/hooks/dataFetching/Artworks";
import { capitalizeFirst, fetchWithTimeout } from "../../app/utils/util";
import { UserContext } from "../../app/contexts/user-context";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import Script from "next/script";
import dynamic from "next/dynamic";
import { ALL_ROOMS, frameEngineConfig } from "../../public/config";
import { styles } from "../../styles/tool.css";

export default function Frame(props) {
  const { t } = useTranslation(["art", "common", "tags"]);
  const router = useRouter();
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const staticArtwork = props.artwork;
  const navBarItems = props.navBarItems;
  const canonicalURL = publicUrl + router.asPath;
  const s = styles();

  //Temporary fix since it loads twice currently
  const [numberOfLoads, setNumberOfLoads] = useState(0);

  const emptyPromise = () => new Promise((r) => r([]));

  const onDownloadImage = async (image: Blob) => {
    console.log(image);
  };

  const onTrackingEvent = async (type: string, data: any) => {
    console.log(`Track: ${type}, data: "${JSON.stringify(data)}"`);
  };

  const start = () => {
    //@ts-ignore
    const frameEngine = window.frameEngine as any;

    if (frameEngine?.update) {
      let config = {
        ...frameEngineConfig,
        initialArtwork: {
          artwork: {
            // imageUrl: '/paintings/o.jpg',
            imageUrl: bucketUrl + artwork?.data?.PrimaryFile?.Name,
            width: artwork?.data?.Width,
            height: artwork?.data?.Height,
          },
          room: ALL_ROOMS[2],
        },
        getFrameProducts: emptyPromise,
        getFrameProductsByType: emptyPromise,
        // onDownloadImage,
        shouldShowWelcomeModal: true,
        onTrackingEvent,
      };
      frameEngine.update(config);
      frameEngine.maximize();
    } else {
      setTimeout(start, 250);
    }
  };

  const { id } = router.query;
  const { username, socialId } = useContext(UserContext);
  const artwork = useGetArtwork(id as string, username.value);

  useEffect(() => {
    if (artwork.isLoading) {
      setNumberOfLoads(numberOfLoads + 1);
    }
  }, [artwork?.isLoading]);

  useEffect(() => {
    const shouldStart =
      artwork?.data && !artwork.isLoading && numberOfLoads === 1;

    if (shouldStart) {
      start();
    }
  }, [artwork?.isLoading, numberOfLoads]);

  return (
    <Main wide navBarItems={navBarItems}>
      <Head>
        <title>{staticArtwork?.Title ?? "Artportable"}</title>
        <meta name="title" content={staticArtwork?.Title ?? "Artportable"} />
        <meta name="description" content={staticArtwork?.Description ?? ""} />
        <meta
          property="og:title"
          content={staticArtwork?.Title ?? "Artportable"}
        />
        <meta
          property="og:description"
          content={staticArtwork?.Description ?? ""}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${publicUrl}/art/${staticArtwork?.Id}`}
        />
        <meta
          property="og:image"
          content={`${bucketUrl}${staticArtwork?.PrimaryFile?.Name}`}
        />
        <link
          rel="canonical"
          href={`${publicUrl}/${props.locale}${router.asPath}`}
        />
      </Head>
      <div className={s.toolDiv}>
        <div
          dangerouslySetInnerHTML={{ __html: '<div id="frameEngine"></div>' }}
          suppressHydrationWarning
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            const feScript = document.createElement('script');
            feScript.setAttribute("type", "text/javascript");
            feScript.setAttribute("src", "/frame-engine.js");

            const feStyle = document.createElement("link");
            feStyle.setAttribute("rel", "stylesheet")
            feStyle.setAttribute("type", "text/css")
            feStyle.setAttribute("href", "/frame-engine.css")

            document.getElementsByTagName("body")[0].appendChild(feScript)
            document.getElementsByTagName("head")[0].appendChild(feStyle)
          `,
          }}
        />
      </div>
    </Main>
  );
}

export async function getServerSideProps({ locale, params }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = new URL(
    `${apiBaseUrl}/api/artworks/${encodeURIComponent(params.id)}`
  );
  const navBarItems = await getNavBarItems();

  try {
    const artworkResponse = await fetch(url.href, {
      // timeout: 11000
      //fail return prop som sätts till true
    });
    const artwork = await artworkResponse.json();

    return {
      props: {
        // fetch timeout
        navBarItems: navBarItems,
        artwork,
        locale: locale,
        ...(await serverSideTranslations(locale, [
          "header",
          "footer",
          "art",
          "common",
          "tags",
          "support",
          "plans",
        ])),
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      // fetch timeout
      navBarItems: navBarItems,
      artwork: { Id: params.id },
      locale: locale,
      ...(await serverSideTranslations(locale, [
        "header",
        "footer",
        "art",
        "common",
        "tags",
        "support",
        "plans",
      ])),
    },
  };
}
