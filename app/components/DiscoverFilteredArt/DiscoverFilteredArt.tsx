import { useTranslation } from "next-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { NavigationContext } from "../../contexts/navigation-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import {
  THEME_TAGS,
  TECHNIQUE_TAGS,
  MEDIUM_TAGS,
} from "../DiscoverTrendingArtTab/tags";
import { styles } from "./discoverFilteredArt.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@material-ui/icons/Close";
import { Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { countryStates } from "../../../public/data/countryStates";
import Slider from "@mui/material/Slider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import PanoramaVerticalIcon from "@material-ui/icons/PanoramaVertical";
import PanoramaHorizontalIcon from "@material-ui/icons/PanoramaHorizontal";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import HeaderComponent from "./HeaderComponent";

interface DiscoverFilteredArtProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
  header?: string;
  page: string;
}

const DiscoverFilteredArt = memo((props: DiscoverFilteredArtProps) => {
  const { t } = useTranslation([
    "header",
    "common",
    "support",
    "discover",
    "locations",
  ]);
  const s = styles();
  const { username, socialId, rowWidth, header } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const loadMoreArtworksElementRef = useRef(null);
  const tags = useGetTags();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    selectedTags,
    setSelectedTags,
    selectedTheme,
    setSelectedTheme,
    selectedTechnique,
    setSelectedTechnique,
    selectedMedium,
    setSelectedMedium,
    selectedSize,
    setSelectedSize,
    selectedPrice,
    setSelectedPrice,
    selectedTrending,
    setSelectedTrending,
    selectedOrientation,
    setSelectedOrientation,
    selectedTempTags,
    setTempSelectedTags,
    selectedTempSize,
    setTempSelectedSize,
    tempSelectedTrending,
    setTempSelectedTrending,
    tempSelectedOrientation,
    setTempSelectedOrientation,
    tempSelectedPrice,
    setTempSelectedPrice,
    setSelectedState,
    selectedState,
    setSelectedTempState,
    selectedTempState,
    selectedHeight,
    setSelectedHeight,
    tempSelectedHeight,
    setTempSelectedHeight,
    selectedWidth,
    setSelectedWidth,
    tempSelectedWidth,
    setTempSelectedWidth,
  } = useContext(NavigationContext);

  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrientationChangeMobile = (value) => {
    setTempSelectedOrientation(String(value));
  };

  function filter(tags: string[], searchQuery = "") {
    props.loadImages();
  }

  const handleTechniqueChangeMobile = (newTag: string) => {
    setSelectedTechnique(newTag);
  };

  const handleThemeChangeMobile = (newTag: string) => {
    setSelectedTheme(newTag);
  };

  const handleMediumChangeMobile = (newTag: string) => {
    setSelectedMedium(newTag);
  };

  const handleStateChange = (value: string) => {
    setSelectedTempState(value);
  };

  const resetFiltersMobile = () => {
    setTempSelectedTrending(null);
    setTempSelectedTags([]);
    setTempSelectedSize(null);
    setSelectedTags([]);
    setSelectedOrientation(null);
    setSelectedSize(null);
    setSelectedPrice(null);
    setSelectedTrending(null);
    setTempSelectedOrientation(null);
    setTempSelectedPrice(null);
    setSelectedTechnique(null);
    setSelectedTheme(null);
    setSelectedMedium(null);
    setSelectedState(null);
    setSelectedTempState(null);
    setTempSelectedHeight(null);
    setSelectedHeight(null);
    setSelectedWidth(null);
    setTempSelectedWidth(null);
  };

  useEffect(() => {}, [handleClose, resetFiltersMobile]);

  const [orderByFilter, setOrderByFilter] = useState(props.page || "");

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleByOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    setOrderByFilter(event.target.value as string); // Ensure the correct value is passed.
  };

  const isFilterActiveMobile = () => {
    return (
      selectedTempTags.length > 0 ||
      selectedTempSize !== null ||
      tempSelectedTrending !== null ||
      tempSelectedOrientation !== null ||
      tempSelectedPrice !== null ||
      selectedTechnique !== null ||
      selectedTheme !== null ||
      selectedMedium !== null ||
      selectedState !== null ||
      selectedPrice !== null ||
      selectedHeight !== null ||
      tempSelectedHeight !== null ||
      selectedWidth !== null ||
      tempSelectedWidth !== null ||
      selectedTempState !== null
    );
  };

  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(500);

  const [minWidth, setMinWidth] = useState(0);
  const [maxWidth, setMaxWidth] = useState(500);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const [loading, setLoading] = useState(false);
  const { data: artworks, isLoading: isLoadingArtWorks } =
    useInfiniteScrollWithKey<Artwork>(
      loadMoreArtworksElementRef,
      (pageIndex, previousPageData) => {
        if (loading && !props.loadMore) {
          props.loadImages();
          setLoading(false);
        }
        if (previousPageData && !previousPageData.next) {
          props.stopLoadImages();
          setLoading(true);
          return null;
        }

        let url = new URL(`${apiBaseUrl}/api/Discover/artworks/filter`);

        if (props.page) {
          url.searchParams.append("orderBy", orderByFilter);
        }
        if (selectedTechnique) {
          url.searchParams.append("tag", selectedTechnique);
        }
        if (selectedTheme) {
          url.searchParams.append("tag", selectedTheme);
        }
        if (selectedMedium) {
          url.searchParams.append("tag", selectedMedium);
        }
        if (selectedOrientation) {
          url.searchParams.append("orientation", selectedOrientation);
        }
        if (selectedSize) {
          url.searchParams.append("sizeFilter", selectedSize);
        }
        if (selectedPrice) {
          url.searchParams.append("priceFilter", selectedPrice);
        }
        if (selectedHeight?.[0] !== undefined && selectedHeight?.[0] !== null) {
          url.searchParams.append("minHeight", `${selectedHeight[0]}`);
        }
        if (selectedHeight?.[1] !== undefined && selectedHeight?.[1] !== null) {
          url.searchParams.append("maxHeight", `${selectedHeight[1]}`);
        }
        if (selectedWidth?.[0] !== undefined && selectedWidth?.[0] !== null) {
          url.searchParams.append("minWidth", `${selectedWidth[0]}`);
        }
        if (selectedWidth?.[1] !== undefined && selectedWidth?.[1] !== null) {
          url.searchParams.append("maxWidth", `${selectedWidth[1]}`);
        }
        if (selectedState) {
          url.searchParams.append("stateFilter", selectedState);
        }
        if (searchQuery) {
          url.searchParams.append("q", searchQuery);
        }
        if (username && username !== "") {
          url.searchParams.append("myUsername", username);
        }
        url.searchParams.append("pageSize", "6");
        url.searchParams.append("page", (pageIndex + 1).toString());

        return url.href;
      },
      username
    );

  useEffect(() => {}, [artworks]);

  return (
    <>
      <HeaderComponent filterOpen={open} page={props.page}></HeaderComponent>
      <div
        style={{
          width: open ? "85%" : "100%",
          marginRight: "0",
          marginLeft: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div className={s.activeButtons}>
            {!open && (
              <Button
                className={s.mobileButton}
                variant="outlined"
                onClick={handleClickOpen}
              >
                <Typography>{t("common:selectOptions:filter")}</Typography>
                <TuneIcon className={s.tuneIcon} />
              </Button>
            )}
            {isFilterActiveMobile() && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  resetFiltersMobile();
                }}
                variant="outlined"
                color="secondary"
                className={s.activeFilterClearOnScreen}
              >
                <Typography>
                  {" "}
                  {t("common:selectOptions:clearFilter")}
                </Typography>
              </Button>
            )}
          </div>
          <div>
            {" "}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={orderByFilter}
                onChange={handleByOrder}
                MenuProps={{ disableScrollLock: true }}
              >
                <MenuItem value="likes">
                  {t("common:selectOptions:relevance")}
                </MenuItem>
                <MenuItem value="latest">
                  {" "}
                  {t("common:selectOptions:latest")}
                </MenuItem>
                <MenuItem value="lowestPrice">
                  {" "}
                  {t("common:selectOptions:lowestPrice")}
                </MenuItem>
                <MenuItem value="highestPrice">
                  {" "}
                  {t("common:selectOptions:hightestPrice")}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className={s.mobileContainer1}>
        <Dialog
          className={s.dialogContainer}
          fullScreen
          open={open}
          onClose={handleClose}
          disableScrollLock={!isMobile}
          hideBackdrop={!isMobile}
        >
          <div className={s.filterTitleClose}>
            <div>
              <TuneIcon />
            </div>
            {t("common:selectOptions:doFilter")}

            <div style={{ cursor: "pointer" }} onClick={handleClose}>
              <CloseIcon></CloseIcon>
            </div>
          </div>
          <List className={s.mobileList}>
            <div className={s.formControllWrapper}>
              <div className={s.filtertitle}>
                {t("common:selectOptions:technique")}
              </div>
              <FormControl className={s.formControl}>
                <Select
                  labelId="theme-select-label"
                  value={selectedTechnique || ""}
                  onChange={(e) =>
                    handleTechniqueChangeMobile(e.target.value as string)
                  } // Type assertion here
                  displayEmpty
                  className={s.selectMenu}
                  disableUnderline
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span
                          style={{
                            margin: "10px",
                            color: "black",
                          }}
                        >
                          {t("common:selectOptions:allTechniques")}
                        </span>
                      );
                    }
                    return t(`common:techniques:${selected}`);
                  }}
                >
                  {Object.keys(TECHNIQUE_TAGS).map((key) => (
                    <MenuItem key={key} value={key}>
                      {t(`common:techniques:${key}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className={s.filtertitle}>
                {t("common:selectOptions:theme")}
              </div>
              <FormControl className={s.formControl}>
                <Select
                  labelId="theme-select-label"
                  value={selectedTheme || ""}
                  onChange={(e) =>
                    handleThemeChangeMobile(e.target.value as string)
                  } // Type assertion here
                  displayEmpty
                  className={s.selectMenu}
                  disableUnderline
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span
                          style={{
                            margin: "10px",
                            color: "black",
                          }}
                        >
                          {t("common:selectOptions:allThemes")}
                        </span>
                      );
                    }
                    return t(`common:themes:${selected}`);
                  }}
                >
                  {Object.keys(THEME_TAGS).map((key) => (
                    <MenuItem key={key} value={key}>
                      {t(`common:themes:${key}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className={s.filtertitle}>
                {t("common:selectOptions:medium")}
              </div>
              <FormControl className={s.formControl}>
                <Select
                  labelId="theme-select-label"
                  value={selectedMedium || ""}
                  onChange={(e) =>
                    handleMediumChangeMobile(e.target.value as string)
                  } // Type assertion here
                  displayEmpty
                  className={s.selectMenu}
                  disableUnderline
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span
                          style={{
                            margin: "10px",
                            color: "black",
                          }}
                        >
                          {t("common:selectOptions:allMedium")}
                        </span>
                      );
                    }
                    return t(`common:medium:${selected}`);
                  }}
                >
                  {Object.keys(MEDIUM_TAGS).map((key) => (
                    <MenuItem key={key} value={key}>
                      {t(`common:techniques:${key}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className={s.filtertitle}>
                {t("common:selectOptions:place")}
              </div>
              <FormControl className={s.formControl}>
                <Select
                  labelId="county-select-label"
                  value={selectedTempState || ""}
                  onChange={(e) => handleStateChange(e.target.value as string)}
                  displayEmpty
                  className={s.selectMenu}
                  disableUnderline
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span
                          style={{
                            margin: "10px",
                            color: "black",
                          }}
                        >
                          {t("common:allLocations")}
                        </span>
                      );
                    }
                    return t(`locations:${selected}`);
                  }}
                >
                  {countryStates?.map((state, index) => (
                    <MenuItem key={index} value={state.state}>
                      {t(`locations:${state?.state}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className={s.filtertitle}>
                {t("common:selectOptions:format")}
              </div>
              <FormControl className={s.orientation}>
                <div
                  className={s.format}
                  style={{
                    backgroundColor:
                      tempSelectedOrientation === "Vertical"
                        ? "rgba(236, 236, 236, 1)"
                        : "transparent",
                  }}
                  onClick={() => handleOrientationChangeMobile("Vertical")}
                >
                  <PanoramaVerticalIcon
                    style={{ marginLeft: "18px", marginRight: "-18px" }}
                  ></PanoramaVerticalIcon>{" "}
                  <div
                    style={{
                      fontSize: "16px",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {t("common:selectOptions:Vertical")}
                  </div>
                </div>

                <div
                  className={s.format}
                  style={{
                    backgroundColor:
                      tempSelectedOrientation === "Horizontal"
                        ? "rgba(236, 236, 236, 1)"
                        : "transparent",
                  }}
                  onClick={() => handleOrientationChangeMobile("Horizontal")}
                >
                  <PanoramaHorizontalIcon
                    style={{ marginLeft: "18px", marginRight: "-18px" }}
                  ></PanoramaHorizontalIcon>
                  <div
                    style={{
                      fontSize: "16px",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {t("common:selectOptions:Horizontal")}
                  </div>
                </div>
                <div
                  className={s.format}
                  style={{
                    backgroundColor:
                      tempSelectedOrientation === "Square"
                        ? "rgba(236, 236, 236, 1)"
                        : "transparent",
                  }}
                  onClick={() => handleOrientationChangeMobile("Square")}
                >
                  <CropSquareIcon
                    style={{
                      marginLeft: "18px",
                      marginRight: "-18px",
                    }}
                  ></CropSquareIcon>
                  <div
                    style={{
                      fontSize: "16px",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {t("common:selectOptions:Rectangle")}
                  </div>
                </div>
                <div
                  className={s.format}
                  style={{
                    backgroundColor:
                      tempSelectedOrientation === "Multiple"
                        ? "rgba(236, 236, 236, 1)"
                        : "transparent",
                  }}
                  onClick={() => handleOrientationChangeMobile("Multiple")}
                >
                  <AspectRatioIcon
                    style={{ marginLeft: "18px", marginRight: "-18px" }}
                  ></AspectRatioIcon>
                  <div
                    style={{
                      fontSize: "16px",
                      flex: 1,
                      textAlign: "center",
                    }}
                  >
                    {t("common:selectOptions:Multiple")}
                  </div>
                </div>
              </FormControl>

              <div className={s.filtertitle}>
                {t("common:selectOptions:price")}
              </div>

              <FormControl className={s.formControl}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: " space-between",
                    }}
                  >
                    <Typography>
                      {tempSelectedPrice ? tempSelectedPrice[0] : minPrice} SEK
                    </Typography>
                    <Typography>
                      {tempSelectedPrice ? tempSelectedPrice[1] : maxPrice} SEK
                    </Typography>
                  </div>
                  <Slider
                    className={s.slider}
                    value={tempSelectedPrice || [minPrice, maxPrice]}
                    onChange={(event, newValue) =>
                      setTempSelectedPrice(newValue as [number, number])
                    }
                    valueLabelDisplay="off"
                    min={minPrice}
                    max={maxPrice}
                    step={100}
                  />
                </div>
              </FormControl>

              <div className={s.filtertitle}>
                {" "}
                {t("common:selectOptions:height")}
              </div>

              <FormControl className={s.formControl}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      {tempSelectedHeight ? tempSelectedHeight[0] : minHeight}{" "}
                      cm
                    </Typography>
                    <Typography>
                      {tempSelectedHeight ? tempSelectedHeight[1] : maxHeight}{" "}
                      cm
                    </Typography>
                  </div>
                  <Slider
                    className={s.slider}
                    value={tempSelectedHeight || [minHeight, maxHeight]}
                    onChange={(event, newValue) => {
                      setTempSelectedHeight(newValue as [number, number]);
                    }}
                    valueLabelDisplay="off"
                    min={minHeight}
                    max={maxHeight}
                    step={10}
                  />
                </div>
              </FormControl>

              <div className={s.filtertitle}>
                {" "}
                {t("common:selectOptions:width")}
              </div>

              <FormControl className={s.formControl}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>
                      {tempSelectedWidth ? tempSelectedWidth[0] : minWidth} cm
                    </Typography>
                    <Typography>
                      {tempSelectedWidth ? tempSelectedWidth[1] : maxWidth} cm
                    </Typography>
                  </div>
                  <Slider
                    className={s.slider}
                    value={tempSelectedWidth || [minWidth, maxWidth]}
                    onChange={(event, newValue) => {
                      setTempSelectedWidth(newValue as [number, number]);
                    }}
                    valueLabelDisplay="off"
                    min={minWidth}
                    max={maxWidth}
                    step={10}
                  />
                </div>
              </FormControl>
            </div>
          </List>
          <div className={s.activeFilterContainer}>
            <div className={s.activeFilter}>
              {isFilterActiveMobile() && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetFiltersMobile();
                  }}
                  variant="outlined"
                  color="secondary"
                  className={s.activeFilterClear}
                >
                  {t("common:selectOptions:clearFilter")}
                </Button>
              )}

              <Button
                onClick={() => {
                  setSelectedTrending(tempSelectedTrending);
                  setSelectedTags(selectedTempTags);
                  setSelectedSize(selectedTempSize);
                  setSelectedOrientation(tempSelectedOrientation);
                  setSelectedPrice(tempSelectedPrice);
                  setSelectedState(selectedTempState);
                  setSelectedHeight(tempSelectedHeight);
                  setSelectedWidth(tempSelectedWidth);
                  setOpen(isMobile ? true : false);
                }}
                className={s.activeFilterResult}
              >
                {t("common:selectOptions:showResult")}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>

      <DiscoverArt
        artworks={artworks}
        tags={tags?.data}
        onFilter={filter}
        rowWidth={rowWidth}
        loadMoreElementRef={loadMoreArtworksElementRef}
        isLoading={isLoadingArtWorks}
        loadMore={props.loadMore}
        activeTab={props.activeTab}
        trendingArtTab={false}
        likedArtTab={false}
        isFilterOpen={open}
        header={""}
      />
    </>
  );
});

export default DiscoverFilteredArt;
