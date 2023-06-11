import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function Exhibitions() {
  return (
    <>
      <div>Utställningar</div>
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
        "footer",
        "header",
        "gdpr",
        "support",
        "plans",
        "exhibitions",
      ])),
    },
    revalidate: 60,
  };
}
