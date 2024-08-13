import { useContext, useEffect, useState } from "react";
import Button from "../app/components/Button/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useTranslation } from "next-i18next";

import { PriceData, getPriceData } from "../pages/plans";

import { UserContext } from "../app/contexts/user-context";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { getDistinct } from "../app/utils/util";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PlanCard from "../app/components/PlanCard/PlanCard";
import { styles } from "../styles/upgrade.css";
import PlanSelector from "../app/components/PlanSelector/PlanSelector";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Upgrade({ navBarItems, priceData }) {
  const s = styles();
  const { t } = useTranslation(["plans", "common"]);
  const router = useRouter();
  const [hideTabs, setHideTabs] = useState(false);

  const [paymentInterval, setPaymentInterval] = useState("year");

  const plans = getDistinct(priceData?.sort(compareAmounts), (p) => p.product);
  const { isSignedIn, username, socialId, membership, phone, user_type } =
    useContext(UserContext);

  function compareAmounts(a, b) {
    if (a.amount < b.amount) {
      return -1;
    }
    if (a.amount > b.amount) {
      return 1;
    }
    return 0;
  }

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
      <div style={{ backgroundColor: "", width: "100%", height: "100%" }}>
        {membership?.value >= 2 ? (
          <div>
            {hideTabs === false && (
              <div className={s.paymentOptions}>
                <Tabs
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#000",
                    },
                  }}
                  value={paymentInterval}
                  onChange={(_, val) => setPaymentInterval(val)}
                  style={{ color: "black" }}
                >
                  <Tab
                    value="month"
                    label={t("monthlyPayment")}
                    style={{ color: "black" }}
                  />
                  <Tab
                    value="year"
                    label={t("yearlyPayment")}
                    style={{ color: "black" }}
                  />
                </Tabs>
              </div>
            )}
            <div className={s.planCards}>
              {plans.map((plan) => {
                if (plan === "Portfolio Premium") {
                  const p = priceData.find(
                    (pd) =>
                      pd.product === plan &&
                      pd.recurringInterval === paymentInterval
                  );
                  return p ? (
                    <PlanCard plan={p} key={p.id} setHideTabs={true}></PlanCard>
                  ) : (
                    <></>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          </div>
        ) : (
          <div>
            <div className={s.planCards}>
              <PlanSelector
                showAll={true}
                priceData={priceDataFor}
              ></PlanSelector>
            </div>
          </div>
        )}
      </div>
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
