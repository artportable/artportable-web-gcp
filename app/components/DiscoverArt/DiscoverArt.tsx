import React, { useContext, useEffect, useState } from "react";
import { Box, Checkbox, Chip, TextField, Theme, useTheme } from "@material-ui/core";
import { styles } from "./discoverArt.css";
import ArtworkListItemDefined from "../ArtworkListItemDefined/ArtworkListItemDefined";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { capitalizeFirst } from "../../utils/util";
import { useTranslation } from "next-i18next";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Artwork } from "../../models/Artwork";
import { getImageAsRows } from "../../utils/layoutUtils";
import Image from "../../models/Image";
import DiscoverArtSkeleton from "../DiscoverArtSkeletonCard/DiscoverArtSkeleton";
import { useBreakpointDown } from "../../hooks/useBreakpointDown";
import SearchField from "../SearchField/SearchField";
import { debounce } from '@material-ui/core/utils';
import { UserContext } from '../../../app/contexts/user-context';
import { useRouter } from 'next/router';
import PurchaseRequestDialog from "../PurchaseRequestDialog/PurchaseRequestDialog";
import { ActionType } from "../../utils/googleAnalytics";

interface InputProps {
  artworks: Artwork[],
  tags: string[],
  onFilter: any,
  onLike: any,
  rowWidth: number,
  loadMoreElementRef: any
  isLoading: boolean;
  loadMore: boolean;
}

export default function DiscoverArt({ artworks, tags, onFilter, onLike, rowWidth, loadMoreElementRef, isLoading, loadMore }: InputProps) {
  const s = styles();
  const { t } = useTranslation(['discover', 'tags']);
  const smScreenOrSmaller = useBreakpointDown('sm');

  const [imageRows, setImageRows] = useState([]);
  const [skeletonRows, setSkeletonRows] = useState([]);
  const [showFilterLoadingSkeleton, setShowFilterLoadingSkeleton] = useState(true && !!!artworks);

  const setShowFilterLoadingSkeletonDebounced = debounce((value: boolean) => {
    setShowFilterLoadingSkeleton(value)
  }, 200)

  const router = useRouter();
  const { isSignedIn } = useContext(UserContext);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const [purchaseRequestDialogOpen, setPurchaseRequestDialogOpen] = useState(false);
  const [purchaseRequestDialogData, setPurchaseRequestDialogData] = useState({
    title: '',
    creator: '',
    url: '',
    referTo: ''
  });

  const theme: Theme = useTheme();
  const skeletonImages = [
    {
      Name: "Skeleton1",
      Width: 16,
      Height: 9
    },
    {
      Name: "Skeleton2",
      Width: 4,
      Height: 3
    },
    {
      Name: "Skeleton3",
      Width: 9,
      Height: 16
    },
    {
      Name: "Skeleton4",
      Width: 4,
      Height: 3
    },
    {
      Name: "Skeleton5",
      Width: 16,
      Height: 9
    },
    {
      Name: "Skeleton6",
      Width: 10,
      Height: 5
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
    const primaryImages = artworks.map(a => a.PrimaryFile);
    const rows = getImageAsRows(primaryImages, theme.spacing(2), rowWidth);
    setImageRows(rows);
    const skeletonRows = getImageAsRows(skeletonImages, theme.spacing(2), rowWidth);
    setSkeletonRows(skeletonRows);
  }, [artworks]);

  useEffect(() => {
    onFilter([]);
  }, []);

  function togglePurchaseRequestDialog(){
    setPurchaseRequestDialogOpen(!purchaseRequestDialogOpen);
  }

  function onPurchaseRequestClick(title: string, creator: string, artworkId: string, referTo: string) {
    const url = publicUrl + "/art/" + artworkId;
    if(isSignedIn.value) {
      const originalRedirect = {
        pathname: "/messages",
        query: {
          artwork: encodeURIComponent(JSON.stringify({
            title: title,
            creator: creator,
            url: url
          })),
          referTo: referTo
        }
      }
        router.push(originalRedirect);
    }else{
      setPurchaseRequestDialogData({
        title: title,
        creator: creator,
        url: url,
        referTo: referTo
      })
      togglePurchaseRequestDialog();
    }
  }

  return (
    <>
      <Box className={s.rowsContainer}>
        <div>
          <SearchField onFilter={onFilter} tags={tags}></SearchField>
        </div>
        {showFilterLoadingSkeleton &&
          <>
            <div className={s.row}>
              {skeletonRows && skeletonRows.length > 0 &&
                <div className={s.row}>
                  {skeletonRows[0].map(image => {
                    return <DiscoverArtSkeleton
                      key={image.Name}
                      width={image.Width}
                      height={image.Height} />
                  })}
                </div>
              }
            </div>
            <div className={s.row}>
              {skeletonRows && skeletonRows.length > 0 &&
                <div className={s.row}>
                  {skeletonRows[1].map(image => {
                    return <DiscoverArtSkeleton
                      key={image.Name}
                      width={image.Width}
                      height={image.Height} />
                  })}
                </div>
              }
            </div>
          </>
        }
        {imageRows && imageRows.map((row: Image[], i) =>
          <div className={s.row} key={i}>
            {row.map(image => {
              let artwork = artworks.find(a => a.PrimaryFile.Name === image.Name);
              if (artwork) {
                return <ArtworkListItemDefined
                  key={image.Name}
                  width={smScreenOrSmaller ? '100%' : image.Width}
                  height={smScreenOrSmaller ? 'auto' : image.Height}
                  artwork={artwork}
                  onPurchaseRequestClick={onPurchaseRequestClick}
                  purchaseRequestAction={ActionType.KÖPFÖRFRÅGAN_LISTNING_UPPTÄCK}
                  onLikeClick={onLike} />
              }
            }
            )}
          </div>
        )}
         {!isLoading && loadMore &&
          <div className={s.row} ref={loadMoreElementRef}>
            {skeletonRows && skeletonRows.length > 0 &&
              <div className={s.row}>
                {skeletonRows[0].map(image => {
                  return <DiscoverArtSkeleton
                    key={image.Name}
                    width={image.Width}
                    height={image.Height} />
                })}
              </div>
            }
          </div>
        }
        <PurchaseRequestDialog 
          open={purchaseRequestDialogOpen} 
          onClose={togglePurchaseRequestDialog} 
          props={{
            pathname: "/messages",
            title: purchaseRequestDialogData.title,
            creator: purchaseRequestDialogData.creator,
            url: purchaseRequestDialogData.url,
            referTo: purchaseRequestDialogData.referTo
          }}
        />
      </Box>
    </>
  );
}
