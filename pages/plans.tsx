import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import Button from '../app/components/Button/Button';
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PlansInfoList from '../app/components/PlansInfoList/PlansInfoList';
import PaymentInfo from '../app/components/PaymentInfo/PaymentInfo';
import { capitalizeFirst } from '../app/utils/util'
import { styles } from '../styles/plans.css'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_PRICE } from '../app/redux/actions/signupActions';

export default function Plans({ priceData }) {
  const { t } = useTranslation(['plans', 'common', 'checkout']);
  const dispatch = useDispatch();
  const s = styles();
  const [selectedPaymentInterval, setSelectedPaymentInterval] = useState('yearly');

  function getPaymentOptions() {
    return selectedPaymentInterval === "yearly" ? 
      priceData.filter(price => price.recurringInterval === 'year') :
      priceData.filter(price => price.recurringInterval === 'month');
  }

  function getBasePrice() {
    return getPaymentOptions().find(paymentOption => paymentOption.product === 'Portfolio');
  }

  function getPremiumPrice() {
    return getPaymentOptions().find(paymentOption => paymentOption.product === 'Portfolio Premium');
  }

  function getPriceText(priceOption) {
    return `${priceOption.amount} ${priceOption.currency.toUpperCase()}` +
    ` / ${t('common:words.year')} (+${t('common:words.vat')})`;
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedPaymentInterval(newValue);
  };

  const handleNavClick = (plan) => {
    if(plan === 'free') {
    } else {
      dispatch({
        type: ADD_PRICE,
        payload: {...plan}
      });
    }
  }

  return (
    <div className={s.plansRootContainer}>
      <div className={s.header}>
        <Typography variant="h1" align="center">
          <Box fontFamily="LyonDisplay" fontWeight="fontWeightMedium">
            {t('welcomeTo')}
          </Box>
        </Typography>
      </div>
      <div className={s.paymentOptions}>
        <Typography align="center" component="div">
          <Box fontWeight="fontWeightBold" marginBottom="15px"> {t('ourMemberships')}</Box>
        </Typography>
        <Tabs
          value={selectedPaymentInterval}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          >
          <Tab value="yearly" label={t('checkout:yearlyPayment')} />
          <Tab value="monthly" label={t('checkout:monthlyPayment')} />
        </Tabs>
      </div>
      <div className={s.options}>
        <div className={s.optionBase}>
          <Card className={s.cardRoot}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <Box fontWeight="fontWeightMedium" textAlign="center">
                  {t('plans.base.name')}
                </Box>
              </Typography>

              <PaymentInfo 
                priceText={capitalizeFirst(t('common:words.free'))} 
                secondaryText={t('youCanAlwaysUpdateYourMembership')}></PaymentInfo>
              
              <PlansInfoList texts={getBaseTexts(t)}></PlansInfoList>

              <Link href='/'>
                <a>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    roundedButton
                    onClick={(_) => handleNavClick('free')}>
                    {capitalizeFirst(t('common:words.choose'))} {t('plans.base.name')}
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className={s.optionStandard}>
          <Card className={s.cardRoot}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <Box fontWeight="fontWeightMedium" textAlign="center">
                  {t('plans.portfolio.name')}
                </Box>
              </Typography>
              
              <PaymentInfo 
                priceText={getPriceText(getBasePrice())} 
                secondaryText={t('youCanAlwaysUpdateYourMembership')}></PaymentInfo>
              
              <PlansInfoList everythingFromPrevious texts={getPortfolioTexts(t)}></PlansInfoList>
              <Link href="/signup">
                <a>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    roundedButton
                    onClick={(_) => handleNavClick(getBasePrice())}>
                    {capitalizeFirst(t('common:words.choose'))} {t('plans.portfolio.name')}
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className={s.optionPremium}>
          <Card className={s.cardRoot}>
            <CardContent>
              <Typography variant="h5" component="h2">
                <Box fontWeight="fontWeightMedium" textAlign="center">
                  {t('plans.portfolioPremium.name')}
                </Box>
              </Typography>

              <PaymentInfo 
                priceText={getPriceText(getPremiumPrice())} 
                secondaryText={t('youCanAlwaysUpdateYourMembership')}></PaymentInfo>

              <PlansInfoList everythingFromPrevious texts={getPortfolioPremiumTexts(t)}></PlansInfoList>

              <Link href="/signup">
                <a>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    roundedButton
                    onClick={(_) => handleNavClick(getPremiumPrice())}>
                    {capitalizeFirst(t('common:words.choose'))} {t('plans.portfolioPremium.name')}
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  // @ts-ignore Used for ignoring cert validation, remove before prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
  
  const priceData = await getPriceData();

  return { 
    props: {
      priceData,
      ...await serverSideTranslations(locale, ['header', 'plans', 'common', 'checkout']),
    } 
  };
}

async function getPriceData() {
  try {
    const res = await fetch(`http://localhost:5001/api/payments/prices`);
    return await res?.json();
  } catch(e) {
    console.log('Could not fetch price info', e);
  }
}

function getBaseTexts(translator) {
  return [
    translator('plans.base.listTexts.0'),
    translator('plans.base.listTexts.1'),
    translator('plans.base.listTexts.2'),
    translator('plans.base.listTexts.3')
  ]
}

function getPortfolioTexts(translator) {
  return [
    translator('plans.portfolio.listTexts.0'),
    translator('plans.portfolio.listTexts.1'),
    translator('plans.portfolio.listTexts.2'),
    translator('plans.portfolio.listTexts.3'),
    translator('plans.portfolio.listTexts.4'),
    translator('plans.portfolio.listTexts.5')
  ]
}

function getPortfolioPremiumTexts(translator) {
  return [
    translator('plans.portfolioPremium.listTexts.0'),
    translator('plans.portfolioPremium.listTexts.1'),
    translator('plans.portfolioPremium.listTexts.2'),
    translator('plans.portfolioPremium.listTexts.3'),
  ]
}