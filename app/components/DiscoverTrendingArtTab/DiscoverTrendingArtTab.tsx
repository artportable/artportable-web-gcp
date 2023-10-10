import { useTranslation } from "next-i18next";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";
import {THEMES, TECHNIQUES} from "./tags";

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
  const { username, socialId, rowWidth } = props
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState<string>();
  const loadMoreArtworksElementRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = useGetTags();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const token = useContext(TokenContext);
  const { like } = usePostLike();


  

  const [selectedOrientation, setSelectedOrientation] = useState<string | null>(null);

  const handleOrientationChange = (newOrientation) => {
    setSelectedOrientation(newOrientation);
    localStorage.setItem('filters', JSON.stringify({
      orientation: newOrientation,
      technique: selectedTechnique,
      theme: selectedTheme,
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

  

  

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
      
    setSelectedTags((prevTags) => {
      if (newTheme === "") {
        return prevTags.filter(tag => tag !== selectedTheme);
      } else {
        return Array.from(new Set(prevTags.concat(newTheme)));
      }
    });
  
    // Update localStorage
    localStorage.setItem('filters', JSON.stringify({
      ...JSON.parse(localStorage.getItem('filters')),
      theme: newTheme
    }));
  };
  
  
  const handleTechniqueChange = (newTechnique: string) => {
    setSelectedTechnique(newTechnique);
    
    setSelectedTags((prevTags) => {
      if (newTechnique === "") {
        return prevTags.filter(tag => tag !== selectedTechnique);
      } else {
        return Array.from(new Set(prevTags.concat(newTechnique)));
      }
    });
  };
  
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  const resetFilters = () => {
    setSelectedTags([]);
    setSelectedTheme(null);
    setSelectedTechnique(null);
    setSelectedOrientation(null);
    localStorage.removeItem('filters');
  };

  const isFilterActive = () => {
    return (
      selectedTags.length > 0 || 
      selectedTheme !== null || 
      selectedTechnique !== null || 
      selectedOrientation !== null
    );
  };
  
  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey<Artwork>(loadMoreArtworksElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        console.log(previousPageData.next, ".next")
        props.stopLoadImages();
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
        if(tag && tag.trim() !== "") {
          url.searchParams.append('tag', tag);
        }
      });    
  
      if (selectedOrientation) {
        url.searchParams.append('orientation', selectedOrientation);
      }
    
      if (searchQuery) {
        url.searchParams.append('q', searchQuery);
      }
      if (username && username != '') {
        url.searchParams.append('myUsername', username);
      }
      
      url.searchParams.append('pageSize', "10");
      
      url.searchParams.append('page', (pageIndex + 1).toString());
      url.searchParams.append('likesSince', "-30");
  
      return url.href;
    }, username);

    useEffect(() => {
      const savedFilters = JSON.parse(localStorage.getItem('filters'));
      if (savedFilters) {
        setSelectedOrientation(savedFilters.orientation || null);
        setSelectedTechnique(savedFilters.technique || null);
        setSelectedTheme(savedFilters.theme || null);
        // ... apply other filters
      }
    }, []);
    
  

  return (
    <>  
       <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "-20px",
        marginBottom: "20px"
      }}>
       <select 
        value={selectedOrientation || ""} 
        onChange={(e) => handleOrientationChange(e.target.value)}
        style={{
          margin: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "300px",
        }}
      >
        <option value={""}>Format</option>
        <option value={"Vertical"}>{t('common:selectOptions:vertical')}</option>
        <option value={"Horizontal"}>{t('common:selectOptions:horizontal')}</option>
      </select>

      <select 
        value={selectedTechnique || ""} 
        onChange={(e) => handleTechniqueChange(e.target.value)}
        style={{
          margin: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "300px",
        }}
    
      >
        <option value={""}>{t('common:selectOptions:technique')}</option>
        {Object.keys(TECHNIQUES).map((key) => (
          <option value={key} key={key}>
            {t(`common:techniques:${key}`)}
          </option>
        ))}
      </select>

      <select 
        value={selectedTheme || ""} 
        onChange={(e) => handleThemeChange(e.target.value)}
        style={{
          margin: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "300px",
        }}
  
      >
        <option value={""}>{t('common:selectOptions:theme')}</option>
        {Object.keys(THEMES).map((key) => (
          <option value={key} key={key}>
            {t(`common:themes:${key}`)}
          </option>
        ))}
      </select>


      <select 
        style={{
          margin: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "300px",
        }}
      >
        <option value={""}>{t('common:selectOptions:price')}</option>
        <option value={""}>Upp till 1000kr</option>
        <option value={"Horizontal"}>Upp till 2000kr</option>
        <option value={"Horizontal"}>4000kr </option>
      </select>

      <select 
        value={selectedOrientation || ""} 
        onChange={(e) => handleOrientationChange(e.target.value)}
        style={{
          margin: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "300px",
        }}
      >
        <option value={""}>{t('common:selectOptions:size')}</option>
        <option value={""}>Upp till 20cm </option>
        <option value={"Horizontal"}>Upp till 60cm </option>
        <option value={"Horizontal"}>Upp till 90cm </option>
        <option value={"Horizontal"}>Upp till 110cm </option>
        <option value={"Horizontal"}>Över 110cm </option>
      </select>

      {isFilterActive() && (
    <button 
      onClick={resetFilters}
      style={{
        border: "none",
        cursor: "pointer",
        backgroundColor: "transparent", 
        fontSize: "18px",
        color: "red",
      }}
    >
      X
    </button>
  )}
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
        />
    </>
  );
})

export default DiscoverTrendingArtTab