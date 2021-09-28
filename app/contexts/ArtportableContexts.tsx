import { TokenContext } from './token-context'
import { LoadingContext } from './loading-context'
import { UserContext, ContextUser, defaultContextUser } from './user-context';
import { useEffect, useState } from 'react';
import { AuthClientEvent } from '@react-keycloak/core';
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { Snackbar } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab';
import { useTranslation } from "next-i18next";



interface Props {
  children: any;
  accessToken: string;
  keycloakState: AuthClientEvent;
}

interface Snackbar {
  open: boolean;
  message: string;
  severity: AlertProps["color"];
}

export const ArtportableContexts = ({ children, accessToken, keycloakState }: Props) => {
  const { t } = useTranslation(['snackbar']);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userContext, setUserContext] = useState<ContextUser>(defaultContextUser);
  const [snackbar, setSnackbar] = useState<Snackbar>({ open: false, message: '', severity: 'warning' });
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  
  useEffect(() => {
    const tokenParsed = keycloak.tokenParsed as any;

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
    else if (keycloakState === 'onInitError') {
      if(!keycloak.authenticated) {
        setSnackbar({ 
          open: true,
          message: t('couldNotContactLoginServerTryAgain'),
          severity: 'error'
        });

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
    if (userContext.username.value && 
      !userContext.username.isPending && 
      !userContext.membership.value && 
      !userContext.membership.isPending) {
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

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false, message: '', severity: 'warning' });
  }

  return (
    <TokenContext.Provider value={accessToken}>
      <UserContext.Provider value={userContext}>
        <LoadingContext.Provider value={{ loading: isLoading, setLoading: setIsLoading}}>
          <>
            {children}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity}>
                {snackbar.message}
              </Alert>
            </Snackbar>
          </>
        </LoadingContext.Provider>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}

export default ArtportableContexts;