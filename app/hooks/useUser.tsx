import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useEffect, useState } from 'react';
import { useDispatch, useStore } from "react-redux";
import { LOGIN_USER } from '../redux/actions/userActions';
import User from '../models/User'
import { useRouter } from 'next/router';

export function useUser(): User {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const store = useStore();
  const dispatch = useDispatch();
  const user = store.getState()?.user;
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  const [_, setLocalUser] = useState(user);

  useEffect(() => {
    if(initialized && keycloak.authenticated && !user.isSignedIn) {
      const parsedToken = keycloak.tokenParsed as any;
      
      const login = async () => {
        const loginUrl = new URL(`${apiBaseUrl}/api/user/login`);
        loginUrl.searchParams.append('email', parsedToken.email);

        try {
          const response = await fetch(loginUrl.href);

          if(response.status === 204) {
            const anonymousUser = { username: null, profilePicture: null, isSignedIn: true }
            setLocalUser(anonymousUser);
            dispatch({
              type: LOGIN_USER,
              payload: anonymousUser
            });
            router.push('/signup');
            return;
          }

          if (response.status === 200) {
            const data = await response.json();
  
            dispatch({
              type: LOGIN_USER,
              payload: { 
                username: data.Username,
                profilePicture: data.ProfilePicture, 
                isSignedIn: true
              }
            });
  
            setLocalUser(data);
          }
        } catch (error) {
          console.warn(error);
        }
      }
      login();
    }
    // User has logged in via keycloak but has not finished registering their profile
    if(initialized && keycloak.authenticated && user.isSignedIn && user.username === null) {
      router.push('/signup');
    }
  }, [initialized]);

  return user;
}
