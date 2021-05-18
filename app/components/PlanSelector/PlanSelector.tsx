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

  const [paymentInterval, setPaymentInterval] = useState('year');

  function getPriceText(price) {
    return `${price.amount} ${price.currency.toUpperCase()}` +
      ` / ${t('common:words.year')} (+${t('common:words.vat')})`;
  }

  function getPrice(plan) {
    return priceData
    .filter(price => price.recurringInterval === paymentInterval)
    .find(paymentOption => paymentOption.product === plan);
  }

  const onNavClick = (plan) => {
    if(plan === 'free') {
    } else {
      dispatch({
        type: ADD_PRICE,
        payload: {...plan}
      });
    }
  }

  function getBullets(t, plan) {
    return t(`plans.${plan}.listTexts`, {returnObjects: true});
  }

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
              <PlansInfoList texts={getBullets(t, 'base')}></PlansInfoList>

              <Link href='/'>
                <a>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    rounded
                    onClick={(_) => onNavClick('free')}>
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
                priceText={getPriceText(getPrice('Portfolio'))}
                secondaryText={t('youCanAlwaysUpdateYourMembership')}></PaymentInfo>
              
              <PlansInfoList everythingFromPrevious texts={getBullets(t, 'portfolio')}></PlansInfoList>
              <Link href="/signup">
                <a>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    rounded
                    onClick={(_) => onNavClick(getPrice('Portfolio'))}>
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
                priceText={getPriceText(getPrice('Portfolio Premium'))}
                secondaryText={t('youCanAlwaysUpdateYourMembership')}></PaymentInfo>

              <PlansInfoList everythingFromPrevious texts={getBullets(t, 'portfolioPremium')}></PlansInfoList>

              <Link href="/signup">
                <a>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    rounded
                    onClick={(_) => onNavClick(getPrice('Portfolio Premium'))}>
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
