import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";

export const useSignupRedirectHref = () => {
  const router = useRouter();
  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();

  useEffect(() => {
    const isDefaultLocale = router.locale == router.defaultLocale;
    
    let shouldGoToCheckout = false;
    
    // First check sessionStorage (for direct plan selections on this domain)
    const sessionPlan = typeof window !== 'undefined' ? sessionStorage.getItem('plan') : null;
    if (sessionPlan && ['portfolio', 'portfolioPremium', 'portfolioMini'].includes(sessionPlan)) {
      shouldGoToCheckout = true;
    }
    
    // Then check JWT token (for users coming from IDP with selected plans)
    if (initialized && keycloak.tokenParsed) {
      const parsedToken = keycloak.tokenParsed as any;
      console.log("useSignupRedirectHref - JWT token:", parsedToken);
      if (parsedToken.user_type) {
        const [plan] = parsedToken.user_type.split("-");
        console.log("useSignupRedirectHref - extracted plan:", plan);
        // Map IDP plan names and check if they should go to checkout
        const planMapping = {
          "portfolioMini": true,
          "portfolio": true, 
          "portfolioPremium": true,
          "mini": true,
          "basic": true,
          "premium": true
        };
        
        if (planMapping[plan]) {
          shouldGoToCheckout = true;
          console.log("useSignupRedirectHref - plan found, shouldGoToCheckout:", shouldGoToCheckout);
        }
      }
    }
    
    console.log("useSignupRedirectHref - final shouldGoToCheckout:", shouldGoToCheckout, "redirecting to:", shouldGoToCheckout ? 'checkout' : 'plans');
    
    const page = shouldGoToCheckout ? 'checkout' : 'plans';
    const redirectHref = `${window.origin}${
      isDefaultLocale ? "" : `/${router.locale}`
    }/${page}`;
    setSignUpRedirectHref(redirectHref);
  }, [initialized, keycloak.tokenParsed]);

  return signUpRedirectHref;
};

export default useSignupRedirectHref;
