import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function NotFound({ navBarItems }) {
  return <Main navBarItems={navBarItems}>Page not found!</Main>;
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
