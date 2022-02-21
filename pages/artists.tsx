import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../app/components/Main/Main';
import Artists from '../app/components/Artists/Artists';

export default function artists() {
  return <>
    <Main>
      <Artists />
    </Main>
</>
  
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'header', 'footer', 'feed', 'support', 'plans']),
    }
  }
}




