import { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";
export const keycloakConfig: KeycloakConfig = {
  realm: process.env.NEXT_PUBLIC_KEYCLOAKREALM || "test",
  url:
    process.env.NEXT_PUBLIC_KEYCLOAK_URL || "https://idp.artportable.com/auth",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENTID || "artportable-web",
};
export const getCurrentLanguage = () => {
  if (typeof window !== "undefined") {
    const languageCode = window.location.pathname.split("/")[1];

    if (languageCode === "en") {
      return "en";
    } else if (languageCode === "nn-NO") {
      return "nn-NO";
    } else {
      return "sv";
    }
  }

  return "sv";
};

export const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "check-sso",
  silentCheckSsoRedirectUri:
    (typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "") + "/silent-check-sso.html",
  pkceMethod: "S256",
  enableLogging: true,
};
