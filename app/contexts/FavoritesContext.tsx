import React, { createContext, useState, useEffect } from "react";

interface FavoritesContextType {
  favoriteIds: string[];
  updateFavorites: (newFavorites: string[]) => void;
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favoriteIds: [],
  updateFavorites: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Initialize favorites from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedFavorites = localStorage.getItem("favoriteArt");
        const parsedFavorites = storedFavorites
          ? JSON.parse(storedFavorites)
          : [];
        setFavoriteIds(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favoriteArt from localStorage:", error);
        setFavoriteIds([]);
      }
    }
  }, []);

  const updateFavorites = (newFavorites: string[]) => {
    try {
      localStorage.setItem("favoriteArt", JSON.stringify(newFavorites));
      setFavoriteIds(newFavorites);
    } catch (error) {
      console.error("Error updating favoriteArt in localStorage:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, updateFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}
