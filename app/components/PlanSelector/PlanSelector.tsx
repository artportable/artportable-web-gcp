import { Tab, Tabs } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { getDistinct } from "../../utils/util";
import PlanCard from "../PlanCard/PlanCard";
import { styles } from "./planSelector.css";

export default function PlanSelector({ priceData }) {
  const { t } = useTranslation(['plans', 'common', 'checkout']);
  const s = styles();

  const [paymentInterval, setPaymentInterval] = useState('year');

  const plans = getDistinct(priceData, (p) => p.product);

  return (
    <div>
      <div className={s.paymentOptions}>
        <Tabs
          value={paymentInterval}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, val) => setPaymentInterval(val)}
          >
          <Tab value="year" label={t('checkout:yearlyPayment')} />
          <Tab value="month" label={t('checkout:monthlyPayment')} />
        </Tabs>
      </div>
      <div className={s.planCards}>
        {plans.map(plan =>
          {
            const p = priceData.find(pd => pd.product === plan && pd.recurringInterval === paymentInterval);
            return <PlanCard plan={p} key={p.id}></PlanCard>
          }
        )}
      </div>
    </div>
  );
}
