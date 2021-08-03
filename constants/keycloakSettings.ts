import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';
export const keycloakConfig: KeycloakConfig = {
  realm: process.env.NEXT_PUBLIC_KEYCLOAKREALM || "test",
  url: process.env.NEXT_PUBLIC_KEYCLOAKURL || "https://artportable-idp.azurewebsites.net/auth",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAKCLIENTID || "artportable-web"
}

export const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: (typeof window !== 'undefined' && window.location.origin ? window.location.origin : '') + "/silent-check-sso.html",
  pkceMethod: 'S256',
  enableLogging: true
}
