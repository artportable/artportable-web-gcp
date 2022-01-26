import Main from '../app/components/Main/Main'
import ZendeskForm from '../app/components/ZendeskFormMenu/ZendeskFormMenu'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { styles } from '../styles/support.css'
import { Paper, Typography } from '@material-ui/core'
import { useTranslation } from 'next-i18next'

export default function Support() {
  const s = styles();
  const { t } = useTranslation(['support']);

  return (
    <Main>
      <div className={s.flexPaper}>
      <Paper className={s.paper}>
      <Typography variant="h5" className={s.headline}>
      {t('support:writeToUs')}
      </Typography>
      <div className={s.zendeskForm}>
        <ZendeskForm></ZendeskForm>
      </div>
      </Paper>
      </div>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['header', 'support', 'footer', 'support', 'common', 'plans']),
    }
  };
}