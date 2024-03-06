import { useTranslation } from "next-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import { THEME_TAGS, TECHNIQUE_TAGS } from "./tags";
import { styles } from "./discoverTrendingArtTab.css";
// import EmblaCarousel, { formatAwArtworkForEmbla } from "../Carousel/Embla/EmblaCarousel"
import SelectedprintsCarousel from "../Carousel/SelectedprintsCarousel"
import { getRandomSequentialIndexes } from "../../utils/layoutUtils";
import SELECTED_PRINTS from "../../../data/selectedPrintsData";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import TuneIcon from "@mui/icons-material/Tune";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PhotoSizeSelectLargeOutlinedIcon from "@mui/icons-material/PhotoSizeSelectLargeOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

interface DiscoverTrendingArtTabProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
  header?: string,
}

const DiscoverTrendingArtTab = memo((props: DiscoverTrendingArtTabProps) => {
  const { t } = useTranslation(["header", "common", "support"]);
  const s = styles();
  const { username, socialId, rowWidth, header } = props;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const loadMoreArtworksElementRef = useRef(null);
  const tags = useGetTags();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const token = useContext(TokenContext);
  const { like } = usePostLike();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [selectedTempTags, setTempSelectedTags] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedTempSize, setTempSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedTrending, setSelectedTrending] = useState<string | null>(null);
  const [selectedOrientation, setSelectedOrientation] = useState<string | null>(
    null
  );

  const [tempSelectedTrending, setTempSelectedTrending] = useState<
    string | null
  >(null);
  const [tempSelectedOrientation, setTempSelectedOrientation] = useState<
    string | null
  >(null);
  const [tempSelectedPrice, setTempSelectedPrice] = useState<string | null>(
    null
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTrendingChangeMobile = (value: number) => {
    setTempSelectedTrending(String(value));
  };

  const handleOrientationChangeMobile = (value) => {
    setTempSelectedOrientation(String(value));
  };

  const handleSizeChangeMobile = (value: number) => {
    setTempSelectedSize(String(value));
  };

  const handlePriceChangeMobile = (value: any) => {
    setTempSelectedPrice(value);
  };

  function filter(tags: string[], searchQuery = "") {
    props.loadImages();
    setSelectedTags(tags);
    setSearchQuery(searchQuery);
  }

  function likeArtwork(artworkId, isLike) {
    redirectIfNotLoggedIn();
    like(artworkId, isLike, socialId, token);
  }

  const handleTagChangeMobile = (newTag: string) => {
    if (selectedTempTags.length < 4 && !selectedTempTags.includes(newTag)) {
      setTempSelectedTags((prevTags) => [...prevTags, newTag]);
    }
  };

  const handleTechniqueChangeMobile = (newTag: string) => {
    setSelectedTechnique(newTag);
  };

  const handleThemeChangeMobile = (newTag: string) => {
    setSelectedTheme(newTag);
  };

  const removeTagMobile = (tagToRemove: string) => {
    setTempSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
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
  };

  useEffect(() => {}, [handleClose, resetFiltersMobile]);

  const isFilterActiveMobile = () => {
    return (
      selectedTempTags.length > 0 ||
      selectedTempSize !== null ||
      tempSelectedTrending !== null ||
      tempSelectedOrientation !== null ||
      tempSelectedPrice !== null ||
      selectedTechnique !== null ||
      selectedTheme !== null
    );
  };

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

        let url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);

        selectedTags.forEach((tag) => {
          if (tag) {
            url.searchParams.append("tag", tag);
          }
        });

        if (selectedTechnique) {
          url.searchParams.append("tag", selectedTechnique);
        }

        if (selectedTheme) {
          url.searchParams.append("tag", selectedTheme);
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
        if (searchQuery) {
          url.searchParams.append("q", searchQuery);
        }
        if (username && username != "") {
          url.searchParams.append("myUsername", username);
        }

        url.searchParams.append("pageSize", "20");

        url.searchParams.append("page", (pageIndex + 1).toString());
        if (selectedTrending) {
          url.searchParams.append("likesSince", `-${selectedTrending}`);
        }

        return url.href;
      },
      username
    );

  useEffect(() => {}, [artworks]);

  // const [printsIndexes, setPrintIndexes] = useState<number[]>([])
  //   const maxPrintCount = 10
  //   useEffect(() => {
  //     if (printsIndexes.length > 0) return;
  //     // Decide randomly which prints to show in carousel.
  //     const randomIndexes = getRandomSequentialIndexes(SELECTED_PRINTS.length, maxPrintCount)
  //     setPrintIndexes(randomIndexes)
  //   }, [artworks])
    
  //   const randomPrints = printsIndexes.map(index => SELECTED_PRINTS[index])
  //   const printsDataForCarousel = formatAwArtworkForEmbla(randomPrints)

  return (
    <>
      <div className={s.mobileContainer1}>
        <Button
          className={s.mobileButton}
          variant="outlined"
          onClick={handleClickOpen}
        >
          <Typography>{t("common:selectOptions:filter")}</Typography>
          <TuneIcon className={s.tuneIcon} />
        </Button>
        <Dialog fullScreen open={open} onClose={handleClose}>
          <div className={s.mobileContainer}>
            <List className={s.mobileList}>
              <div className={s.mobileListItem}>
                <ListItem>{t("common:selectOptions:doFilter")}</ListItem>
                <Button onClick={handleClose}>
                  {t("common:selectOptions:close")}{" "}
                  <CancelPresentationIcon
                    className={s.cancelPresentationIcon}
                  />
                </Button>
              </div>
              <Divider />

              <div className={s.mobileAccordionWrapper}>
                <FormControl className={s.mobileFormControl}>
                  <Accordion className={s.mobileAccordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel-content"
                      id="panel-header"
                    >
                      <div className={s.mobileTitleIcon}>
                        <TrendingUpIcon className={s.mobileIcon} />
                        <Typography>
                          {tempSelectedTrending ? (
                            <div className={s.mobileTemp}>
                              {t(
                                `common:selectOptions:trending${tempSelectedTrending}`
                              )}
                            </div>
                          ) : (
                            t("common:selectOptions:trending")
                          )}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handleTrendingChangeMobile(7)}>
                        {t("common:selectOptions:trending")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography
                        onClick={() => handleTrendingChangeMobile(14)}
                      >
                        {t("common:selectOptions:trending14")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography
                        onClick={() => handleTrendingChangeMobile(30)}
                      >
                        {t("common:selectOptions:trending30")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography
                        onClick={() => handleTrendingChangeMobile(90)}
                      >
                        {t("common:selectOptions:trending90")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography
                        onClick={() => handleTrendingChangeMobile(365)}
                      >
                        {t("common:selectOptions:trending365")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography
                        onClick={() => handleTrendingChangeMobile(2000)}
                      >
                        {t("common:selectOptions:trending2000")}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </FormControl>
                <FormControl className={s.mobileFormControl}>
                  <Accordion className={s.mobileAccordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel-content"
                      id="panel-header"
                    >
                      <div className={s.mobileTitleIcon}>
                        <PaletteOutlinedIcon className={s.mobileIcon} />
                        <Typography>
                          {selectedTheme ? (
                            <div style={{ fontWeight: "bold" }}>
                              {t(`common:themes:${selectedTheme}`)}
                            </div>
                          ) : (
                            <div>{t("common:selectOptions:theme")}</div>
                          )}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <div className={s.mobileOverflow}>
                      {Object.keys(THEME_TAGS).map((key) => (
                        <div key={key}>
                          <ListItem
                            button
                            onClick={() => handleThemeChangeMobile(key)}
                          >
                            {t(`common:themes:${key}`)}
                          </ListItem>
                          <Divider />
                        </div>
                      ))}
                    </div>
                  </Accordion>
                </FormControl>
                <FormControl className={s.mobileFormControl}>
                  <Accordion className={s.mobileAccordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel-content"
                      id="panel-header"
                    >
                      <div className={s.mobileTitleIcon}>
                        <PaletteOutlinedIcon className={s.mobileIcon} />
                        <Typography>
                          {selectedTechnique ? (
                            <div style={{ fontWeight: "bold" }}>
                              {t(`common:techniques:${selectedTechnique}`)}
                            </div>
                          ) : (
                            <div>{t("common:selectOptions:technique")}</div>
                          )}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <div className={s.mobileOverflow}>
                      {Object.keys(TECHNIQUE_TAGS).map((key) => (
                        <div key={key}>
                          <ListItem
                            button
                            onClick={() => handleTechniqueChangeMobile(key)}
                          >
                            {t(`common:techniques:${key}`)}
                          </ListItem>
                          <Divider />
                        </div>
                      ))}
                    </div>
                  </Accordion>
                </FormControl>

                <div className={s.selectedTagWrapper}>
                  {selectedTempTags && (
                    <div className={s.selectedTagContainer}>
                      {selectedTempTags.map((tag, index) => (
                        <div key={index}>
                          <div className={s.selectedTags}>
                            <Typography className={s.mobileTag}>
                              {t("common:techniques:" + `${tag}`)}
                            </Typography>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                removeTagMobile(tag);
                              }}
                            >
                              <HighlightOffRoundedIcon
                                className={s.highlightIcon}
                              ></HighlightOffRoundedIcon>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <FormControl className={s.mobileFormControl}>
                  <Accordion className={s.mobileAccordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel-content"
                      id="panel-header"
                      className={s.mobileSummary}
                    >
                      <div className={s.mobileTitleIcon}>
                        <PhotoSizeSelectLargeOutlinedIcon
                          className={s.mobileIcon}
                        />
                        <Typography>
                          {selectedTempSize ? (
                            <div className={s.mobileTemp}>
                              {t(`common:selectOptions:${selectedTempSize}`)}
                            </div>
                          ) : (
                            t("common:selectOptions:size")
                          )}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handleSizeChangeMobile(30)}>
                        {t("common:selectOptions:30")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handleSizeChangeMobile(60)}>
                        {t("common:selectOptions:60")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handleSizeChangeMobile(100)}>
                        {t("common:selectOptions:100")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handleSizeChangeMobile(101)}>
                        {t("common:selectOptions:101")}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </FormControl>

                <FormControl className={s.mobileFormControl}>
                  <Accordion className={s.mobileAccordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel-content"
                      id="panel-header"
                      className={s.mobileSummary}
                    >
                      <div className={s.mobileTitleIcon}>
                        <AspectRatioOutlinedIcon className={s.mobileIcon} />
                        <Typography>
                          {tempSelectedOrientation ? (
                            <div className={s.mobileTemp}>
                              {t(
                                `common:selectOptions:${tempSelectedOrientation}`
                              )}
                            </div>
                          ) : (
                            t("common:selectOptions:format")
                          )}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Typography
                        onClick={() =>
                          handleOrientationChangeMobile("Vertical")
                        }
                      >
                        {t("common:selectOptions:Vertical")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography
                        onClick={() =>
                          handleOrientationChangeMobile("Horizontal")
                        }
                      >
                        {t("common:selectOptions:Horizontal")}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </FormControl>

                <FormControl className={s.mobileFormControl}>
                  <Accordion className={s.mobileAccordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel-content"
                      id="panel-header"
                      className={s.mobileSummary}
                    >
                      <div className={s.mobileTitleIcon}>
                        <PaymentOutlinedIcon className={s.mobileIcon} />
                        <Typography>
                          {tempSelectedPrice ? (
                            <div className={s.mobileTemp}>
                              {t(
                                `common:selectOptions:upTo${tempSelectedPrice}`
                              )}
                            </div>
                          ) : (
                            t("common:selectOptions:price")
                          )}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handlePriceChangeMobile(500)}>
                        {t("common:selectOptions:upTo500")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handlePriceChangeMobile(1000)}>
                        {t("common:selectOptions:upTo1000")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handlePriceChangeMobile(3000)}>
                        {t("common:selectOptions:upTo3000")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handlePriceChangeMobile(5000)}>
                        {t("common:selectOptions:upTo5000")}
                      </Typography>
                    </AccordionDetails>
                    <Divider />
                    <AccordionDetails>
                      <Typography onClick={() => handlePriceChangeMobile(5001)}>
                        {t("common:selectOptions:upTo5001")}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </FormControl>
              </div>
            </List>
          </div>
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

              {isFilterActiveMobile() && (
                <Button
                  onClick={() => {
                    setSelectedTrending(tempSelectedTrending);
                    setSelectedTags(selectedTempTags);
                    setSelectedSize(selectedTempSize);
                    setSelectedOrientation(tempSelectedOrientation);
                    setSelectedPrice(tempSelectedPrice);
                    handleClose();
                  }}
                  className={s.activeFilterResult}
                >
                  {t("common:selectOptions:showResult")}
                </Button>
              )}
            </div>
          </div>
        </Dialog>
      </div>

      <DiscoverArt
        artworks={artworks}
        tags={tags?.data}
        onFilter={filter}
        onLike={likeArtwork}
        rowWidth={rowWidth}
        loadMoreElementRef={loadMoreArtworksElementRef}
        isLoading={isLoadingArtWorks}
        loadMore={props.loadMore}
        activeTab={props.activeTab}
        trendingArtTab={true}
        likedArtTab={false}
        header={header}
        insertElements={[
          { element: (
            <div style={{
              margin: '3rem 0',
            }}>
              <Typography
                variant="h2"
                style={{
                  paddingBottom: '10px',
                }}>
                Selected Prints
              </Typography>
              <SelectedprintsCarousel
                forDesktop={false}
              />
            </div>),
            position: 2,
          },
          {
            element: header ? (
              <Typography variant="h4">
                Topplistan index
              </Typography>
            ) : null,
            position: 3,
          },
        ]}
      />
    </>
  );
});

export default DiscoverTrendingArtTab;
