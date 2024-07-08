import React from "react";

// creating an interface/model for the navbar. Where does it get used and how?

export interface Menu {
  editArtworkMenuOpen: boolean;
  openEditArtworkMenu: (artwork: any | null, update: Function) => void; // what is this and where is it used?
  closeEditArtworkMenu: () => void; // what is this?
  artworkToEdit: any;
}

export const MenuContexts = React.createContext<Menu>({
  editArtworkMenuOpen: false,
  openEditArtworkMenu: (artwork: any | null, update: Function) => null,
  closeEditArtworkMenu: () => null,
  artworkToEdit: null,
});
