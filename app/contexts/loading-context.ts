import React from "react";

export interface Loading {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoadingContext = React.createContext<Loading>({
  loading: false,
  setLoading: () => null
});
