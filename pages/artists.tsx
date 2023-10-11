import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../app/components/Main/Main';
import Artists from '../app/components/Artists/Artists';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function artists({navBarItems}) {
  
  const { t } = useTranslation(['header']);

  return <>
    <Main navBarItems={navBarItems}>
      <Head>
        <title>
          {t("artists")}
        </title>
        <meta name="description" content={t("artistsPageDescripton")} />
      </Head>
      <Artists />
    </Main>
  </>

}
export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...await serverSideTranslations(locale, ['common', 'header', 'footer', 'feed', 'support', 'plans']),
    },
    revalidate: 60,
  };
}