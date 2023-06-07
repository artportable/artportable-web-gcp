import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import ArtportableJob from "../app/components/ArtportableJob/ArtportableJob";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { styles } from "../styles/job.css";

export default function Exhibition({ navBarItems }) {
  const s = styles();
  return (
    <>
      <Main navBarItems={navBarItems}>
        <Head>
          <title>Exhibitions at artportable</title>
        </Head>
        <div className={s.banner}>Hello</div>
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
        "header",
        "footer",
        "support",
      ])),
    },
    revalidate: 60,
  };
}
