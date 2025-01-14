import React, { useState } from "react";
import {
  ContextNavigation,
  NavigationContext,
  defaultNavigationContext,
} from "./navigation-context";

export const NavigationContextComponent = ({ children }) => {
  const [navigationContext, setNavigationContext] = useState<ContextNavigation>(
    defaultNavigationContext
  );

  // Filters for artworks:
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<string>(null);
  const [selectedMedium, setSelectedMedium] = useState<string>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedTrending, setSelectedTrending] = useState<string | null>(null);
  const [selectedOrientation, setSelectedOrientation] = useState<string | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedTempCountry, setSelectedTempCountry] = useState<string | null>(
    null
  );
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedTempState, setSelectedTempState] = useState<string | null>(
    null
  );
  const [selectedTempTags, setTempSelectedTags] = useState<string[]>([]);
  const [selectedTempSize, setTempSelectedSize] = useState<string | null>(null);
  const [tempSelectedTrending, setTempSelectedTrending] = useState<
    string | null
  >(null);
  const [tempSelectedOrientation, setTempSelectedOrientation] = useState<
    string | null
  >(null);
  const [tempSelectedPrice, setTempSelectedPrice] = useState<string | null>(
    null
  );

  const [selectedHeight, setSelectedHeight] = useState<[number, number] | null>(
    null
  );
  const [tempSelectedHeight, setTempSelectedHeight] = useState<
    [number, number] | null
  >(null);

  const [selectedWidth, setSelectedWidth] = useState<[number, number] | null>(
    null
  );
  const [tempSelectedWidth, setTempSelectedWidth] = useState<
    [number, number] | null
  >(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const navigationData = {
    ...navigationContext,
    ...{
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
      searchQuery,
      setSearchQuery,
      selectedLetter,
      setSelectedLetter,
      selectedCountry,
      setSelectedCountry,
      selectedTempCountry,
      setSelectedTempCountry,
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
    },
  };

  return (
    <NavigationContext.Provider value={navigationData}>
      {children}
    </NavigationContext.Provider>
  );
};
