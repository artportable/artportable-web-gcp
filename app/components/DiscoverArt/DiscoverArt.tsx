import React, { useContext, useEffect, useState } from "react";
import {
  // Checkbox,
  // Chip,
  // TextField,
  Theme,
  useTheme,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import { styles } from "./discoverArt.css";
import ArtworkListItem from "../ArtworkListItemDefined/ArtworkListItem";
import ArtworkListItemDefined from "../ArtworkListItemDefined/ArtworkListItemDefined";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import { capitalizeFirst } from "../../utils/util";
import { useTranslation } from "next-i18next";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Artwork } from "../../models/Artwork";
import { getImageAsRows } from "../../utils/layoutUtils";
// import { findFirstFramedImage, findFirstNotFramedImage } from "../../utils/imageUtils";
import Image from "../../models/Image";
import DiscoverArtSkeleton from "../DiscoverArtSkeletonCard/DiscoverArtSkeleton";
import { useBreakpointDown } from "../../hooks/useBreakpointDown";
import usePostLikeEmail from "../../hooks/dataFetching/usePostLikeEmail";
// import SearchField from "../SearchField/SearchField";
import { debounce } from "@material-ui/core/utils";
// import { UserContext } from "../../../app/contexts/user-context";
// import { useRouter } from "next/router";
import PurchaseRequestDialog from "../PurchaseRequestDialog/PurchaseRequestDialog";
import { ActionType } from "../../utils/googleAnalytics";
// import Stack from "@mui/material/Stack";
// import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@material-ui/core/Typography";

import { Skeleton } from "@material-ui/lab";

interface InsertElement {
  element: React.ReactElement;
  position: number;
}

interface InputProps {
  artworks: Artwork[];
  tags: string[];
  onFilter?: any;
  rowWidth: number;
  loadMoreElementRef: any;
  isLoading: boolean;
  loadMore: boolean;
  activeTab: number;
  trendingArtTab: boolean;
  likedArtTab: boolean;
  header?: string;
  isFilterOpen?: boolean;
  insertElements?: InsertElement[];
}

