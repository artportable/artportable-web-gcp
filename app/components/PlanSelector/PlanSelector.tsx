import { Tab, Tabs } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useState } from "react";
import { getDistinct } from "../../utils/util";
import PlanCard from "../PlanCard/PlanCard";
import Button from "../Button/Button";
import { styles } from "./planSelector.css";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import useSignupRedirectHref from "../../hooks/useSignupRedirectHref";
import { PriceData } from "../../../pages/plans";
import { UserContext } from "../../contexts/user-context";

interface Props {
  priceData: PriceData[];
  landingPageMode?: boolean;
  showAll: boolean;
  requirePhone?: boolean;
}

export default function PlanSelector({
  priceData,
  landingPageMode,
  showAll,
  requirePhone = false,
}: Props) {
  const { t } = useTranslation(["plans", "common"]);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const signUpRedirectHref = useSignupRedirectHref();
  const [hideTabs, setHideTabs] = useState(false);
  const { email, family_name, given_name, phone, user_type, membership } =
    useContext(UserContext);
  // Set default to "month"
  const [paymentInterval, setPaymentInterval] = useState("month");

  const plans = getDistinct(priceData?.sort(compareAmounts), (p) => p.product);

  function compareAmounts(a, b) {
    return a.amount - b.amount;
  }

  useEffect(() => {
    console.log(plans);
  }, [plans]);

  useEffect(() => {
    console.log(membership.value);
  }, [membership.value]);

  return (
    <div style={{ marginTop: "20px" }}>
      {!hideTabs && (
        <div className={s.paymentOptions}>
          <Tabs
            TabIndicatorProps={{
              style: {
                backgroundColor: "#000",
              },
            }}
            value={paymentInterval}
            onChange={(_, val) => setPaymentInterval(val)}
          >
            <Tab value="month" label={t("monthlyPayment")} />
            <Tab value="year" label={t("yearlyPayment")} />
          </Tabs>
        </div>
      )}
      <div className={s.planCards}>
        {plans
          .filter((plan) => {
            if (membership?.value === 2) {
              return (
                plan === "Portfolio Premium" ||
                plan === "Portfolio Premium Plus"
              );
            } else if (membership?.value === 3) {
              return plan === "Portfolio Premium Plus";
            }
            return true; // Default case: pass all plans
          })
          .map((plan) => {
            const p = priceData.find(
              (pd) =>
                pd.product === plan && pd.recurringInterval === paymentInterval
            );
            return p ? (
              <PlanCard
                hideButtons={landingPageMode}
                plan={p}
                setHideTabs={setHideTabs}
              />
            ) : null;
          })}
      </div>

      {landingPageMode && (
        <div className={s.joinCommunityButton}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            rounded
            onClick={() =>
              keycloak.register({
                locale: router.locale,
                redirectUri: signUpRedirectHref,
              })
            }
          >
            {t("joinTheCommunity")}
          </Button>
        </div>
      )}
    </div>
  );
}
