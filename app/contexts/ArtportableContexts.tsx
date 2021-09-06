import { TokenContext } from "./token-context";

export const ArtportableContexts = ({ children, accessToken }) => {
  return (
    <TokenContext.Provider value={accessToken}>
      {children}
    </TokenContext.Provider>
  );
}

export default ArtportableContexts;