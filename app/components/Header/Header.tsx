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
import React, { useContext, useEffect, useState } from 'react'
import { useGetActivityToken } from '../../hooks/useGetActivityClient'
import ProfileIconButton from '../ProfileIconButton/ProfileIconButton'
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import router from 'next/router'
import { Membership } from '../../models/Membership'
import useSignupRedirectHref from '../../hooks/useSignupRedirectHref'
import 'react-activity-feed/dist/index.css';
import NotificationIconButton from '../NotificationIconButton/NotificationIconButton'
import { LoadingContext } from '../../contexts/loading-context'
import { UserContext } from '../../contexts/user-context'
import { ChatClientContext } from '../../contexts/chat-context'
import { useGetUserProfilePicture } from '../../hooks/dataFetching/UserProfile'
import { OwnUserResponse } from 'stream-chat'
import { ChannelType, CommandType, UserType } from '../Messaging/MessagingTypes'
import { ActionType, CategoryType, trackGoogleAnalytics } from '../../utils/googleAnalytics'
import UpgradePortfolio from '../UpgradePortfolio/UpgradPortfolio'

export default function Header({navBarItems}) {
  const { t } = useTranslation(['header', 'support']);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const { socialId, username, isSignedIn, membership } = useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const signUpRedirectHref = useSignupRedirectHref();

  const [unreadChatMessages, setUnreadChatMessages] = useState(0);
  const logoHref = "/";
  const [openMenu, setOpenMenu] = useState(false);
  const [globalIsLoading, setglobalIsLoading] = useState(false);
  const { token: activityToken, isError, isLoading } = useGetActivityToken(username.value, socialId.value, isSignedIn.value);

  const chatClient = useContext(ChatClientContext);
  const { loading: loadingFromContext } = useContext(LoadingContext);


  useEffect(() => {
    if (loadingFromContext) {
      setglobalIsLoading(true);
    } else {
      setglobalIsLoading(false);
    }
  }, [loadingFromContext]);

  //TODO: On logout or refresh perhaps, unsubscribe to events to avoid memory leak
  // https://getstream.io/chat/docs/react/event_listening/?language=javascript#stop-listening-for-events

  useEffect(() => {
    if (chatClient) {
      setUnreadChatMessages((chatClient.user as OwnUserResponse<ChannelType, CommandType, UserType>).total_unread_count);
      chatClient.on((event) => {
        if (event.total_unread_count !== undefined) {
          setUnreadChatMessages(event.total_unread_count);
        }
      });
    }

    return () => {
      if (chatClient) {
        chatClient.off((_) => { });
      }
    }
  }, [chatClient]);

  return (
    <>
      <AppBar classes={{ root: s.toolbar }} elevation={0}>
        <Toolbar>
          <div className={s.container}>
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
              {(isSignedIn.value) &&
                <MuiButton classes={{ root: s.feed }} color="secondary" size="large">
                  <Link href="/feed">
                    MITT KONSTNÄTVERK
                    {/* {t('myArtNetwork')} */}
                  </Link>
                </MuiButton>
              }
              <Link href="/artiklar" passHref>
                <a>
                  <MuiButton color="secondary" size="large">
                    ARTIKLAR
                    {/* {t('stories')} */}
                  </MuiButton>
                </a>
              </Link>
            </nav>
            {(!isSignedIn.value) &&
              <div className={s.login}>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                  rounded
                  onClick={() => keycloak.register({
                    locale: router.locale,
                    redirectUri: signUpRedirectHref
                  })}>
                  {t('createPortfolio')}
                </Button>
                <Button
                className={s.signUp}
                  size="small"
                  variant="outlined"
                  disableElevation
                  rounded
                  onClick={() => keycloak.register({
                    locale: router.locale,
                    redirectUri: signUpRedirectHref
                  })}>
                  {t('signUp')}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  disableElevation
                  rounded
                  onClick={() => keycloak.login({ locale: router.locale })}>
                  {t('login')}
                </Button>
              </div>
            }
            <div className={s.singleNotificationButton}>
              {(isSignedIn.value) &&
                <>
                  {activityToken && !isError && !isLoading ?
                    <NotificationIconButton activityToken={activityToken} socialId={socialId.value} />
                    :
                    <IconButton aria-label="account" disabled aria-disabled>
                      <NotificationsIcon
                        classes={{ root: s.notificationIcon }}
                        style={{ fontSize: '30px' }}
                      />
                    </IconButton>
                  }
                </>
              }
            </div>
            {(isSignedIn.value) &&
              <>
                <div className={s.login}>
                  {(membership.value > Membership.Base) &&
                    <div className={s.upload}>
                      <Link href="/upload">
                        <a>
                          <Button
                            onClick={() => trackGoogleAnalytics(ActionType.UPLOAD_IMAGE_HEADER, CategoryType.INTERACTIVE)}
                            className={s.uploadButton}
                            size="small"
                            variant="outlined"
                            disableElevation
                            rounded>
                            {t('upload')}
                          </Button>
                        </a>
                      </Link>
                    </div>
                  }
                  {(membership.value < Membership.Portfolio) &&
                    <UpgradePortfolio />
                  }
                  <div className={s.iconButtons}>
                    <div className={s.notificationButton}>
                      {activityToken && !isError && !isLoading ?
                        <NotificationIconButton activityToken={activityToken} socialId={socialId.value} />
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
              </>
            }
            <div className={s.menuDrawer}>
              <IconButton aria-label="menu" onClick={(_) => setOpenMenu(true)} className={s.iconMenuColor}>
                <Badge classes={{ root: s.menuIconWithBadge }} badgeContent={unreadChatMessages} max={99} color="primary">
                  <MenuIcon style={{ fontSize: '30px' }} />
                </Badge>
                <MenuIcon classes={{ root: s.menuIcon }} style={{ fontSize: '30px' }} />
              </IconButton>
            </div>
            {/* <div className={s.language}>
              <I18nSelector></I18nSelector>
            </div> */}
          </div>
          <DrawerMenu open={openMenu} setOpen={setOpenMenu} unreadChatMessages={unreadChatMessages} navBarItems={navBarItems}></DrawerMenu>
        </Toolbar>
      </AppBar>
      {globalIsLoading &&
        <LinearProgress style={{ position: 'absolute', top: '69px', width: '100vw', zIndex: 1 }} />
      }
    </>
  );
}