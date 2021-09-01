import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useEffect, useState } from 'react';
import { useDispatch, useStore } from "react-redux";
import { LOGIN_USER } from '../redux/actions/userActions';
import User from '../models/User'
import { useRouter } from 'next/router';
import { Membership } from '../models/Membership';

type UserInitialized = {
  username: string,
  profilePicture: string,
  isSignedIn: boolean,
  membership: Membership,
  initialized: boolean,
}

export function useUser(): UserInitialized {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const store = useStore();
  const dispatch = useDispatch();
  const user = store.getState()?.user;
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    if (initialized && keycloak.authenticated && !user.isSignedIn) {
      const parsedToken = keycloak.tokenParsed as any;

      const login = async () => {
        const loginUrl = new URL(`${apiBaseUrl}/api/user/login`);
        loginUrl.searchParams.append('email', parsedToken.email);
        
        try {
          const response = await fetch(loginUrl.href, {
            method: 'GET',
            headers: {
              'Authorization' : `Bearer ${keycloak.token}`
            }
          });

          if (response.status === 204) {
            const anonymousUser = { username: null, profilePicture: null, isSignedIn: true, membership: Membership.Base }
            setLocalUser(anonymousUser);
            dispatch({
              type: LOGIN_USER,
              payload: anonymousUser
            });
            router.push('/plans');
            return { initialized };
          }

          if (response.status === 200) {
            const data = await response.json();

            dispatch({
              type: LOGIN_USER,
              payload: {
                username: data.Username,
                profilePicture: data.ProfilePicture,
                isSignedIn: true,
                membership: data.Product
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
    if (initialized && keycloak.authenticated && user.isSignedIn && user.username === null) {
      router.push('/plans');
    }
  }, [initialized]);

  return { ...user, initialized: (initialized && localUser)};
}
