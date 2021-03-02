import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'next-i18next'
import s from './header.module.css'
import Button from '../Button/Button';

export default function Header() {
  const { t } = useTranslation('header');

  return (
    <div className={s.container}>
      <div className={s.logo}>
        <Link href="/">
          <a>
            <Image
              src="/art-logo-TEMP.PNG"
              alt="Logo Artportable"
              width={188}
              height={51}
            />
          </a>
        </Link>
      </div>
      <div className={s.navigation}>
        <Link href="/discover">
          <a>{t('discover')}</a>
        </Link>
        <Link href="/about">
          <a>Om oss</a>
        </Link>
      </div>
      <div className={s.login}>
        <Link href="/signup">
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
        <Button 
          size="small"
          variant="outlined" 
          color="primary" 
          disableElevation 
          roundedButton>
            {t('login')}
        </Button>
      </div>
      <div className={s.language}>
        Swe
        <FontAwesomeIcon icon="chevron-down" />
      </div>
    </div>
  );
}