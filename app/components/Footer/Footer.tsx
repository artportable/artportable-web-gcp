import Link from 'next/link'
import { Typography } from '@material-ui/core'
import { styles } from './footer.css'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'

export default function Footer() {
  const s = styles();
  const { t } = useTranslation('footer');

  return (
    <footer className={s.footer}>
      <div className={clsx(s.flexItem, s.logo)}>
        <Link href={"/"}>
          <a>
            <img
              className={s.logo}
              src="/Artportable_Logotyp_Black.svg"
              alt="Logo Artportable"
            />
          </a>
        </Link>
        <div>
          <Typography variant="body2" component="div">
            Åsögatan 176
          </Typography>
          <Typography variant="body2" component="div">
            116 32 Stockholm
          </Typography>
          <Typography variant="body2" component="div">
            559113-1171
          </Typography>
        </div>
      </div>
      <div className={s.links}>
        <div className={s.flexItem}>
          <Typography variant="subtitle2" component="div" color="primary">
            {t('contactUs')}
          </Typography>
          <Link href="/support">
            <a>
              <Typography variant="body2" component="div">
                {t('contactForm')}
              </Typography>
            </a>
          </Link>
          <Link href="mailto:sales@artportable.com">
            <a>
              <Typography variant="body2" component="div">
                sales@artportable.com
              </Typography>
            </a>
          </Link>
          <Link href="mailto:support@artportable.com">
            <a>
              <Typography variant="body2" component="div">
                support@artportable.com
              </Typography>
            </a>
          </Link>
          <Link href="mailto:report@artportable.com">
            <a>
              <Typography variant="body2" component="div">
                report@artportable.com
              </Typography>
            </a>
          </Link>
        </div>
        <div className={s.flexItem}>
          <Typography variant="subtitle2" component="div" color="primary">
          {t('followUs')}
          </Typography>
          <Link href="https://www.instagram.com/artportableofficial/">
            <a>
              <Typography variant="body2" component="div">
                Instagram
              </Typography>
            </a>
          </Link>
          <Link href="https://www.facebook.com/artportable/">
            <a>
              <Typography variant="body2" component="div">
                Facebook
              </Typography>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
