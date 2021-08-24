import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export const useSignupRedirectHref = () => {
  const router = useRouter();
  const [signUpRedirectHref, setSignUpRedirectHref] = useState('');

  useEffect(() => {
    const isDefaultLocale = router.locale == router.defaultLocale;
    const redirectHref = `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/plans`
    setSignUpRedirectHref(redirectHref);
  }, []);

  return signUpRedirectHref;
}

export default useSignupRedirectHref;