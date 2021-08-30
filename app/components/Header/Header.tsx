import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MuiButton from '@material-ui/core/Button'
import { LinearProgress } from "@material-ui/core";

import { useTranslation } from 'next-i18next'
import Button from '../Button/Button';
import DrawerMenu from '../DrawerMenu/DrawerMenu';
import I18nSelector from '../I18nSelector/I18nSelector'
import { styles } from './header.css'
import React, { useEffect, useRef, useState } from 'react'
import { useGetChatClient } from '../../hooks/useGetChatClient'
import { useGetActivityToken } from '../../hooks/useGetActivityClient'
import ProfileIconButton from '../ProfileIconButton/ProfileIconButton'
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import router from 'next/router'
import { useUser } from '../../hooks/useUser'
import { Membership } from '../../models/Membership'
import clsx from 'clsx'
import useSignupRedirectHref from '../../hooks/useSignupRedirectHref'
import { FlatFeed, NotificationDropdown, StreamApp } from 'react-activity-feed'
import 'react-activity-feed/dist/index.css';
import { connect } from 'getstream';
import { useNotificationRemovedFromChannelListener } from 'stream-chat-react'

export default function Header({ loading = true }) {
  const { t } = useTranslation('header');
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const { username, profilePicture, isSignedIn, membership } = useUser();
  const signUpRedirectHref = useSignupRedirectHref();
  
  const [unreadChatMessages, setUnreadChatMessages] = useState(0);
  const [chatClient] = useState(useGetChatClient(username, profilePicture, isSignedIn, setUnreadChatMessages));
  const logoHref = "/";
  const [openMenu, setOpenMenu] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  // const unreadN = useRef(0);

  const { token: activityToken, isError, isLoading } = useGetActivityToken(username, isSignedIn);
  
  const unreadNotificationsIncrement = () => {
    setUnreadNotifications((prevState) => prevState + 1);
  }


  useEffect(() => {
    let userFeed;
    const initFeeds = async () => {
      const streamClient = connect('x595terv4p22', activityToken, '1128230');
      userFeed = streamClient.feed('notification', username);
      const notifications = await userFeed.get();

      const unread = notifications.results.reduce((total, currentValue) => total + currentValue.activity_count, 0);
      setUnreadNotifications(unread);
      
      const notificationSubscription = userFeed.subscribe((data) => {
        unreadNotificationsIncrement();
      });
    }
    if (username && activityToken) {  
      initFeeds();
    }
    return () => {
      userFeed?.unsubscribe();
    }
  }, [username, activityToken]);

  //TODO: On logout or refresh perhaps, unsubscribe to events to avoid memory leak
  // https://getstream.io/chat/docs/react/event_listening/?language=javascript#stop-listening-for-events

  useEffect(() => {
    if (chatClient) {
      chatClient.on((event) => {
        if (event.total_unread_count !== undefined) {
          setUnreadChatMessages(event.total_unread_count);
        }
      });
    }

    return () => {
      chatClient.off((_) => { });
    }
  }, [chatClient]);

  return (
    <>
    <AppBar classes={{ root: s.toolbar }} elevation={0}>
      <Toolbar>
        <div className={s.container}>
          <div className={s.menuButton}>
            <IconButton color="default" aria-label="menu" onClick={(_) => setOpenMenu(true)}>
              <Badge classes={{ root: s.menuIconWithBadge }} badgeContent={unreadChatMessages} max={99} color="primary">
                <MenuIcon style={{ fontSize: '30px' }} />
              </Badge>
              <MenuIcon classes={{ root: s.menuIcon }} style={{ fontSize: '30px' }} />
            </IconButton>
          </div>
          <div className={s.logoContainer}>
            <Link href={logoHref}>
              <a>
                <img
                  className={s.logo}
                  src="/Artportable_Logotyp_Black.svg"
                  alt="Logo Artportable"
                />
              </a>
            </Link>
          </div>
          <nav className={s.navigation}>
            {(isSignedIn) &&
              <MuiButton classes={{ root: s.navButton }} color="default" size="large">
                <Link href="/feed">
                  {t('myArtNetwork')}
                </Link>
              </MuiButton>
            }
            <MuiButton classes={{ root: s.navButton }} color="default" size="large">
              <Link href="/">
                {t('discover')}
              </Link>
            </MuiButton>
          </nav>
          {(!isSignedIn) &&
            <div className={s.login}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                disableElevation
                rounded
                onClick={() => keycloak.register({ 
                  locale: router.locale,
                  redirectUri: signUpRedirectHref})}>
                {t('signUp')}
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                disableElevation
                rounded
                onClick={() => keycloak.login({ locale : router.locale })}>
                {t('login')}
              </Button>
            </div>
          }
          {(isSignedIn) &&
            <div className={clsx(s.login, isSignedIn && 'signedIn')}>
              {(membership === Membership.PortfolioPremium) &&
                <div className={s.upload}>
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
                </div>
              }
              <div className={s.iconButtons}>
                <div className={s.notificationButton}>
                  {activityToken && !isError && !isLoading ?
                    // <StreamApp apiKey='x595terv4p22' appId='1128230' token={activityToken}>
                    //   <NotificationDropdown 
                    //     notify 
                    //     right 
                    //     Icon={() => (
                    //       <IconButton color="secondary" aria-label="account">
                    //         <Badge badgeContent={0} max={99} color="primary">
                    //           <NotificationsIcon 
                    //             style={{ fontSize: '30px' }} 
                    //           />
                    //         </Badge>
                    //       </IconButton>
                    //     )}
                    //   />
                    // </StreamApp>

                    <IconButton color="secondary" aria-label="account" onClick={() => unreadNotificationsIncrement()}>
                      <Badge badgeContent={unreadNotifications} max={99} color="primary">
                        <NotificationsIcon 
                          style={{ fontSize: '30px' }} 
                        />
                      </Badge>
                    </IconButton>
                    :
                    <IconButton aria-label="account" disabled aria-disabled>
                      <NotificationsIcon 
                        classes={{ root: s.notificationIcon }}
                        style={{ fontSize: '30px' }} 
                        
                      />
                    </IconButton>
                  }
                </div>
                <Link href="/messages">
                  <a>
                    <IconButton color="secondary" aria-label="account">
                      <Badge badgeContent={unreadChatMessages} max={99} color="primary">
                        <ChatBubbleIcon style={{ fontSize: '30px' }} />
                      </Badge>
                    </IconButton>
                  </a>
                </Link>

                <ProfileIconButton profilePicture={profilePicture}></ProfileIconButton>
              </div>
            </div>
          }
          <div className={s.language}>
            <I18nSelector></I18nSelector>
          </div>
        </div>
        <DrawerMenu open={openMenu} setOpen={setOpenMenu} unreadChatMessages={unreadChatMessages}></DrawerMenu>
      </Toolbar>
    </AppBar>
    {loading &&
      <LinearProgress style={{ position: 'absolute', top: '69px', width: '100vw' }} />
    }
    </>
  );
}