import { useContext } from "react";
import { UserContext } from "../contexts/user-context"
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'

export const useRedirectToLoginIfNotLoggedIn = () => {
  const { isSignedIn } = useContext(UserContext);
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  return () => {
    if(!isSignedIn.value) {
      history.pushState(window.location.href, "Artportable");
      keycloak.login({ locale: router.locale });
    }
  }
}