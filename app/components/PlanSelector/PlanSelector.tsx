import { Tab, Tabs } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { getDistinct } from "../../utils/util";
import PlanCard from "../PlanCard/PlanCard";
import Button from '../Button/Button';
import { styles } from "./planSelector.css";
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'
import useSignupRedirectHref from '../../hooks/useSignupRedirectHref';
import clsx from 'clsx';


export interface PriceData {
  id: string;
  product: "portfolioPremium" | "portfolio" | "free";
  productKey: string;
  currency: string;
  recurringInterval: string;
  amount?: number;
  
}

interface Props {
  priceData: PriceData[];
  landingPageMode?: boolean;
  showAll: boolean;
}

export default function PlanSelector({ priceData, landingPageMode, showAll = false }: Props ) {
  const { t } = useTranslation(['plans', 'common']);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const signUpRedirectHref = useSignupRedirectHref();

  const [paymentInterval, setPaymentInterval] = useState('year');

  const priceDataWithPremium: PriceData[] = [...priceData, {
    id: "premium",
    product: "portfolioPremium",
    productKey: "portfolioPremium",
    currency: "sek",
    recurringInterval: "month"
  }, {
    id: "premium",
    product: "portfolioPremium",
    productKey: "portfolioPremium",
    currency: "sek",
    recurringInterval: "year"
  }];
  
  const plans = getDistinct(priceData.sort(compareAmounts), (p) => p.product);
  console.log(plans)
  plans.push("portfolioPremium");

  function compareAmounts(a, b) {
    if (a.amount < b.amount){
      return -1;
    }
    if (a.amount > b.amount){
      return 1;
    }
    return 0;
  }

  return (
    <div>
      {!landingPageMode && 
        <div className={s.paymentOptions}>
          <Tabs
            value={paymentInterval}
            indicatorColor="primary"
            textColor="primary"
            onChange={(_, val) => setPaymentInterval(val)}
            >
            <Tab value="month" label={t('monthlyPayment')} />
            <Tab value="year" label={t('yearlyPayment')} />
          </Tabs>
        </div>
      }
      <div className={s.planCards}>
        {plans.filter ((plan) => {
          return showAll ||(!showAll && plan === 'Portfolio') 
          }).map(plan =>
          {
            const p = priceDataWithPremium.find(pd => pd.product === plan && pd.recurringInterval === paymentInterval);
              return <PlanCard hideButtons={landingPageMode} plan={p} key={p.id}></PlanCard>
          })}
      </div>
      {landingPageMode &&
        <div className={s.joinCommunityButton}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            rounded
            onClick={() => keycloak.register({
              locale: router.locale,
              redirectUri: signUpRedirectHref})}>
            {t('joinTheCommunity')}
          </Button>
        </div>
      }
    </div>
  );
}