export default function DiscoverArt({
  artworks,
  onFilter = null,
  rowWidth,
  loadMoreElementRef,
  isLoading,
  loadMore,
  trendingArtTab = null,
  likedArtTab = null,
  insertElements = [],
  isFilterOpen,
  header = "",
}: InputProps) {
  const s = styles();
  const { t } = useTranslation(["discover", "tags"]);
  const smScreenOrSmaller = useBreakpointDown("sm");
  const [loading, setLoading] = useState(false);
  const { likeEmail } = usePostLikeEmail();

  useEffect(() => {
    if (artworks && artworks.length === 0 && !likedArtTab) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [artworks]);

  const [imageRows, setImageRows] = useState([]);
  const [skeletonRows, setSkeletonRows] = useState([]);
  const [showFilterLoadingSkeleton, setShowFilterLoadingSkeleton] = useState(
    true && !!!artworks
  );

  const setShowFilterLoadingSkeletonDebounced = debounce((value: boolean) => {
    setShowFilterLoadingSkeleton(value);
  }, 200);

  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] =
    useState(false);
  const [purchaseRequestDialogData, setPurchaseRequestDialogData] = useState({
    title: "",
    creator: "",
    url: "",
    referTo: "",
    imageurl: "",
  });

  const theme: Theme = useTheme();
  const skeletonImages = [
    {
      Name: "Skeleton1",
      Width: 16,
      Height: 9,
    },
    {
      Name: "Skeleton2",
      Width: 4,
      Height: 3,
    },
    {
      Name: "Skeleton3",
      Width: 9,
      Height: 16,
    },
    {
      Name: "Skeleton4",
      Width: 4,
      Height: 3,
    },
    {
      Name: "Skeleton5",
      Width: 16,
      Height: 9,
    },
    {
      Name: "Skeleton6",
      Width: 10,
      Height: 5,
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      setShowFilterLoadingSkeletonDebounced(isLoading);
    } else {
      setShowFilterLoadingSkeleton(isLoading);
    }
  }, [isLoading]);

  useEffect(() => {
    const primaryImages = artworks.map((a) => a.PrimaryFile);
    let rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
    // First item in rows can be an empty array. Remove it.
    if (rows[0] && rows[0].length === 0) {
      rows = rows.slice(1);
    }

    setImageRows(rows);
    const skeletonRows = getImageAsRows(
      skeletonImages,
      theme.spacing(2),
      rowWidth
    );
    setSkeletonRows(skeletonRows);
  }, [artworks]);

  useEffect(() => {
    if (onFilter) onFilter([]);
  }, []);

  function likeArtwork(artwork, isLike) {
    likeEmail(artwork, isLike);
  }

  function togglePurchaseRequestDialog() {
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen);
  }

  function onPurchaseRequestClick(
    title: string,
    creator: string,
    artworkId: string,
    referTo: string,
    imageurl: string
  ) {
    const url = publicUrl + "/art/" + artworkId;
    // if (isSignedIn.value) {
    //   const originalRedirect = {
    //     pathname: "/messages",
    //     query: {
    //       artwork: encodeURIComponent(JSON.stringify({
    //         title: title,
    //         creator: creator,
    //         url: url,
    //       })),
    //       referTo: referTo,
    //     }
    //   }
    //   router.push(originalRedirect);
    // } else {
    setPurchaseRequestDialogData({
      title: title,
      creator: creator,
      url: url,
      referTo: referTo,
      imageurl: imageurl,
    });
    togglePurchaseRequestDialog();
  }
  // }

  let imageRowsWithElements: (Image[] | React.ReactElement)[] = [];
  if (imageRows.length > 1) {
    // Use slice to avoid duplicates being added.
    imageRowsWithElements = imageRows.slice();

    if (insertElements.length > 0) {
      insertElements.forEach((insert) => {
        // If the item in the array is not an array, then an insert has already been added there. Check this to avoid duplicates.
        // if (imageRows[insert.position] && !Array.isArray(imageRows[insert.position])) {
        //   return
        // }
        if (insert.element)
          imageRowsWithElements.splice(insert.position, 0, insert.element);
      });
    }
  }

  return (
    <>
      {artworks ? (
        artworks.length > 0 ? (
          <Box className={s.rowsContainer}>
            {header && (
              <Typography variant="h4" style={{ fontWeight: 500 }}>
                {header}
              </Typography>
            )}
            {showFilterLoadingSkeleton && (
              <>
                <div
                  className={s.row}
                  style={{
                    width: isFilterOpen ? "85%" : "100%",
                    marginLeft: isFilterOpen ? "auto" : "0",
                  }}
                >
                  {skeletonRows && skeletonRows.length > 0 && (
                    <div
                      className={s.row}
                      style={{
                        width: isFilterOpen ? "85%" : "100%",
                        marginLeft: isFilterOpen ? "auto" : "0",
                      }}
                    >
                      {skeletonRows[0].map((image) => {
                        return (
                          <DiscoverArtSkeleton
                            key={image.Name}
                            width={image.Width}
                            height={image.Height}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <div
                  className={s.row}
                  style={{
                    width: isFilterOpen ? "85%" : "100%",
                    marginLeft: isFilterOpen ? "auto" : "0",
                  }}
                >
                  {skeletonRows && skeletonRows.length > 0 && (
                    <div
                      className={s.row}
                      style={{
                        width: isFilterOpen ? "85%" : "100%",
                        marginLeft: isFilterOpen ? "auto" : "0",
                      }}
                    >
                      {skeletonRows[1].map((image) => {
                        return (
                          <DiscoverArtSkeleton
                            key={image.Name}
                            width={image.Width}
                            height={image.Height}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
            {imageRowsWithElements &&
              imageRowsWithElements.map((row: Image[], i) =>
                Array.isArray(row) ? (
                  <div
                    style={{
                      width: isFilterOpen ? "85%" : "100%",
                      marginLeft: isFilterOpen ? "auto" : "0",
                    }}
                    className={s.row}
                    key={i}
                  >
                    {row.map((image) => {
                      let artwork = artworks.find(
                        (a) => a.PrimaryFile.Name === image.Name
                      );
                      if (artwork) {
                        return (
                          <ArtworkListItem
                            key={artwork.Id}
                            width={image.Width}
                            height={image.Height}
                            artwork={artwork}
                            onPurchaseRequestClick={onPurchaseRequestClick}
                            purchaseRequestAction={
                              ActionType.PURCHASE_REQUEST_LIST_DISCOVER
                            }
                            onLikeClick={likeArtwork}
                          />
                        );
                        // return (
                        //   <ArtworkListItemDefined
                        //     key={image.Name}
                        //     width={smScreenOrSmaller ? "100%" : image.Width}
                        //     height={smScreenOrSmaller ? "auto" : image.Height}
                        //     artwork={artwork}
                        //     onPurchaseRequestClick={onPurchaseRequestClick}
                        //     purchaseRequestAction={
                        //       ActionType.PURCHASE_REQUEST_LIST_DISCOVER
                        //     }
                        //     onLikeClick={onLike}
                        //     indexPage={true}
                        //   />
                        // );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                ) : (
                  <div key={i}>
                    {/* This row is not a row but a React Element to insert between the rows. */}
                    {row}
                  </div>
                )
              )}

            {!isLoading && loadMore && (
              <div
                className={s.row}
                ref={loadMoreElementRef}
                style={{
                  width: isFilterOpen ? "85%" : "100%",
                  marginLeft: isFilterOpen ? "auto" : "0",
                }}
              >
                {skeletonRows && skeletonRows.length > 0 && (
                  <div className={s.row}>
                    {skeletonRows[0].map((image) => {
                      return (
                        <DiscoverArtSkeleton
                          key={image.Name}
                          width={image.Width}
                          height={image.Height}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            <PurchaseRequestDialog
              open={purchaseRequestDialogOpen}
              onClose={togglePurchaseRequestDialog}
              props={{
                pathname: "/messages",
                title: purchaseRequestDialogData.title,
                creator: purchaseRequestDialogData.creator,
                url: purchaseRequestDialogData.url,
                referTo: purchaseRequestDialogData.referTo,
                imageUrl: purchaseRequestDialogData.imageurl,
              }}
            />
          </Box>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              width: "100%",
            }}
          ></div>
        )
      ) : (
        <Box className={s.rowsContainer}></Box>
      )}
    </>
  );
}
