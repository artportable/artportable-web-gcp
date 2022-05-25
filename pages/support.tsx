import Main from '../app/components/Main/Main'
import ZendeskForm from '../app/components/ZendeskFormMenu/ZendeskFormMenu'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { styles } from '../styles/support.css'
import { Paper, Typography } from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import { getNavBarItems } from '../app/utils/getNavBarItems';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

export default function Support({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(['support']);

  return (
    <Main navBarItems={navBarItems}>
      <Typography variant="h1" className={s.headerTypo}>
        Kontakta oss
      </Typography>
      <div className={s.flexPaper}>
        <Paper className={s.paperLeft}>
          <Typography className={s.textBlock}>
            Du är alltid välkommen att höra av dig till oss om du har några frågor kring tjänsten eller vill komma i kontakt med oss.
          </Typography>
          <div className={s.iconTextFlex}>
            <MailOutlineIcon className={s.icon} />
            <Typography>
              hello@artportable.com
            </Typography>
          </div>
          <div className={s.iconTextFlex}>
            <PhoneIphoneIcon className={s.icon} />
            <Typography>
              08 - 557 661 20
            </Typography>
          </div>
          <Typography className={s.textBlock}>
            Öppettider måndag - fredag 8-17.

            Avvikande öppettider vid röda dagar och vernissage.
          </Typography>
          <div className={s.zendeskForm}>
            <ZendeskForm />
          </div>
        </Paper>
        <Paper className={s.paperRight}>
          <div>
            <Typography>
              Artportable AB
            </Typography>
            <Typography>
              559113-1171
            </Typography>
            <Typography>
              Åsögatan 176
            </Typography>
            <Typography>
              116 32 Stockholm
            </Typography>
          </div>
        </Paper>
      </div>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...await serverSideTranslations(locale, ['header', 'support', 'footer', 'support', 'common', 'plans']),
    },
    revalidate: 60,
  };
}