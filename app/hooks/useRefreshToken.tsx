import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useCallback } from "react";

const useRefreshToken = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const refreshToken = useCallback(async () => {
    if (keycloak.isTokenExpired()) return await keycloak.updateToken(60);
    return null;
  }, []);

  return {
    refreshToken,
  };
};

export default useRefreshToken;
