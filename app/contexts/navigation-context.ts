import React, { useState } from "react";

export interface ContextNavigation {
  selectedTags: any[];
  selectedTheme: string | null;
  selectedTechnique: string | null;
  selectedMedium: string | null;
  selectedSize: string | null;
  selectedPrice: string | null;
  selectedTrending: string | null;
  selectedOrientation: string | null;
  selectedCountry: string | null;
  selectedState: string | null;
  selectedHeight: [number, number] | null;
  setSelectedHeight: Function;
  selectedWidth: [number, number] | null;
  setSelectedWidth: Function;

  setSelectedTags: Function;
  setSelectedTheme: Function;
  setSelectedTechnique: Function;
  setSelectedMedium: Function;
  setSelectedSize: Function;
  setSelectedPrice: Function;
  setSelectedTrending: Function;
  setSelectedOrientation: Function;
  setSelectedCountry: Function;
  setSelectedState: Function;

  selectedTempTags: string[];
  selectedTempSize: string | null;
  tempSelectedTrending: string | null;
  tempSelectedOrientation: string | null;
  tempSelectedPrice: string | null;
  selectedTempCountry: string | null;
  selectedTempState: string | null;
  tempSelectedHeight: [number, number] | null; // Add temporary height state
  setTempSelectedHeight: Function;
  tempSelectedWidth: [number, number] | null; // Add temporary height state
  setTempSelectedWidth: Function;

  setTempSelectedTags: Function;
  setTempSelectedSize: Function;
  setTempSelectedTrending: Function;
  setTempSelectedOrientation: Function;
  setTempSelectedPrice: Function;
  setSelectedTempCountry: Function;
  setSelectedTempState: Function;
  searchQuery: string;
  selectedLetter: string | null;
  setSearchQuery: Function;
  setSelectedLetter: Function;
}

export const defaultNavigationContext = {
  selectedTags: [],
  selectedTheme: null,
  selectedTechnique: null,
  selectedMedium: null,
  selectedSize: null,
  selectedPrice: null,
  selectedTrending: null,
  selectedOrientation: null,
  selectedCountry: null,
  selectedState: null,
  selectedHeight: null,
  setSelectedHeight: () => {},
  selectedWidth: null,
  setSelectedWidth: () => {},

  setSelectedTags: () => {},
  setSelectedTheme: () => {},
  setSelectedTechnique: () => {},
  setSelectedMedium: () => {},
  setSelectedSize: () => {},
  setSelectedPrice: () => {},
  setSelectedTrending: () => {},
  setSelectedOrientation: () => {},
  setSelectedCountry: () => {},
  setSelectedState: () => {},

  selectedTempTags: [],
  selectedTempSize: null,
  tempSelectedTrending: null,
  tempSelectedOrientation: null,
  tempSelectedPrice: null,
  selectedTempCountry: null,
  selectedTempState: null,
  tempSelectedHeight: null,
  setTempSelectedHeight: () => {},
  tempSelectedWidth: null,
  setTempSelectedWidth: () => {},

  setTempSelectedTags: () => {},
  setTempSelectedSize: () => {},
  setTempSelectedTrending: () => {},
  setTempSelectedOrientation: () => {},
  setTempSelectedPrice: () => {},
  setSelectedTempCountry: () => {},
  setSelectedTempState: () => {},
  searchQuery: "",
  selectedLetter: null,
  setSearchQuery: () => {},
  setSelectedLetter: () => {},
};

export const NavigationContext = React.createContext<ContextNavigation>(
  defaultNavigationContext
);
