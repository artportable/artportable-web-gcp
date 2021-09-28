import { TokenContext } from './token-context'
import { LoadingContext } from './loading-context'
import { UserContext, ContextUser, defaultContextUser } from './user-context';
import { useEffect, useState } from 'react';
import { AuthClientEvent } from '@react-keycloak/core';
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'


interface Props {
  children: any;
  accessToken: string;
  keycloakState: AuthClientEvent;
}

export const ArtportableContexts = ({ children, accessToken, keycloakState }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userContext, setUserContext] = useState<ContextUser>(defaultContextUser);
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  
  useEffect(() => {
    console.log('KeycloakState: ', keycloakState);
    console.log('accessToken: ', accessToken);
    const tokenParsed = keycloak.tokenParsed as any;

    console.log('tokenParsed: ', tokenParsed)
    if(keycloakState === 'onAuthSuccess') {
      setUserContext((prevValue) => ({ 
        ...prevValue,
         isSignedIn: {
          value: true,
          isPending: false,
         },
         username: {
           value: tokenParsed.preferred_username,
           isPending: false,
         },
         family_name: {
          value: tokenParsed.family_name,
          isPending: false,
        },
        given_name: {
          value: tokenParsed.given_name,
          isPending: false,
        },
        user_type: {
          value: tokenParsed.user_type,
          isPending: false,
        },
         phone: {
          value: tokenParsed.phone,
          isPending: false,
        },
        email: {
          value: tokenParsed.email,
          isPending: false,
        },
        })
      );
    } else if (keycloakState === 'onReady') {
      if(!keycloak.authenticated) {
        setUserContext((prevValue) => ({
          ...prevValue,
          isSignedIn: {
            value: false,
            isPending: false,
          },
          username: {
            value: null,
            isPending: false,
          },
          family_name: {
            value: null,
            isPending: false,
          },
          given_name: {
            value: null,
            isPending: false,
          },
          user_type: {
            value: null,
            isPending: false,
          },
          phone: {
            value: null,
            isPending: false,
          },
          email: {
            value: null,
            isPending: false,
          },
        }));
      }
    }
  }, [keycloakState, accessToken]);

  useEffect(() => {
    console.log('USER CONTEXT Use Effect.. UserContext: ', userContext);
    if (userContext.username.value && 
      !userContext.username.isPending && 
      !userContext.membership.value && 
      !userContext.membership.isPending &&
      !userContext.family_name.value &&
      !userContext.family_name.isPending &&
      !userContext.given_name.value &&
      !userContext.given_name.isPending &&
      !userContext.user_type.value &&
      !userContext.user_type.isPending &&
      !userContext.phone.value &&
      !userContext.phone.isPending &&
      !userContext.email.value &&
      !userContext.email.isPending ) {
      const tokenParsed = keycloak.tokenParsed as any;

      const loginUrl = new URL(`${apiBaseUrl}/api/user/login`);
      loginUrl.searchParams.append('email', tokenParsed.email);

      setUserContext((prevValue) => ({ 
        ...prevValue,
         membership: {
           value: null,
           isPending: true,
         }
        })
      );

      fetch(loginUrl.href, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${keycloak.token}`
        }
      }).then(res => {
        if (res.status === 204) {
          // const anonymousUser = { username: null, profilePicture: null, isSignedIn: true, membership: Membership.Base }

          // dispatch({
          //   type: LOGIN_USER,
          //   payload: anonymousUser
          // });
          // router.push('/plans');
          
        } else if (res.status === 200) {
          res.json().then(json => {
            setUserContext((prevValue) => ({ 
              ...prevValue,
                membership: {
                  value: json.Product,
                  isPending: false,
                }
              })
            );

          });
        }
      }).catch(err => {
        console.warn(err);
      });
    }
  }, [userContext]);

  return (
    <TokenContext.Provider value={accessToken}>
      <UserContext.Provider value={userContext}>
        <LoadingContext.Provider value={{ loading: isLoading, setLoading: setIsLoading}}>
          {children}
        </LoadingContext.Provider>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}

export default ArtportableContexts;