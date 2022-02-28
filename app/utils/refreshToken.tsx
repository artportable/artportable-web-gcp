import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'

export async function refreshToken(){

  const { keycloak } = useKeycloak<KeycloakInstance>();
  
  if(keycloak.isTokenExpired())
    return await keycloak.updateToken(60)
  return
}

