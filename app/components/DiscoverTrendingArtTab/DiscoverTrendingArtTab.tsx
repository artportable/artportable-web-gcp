import { useTranslation } from "next-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import {TAGS} from "./tags";
import { styles } from "./discoverTrendingArtTab.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core";
import useMediaQuery from "@mui/material/useMediaQuery";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from '@mui/icons-material/Remove';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import ClearIcon from '@mui/icons-material/Clear';

interface DiscoverTrendingArtTabProps {
  username?: string;
  socialId?: string;
  rowWidth: number;
  sold: string;
  loadMore: boolean;
  loadImages: any;
  stopLoadImages: any;
  activeTab: number;
}

const DiscoverTrendingArtTab = memo((props: DiscoverTrendingArtTabProps) => {
  const { t } = useTranslation(['header', 'common', 'support']);
  const s = styles();
  const { username, socialId, rowWidth } = props
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const loadMoreArtworksElementRef = useRef(null);
  const tags = useGetTags();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const token = useContext(TokenContext);
  const { like } = usePostLike();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSize,  setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedTrending, setSelectedTrending] = useState<string | null>(null);
  const [selectedOrientation, setSelectedOrientation] = useState<string | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const handleSizeChange = (newSize) => {
    setSelectedSize(newSize);
  };
  
  const handlePriceChange = (newPrice: string) => {
      setSelectedPrice(newPrice);
  };

  const handleTrendingChange = (newTrending: string) => {
      setSelectedTrending(newTrending);
  };


  const handleOrientationChange = (newOrientation) => {
    setSelectedOrientation(newOrientation);
    localStorage.setItem('filters', JSON.stringify({
      orientation: newOrientation,
    }));
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

  
  const handleTagChange = (newTag: string) => {
    if (selectedTags.length < 4) {
      setSelectedTags(prevTags => [...prevTags, newTag]);
    }
  };
  
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify({
      tags: selectedTags,
    }));
  }, [selectedTags]);
  

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    const storedFilters = JSON.parse(localStorage.getItem('filters')) || {tags: []};
    const updatedTags = storedFilters.tags.filter(tag => tag !== tagToRemove);
    localStorage.setItem('filters', JSON.stringify({tags: updatedTags}));
    localStorage.removeItem('filters');
 
  };

  useEffect(() => {
    console.log('Component re-rendered due to tag changes:', selectedTags, loadMoreArtworksElementRef);
    
}, [selectedTags]);



  const resetFilters = () => {
    setSelectedTags([]);
    setSelectedOrientation(null);
    setSelectedSize(null);
    setSelectedPrice(null);
    setSelectedTrending(null);
    localStorage.removeItem('filters');
  };

  useEffect(() => {}, [resetFilters])

  const isFilterActive = () => {
    return (
      selectedTags.length > 0 || 
      selectedOrientation !== null ||
      selectedSize !== null ||
      selectedPrice !== null ||
      selectedTrending !== null      
    );
  };

  const[loading, setLoading] = useState(false);
  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey<Artwork>(loadMoreArtworksElementRef,
    (pageIndex, previousPageData) => {

      console.log(props.loadMore);
      if(loading && !props.loadMore) {
        props.loadImages();
        setLoading(false);
      }
      if (previousPageData && !previousPageData.next) {
        props.stopLoadImages();
        setLoading(true);
        return null;
      }
      
      let url;
      if (props.sold === "Unsold") {
        url = new URL(`${apiBaseUrl}/api/Discover/artworks/trendingunsold`);
      }
      else if (props.sold === "Sold") {
        url = new URL(`${apiBaseUrl}/api/Discover/artworks/trendingsold`);
      }
      else if (props.sold === "All") {
        url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);
      }
      else {
        url = new URL(`${apiBaseUrl}/api/Discover/artworks/trending`);
      }
      
      selectedTags.forEach(tag => {
        if(tag) {
          url.searchParams.append('tag', tag);
         
        }
      });   
    
      if (selectedOrientation) {
        url.searchParams.append('orientation', selectedOrientation);
      }
      if (selectedSize) {
        url.searchParams.append('sizeFilter', selectedSize);
      }
      if (selectedPrice) {
        url.searchParams.append('priceFilter', selectedPrice);
        
      }
      if (searchQuery) {
        url.searchParams.append('q', searchQuery);
      }
      if (username && username != '') {
        url.searchParams.append('myUsername', username);
      }
      
      url.searchParams.append('pageSize', "20");
      
      url.searchParams.append('page', (pageIndex + 1).toString());
      if (selectedTrending) {
        url.searchParams.append('likesSince', `-${selectedTrending}`);
      }
    
  
      return url.href;
    }, username);


    useEffect(() => {
      const savedFilters = JSON.parse(localStorage.getItem('filters'));
      if (savedFilters) {
        setSelectedOrientation(savedFilters.orientation || null);
        setSelectedPrice(savedFilters.selectedPrice || null);
        setSelectedTrending(savedFilters.setSelectedTrending || null);
      }
    }, []);


    useEffect(() => {}, [artworks])
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>  
    

    {isMobile ? (
      <div style={{marginBottom: "20px"}}>
       
        <Accordion style={{backgroundColor: "#faf3ee", borderRadius: "20px"}} expanded={showFilters} onClick={() => setShowFilters(!showFilters)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{textAlign: "center", fontWeight: "bold"}}>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails style={{display: "flex", flexDirection: "column", width: "100%"}}>
          <div className={s.selectWrapper}>
           <div style={{display: "flex", flexDirection: "row", width: "50% !important"}}>
           <select 
                value={selectedTrending || ""} 
                onChange={(e) => handleTrendingChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  margin: "10px",
                  borderRadius: "20px",
                  height: "40px",
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #c67777",
                  color: "black",
                  width: "300px",
                  fontSize: "7px",
                  fontWeight: "bold",
                  backgroundColor: "transparent"
                }}
                
               
            >
                <option value={""}>{t('common:selectOptions:trending').toUpperCase()}</option>
                <option value={"14"}>{t('common:selectOptions:trending14')}</option>
                <option value={"30"}>{t('common:selectOptions:trending30')}</option>
                <option value={"90"}>{t('common:selectOptions:trending90')}</option>
                <option value={"365"}>{t('common:selectOptions:trendingYear')}</option>
                <option value={"2000"}>{t('common:selectOptions:trendingAll')}</option>
            </select>
            <select 
              value={selectedTechnique || ""} 
              onChange={(e) => handleTagChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{
                margin: "10px",
                  borderRadius: "20px",
                  height: "40px",
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #c67777",
                  color: "black",
                  width: "300px",
                  fontSize: "8px",
                  fontWeight: "bold",
                  backgroundColor: "transparent"
              }}
            
            >
              <option value={""}>{t('common:selectOptions:technique').toLocaleUpperCase()}</option>
              {Object.keys(TAGS).map((key) => (
                <option value={key} key={key}>
                  {t(`common:techniques:${key}`)}
                </option>
              ))}
            </select>
           </div>

         <div style={{display: "flex", flexDirection: "row"}}>
         <div style={{margin: "0 auto"}}> 
         <select 
              value={selectedOrientation || ""} 
              onChange={(e) => handleOrientationChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{
                borderRadius: "20px",
                padding: "10px",
                height: "40px",
                textAlign: "center",
                width: "80px",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
                fontSize: "8px",
                border: "1px solid #c67777",
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "transparent"
              }}
              
            >
              <option value={""}>{t('common:selectOptions:format').toLocaleUpperCase()}</option>
              <option value={"Vertical"}>{t('common:selectOptions:vertical')}</option>
              <option value={"Horizontal"}>{t('common:selectOptions:horizontal')}</option>
            </select>
         </div>

          

           <div style={{
            margin: "0 auto"
           }}>
           <select 
              value={selectedSize || ""} 
              onChange={(e) => handleSizeChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{
                borderRadius: "20px",
                padding: "10px",
                height: "40px",
                textAlign: "center",
                width: "90px",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px",
                fontSize: "8px",
                fontWeight: "bold",
                border: "1px solid #c67777",
                  color: "black",
                  backgroundColor: "transparent"
              }}
             
            >
              <option value={""}>{t('common:selectOptions:size').toUpperCase()}</option>
              <option value={"30"}>{t('common:selectOptions:small')}</option>
              <option value={"60"}>{t('common:selectOptions:medium')}</option>
              <option value={"100"}>{t('common:selectOptions:large')}</option>
              <option value={"101"}>{t('common:selectOptions:extraLarge')}</option>
            </select>
           </div>
           <div style={{margin: "0 auto"}}>
           <select 
                value={selectedPrice || ""} 
                onChange={(e) => handlePriceChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                style={{
                  borderRadius: "20px",
                  padding: "10px",
                  height: "40px",
                  textAlign: "center",
                  width: "90px",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
                  fontSize: "8px",
                  border: "1px solid #c67777",
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "transparent"
                }}
                
            >
                <option value={""}>{t('common:selectOptions:price').toUpperCase()}</option>
                <option value={"500"}>{t('common:selectOptions:upTo500')}</option>
                <option value={"1000"}>{t('common:selectOptions:upTo1000')}</option>
                <option value={"3000"}>{t('common:selectOptions:upTo3000')}</option>
                <option value={"5000"}>{t('common:selectOptions:upTo5000')}</option>
                <option value={"5001"}>{t('common:selectOptions:over5000')}</option>
            </select>
           </div>
         </div>

            {isFilterActive() && (
                <Button 
                onClick={(e) => {
                    e.stopPropagation();
                    resetFilters();
                }}
                variant="outlined" 
                color="secondary"
                style={{
                  margin: "6px",
                  borderRadius: "20px",
                  height: "40px",
                  textAlign: "center",
                  border: "1px solid #c67777",
                  color: "black",
                  fontSize: "10px"
                 
                }}
            >
                {t("common:selectOptions:clearFilter")}
            </Button>
            
              )}

            </div>
            <div className={s.selectedTagWrapper}>
              {selectedTags.map((tag, index) => (
                <div key={index} >
                  <div className={s.selectedTags} style={{
                     textAlign: "center"
                    }}>
                  <Typography>{t("common:techniques:"+ `${tag}`)}
                  </Typography>
                  <span
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(tag)
                      }}
               
                      >
                      <HighlightOffRoundedIcon style={{
                         border: "0px solid #c67777",
                         color: "#c67777"
                      }}></HighlightOffRoundedIcon>
                    </span>
                  
                  </div>
                  
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    ) : (
      // Desktop filters hereeee
      <div>

<div>
     <div style={{
      display: 'flex',
      flexDirection: 'row',
      marginTop: "-20px",
      marginBottom: "20px",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      width: "100%"
    }}>
  <div>
    <select 
        value={selectedTrending || ""} 
        onChange={(e) => handleTrendingChange(e.target.value)}
        className={s.selectStyleDesktop}
    >
        <option value={""}>{t('common:selectOptions:trending').toUpperCase()}</option>
        <option value={"14"}>{t('common:selectOptions:trending14')}</option>
        <option value={"30"}>{t('common:selectOptions:trending30')}</option>
        <option value={"90"}>{t('common:selectOptions:trending90')}</option>
        <option value={"365"}>{t('common:selectOptions:trendingYear')}</option>
        <option value={"2000"}>{t('common:selectOptions:trendingAll')}</option>
    </select>
    <select 
      value={selectedTechnique || ""} 
      onChange={(e) => handleTagChange(e.target.value)}
      className={s.selectStyleDesktop}
    >
      <option value={""}>{t('common:selectOptions:technique').toLocaleUpperCase()}</option>
      {Object.keys(TAGS).map((key) => (
        <option value={key} key={key}>
          {t(`common:techniques:${key}`)}
        </option>
      ))}
    </select>

     <select 
      value={selectedOrientation || ""} 
      onChange={(e) => handleOrientationChange(e.target.value)}
      className={s.selectStyleDesktop}
    >
      <option value={""}>{t('common:selectOptions:format').toLocaleUpperCase()}</option>
      <option value={"Vertical"}>{t('common:selectOptions:vertical')}</option>
      <option value={"Horizontal"}>{t('common:selectOptions:horizontal')}</option>
    </select>

   

    <select 
      value={selectedSize || ""} 
      onChange={(e) => handleSizeChange(e.target.value)}
      className={s.selectStyleDesktop}
    >
      <option value={""}>{t('common:selectOptions:size').toUpperCase()}</option>
      <option value={"30"}>{t('common:selectOptions:small')}</option>
      <option value={"60"}>{t('common:selectOptions:medium')}</option>
      <option value={"100"}>{t('common:selectOptions:large')}</option>
      <option value={"101"}>{t('common:selectOptions:extraLarge')}</option>
    </select>
    <select 
        value={selectedPrice || ""} 
        onChange={(e) => handlePriceChange(e.target.value)}
        className={s.selectStyleDesktop}
    >
        <option value={""}>{t('common:selectOptions:price').toUpperCase()}</option>
        <option value={"500"}>{t('common:selectOptions:upTo500')}</option>
        <option value={"1000"}>{t('common:selectOptions:upTo1000')}</option>
        <option value={"3000"}>{t('common:selectOptions:upTo3000')}</option>
        <option value={"5000"}>{t('common:selectOptions:upTo5000')}</option>
        <option value={"1000001"}>{t('common:selectOptions:over5000')}</option>
    </select>

    {isFilterActive() && (
                <Button 
                onClick={(e) => {
                    e.stopPropagation();
                    resetFilters();
                }}
                variant="outlined" 
                color="secondary"
                style={{
                  margin: "6px",
                  borderRadius: "20px",
                  height: "40px",
                  textAlign: "center",
                  border: "1px solid #c67777",
                  color: "black",
                  fontSize: "10px"
                 
                }}
            >
                {t("common:selectOptions:clearFilter")}
            </Button>
            
              )}

    </div>

    </div>
    <div className={s.selectedTagWrapper}>
              {selectedTags.map((tag, index) => (
                <div key={index} >
                  <div className={s.selectedTagsDesktop} style={{
                     textAlign: "center"
                    }}>
                  <Typography>{t("common:techniques:"+ `${tag}`)}
                  </Typography>
                  <span
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(tag)
                      }}
               
                      >
                     <ClearIcon></ClearIcon>
                    </span>
                  
                  </div>
                  
                </div>
              ))}
            </div>
    </div>
      </div>
    )}

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
        />
      
        
        
    </>
  );
})

export default DiscoverTrendingArtTab