import Link from 'next/link'
import { Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, IconButton, Badge, Collapse, Divider, Dialog, DialogContent, Typography, Box} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'next-i18next'
import { styles } from './drawerMenu.css'
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import useSignupRedirectHref from '../../hooks/useSignupRedirectHref'
import { UserContext } from '../../contexts/user-context'
import { useContext, useState, useEffect } from 'react'
import { useGetUserProfilePicture } from '../../hooks/dataFetching/UserProfile'
import { Membership } from '../../models/Membership'
import DialogConstruction from '../ContactDialog/contactDialog'
import { Locales, DisplayLocales } from '../../models/i18n/locales'
import PlanSelector, { PriceData } from "../PlanSelector/PlanSelector"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Upgrade from './Upgrade'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function DrawerMenu({ open, setOpen, unreadChatMessages }) {
  const { t } = useTranslation(['header', 'common', 'support']);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const { username, isSignedIn, membership } = useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const signUpRedirectHref = useSignupRedirectHref();
  const [openLanguage, setOpenopenLanguage] = useState(false);
  const displayLocale = router.locale === Locales.sv ?
  DisplayLocales.sv : DisplayLocales.en;

  const close = () => setOpen(false);

  const [openContact, setOpenContact] = useState(false);
  const [openUpgrade, setOpenUpgrade] = useState(false);

  function handleClickLanguage(event) {
    setOpenopenLanguage(!openLanguage);
    event.stopPropagation();
  };

  function handleCloseLanguage(_, locale?: Locales) {
    if(locale !== undefined) {
      router.push(router.asPath, null, { locale: locale });
    }
  } 
  const handleClickContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact= () => {
    setOpenContact(false);
  };

  const handleClickUpgrade = () => {
    setOpenUpgrade(true);
  };

  const handleCloseUpgrade = () => {
    setOpenUpgrade(false);
  }; 

  return (
    <Drawer classes={{ paper: s.container }} open={open} onClose={() => close()}>
      <div>
        <IconButton color="default" aria-label="close menu" onClick={() => close()}>
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
        <a href="https://old.artportable.com/stories/" target="blank" className={s.articleLink}>
          <ListItem button divider>
            <ListItemText primary={t('stories')} />
          </ListItem>
        </a>
          <ListItem button divider onClick={handleClickContact} >
            <ListItemText primary={t('contactUs')} />
          </ListItem >
          <DialogConstruction 
            openContact={openContact}
            handleClose={handleCloseContact} />
          
        {isSignedIn.value ?
          <>
          {(membership.value < Membership.Portfolio) &&       
            <div>
            <ListItem button divider onClick={handleClickUpgrade} >
              <ListItemText primary={t('upgrade')} />
              </ListItem > 
              <Upgrade
                openUpgrade={openUpgrade}
                handleCloseUpgrade={handleCloseUpgrade} />
              
              </div>    
            }      
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
            <ListItem button divider onClick={() => keycloak.logout()}>
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
            <ListItem button divider onClick={() => keycloak.login({ locale: router.locale })}>
              <ListItemText primary={t('login')} />
            </ListItem>
          </>
          
        }
        <div className={s.languageElement}>
          <ListItem button onClick={handleClickLanguage}>
            <ListItemText primary={displayLocale} />
              {openLanguage ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openLanguage} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
            <ListItem button className={s.nested} onClick={(_) => handleCloseLanguage(_, Locales.sv)}>
                <ListItemText primary={t('swedish')} />
              </ListItem>
              <ListItem button className={s.nested} onClick={(_) => handleCloseLanguage(_, Locales.en)}>
                <ListItemText primary={t('english')} />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          </div>
      </List>
    </Drawer>
  );
}