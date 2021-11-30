import { TokenContext } from './token-context'
import { LoadingContext } from './loading-context'
import { UserContext, ContextUser, defaultContextUser } from './user-context';
import { useEffect, useRef, useState } from 'react';
import { AuthClientEvent } from '@react-keycloak/core';
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { Snackbar } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab';
import { useTranslation } from "next-i18next";
import { ChatClientContext } from './chat-context';

import { ConnectionOpen, StreamChat } from 'stream-chat';
import { AttachmentType, ChannelType, CommandType, EventType, MessageType, ReactionType, UserType } from '../components/Messaging/MessagingTypes';
import { useGetUserProfilePicture } from '../hooks/dataFetching/UserProfile';
import { isNullOrUndefinedOrEmpty } from '../utils/util';
import router from 'next/router';

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

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userContext, setUserContext] = useState<ContextUser>(defaultContextUser);
  const [snackbar, setSnackbar] = useState<Snackbar>({ open: false, message: '', severity: 'warning' });
  const { data: profilePicture, isLoading : isProfilePictureLoading } = useGetUserProfilePicture(userContext.username.value);
  const chatClientRef = useRef<StreamChat<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType>>(null);
  const [chatClient, setChatClient] = useState<StreamChat<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType>>();
  const { keycloak } = useKeycloak<KeycloakInstance>();

  useEffect(() => {
    if(chatClientRef.current === null && accessToken !== null) {
      if(!userContext.socialId.isPending && !userContext.username.isPending && !isProfilePictureLoading) {
          const initChat = async () => {
            chatClientRef.current = StreamChat.getInstance<
              AttachmentType,
              ChannelType,
              CommandType,
              EventType,
              MessageType,
              ReactionType,
              UserType>(apiKey);

            const response = await fetch(`${apiBaseUrl}/api/messages/connect?userId=${userContext.socialId.value}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${accessToken}`
              },
            });
      
            const user = await response.json();
            try {
              await chatClientRef.current.connectUser({
                id: userContext.socialId.value,
                name: userContext.username.value,
                image: !isNullOrUndefinedOrEmpty(profilePicture) ? `${bucketUrl}${profilePicture}` : null,
              }, user.Token) as ConnectionOpen<ChannelType, CommandType, UserType>

              setChatClient(chatClientRef.current);
            } catch (error) {
              console.warn(error)
            }
          }
          
          initChat();
      }
    }
  }, [userContext, isProfilePictureLoading]);

  
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
          socialId: {
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
          router.push("/plans");
        } else if (res.status === 200) {
          res.json().then(json => {
            setUserContext((prevValue) => ({ 
              ...prevValue,
                membership: {
                  value: json.Product,
                  isPending: false,
                },
                socialId: {
                  value: json.SocialId,
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
          <ChatClientContext.Provider value={chatClient}>
            <>
              {children}
              <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} variant="filled" severity={snackbar.severity}>
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </>
          </ChatClientContext.Provider>
        </LoadingContext.Provider>
      </UserContext.Provider>
    </TokenContext.Provider>
  );
}

export default ArtportableContexts;