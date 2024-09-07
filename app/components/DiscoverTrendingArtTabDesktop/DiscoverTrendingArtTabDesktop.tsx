import { useTranslation } from "next-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { NavigationContext } from "../../contexts/navigation-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import { THEME_TAGS, TECHNIQUE_TAGS } from "../DiscoverTrendingArtTab/tags";
import { styles } from "./discoverTrendingArtTabDesktop.css";
// import EmblaCarousel, { formatAwArtworkForEmbla } from "../Carousel/Embla/EmblaCarousel"
import SelectedprintsCarousel from "../Carousel/SelectedprintsCarousel";
import ArtistCarousel from "../Carousel/ArtistCarousel";
// import { getRandomSequentialIndexes } from "../../utils/layoutUtils";
// import SELECTED_PRINTS from "../../../data/selectedPrintsData";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import { ListItemButton } from "@mui/material";
import StoryCarousel from "../Carousel/StoryCarousel";

interface DiscoverTrendingArtTabProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
  header?: string;
}

const DiscoverTrendingArtTabDesktop = memo(
  (props: DiscoverTrendingArtTabProps) => {
    const { t } = useTranslation(["header", "common", "support", "discover"]);
    const s = styles();
    const { username, socialId, rowWidth, header } = props;
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [searchQuery, setSearchQuery] = useState<string>();
    const loadMoreArtworksElementRef = useRef(null);
    const tags = useGetTags();

    const {
      selectedTags,
      setSelectedTags,
      selectedTheme,
      setSelectedTheme,
      selectedTechnique,
      setSelectedTechnique,
      selectedSize,
      setSelectedSize,
      selectedPrice,
      setSelectedPrice,
      selectedTrending,
      setSelectedTrending,
      selectedOrientation,
      setSelectedOrientation,
    } = useContext(NavigationContext);

    const [expandedAccordion, setExpandedAccordion] = useState(null);

    const handleAccordionChange = (accordionName) => {
      if (expandedAccordion === accordionName) {
        setExpandedAccordion(null);
      } else {
        setExpandedAccordion(accordionName);
      }
    };

    const handleSizeChange = (newSize) => {
      setSelectedSize(newSize);
    };

    const handlePriceChange = (newPrice: string) => {
      setSelectedPrice(newPrice);
    };

    const handleTrendingChange = (value: string) => {
      setSelectedTrending(String(value));
    };

    const handleOrientationChange = (value: string) => {
      setSelectedOrientation(value);
    };

    function filter(tags: string[], searchQuery = "") {
      props.loadImages();
      setSelectedTags(tags);
      setSearchQuery(searchQuery);
    }

    const handleTagChange = (newTag: string) => {
      if (selectedTags.length < 4 && !selectedTags.includes(newTag)) {
        setSelectedTags((prevTags) => [...prevTags, newTag]);
      }
    };

    const handleTechniqueTagChange = (newTag: string) => {
      setSelectedTechnique(newTag);
    };
    const handleThemeTagChange = (newTag: string) => {
      setSelectedTheme(newTag);
    };

    const removeTag = (tagToRemove: string) => {
      setSelectedTags((prevTags) =>
        prevTags.filter((tag) => tag !== tagToRemove)
      );
      setSelectedTechnique(null);
    };

    const resetFilters = () => {
      setSelectedTags([]);
      setSelectedOrientation(null);
      setSelectedSize(null);
      setSelectedPrice(null);
      setSelectedTrending(null);
      setSelectedTheme(null);
      setSelectedTechnique(null);
    };

    useEffect(() => {}, [selectedTheme, selectedTechnique]);

    const isFilterActive = () => {
      return (
        selectedTags.length > 0 ||
        selectedOrientation !== null ||
        selectedSize !== null ||
        selectedPrice !== null ||
        selectedTrending !== null ||
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

          if (selectedTheme) {
            url.searchParams.append("tag", selectedTheme);
          }

          if (selectedTechnique) {
            url.searchParams.append("tag", selectedTechnique);
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
    // const maxPrintCount = 10
    // useEffect(() => {
    //   if (printsIndexes.length > 0) return;
    //   // Decide randomly which prints to show in carousel.
    //   const randomIndexes = getRandomSequentialIndexes(SELECTED_PRINTS.length, maxPrintCount)
    //   setPrintIndexes(randomIndexes)
    // }, [artworks])

    // const randomPrints = printsIndexes.map(index => SELECTED_PRINTS[index])
    // const printsDataForCarousel = formatAwArtworkForEmbla(randomPrints)

    return (
      <>
        <div className={s.desktopContainer}>
          {!loading && (
            <div>
              <Accordion
                elevation={0}
                className={s.filter}
                expanded={expandedAccordion === "trending"}
                onClick={() => handleAccordionChange("trending")}
              >
                <AccordionSummary
                  aria-controls=""
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography className={s.filterSummary}>
                    {selectedTrending ? (
                      <span style={{ fontWeight: "bold" }}>
                        {t(`common:selectOptions:trending${selectedTrending}`)}
                      </span>
                    ) : (
                      t("common:selectOptions:trending")
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={s.filterDetails}>
                  <ListItemButton
                    className={s.filterItem}
                    onClick={() => handleTrendingChange("7")}
                  >
                    {t("common:selectOptions:trending7")}
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    className={s.filterItem}
                    onClick={() => handleTrendingChange("14")}
                  >
                    {t("common:selectOptions:trending14")}
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    className={s.filterItem}
                    onClick={() => handleTrendingChange("30")}
                  >
                    {t("common:selectOptions:trending30")}
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    className={s.filterItem}
                    onClick={() => handleTrendingChange("90")}
                  >
                    {t("common:selectOptions:trending90")}
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    className={s.filterItem}
                    onClick={() => handleTrendingChange("365")}
                  >
                    {t("common:selectOptions:trending365")}
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    className={s.filterItem}
                    onClick={() => handleTrendingChange("2000")}
                  >
                    {t("common:selectOptions:trending2000")}
                  </ListItemButton>
                </AccordionDetails>
              </Accordion>
            </div>
          )}

          {/* TEKNIK             HERE */}

          <div>
            <Accordion
              elevation={0}
              className={s.filter}
              expanded={expandedAccordion === "technique_tags"}
              onClick={() => handleAccordionChange("technique_tags")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={s.filterSummary}>
                  {selectedTechnique ? (
                    <span style={{ fontWeight: "bold" }}>
                      {t(`common:techniques:${selectedTechnique}`)}
                    </span>
                  ) : (
                    <span>{t("common:selectOptions:technique")}</span>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={s.filterDetailsTags}>
                {Object.keys(TECHNIQUE_TAGS).map((key) => (
                  <div key={key}>
                    <ListItemButton
                      className={s.filterItemTags}
                      onClick={() => handleTechniqueTagChange(`${key}`)}
                      key={key}
                    >
                      {t(`common:techniques:${key}`)}
                    </ListItemButton>
                    <Divider />
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>

          <div>
            <Accordion
              elevation={0}
              className={s.filter}
              expanded={expandedAccordion === "theme_tags"}
              onClick={() => handleAccordionChange("theme_tags")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={s.filterSummary}>
                  {selectedTheme ? (
                    <span style={{ fontWeight: "bold" }}>
                      {t(`common:themes:${selectedTheme}`)}
                    </span>
                  ) : (
                    <>{t("common:selectOptions:theme")}</>
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={s.filterDetailsTags}>
                {Object.keys(THEME_TAGS).map((key) => (
                  <div key={key}>
                    <ListItemButton
                      className={s.filterItemTags}
                      onClick={() => handleThemeTagChange(`${key}`)}
                      key={key}
                    >
                      {t(`common:themes:${key}`)}
                    </ListItemButton>
                    <Divider />
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>

          <div>
            <Accordion
              elevation={0}
              className={s.filter}
              expanded={expandedAccordion === "orientation"}
              onClick={() => handleAccordionChange("orientation")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={s.filterSummary}>
                  {selectedOrientation ? (
                    <span style={{ fontWeight: "bold" }}>
                      {t(`common:selectOptions:${selectedOrientation}`)}
                    </span>
                  ) : (
                    t("common:selectOptions:format")
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={s.filterDetails}>
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handleOrientationChange("Vertical")}
                >
                  {" "}
                  {t("common:selectOptions:Vertical")}
                </ListItemButton>
                <Divider />
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handleOrientationChange("Horizontal")}
                >
                  {" "}
                  {t("common:selectOptions:Horizontal")}
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
          </div>

          <div>
            <Accordion
              elevation={0}
              className={s.filter}
              expanded={expandedAccordion === "size"}
              onClick={() => handleAccordionChange("size")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={s.filterSummary}>
                  {selectedSize ? (
                    <span style={{ fontWeight: "bold" }}>
                      {t(`common:selectOptions:${selectedSize}`)}
                    </span>
                  ) : (
                    t("common:selectOptions:size")
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={s.filterDetails}>
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handleSizeChange("30")}
                >
                  {t("common:selectOptions:30")}
                </ListItemButton>
                <Divider />
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handleSizeChange("60")}
                >
                  {" "}
                  {t("common:selectOptions:60")}
                </ListItemButton>
                <Divider />
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handleSizeChange("100")}
                >
                  {t("common:selectOptions:100")}
                </ListItemButton>
                <Divider />
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handleSizeChange("101")}
                >
                  {" "}
                  {t("common:selectOptions:101")}
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
          </div>

          <div>
            <Accordion
              elevation={0}
              className={s.filter}
              expanded={expandedAccordion === "price"}
              onClick={() => handleAccordionChange("price")}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={s.filterSummary}>
                  {selectedPrice ? (
                    <span style={{ fontWeight: "bold" }}>
                      {t(`common:selectOptions:${selectedPrice}`)}
                    </span>
                  ) : (
                    t("common:selectOptions:price")
                  )}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={s.filterDetails}>
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handlePriceChange("500")}
                >
                  {t("common:selectOptions:500")}
                </ListItemButton>
                <Divider />
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handlePriceChange("1000")}
                >
                  {t("common:selectOptions:1000")}
                </ListItemButton>
                <Divider />
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handlePriceChange("5000")}
                >
                  {t("common:selectOptions:5000")}
                </ListItemButton>
                <Divider />
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handlePriceChange("3000")}
                >
                  {t("common:selectOptions:3000")}
                </ListItemButton>
                <Divider />
                <ListItemButton
                  className={s.filterItem}
                  onClick={() => handlePriceChange("5001")}
                >
                  {t("common:selectOptions:5001")}
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            {isFilterActive() && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  resetFilters();
                  handleAccordionChange("null");
                }}
                variant="outlined"
                color="secondary"
                className={s.filterClearBtn}
              >
                {t("common:selectOptions:clearFilter")}
              </Button>
            )}
          </div>
        </div>
        {/*             
            <div className={s.selectedTagWrapper}>
       
                    <div>
                        {selectedTechnique && (
                        <div
                            className={s.selectedTagsDesktop}
                            onClick={(e) => {
                                e.stopPropagation()
                                removeTag(selectedTechnique)
                            }}
                        >
                            <Typography>
                                {t('common:techniques:' + `${selectedTechnique}`)}
                            </Typography>
                            <span className={s.removeTagButton}>
                                <ClearIcon></ClearIcon>
                            </span>
                        </div>
                        )}
                    </div>
            </div> */}
        <DiscoverArt
          artworks={artworks}
          tags={tags?.data}
          onFilter={filter}
          rowWidth={rowWidth}
          loadMoreElementRef={loadMoreArtworksElementRef}
          isLoading={isLoadingArtWorks}
          loadMore={props.loadMore}
          activeTab={props.activeTab}
          trendingArtTab={true}
          likedArtTab={false}
          header={header}
          insertElements={[
            {
              element: (
                <div
                  style={{
                    margin: "3rem 0",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      paddingBottom: "10px",
                      fontWeight: 500,
                    }}
                  >
                    {t("discover:popularProfiles")}
                  </Typography>
                  <ArtistCarousel forDesktop={true} />

                  {/*    <StoryCarousel
                    forDesktop={true}
                    containerStyle={{
                      margin: 0,
                    }}
                  /> */}
                </div>
              ),
              position: 2,
            },

            {
              element: header ? (
                <Typography variant="h4" style={{ fontWeight: 500 }}>
                  {header}
                </Typography>
              ) : null,
              position: 6,
            },
          ]}
        />
      </>
    );
  }
);

export default DiscoverTrendingArtTabDesktop;
