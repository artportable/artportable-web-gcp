import Link from 'next/link'
import { Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, IconButton, Badge } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import { useTranslation } from 'next-i18next'
import { styles } from './drawerMenu.css'
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import useSignupRedirectHref from '../../hooks/useSignupRedirectHref'
import { UserContext } from '../../contexts/user-context'
import { useContext } from 'react'
import { useGetUserProfilePicture } from '../../hooks/dataFetching/UserProfile'
import { Membership } from '../../models/Membership'

export default function DrawerMenu({ open, setOpen, unreadChatMessages }) {
  const { t } = useTranslation(['header', 'common']);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const { username, isSignedIn, membership } = useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const signUpRedirectHref = useSignupRedirectHref();

  const close = () => setOpen(false);

  return (
    <Drawer classes={{ paper: s.container }} open={open} onClose={(_) => close()}>
      <div>
        <IconButton color="default" aria-label="close menu" onClick={(_) => close()}>
          <CloseIcon style={{ fontSize: '30px' }} />
        </IconButton>
      </div>
      <List>
        {(isSignedIn.value) &&
          <Link href="/feed" passHref>
            <ListItem button divider>
              <ListItemText primary={t('myArtNetwork')} />
            </ListItem>
          </Link>
        }
        <Link href="/" passHref>
          <ListItem button divider>
            <ListItemText primary={t('discover')} />
          </ListItem>
        </Link>
        <Link href="/support">
          <ListItem button divider>
            <ListItemText primary={t('contactUs')} />
          </ListItem>
        </Link>

        {isSignedIn.value ?
          <>
            {(membership.value > Membership.Base) &&
              <Link href="/upload" passHref>
                <ListItem button divider>
                  <ListItemIcon>
                    <InsertPhotoIcon color="secondary" style={{ fontSize: 30 }} />
                  </ListItemIcon>
                  <ListItemText primary={t('upload')} />
                </ListItem>
              </Link>
            }
            
            <Link href="/messages" passHref>
              <ListItem button divider>
                <ListItemIcon>
                  <Badge badgeContent={unreadChatMessages} max={99} color="primary">
                    <ChatBubbleIcon color="secondary" style={{ fontSize: 30 }} />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={t('messages')} />
              </ListItem>
            </Link>
            <Link href={`/profile/@${username.value}`} passHref>
              <ListItem button divider>
                <ListItemAvatar>
                  <ProfileAvatar size={30} profilePicture={profilePicture}></ProfileAvatar>
                </ListItemAvatar>
                <ListItemText primary={t('profile')} />
              </ListItem>
            </Link>
            <ListItem button onClick={() => keycloak.logout()}>
              <ListItemIcon>
                <ExitToAppIcon style={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary={t('logout')} />
            </ListItem>
          </>
          :
          <>
            <ListItem button divider>
              <ListItemText primary={t('signUp')} onClick={() => keycloak.register({
                locale: router.locale,
                redirectUri: signUpRedirectHref
              })} />
            </ListItem>
            <ListItem button onClick={() => keycloak.login({ locale: router.locale })}>
              <ListItemText primary={t('login')} />
            </ListItem>
          </>
          
        }
      </List>
    </Drawer>
  );
}