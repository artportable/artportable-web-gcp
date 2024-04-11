import { useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import { UrlObject } from "url";

export const useRedirectToLoginIfNotLoggedIn = () => {
  const { isSignedIn } = useContext(UserContext);
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  return (originalRedirect?: UrlObject | string) => {
    if (!isSignedIn.value) {
      history.pushState(window.location.href, "Artportable");
      keycloak.login({ locale: router.locale });
    } else {
      if (originalRedirect !== undefined) {
        router.push(originalRedirect);
      }
    }
  };
};

export const useRedirectToRegisterIfNotLoggedIn = () => {
  const { isSignedIn } = useContext(UserContext);
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  return (originalRedirect?: UrlObject | string) => {
    if (!isSignedIn.value) {
      history.pushState(window.location.href, "Artportable");
      keycloak.register({ locale: router.locale });
    } else {
      if (originalRedirect !== undefined) {
        router.push(originalRedirect);
      }
    }
  };
};
