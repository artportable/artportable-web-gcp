import Main from '../app/components/Main/Main'
import ZendeskForm from '../app/components/ZendeskForm/ZendeskForm'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { styles } from '../styles/support.css'

export default function Support() {
  const s = styles();

  return (
    <Main>
      <div className={s.zendeskForm}>
        <ZendeskForm></ZendeskForm>
      </div>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['header', 'support', 'footer']),
    }
  };
}