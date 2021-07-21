import Image from 'next/image'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import MuiButton from '@material-ui/core/Button'

import { useTranslation } from 'next-i18next'
import Button from '../Button/Button';
import I18nSelector from '../I18nSelector/I18nSelector'
import { styles } from './header.css'
import React, { useEffect, useState } from 'react'
import { useGetChatClient } from '../../hooks/useGetChatClient'
import ProfileIconButton from '../ProfileIconButton/ProfileIconButton'
import { useGetUserProfilePicture } from '../../hooks/dataFetching/UserProfile'
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated'
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'

export default function Header({ isSignUp, username = null }) {
  const { t } = useTranslation('header');
  const s = styles();
  const { profilePicture } = useGetUserProfilePicture(username);
  const isAuthenticated = useIsAuthenticated();
  const { keycloak } = useKeycloak<KeycloakInstance>();

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const containerClasses = `${s.container} ${isSignUp ? s.isSignUp : ''}`;
  
  const [unreadChatMessages, setUnreadChatMessages] = useState(0);
  const [chatClient] = useState(useGetChatClient(username, profilePicture, isAuthenticated, setUnreadChatMessages));
  const logoHref = isAuthenticated ? "/feed" : "/";
  
    //TODO: On logout or refresh perhaps, unsubscribe to events to avoid memory leak
    // https://getstream.io/chat/docs/react/event_listening/?language=javascript#stop-listening-for-events

  useEffect(() => {
    if(chatClient) {
      chatClient.on((event) => {
        if (event.total_unread_count !== undefined) {
          setUnreadChatMessages(event.total_unread_count);
        }
      });
      
    }

    return () => {
      chatClient.off((_) => {});
    }
  }, [chatClient]);

  return (
    <AppBar color="transparent" elevation={0}>
      <div className={containerClasses}>
        <div className={s.logo}>
          <Link href={logoHref}>
            <a>
              <img
                src="/Artportable_Logotyp_Black.svg"
                alt="Logo Artportable"
                width={188}
                height={51}
              />
            </a>
          </Link>
        </div>
        <nav className={s.navigation}>
          {(!isSignUp && isAuthenticated) &&
            <MuiButton classes={{root: s.navButton}} color="default" size="large">
              <Link href="/feed">
                {t('myArtNetwork')}
              </Link>
            </MuiButton>
          }
          {!isSignUp &&
            <MuiButton classes={{root: s.navButton}} color="default" size="large">
              <Link href="/discover">
                {t('discover')}
              </Link>
            </MuiButton>
          }
        </nav>
        {(!isSignUp && !isAuthenticated) &&
          <div className={s.login}>
            <Link href="/plans">
              <a>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                  rounded>
                    {t('signUp')}
                </Button>
              </a>
            </Link>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              disableElevation
              rounded
              onClick={() => keycloak.login()}>
                {t('login')}
            </Button>
          </div>
        }
        {(!isSignUp && isAuthenticated) &&
          <div className={s.login}>
            <Link href="/upload">
              <a>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  disableElevation
                  rounded>
                    {t('upload')}
                </Button>
              </a>
            </Link>
            <div className={s.iconButtons}>
              <Link href="/messages">
                <a>
                  <IconButton color="secondary" aria-label="account">
                    <Badge badgeContent={unreadChatMessages} max={99} color="primary">
                      <ChatBubbleIcon style={{ fontSize: '30px'}} />
                    </Badge> 
                  </IconButton>
                </a>
              </Link>
              <IconButton color="secondary" aria-label="account">
                <NotificationsIcon style={{ fontSize: '30px'}} />
              </IconButton>
              <ProfileIconButton profilePicture={profilePicture}></ProfileIconButton>
            </div>
          </div>
        }
        <div className={s.language}>
          <I18nSelector></I18nSelector>
        </div>
      </div>
    </AppBar>
  );
}