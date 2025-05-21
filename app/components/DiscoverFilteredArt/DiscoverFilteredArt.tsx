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
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import SearchField from "../SearchField/SearchField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

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
  selectedCategory?: any;
  search?: any;
  selectedPrice?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
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
  const [searchQuery, setSearchQuery] = useState("");
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

  const { open, setOpen } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrientationChangeMobile = (value) => {
    if (isMobile) {
      setTempSelectedOrientation(String(value));
    } else {
      setTempSelectedOrientation(String(value));
      setSelectedOrientation(String(value));
      setSelectedTrending(tempSelectedTrending);
      setSelectedTags(selectedTempTags);
      setSelectedSize(selectedTempSize);
      setSelectedPrice(tempSelectedPrice);
      setSelectedState(selectedTempState);
      setSelectedHeight(tempSelectedHeight);
      setSelectedWidth(tempSelectedWidth);
    }
  };
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery) {
      filter(searchQuery);
    }
  }, [searchQuery]);

  function filter(tags: string, searchQuery = "") {
    props.loadImages();
  }

  useEffect(() => {
    if (props.selectedCategory) {
      setSelectedTechnique(props.selectedCategory);
    }
  }, [props.selectedCategory]);

  useEffect(() => {
    if (props.selectedPrice) {
      setSelectedPrice(props.selectedPrice);
    }
  }, [props.selectedPrice]);

  const handleTechniqueChangeMobile = (newTag: string) => {
    if (isMobile) {
      setSelectedTechnique(newTag);
    } else {
      setSelectedTechnique(newTag);
      setSelectedTrending(tempSelectedTrending);
      setSelectedTags(selectedTempTags);
      setSelectedSize(selectedTempSize);
      setSelectedOrientation(tempSelectedOrientation);
      setSelectedPrice(tempSelectedPrice);
      setSelectedState(selectedTempState);
      setSelectedHeight(tempSelectedHeight);
      setSelectedWidth(tempSelectedWidth);
    }
  };

  const handleThemeChangeMobile = (newTag: string) => {
    if (isMobile) {
      setSelectedTheme(newTag);
    } else {
      setSelectedTheme(newTag);
      setSelectedTrending(tempSelectedTrending);
      setSelectedTags(selectedTempTags);
      setSelectedSize(selectedTempSize);
      setSelectedOrientation(tempSelectedOrientation);
      setSelectedPrice(tempSelectedPrice);
      setSelectedState(selectedTempState);
      setSelectedHeight(tempSelectedHeight);
      setSelectedWidth(tempSelectedWidth);
    }
  };

  const handleMediumChangeMobile = (newTag: string) => {
    if (isMobile) {
      setSelectedMedium(newTag);
    } else {
      setSelectedMedium(newTag);
      setSelectedTrending(tempSelectedTrending);
      setSelectedTags(selectedTempTags);
      setSelectedSize(selectedTempSize);
      setSelectedOrientation(tempSelectedOrientation);
      setSelectedPrice(tempSelectedPrice);
      setSelectedState(selectedTempState);
      setSelectedHeight(tempSelectedHeight);
      setSelectedWidth(tempSelectedWidth);
    }
  };

  const handleStateChange = (value: string) => {
    if (isMobile) {
      setSelectedTempState(value);
    } else {
      setSelectedTempState(value);
      setSelectedState(value);
      setSelectedTrending(tempSelectedTrending);
      setSelectedTags(selectedTempTags);
      setSelectedSize(selectedTempSize);
      setSelectedOrientation(tempSelectedOrientation);
      setSelectedPrice(tempSelectedPrice);
      setSelectedHeight(tempSelectedHeight);
      setSelectedWidth(tempSelectedWidth);
    }
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

  const [orderByFilter, setOrderByFilter] = useState(props.page || "latest");

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleByOrder = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    setOrderByFilter(event.target.value as string);
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

        if (props?.page) {
          url.searchParams.append("orderBy", orderByFilter);
        }
        if (props?.selectedCategory) {
          url.searchParams.append("tag", props.selectedCategory);
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
        if (props?.search) {
          url.searchParams.append("q", props?.search);
        }
        if (username && username !== "") {
          url.searchParams.append("myUsername", username);
        }
        url.searchParams.append("pageSize", "5");
        url.searchParams.append("page", (pageIndex + 1).toString());

        return url.href;
      },
      username
    );

  useEffect(() => {}, [artworks]);

  

  return (
    <>
      <div
        style={{
          marginRight: "50px",
          marginLeft: "50px",
        }}
      >
        <div
        className={s.buttonsOne}
        
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
                {t("common:selectOptions:clearFilter")}
              </Button>
            )}
          </div>
      <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>    <Stack 
        direction="row" 
        spacing={1} 
        className={s.chipStack}
        sx={{ 
      
          gap: 1, 
          mt: 2, 
          mb: 2,
          justifyContent: open ? 'flex-start' : 'flex-start',
       
          width: open ? "75%" : "100%",
          marginLeft: open ? "auto" : "0",
        }}>
          {selectedTechnique && (
            <Chip
              label={t(`common:techniques:${selectedTechnique}`)}
              onDelete={() => setSelectedTechnique(null)}
     
              className={s.chipStyle}
            />
          )}
          {selectedTheme && (
            <Chip
              label={t(`common:themes:${selectedTheme}`)}
              onDelete={() => setSelectedTheme(null)}
              className={s.chipStyle}
            />
          )}
          {selectedMedium && (
            <Chip
              label={t(`common:medium:${selectedMedium}`)}
              onDelete={() => setSelectedMedium(null)}
              className={s.chipStyle}
            />
          )}
          {selectedState && (
            <Chip
              label={t(`locations:${selectedState}`)}
              onDelete={() => {
                setSelectedState(null);
                setSelectedTempState(null);
              }}
              className={s.chipStyle}
            />
          )}
          {tempSelectedOrientation && (
            <Chip
              label={t(`common:selectOptions:${tempSelectedOrientation}`)}
              onDelete={() => {
                setSelectedOrientation(null);
                setTempSelectedOrientation(null);
              }}
              className={s.chipStyle}
            />
          )}
          {Array.isArray(selectedPrice) && (
            <Chip
              label={`${selectedPrice[0].toLocaleString()} - ${selectedPrice[1].toLocaleString()}`}
              onDelete={() => {
                setSelectedPrice(null);
                setTempSelectedPrice(null);
              }}
              className={s.chipStyle}
            />
          )}
          {Array.isArray(selectedHeight) && (
            <Chip
              label={`${t("common:selectOptions:height")}: ${selectedHeight[0]} - ${selectedHeight[1]} cm`}
              onDelete={() => {
                setSelectedHeight(null);
                setTempSelectedHeight(null);
              }}
              className={s.chipStyle} 
            />
          )}
          {Array.isArray(selectedWidth) && (
            <Chip
              label={`${t("common:selectOptions:width")}: ${selectedWidth[0]} - ${selectedWidth[1]} cm`}
              onDelete={() => {
                setSelectedWidth(null);
                setTempSelectedWidth(null);
              }}
              className={s.chipStyle}
            />
          )}
        </Stack>

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
          disableAutoFocus
          style={{ 
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
          }}
        >
          <div style={{ 
            cursor: "pointer", 
            display: "flex", 
            justifyContent: "flex-end",
            padding: '16px'
          }} onClick={handleClose}>
            <CloseIcon />
          </div>
          
          <DialogContent className={s.dialogContent}>
            <List className={s.mobileList}>
              <div className={s.formControllWrapper}>
                <> <div className={s.filtertitleTop}>
                Sortera på
              </div>
                 <FormControl className={s.formControl}>
                  <Select
                     disableUnderline
                    value={orderByFilter}
                    onChange={handleByOrder}
                    MenuProps={{ disableScrollLock: true }}
                    className={s.selectMenu}
                  >
                    <MenuItem style={{textAlign: 'start'}} value="likes">
                      {t("common:selectOptions:relevance")}
                    </MenuItem>
                    <MenuItem style={{justifyContent: 'flex-start'}} value="latest">
                      {t("common:selectOptions:latest")}
                    </MenuItem>
                    <MenuItem style={{justifyContent: 'flex-start'}} value="lowestPrice">
                      {t("common:selectOptions:lowestPrice")}
                    </MenuItem>
                    <MenuItem style={{justifyContent: 'flex-start'}} value="highestPrice">
                      {t("common:selectOptions:hightestPrice")}
                    </MenuItem>
                  </Select>
                </FormControl></>
          
                <div className={s.filtertitle}>
                  {t("common:selectOptions:technique")}
                </div>
                <FormControl className={s.formControl}>
                  <Select
                    labelId="theme-select-label"
                    value={selectedTechnique || ""}
                    onChange={(e) =>
                      handleTechniqueChangeMobile(
                        (e.target.value as string) || props?.selectedCategory
                      )
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
                    onChange={(e) =>
                      handleStateChange(e.target.value as string)
                    }
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
                  
                    <Slider
                      className={s.slider}
                      value={Array.isArray(tempSelectedPrice) ? tempSelectedPrice : [minPrice, maxPrice]}
                      onChange={(event, newValue) => {
                        if (isMobile) {
                          setTempSelectedPrice(newValue as [number, number]);
                        } else {
                          setTempSelectedPrice(newValue as [number, number]);
                          setSelectedPrice(newValue as [number, number]);
                          setSelectedTrending(tempSelectedTrending);
                          setSelectedTags(selectedTempTags);
                          setSelectedSize(selectedTempSize);
                          setSelectedOrientation(tempSelectedOrientation);
                          setSelectedState(selectedTempState);
                          setSelectedHeight(tempSelectedHeight);
                          setSelectedWidth(tempSelectedWidth);
                        }
                      }}
                      valueLabelDisplay="off"
                      min={minPrice}
                      max={maxPrice}
                      step={100}
                    />
                      <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={tempSelectedPrice && tempSelectedPrice[0] !== null ? tempSelectedPrice[0].toLocaleString() : ''}
                          placeholder={minPrice.toLocaleString()}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/\s/g, '');
                            const value = rawValue === '' ? null : 
                                        isNaN(Number(rawValue)) ? tempSelectedPrice?.[0] : Number(rawValue);
                            const newValue = [value, tempSelectedPrice ? tempSelectedPrice[1] : maxPrice] as [number, number];
                            if (isMobile) {
                              setTempSelectedPrice(newValue);
                            } else {
                              setTempSelectedPrice(newValue);
                              setSelectedPrice(newValue);
                              setSelectedTrending(tempSelectedTrending);
                              setSelectedTags(selectedTempTags);
                              setSelectedSize(selectedTempSize);
                              setSelectedOrientation(tempSelectedOrientation);
                              setSelectedState(selectedTempState);
                              setSelectedHeight(tempSelectedHeight);
                              setSelectedWidth(tempSelectedWidth);
                            }
                          }}
                          style={{ width: "80px", marginRight: "5px" }}
                        />
                        <span>SEK</span>
                      </div>
                      -
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={tempSelectedPrice && tempSelectedPrice[1] !== null ? tempSelectedPrice[1].toLocaleString() : ''}
                          placeholder={maxPrice.toLocaleString()}
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/\s/g, '');
                            const value = rawValue === '' ? null : 
                                        isNaN(Number(rawValue)) ? tempSelectedPrice?.[1] : Number(rawValue);
                            const newValue = [tempSelectedPrice ? tempSelectedPrice[0] : minPrice, value] as [number, number];
                            if (isMobile) {
                              setTempSelectedPrice(newValue);
                            } else {
                              setTempSelectedPrice(newValue);
                              setSelectedPrice(newValue);
                              setSelectedTrending(tempSelectedTrending);
                              setSelectedTags(selectedTempTags);
                              setSelectedSize(selectedTempSize);
                              setSelectedOrientation(tempSelectedOrientation);
                              setSelectedState(selectedTempState);
                              setSelectedHeight(tempSelectedHeight);
                              setSelectedWidth(tempSelectedWidth);
                            }
                          }}
                          style={{ width: "80px", marginRight: "5px" }}
                        />
                        <span>SEK</span>
                      </div>
                    </div>
                  </div>
                </FormControl>

                <div className={s.filtertitle}>
                  {" "}
                  {t("common:selectOptions:height")}
                </div>

                <FormControl className={s.formControl}>
                  <div>
                
                    <Slider
                      className={s.slider}
                      value={tempSelectedHeight || [minHeight, maxHeight]}
                      onChange={(event, newValue) => {
                        if (isMobile) {
                          setTempSelectedHeight(newValue as [number, number]);
                        } else {
                          setTempSelectedHeight(newValue as [number, number]);
                          setSelectedHeight(newValue as [number, number]);
                          setSelectedTrending(tempSelectedTrending);
                          setSelectedTags(selectedTempTags);
                          setSelectedSize(selectedTempSize);
                          setSelectedOrientation(tempSelectedOrientation);
                          setSelectedPrice(tempSelectedPrice);
                          setSelectedState(selectedTempState);
                          setSelectedWidth(tempSelectedWidth);
                        }
                      }}
                      valueLabelDisplay="off"
                      min={minHeight}
                      max={maxHeight}
                      step={10}
                    />
                        <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={tempSelectedHeight && tempSelectedHeight[0] !== null ? tempSelectedHeight[0].toString() : ''}
                          placeholder={minHeight.toString()}
                          onChange={(e) => {
                            const value = e.target.value === '' ? null : 
                                        isNaN(Number(e.target.value)) ? tempSelectedHeight?.[0] : Number(e.target.value);
                            const newValue = [value, tempSelectedHeight ? tempSelectedHeight[1] : maxHeight] as [number, number];
                            if (isMobile) {
                              setTempSelectedHeight(newValue);
                            } else {
                              setTempSelectedHeight(newValue);
                              setSelectedHeight(newValue);
                              setSelectedTrending(tempSelectedTrending);
                              setSelectedTags(selectedTempTags);
                              setSelectedSize(selectedTempSize);
                              setSelectedOrientation(tempSelectedOrientation);
                              setSelectedPrice(tempSelectedPrice);
                              setSelectedState(selectedTempState);
                              setSelectedWidth(tempSelectedWidth);
                            }
                          }}
                          style={{ width: "80px", marginRight: "5px" }}
                        />
                        <span>cm</span>
                      </div>
                      -
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={tempSelectedHeight && tempSelectedHeight[1] !== null ? tempSelectedHeight[1].toString() : ''}
                          placeholder={maxHeight.toString()}
                          onChange={(e) => {
                            const value = e.target.value === '' ? null : 
                                        isNaN(Number(e.target.value)) ? tempSelectedHeight?.[1] : Number(e.target.value);
                            const newValue = [tempSelectedHeight ? tempSelectedHeight[0] : minHeight, value] as [number, number];
                            if (isMobile) {
                              setTempSelectedHeight(newValue);
                            } else {
                              setTempSelectedHeight(newValue);
                              setSelectedHeight(newValue);
                              setSelectedTrending(tempSelectedTrending);
                              setSelectedTags(selectedTempTags);
                              setSelectedSize(selectedTempSize);
                              setSelectedOrientation(tempSelectedOrientation);
                              setSelectedPrice(tempSelectedPrice);
                              setSelectedState(selectedTempState);
                              setSelectedWidth(tempSelectedWidth);
                            }
                          }}
                          style={{ width: "80px", marginRight: "5px" }}
                        />
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                </FormControl>

                <div className={s.filtertitle}>
                  {" "}
                  {t("common:selectOptions:width")}
                </div>

                <FormControl className={s.formControl}>
                  <div>
                  
                    <Slider
                      className={s.slider}
                      value={tempSelectedWidth || [minWidth, maxWidth]}
                      onChange={(event, newValue) => {
                        if (isMobile) {
                          setTempSelectedWidth(newValue as [number, number]);
                        } else {
                          setTempSelectedWidth(newValue as [number, number]);
                          setSelectedWidth(newValue);
                          setSelectedTrending(tempSelectedTrending);
                          setSelectedTags(selectedTempTags);
                          setSelectedSize(selectedTempSize);
                          setSelectedOrientation(tempSelectedOrientation);
                          setSelectedPrice(tempSelectedPrice);
                          setSelectedState(selectedTempState);
                          setSelectedHeight(tempSelectedHeight);
                        }
                      }}
                      valueLabelDisplay="off"
                      min={minWidth}
                      max={maxWidth}
                      step={10}
                    />
                      <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={tempSelectedWidth && tempSelectedWidth[0] !== null ? tempSelectedWidth[0].toString() : ''}
                          placeholder={minWidth.toString()}
                          onChange={(e) => {
                            const value = e.target.value === '' ? null : 
                                        isNaN(Number(e.target.value)) ? tempSelectedWidth?.[0] : Number(e.target.value);
                            const newValue = [value, tempSelectedWidth ? tempSelectedWidth[1] : maxWidth] as [number, number];
                            if (isMobile) {
                              setTempSelectedWidth(newValue);
                            } else {
                              setTempSelectedWidth(newValue);
                              setSelectedWidth(newValue);
                              setSelectedTrending(tempSelectedTrending);
                              setSelectedTags(selectedTempTags);
                              setSelectedSize(selectedTempSize);
                              setSelectedOrientation(tempSelectedOrientation);
                              setSelectedPrice(tempSelectedPrice);
                              setSelectedState(selectedTempState);
                              setSelectedHeight(tempSelectedHeight);
                            }
                          }}
                          style={{ width: "80px", marginRight: "5px" }}
                        />
                        <span>cm</span>
                      </div>
                       -
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={tempSelectedWidth && tempSelectedWidth[1] !== null ? tempSelectedWidth[1].toString() : ''}
                          placeholder={maxWidth.toString()}
                          onChange={(e) => {
                            const value = e.target.value === '' ? null : 
                                        isNaN(Number(e.target.value)) ? tempSelectedWidth?.[1] : Number(e.target.value);
                            const newValue = [tempSelectedWidth ? tempSelectedWidth[0] : minWidth, value] as [number, number];
                            if (isMobile) {
                              setTempSelectedWidth(newValue);
                            } else {
                              setTempSelectedWidth(newValue);
                              setSelectedWidth(newValue);
                              setSelectedTrending(tempSelectedTrending);
                              setSelectedTags(selectedTempTags);
                              setSelectedSize(selectedTempSize);
                              setSelectedOrientation(tempSelectedOrientation);
                              setSelectedPrice(tempSelectedPrice);
                              setSelectedState(selectedTempState);
                              setSelectedHeight(tempSelectedHeight);
                            }
                          }}
                          style={{ width: "80px", marginRight: "5px" }}
                        />
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                </FormControl>
              </div>
            </List>
          </DialogContent>
          <div className={s.activeFilterContainer}>
            {isMobile && (
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
                    setOpen(!isMobile ? true : false);
                  }}
                  className={s.activeFilterResult}
                >
                  {t("common:selectOptions:showResult")}
                </Button>
              </div>
            )}
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
