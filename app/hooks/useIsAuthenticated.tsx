import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'

export function useIsAuthenticated(): { isAuthenticated: boolean } {
  const { keycloak } = useKeycloak<KeycloakInstance>();

  return { isAuthenticated: keycloak.authenticated };
}
