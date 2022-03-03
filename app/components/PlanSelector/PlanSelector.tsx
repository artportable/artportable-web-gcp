import { Tab, Tabs } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import React, { useContext, useState } from "react";
import { getDistinct } from "../../utils/util";
import PlanCard from "../PlanCard/PlanCard";
import Button from '../Button/Button';
import { styles } from "./planSelector.css";
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { useRouter } from 'next/router'
import useSignupRedirectHref from '../../hooks/useSignupRedirectHref';
import clsx from 'clsx';
import { PriceData } from "../../../pages/plans";
import PhoneInput from "../PhoneInput/PhoneInput";
import { UserContext } from "../../contexts/user-context";

interface Props {
  priceData: PriceData[];
  landingPageMode?: boolean;
  showAll: boolean;
  requirePhone?: boolean; 
  // showTab: boolean;
}

export default function PlanSelector({ priceData, landingPageMode, showAll, requirePhone = false }: Props) {
  const { t } = useTranslation(['plans', 'common']);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const signUpRedirectHref = useSignupRedirectHref();
  const { isTyping } = useContext(UserContext);

  // requirePhone ? <PhoneInput /> : null

  const [paymentInterval, setPaymentInterval] = useState('year');

  const priceDataWithPremium: PriceData[] = [...priceData, {
    id: "premium",
    product: "portfolioPremium",
    productKey: "portfolioPremium",
    currency: "sek",
    recurringInterval: "month",
  }, {
    id: "premium",
    product: "portfolioPremium",
    productKey: "portfolioPremium",
    currency: "sek",
    recurringInterval: "year",
    amount: 4500,
  }];

  const plans = getDistinct(priceData.sort(compareAmounts), (p) => p.product);
  plans.push("portfolioPremium");

  function compareAmounts(a, b) {
    if (a.amount < b.amount) {
      return -1;
    }
    if (a.amount > b.amount) {
      return 1;
    }
    return 0;
  }

  return (
    <div>
      {!isTyping ? 
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
      </div>
      :
      null
      }
      <div className={s.planCards}>
        {plans.filter((plan) => {
          return showAll || (!showAll && plan === 'Portfolio')
        }).map(plan => {
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
              redirectUri: signUpRedirectHref
            })}>
            {t('joinTheCommunity')}
          </Button>
        </div>
      }
    </div>
  );
}
