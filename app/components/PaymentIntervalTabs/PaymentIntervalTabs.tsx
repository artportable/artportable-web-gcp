import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { useTranslation } from "next-i18next";

export type PaymentInterval = 'yearly' | 'monthly';
type Props = {
  selectedPaymentInterval: PaymentInterval,
  paymentIntervalSetter: (paymentInterval: PaymentInterval) => void
}

export default function PaymentIntervalTabs({ selectedPaymentInterval, paymentIntervalSetter }: Props) {
  const { t } = useTranslation('checkout');
  const handleChange = (_, newValue) => {
    paymentIntervalSetter(newValue);
  }

  return (
    <Tabs
      value={selectedPaymentInterval}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      >
      <Tab value="yearly" label={t('yearlyPayment')} />
      <Tab value="monthly" label={t('monthlyPayment')} />
    </Tabs>
  );
}