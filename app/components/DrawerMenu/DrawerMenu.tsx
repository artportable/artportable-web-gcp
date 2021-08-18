import Link from 'next/link'
import { Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, IconButton, Badge } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import { useTranslation } from 'next-i18next'
import { styles } from './drawerMenu.css'
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'
import { useUser } from '../../hooks/useUser'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'

export default function DrawerMenu({ open, setOpen, unreadChatMessages }) {
  const { t } = useTranslation('header');
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const { profilePicture, isSignedIn } = useUser();

  const close = () => setOpen(false);

  return (
    <Drawer classes={{ paper: s.container }} open={open} onClose={(_) => close()}>
      <div>
        <IconButton color="default" aria-label="close menu" onClick={(_) => close()}>
              <CloseIcon style={{ fontSize: '30px' }} />
        </IconButton>
      </div>
      <div className={s.listsContainer}>
        <List>
          {(isSignedIn) &&
            <Link href="/feed" passHref>
              <ListItem button divider>
                <ListItemText primary={t('myArtNetwork')} />
              </ListItem>
            </Link>
          }
          <Link href="/discover" passHref>
            <ListItem button>
              <ListItemText primary={t('discover')} />
            </ListItem>
          </Link>
        </List>

        { isSignedIn ? 
          <List classes={{ root: s.authList }}>
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
            <ListItem button divider>
              <ListItemAvatar>
                <ProfileAvatar size={30} profilePicture={profilePicture}></ProfileAvatar>
              </ListItemAvatar>
              <ListItemText primary={t('profile')} />
            </ListItem>
            <ListItem button onClick={() => keycloak.logout()}>
              <ListItemIcon>
                <ExitToAppIcon style={{ fontSize: 30 }}  />
              </ListItemIcon>
              <ListItemText primary={t('logout')} />
            </ListItem>
          </List>
          :
          <List classes={{ root: s.authList }}>
            <ListItem button divider>
              <ListItemText primary={t('signUp')} />
            </ListItem>
            <ListItem button onClick={() => keycloak.login({ locale : router.locale })}>
              <ListItemText primary={t('login')} />
            </ListItem>
          </List>
        }
      </div>
    </Drawer>
  );
}