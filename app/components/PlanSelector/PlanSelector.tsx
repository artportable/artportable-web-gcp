import { Box, Card, CardContent, Tab, Tabs, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_PRICE } from "../../redux/actions/signupActions";
import { capitalizeFirst } from "../../utils/util";
import Button from "../Button/Button";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import PlansInfoList from "../PlansInfoList/PlansInfoList";
import { styles } from "./planSelector.css";

export default function PlanSelector({ priceData }) {
  const { t } = useTranslation(['plans', 'common', 'checkout']);
  const s = styles();
  const dispatch = useDispatch();

  const [selectedPaymentInterval, setSelectedPaymentInterval] = useState('yearly');


  function getPriceText(priceOption) {
    return `${priceOption.amount} ${priceOption.currency.toUpperCase()}` +
    ` / ${t('common:words.year')} (+${t('common:words.vat')})`;
  }

  function getBasePrice() {
    return getPaymentOptions().find(paymentOption => paymentOption.product === 'Portfolio');
  }

  function getPremiumPrice() {
    return getPaymentOptions().find(paymentOption => paymentOption.product === 'Portfolio Premium');
  }

  function getPaymentOptions() {
    return selectedPaymentInterval === "yearly" ? 
      priceData.filter(price => price.recurringInterval === 'year') :
      priceData.filter(price => price.recurringInterval === 'month');
  }

  const handleNavClick = (plan) => {
    if(plan === 'free') {
    } else {
      dispatch({
        type: ADD_PRICE,
        payload: {...plan}
      });
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

  return (
    <div>
      <div className={s.paymentOptions}>
        <Tabs
          value={selectedPaymentInterval}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, newValue) => setSelectedPaymentInterval(newValue)}
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
                secondaryText={t('youCanAlwaysUpdateYourMembership')}
              ></PaymentInfo>
              <PlansInfoList texts={getBaseTexts(t)}></PlansInfoList>

              <Link href='/'>
                <a>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    rounded
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
                    rounded
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
                    rounded
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
