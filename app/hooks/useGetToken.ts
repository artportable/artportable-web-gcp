import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from 'keycloak-js'
import { useEffect, useState } from "react";

export function useGetToken() {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    if(!initialized && !keycloak.authenticated){
      setToken(null)
    }
    else{
      setToken(keycloak.token);
    }
  }, [initialized, keycloak.authenticated, keycloak.token]);

  return token;
}