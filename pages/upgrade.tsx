import { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { PriceData, getPriceData } from "../pages/plans";
import { UserContext } from "../app/contexts/user-context";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { styles } from "../styles/upgrade.css";
import PlanSelector from "../app/components/PlanSelector/PlanSelector";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Upgrade({ navBarItems, priceData }) {
  const router = useRouter();

  const { isSignedIn, username, socialId, membership, phone, user_type } =
    useContext(UserContext);

  useEffect(() => {
    if (!isSignedIn.isPending && !isSignedIn.value) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  const [priceDataFor, setPriceData] = useState<PriceData[]>(null);
  useEffect(() => {
    const abortCont = new AbortController();
    async function getPriceData() {
      try {
        var response = await fetch(`${apiBaseUrl}/api/payments/prices`, {
          signal: abortCont.signal,
        });
        if (response.ok) setPriceData(await response.json());
      } catch (e) {
        if (e.name == "AbortError") {
          console.log("fetch aborted");
        }
        console.log("Could not fetch price info", e);
      }
    }
    getPriceData();
    return () => abortCont.abort();
  }, []);

  return (
    <Main isShow={false} navBarItems={navBarItems}>
      <PlanSelector showAll={true} priceData={priceDataFor} />
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();

  const priceData = await getPriceData();
  return {
    props: {
      navBarItems: navBarItems,
      priceData,
      ...(await serverSideTranslations(locale, [
        "header",
        "support",
        "footer",
        "support",
        "common",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}
