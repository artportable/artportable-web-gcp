import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useSignupRedirectHref = () => {
  const router = useRouter();
  const [signUpRedirectHref, setSignUpRedirectHref] = useState("");

  useEffect(() => {
    const isDefaultLocale = router.locale == router.defaultLocale;
    // Check if user has selected a plan that should go to checkout
    const plan = typeof window !== 'undefined' ? sessionStorage.getItem('plan') : null;
    const shouldGoToCheckout = plan && ['portfolio', 'portfolioPremium', 'portfolioMini'].includes(plan);
    
    const page = shouldGoToCheckout ? 'checkout' : 'plans';
    const redirectHref = `${window.origin}${
      isDefaultLocale ? "" : `/${router.locale}`
    }/${page}`;
    setSignUpRedirectHref(redirectHref);
  }, []);

  return signUpRedirectHref;
};

export default useSignupRedirectHref;
