import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { Head } from "next/document";
import { useTranslation } from "next-i18next";

export default function Exhibitions() {
  const { t } = useTranslation("exhibitions");
  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <div>Utställningar</div>
    </>
  );
}
