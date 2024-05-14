import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Main from "../app/components/Main/Main";
import ArtistsIndex from "../app/components/Artists/ArtistsIndex";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useRouter } from "next/router";

export default function artists({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const { locale } = useRouter();

  return (
    <>
      <Main navBarItems={navBarItems}>
        <Head>
          <title>{t("artists")}</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <link rel="canonical" href={`${publicUrl}/${locale}/artists`} />
        </Head>
        <ArtistsIndex showAllFromStart={true} />
      </Main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "feed",
        "support",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}
