import Image from 'next/image'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import { useTranslation } from 'next-i18next'
import Button from '../Button/Button';
import I18nSelector from '../I18nSelector/I18nSelector'
import { styles } from './header.css'

export default function Header({ isSignUp, isSignedIn }) {
  const { t } = useTranslation('header');
  const s = styles();
  const containerClasses = `${s.container} ${isSignUp ? s.isSignUp : ''}`;

  return (
    
    <AppBar color="transparent" elevation={0}>
      <div className={containerClasses}>
        <div className={s.logo}>
          <Link href="/">
            <a>
              <Image
                src="/Artportable_Logotyp_Black.svg"
                alt="Logo Artportable"
                width={188}
                height={51}
              />
            </a>
          </Link>
        </div>
        <nav className={s.navigation}>
          {(!isSignUp && isSignedIn) &&
            <Link href="/feed">
              <a>
                <p className={s.text}>
                  {t('myArtNetwork')}
                </p>
              </a>
            </Link>
          }
          {!isSignUp &&
            <>
              <Link href="/discover">
                <a>
                  <p className={s.text}>
                    {t('discover')}
                  </p>
                </a>
              </Link>
              {/* <Link href="/articles">
                <a>{t('articles')}</a>
              </Link>
              <Link href="/about">
                <a>{t('about')}</a>
              </Link> */}
            </>
          }
        </nav>
        {(!isSignUp && !isSignedIn) &&
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
            <Link href="/login">
              <a>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  disableElevation
                  rounded>
                    {t('login')}
                </Button>
              </a>
            </Link>
          </div>
        }
        {(!isSignUp && isSignedIn) &&
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
            <IconButton color="secondary" aria-label="account">
              <ChatBubbleIcon style={{ fontSize: '30px'}} />
            </IconButton>
            <IconButton color="secondary" aria-label="account">
              <NotificationsIcon style={{ fontSize: '30px'}} />
            </IconButton>
            <IconButton color="secondary" aria-label="account">
              <AccountCircleIcon style={{ fontSize: '30px'}} />
            </IconButton>
          </div>
        }
        <div className={s.language}>
          <I18nSelector></I18nSelector>
        </div>
      </div>
    </AppBar>
  );
}