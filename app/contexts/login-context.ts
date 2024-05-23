import React from "react";

export interface Login {
  loginDialogOpen: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
}

export const LoginContext = React.createContext<Login>({
  loginDialogOpen: false,
  openLoginDialog: () => null,
  closeLoginDialog: () => null,
});