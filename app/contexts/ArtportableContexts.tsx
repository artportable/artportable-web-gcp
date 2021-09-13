import { TokenContext } from './token-context'
import { LoadingContext, Loading } from './loading-context'
import { useState } from 'react';

export const ArtportableContexts = ({ children, accessToken }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <TokenContext.Provider value={accessToken}>
      <LoadingContext.Provider value={{ loading: isLoading, setLoading: setIsLoading}}>
        {children}
      </LoadingContext.Provider>
    </TokenContext.Provider>
  );
}

export default ArtportableContexts;