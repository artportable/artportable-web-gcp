import { Collapse, Divider, ListItem, ListItemText, MenuItem, TextField } from "@material-ui/core";
import { ExpandLess, ExpandMore, LaptopWindowsTwoTone, TrendingUpRounded } from "@material-ui/icons";
import { useTranslation } from "next-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { useMainWidth } from "../../hooks/useWidth";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import { styles } from "./discoverTrendingArtTab.css";


interface DiscoverTrendingArtTabProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
}

const DiscoverTrendingArtTab = memo((props: DiscoverTrendingArtTabProps) => {
  const s = styles();
  const { t } = useTranslation(['header', 'common', 'support']);
  const { username, socialId, rowWidth } = props
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const [loadMoreArtworks, setLoadMoreArtworks] = useState<boolean>(true);
  const loadMoreArtworksElementRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const tags = useGetTags();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const token = useContext(TokenContext);
  const { like } = usePostLike();
  const [sold, setSold] = useState("All");

  function filter(tags: string[], searchQuery = "") {
    setLoadMoreArtworks(true);
    setSelectedTags(tags);
    setSearchQuery(searchQuery);
  }

  function likeArtwork(artworkId, isLike) {
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId, token);
  }

  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey<Artwork>(loadMoreArtworksElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        console.log(previousPageData.next, ".next")
        setLoadMoreArtworks(false);
        return null;
      }
      if (pageIndex == 0) {
        let url;
        if (sold === "Unsold") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trendingunsold`);
        }
        else if (sold === "Sold") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trendingsold`);
        }
        else if (sold === "All") {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);
        }
        else {
          url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);
        }
        selectedTags.forEach(tag => {
          url.searchParams.append('tag', tag);
        });
        if (searchQuery) {
          url.searchParams.append('q', searchQuery);
        }
        if (username && username != '') {
          url.searchParams.append('myUsername', username);
        }
        url.searchParams.append('page', (pageIndex + 1).toString());
        url.searchParams.append('pageSize', "20");
        return url.href;
      }
      return previousPageData.next;
    }, username);
  const [openListingPages, setOpenListingPages] = useState(false);
  function handleClickListingPages(event) {
    setOpenListingPages(!openListingPages);
    event.stopPropagation();
  }
  const [openContact, setOpenContact] = useState(false);
  const handleClickContact = () => {
    setOpenContact(true);
  };

  const [listStatus, setListStatus] = useState("Sortera på...");

  const subjectOptions = [
    {
      value: 'All',
      label: "All"
    },
    {
      value: 'Sold',
      label: "Sold"
    },
    {
      value: 'Unsold',
      label: "UnSold"
    },
  ];

  return (
    <>
      <form className={s.form}>
        <div className={s.textFieldFlex}>
          <TextField
            // classes={{
            //   root: s.textField
            // }}
            className={s.textFieldTwo}
            fullWidth
            select
            required
            variant="outlined"
            value={sold}
          >
            {subjectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value} onClick={() => setSold(option.value)}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </form>
      {!tags?.isLoading && !tags?.isError && tags?.data &&
        <DiscoverArt
          artworks={artworks}
          tags={tags?.data}
          onFilter={filter}
          onLike={likeArtwork}
          rowWidth={rowWidth}
          loadMoreElementRef={loadMoreArtworksElementRef}
          isLoading={isLoadingArtWorks}
          loadMore={loadMoreArtworks}
        />
      }
    </>
  );
})

export default DiscoverTrendingArtTab
