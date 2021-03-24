import Image from 'next/image'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import Button from '../Button/Button';
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
              <a>{t('myArtNetwork')}</a>
            </Link>
          }
          {!isSignUp &&
            <>
              <Link href="/discover">
                <a>{t('discover')}</a>
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
                  roundedButton>
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
                  roundedButton>
                    {t('login')}
                </Button>
              </a>
            </Link>
          </div>
        }
        <div className={s.language}>
          Swe
          <FontAwesomeIcon icon="chevron-down" />
        </div>
      </div>
    </AppBar>
  );
}