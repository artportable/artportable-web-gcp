import Head from 'next/head'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Signup() {
  const { t } = useTranslation('common');


  return (
    <>
      <Head>
        <title>Art Portable - </title>
      </Head>
      <div>test</div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['signup']),
    }
  }
}