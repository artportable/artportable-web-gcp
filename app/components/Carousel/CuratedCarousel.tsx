import React, { useRef, useContext } from "react";
import Button from "@material-ui/core/Button";
import { useTranslation } from "next-i18next";
import clsx from "clsx";
import EmblaCarousel from "./Embla/EmblaCarousel";
import LikeButton from "../Button/LikeButton";

import { styles } from "./rocketcarousel.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { Artwork } from "../../models/Artwork";
import { UserContext } from "../../contexts/user-context";
import Brightness1Icon from "@material-ui/icons/Brightness1";

type Data = {
  forDesktop: boolean;
  containerStyle?: any;
};

export default function CuratedCarousel(props: Data) {
  const { forDesktop, containerStyle = {} } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { t } = useTranslation(["common"]);
  const s = styles();
  const sShared = sharedStyles();
  const loadMoreArtworksElementRef = useRef(null);

  const { username, isSignedIn } = useContext(UserContext);
  const { data: artworks, isLoading: isLoadingArtWorks } =
    useInfiniteScrollWithKey<Artwork>(
      loadMoreArtworksElementRef,
      (pageIndex, previousPageData) => {
        if (pageIndex == 0) {
          let url = new URL(`${apiBaseUrl}/api/discover/artworks/selected`);

          url.searchParams.append("page", (pageIndex + 1).toString());
          url.searchParams.append("pageSize", "10");
          if (username.value != null && username.value != "") {
            url.searchParams.append("myUsername", username.value);
          }
          return url.href;
        }
        return previousPageData.next;
      }
    );

  if (artworks.length < 1) return null;

  const formattedSlides = formatApArtworkForEmbla(
    artworks,
    s,
    sShared,
    t,
    forDesktop
  );

  return (
    <div style={containerStyle}>
      <EmblaCarousel
        slides={formattedSlides}
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

const formatApArtworkForEmbla = (items, s, sShared, t, forDesktop) => {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const formatted = [];
  const { username, isSignedIn } = useContext(UserContext);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const baseUrl = process.env.NEXT_PUBLIC_URL;

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
      imageSrc: `${bucketUrl}${item?.PrimaryFile?.Name}`,
      thumbnailSrc: "",
      hoverSrc: "",
      width: item?.PrimaryFile?.Width,
      height: item?.PrimaryFile?.Height,
      hoverCenter: "center",
      artistName: "",
      title: item?.Title,
      linkURL: `/art/${item.Id}`,
      roundedCorners: false,
      footer: (
        <div>
          <div
            style={{
              marginTop: "2px",
              fontSize: "0.95rem",
              fontWeight: 400,
              width: "100%",
            }}
          >
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <a href={`${baseUrl}/profile/@${item.Username}`}>
                {" "}
                {`${item.Owner.Name} ${item.Owner.Surname}`}
              </a>
              <div>
                {isSignedIn.value && (
                  <div className={s.likeButton}>
                    <LikeButton
                      content={{
                        Item: item,
                        LikedByMe: item.LikedByMe,
                        Likes: item.Likes,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <p
              style={{
                fontSize: "0.70rem",
                fontStyle: "italic",
                marginTop: "0px",
              }}
            >
              {item.MultipleSizes
                ? " " + t("common:words.multipleSizes").toLowerCase() + ""
                : item.Width && item.Height && item.Depth
                ? " " + item.Width + "x" + item.Height + "x" + item.Depth + "cm"
                : item.Width && item.Height
                ? " " + item.Width + "x" + item.Height + "cm"
                : null}
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  {item?.Price && !isNaN(item?.Price) && item?.Price !== 0 ? (
                    <div style={{ fontSize: "14px" }}>
                      <Brightness1Icon
                        style={{
                          color: "#229059",
                          width: "8px",
                          height: "8px",
                          marginRight: "4px",
                        }}
                      />{" "}
                      {Number(item?.Price)
                        .toLocaleString("sv-SE")
                        .replace(/\u00A0/g, " ")}{" "}
                      {item?.Currency}
                    </div>
                  ) : (
                    <div style={{ fontSize: "14px" }}>
                      <Brightness1Icon
                        style={{
                          color: "#229059",
                          width: "8px",
                          height: "8px",
                          marginRight: "4px",
                        }}
                      />{" "}
                      {t("priceOnRequest")}
                    </div>
                  )}
                </div>

                {/* <a href={`${baseUrl}/art/${item.Id}`} className={s.buyButton}>
                  {
                    <Brightness1Icon
                      style={{
                        color: "#229059",
                        fontSize: "30px",
                      }}
                    />
                  }
                  <div style={{ padding: "5px" }}>{t("buy")}</div>
                </a> */}
              </div>
            </p>
          </div>
        </div>
      ),
    });
  });

  return formatted;
};
