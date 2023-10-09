import { useTranslation } from "next-i18next";
import React, { memo, useContext, useRef, useState } from "react";
import { TokenContext } from "../../contexts/token-context";
import { useGetTags } from "../../hooks/dataFetching/Artworks";
import usePostLike from "../../hooks/dataFetching/usePostLike";
import { useInfiniteScrollWithKey } from "../../hooks/useInfiniteScroll";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import { Artwork } from "../../models/Artwork";
import DiscoverArt from "../DiscoverArt/DiscoverArt";


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

  const handleOrientationChange = (newOrientation: string) => {
    setSelectedOrientation(newOrientation);

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

  

  

  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme);
    
    setSelectedTags((prevTags) => {
      if (newTheme === "") {
        return prevTags.filter(tag => tag !== selectedTheme);
      } else {
        return Array.from(new Set(prevTags.concat(newTheme)));
      }
    });
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

  };

  const isFilterActive = () => {
    return (
      selectedTags.length > 0 || 
      selectedTheme !== null || 
      selectedTechnique !== null || 
      selectedOrientation !== null
    );
  };
  

  const TECHNIQUE_TAGS = {
    "oil": "Oil",
    "acrylic": "Acrylic",
    "aquarelle": "Aquarelle",
    "mixed-media": "Mixed media",
    "ceramic": "Ceramic",
    "pencil": "Pencil",
    "charcoal": "Charcoal",
    "clay": "Clay",
    "glass": "Glass",
    "textile": "Textile",
    "gouache": "Gouache",
    "ink": "Ink",
    "pastel": "Pastel",
    "collage": "Collage",
    "drawing": "Drawing",
    "photography": "Photography",
    "sculpture": "Sculpture",
    "digital": "Digital",
    "illustration": "Illustration",
    "video-art": "Video art",
    "performance-art": "Performance art",
    "triptych": "Triptych",
    "installation": "Installation",
    "mural": "Mural",
    "print": "Prints",
    "graphic": "Graphics"
  };

  const THEME_TAGS = {
    "impressionism": "Impressionism",
    "abstract": "Abstract",
    "realism": "Realism",
    "surrealism": "Surrealism",
    "expressionism": "Expressionism",
    "cubism": "Cubism",
    "pop-art": "Pop art",
    "documentary-photography": "Documentary photography",
    "photorealism": "Photorealism",
    "abstract-expressionism": "Abstract expressionism",
    "graffiti": "Graffiti",
    "portraiture": "Portraiture",
    "arts-craft": "Arts & craft",
    "conceptual": "Conceptual",
    "street-art": "Street art",
    "still-life": "Still life",
    "landscape": "Landscape",
    "animal": "Animal",
    "architecture": "Architecture",
    "nature": "Nature",
    "fashion": "Fashion",
    "geometric": "Geometric",
    "flowers": "Flowers",
    "fantasy": "Fantasy",
    "pattern": "Pattern",
    "celebrity": "Celebrity",
    "pop-culture": "Pop culture",
    "minimalism": "Minimalism",
    "figurative": "Figurative",
    "places": "Places",
    "politics": "Politics",
    "water": "Water",
    "big-city": "Big city",
    "seasons": "Seasons",
    "cats": "Cats",
    "dogs": "Dogs",
    "nude": "Nude",
    "travel": "Travel",
    "food-drink": "Food & drink",
    "seascape": "Seascape",
    "art-exhibition": "Art exhibition",
    "gallery": "Gallery",
    "group-exhibition": "Group exhibition",
    "posters": "Posters",
    "artwork": "Artwork",
    "NFT": "NFT",
    "jewelry": "Jewelry",
  };


  const { data: artworks, isLoading: isLoadingArtWorks } = useInfiniteScrollWithKey<Artwork>(loadMoreArtworksElementRef,
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.next) {
        console.log(previousPageData.next, ".next")
        props.stopLoadImages();
        return null;
      }
      
      // Logic to build the URL should be the same whether it's the first page or subsequent pages.
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

    const selectStyle = {
      margin: "10px",
      padding: "10px",
      fontSize: "16px",
      width: "calc(100% - 20px)",
      maxWidth: "200px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    };
    
    const buttonStyle = {
      border: "none",
      cursor: "pointer",
      backgroundColor: "transparent",
      color: "red",
      fontSize: "20px",
      marginRight: "10px",
    };
  

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
        <option value={"Vertical"}>Vertical</option>
        <option value={"Horizontal"}>Horizontal</option>
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
        <option value={""}>Teknik</option>
        {Object.keys(TECHNIQUE_TAGS).map((key) => (
          <option value={key} key={key}>{TECHNIQUE_TAGS[key]}</option>
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
        <option value={""}>Tema</option>
        {Object.keys(THEME_TAGS).map((key) => (
          <option value={key} key={key}>{THEME_TAGS[key]}</option>
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
        <option value={""}>Pris</option>
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
        <option value={""}>Storlek</option>
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