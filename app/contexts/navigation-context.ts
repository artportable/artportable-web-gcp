import React, { useState } from "react";

export interface ContextNavigation {
  selectedTags: any[];
  selectedTheme: string | null;
  selectedTechnique: string | null;
  selectedSize: string | null;
  selectedPrice: string | null;
  selectedTrending: string | null;
  selectedOrientation: string | null;

  setSelectedTags: Function;
  setSelectedTheme: Function;
  setSelectedTechnique: Function;
  setSelectedSize: Function;
  setSelectedPrice: Function;
  setSelectedTrending: Function;
  setSelectedOrientation: Function;

  selectedTempTags: string[];
  selectedTempSize: string | null;
  tempSelectedTrending: string | null;
  tempSelectedOrientation: string | null;
  tempSelectedPrice: string | null;

  setTempSelectedTags: Function;
  setTempSelectedSize: Function;
  setTempSelectedTrending: Function;
  setTempSelectedOrientation: Function;
  setTempSelectedPrice: Function;

  searchQuery: string;
  selectedLetter: string | null;
  setSearchQuery: Function;
  setSelectedLetter: Function;
}

export const defaultNavigationContext = {
  selectedTags: [],
  selectedTheme: null,
  selectedTechnique: null,
  selectedSize: null,
  selectedPrice: null,
  selectedTrending: null,
  selectedOrientation: null,

  setSelectedTags: () => {},
  setSelectedTheme: () => {},
  setSelectedTechnique: () => {},
  setSelectedSize: () => {},
  setSelectedPrice: () => {},
  setSelectedTrending: () => {},
  setSelectedOrientation: () => {},

  selectedTempTags: [],
  selectedTempSize: null,
  tempSelectedTrending: null,
  tempSelectedOrientation: null,
  tempSelectedPrice: null,

  setTempSelectedTags: () => {},
  setTempSelectedSize: () => {},
  setTempSelectedTrending: () => {},
  setTempSelectedOrientation: () => {},
  setTempSelectedPrice: () => {},

  searchQuery: "",
  selectedLetter: null,
  setSearchQuery: () => {},
  setSelectedLetter: () => {},
};

export const NavigationContext = React.createContext<ContextNavigation>(
  defaultNavigationContext
);
