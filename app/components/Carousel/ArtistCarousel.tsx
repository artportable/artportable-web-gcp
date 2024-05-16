import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import EmblaCarousel from "./Embla/EmblaCarousel";
import { styles } from "./rocketcarousel.css";
import { styles as sharedStyles } from "../../../styles/shared.css";

type Data = {
  forDesktop: boolean;
  containerStyle?: any;
};

export default function ArtistCarousel(props: Data) {
  const { forDesktop, containerStyle = {} } = props;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { t } = useTranslation(["common", "discover"]);
  const s = styles();
  const sShared = sharedStyles();
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    let url = new URL(`${apiBaseUrl}/api/Discover/monthlyArtists`);
    const callURL = url.href;

    async function fetchArtists() {
      try {
        const response = await fetch(
          callURL,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const artists = await response.json();
          setArtists(artists);
        } else {
          // Handle error here
          console.error("Failed to fetch artists:", response.statusText);
        }
      } catch (err) {
        console.error("Error in fetchArtists:", err);
      }
    }

    fetchArtists();

  }, [])

  if (artists.length < 1) return null;

  const formattedSlides = formatArtistForEmbla(
    artists,
    s,
    sShared,
    t,
    forDesktop
  );

  return (
    <div style={containerStyle}>
      <EmblaCarousel
        slides={formattedSlides} // Use the formatted slides here
        options={{
          align: "center",
          loop: true,
        }}
        autoPlay={true}
        useDynamicSlideWidth={true}
        forDesktop={forDesktop}
        externalLink={false}
      />
    </div>
  );
}

const formatArtistForEmbla = (items, s, sShared, t, forDesktop) => {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const formatted = [];

  items.forEach((item) => {
    const overlayContent = (
      <div className={s.rocketOverlay}>
        {forDesktop && (
          <div className={s.seeMoreButton + " displayOnHover"}>
            <Button
              className={clsx(
                sShared.smallButton,
                sShared.yellowButton,
                sShared.noBorder,
                sShared.mediumThickness
              )}
            >
              {t("common:seeMore")}
            </Button>
          </div>
        )}
      </div>
    );

    formatted.push({
      overlayContent,
      imageSrc: `${bucketUrl}${item.ProfilePicture}`,
      thumbnailSrc: "",
      hoverSrc: "",
      width: 300,
      height: 300,
      hoverCenter: "center",
      artistName: "",
      title: item.Title,
      linkURL: `/profile/@${item.Username}`,
      roundedCorners: false,
      footer: (
        <div
          style={{
            marginTop: "10px",
            fontSize: "0.95rem",
            fontWeight: 400,
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${item.Name} ${item.Surname}`}
        </div>
      ),
    });
  });

  return formatted;
};
