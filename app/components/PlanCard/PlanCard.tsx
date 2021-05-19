import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { ADD_PRICE } from "../../redux/actions/signupActions";
import { capitalizeFirst } from "../../utils/util";
import Button from "../Button/Button";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import PlansInfoList from "../PlansInfoList/PlansInfoList";
import { styles } from "./planCard.css";

export default function PlanCard({ plan }) {
  const { t } = useTranslation(['plans', 'common', 'checkout']);
  const s = styles();
  const dispatch = useDispatch();

  function getPriceText() {
    if (plan.productKey === 'base') {
      return capitalizeFirst(t('common:words.free'));
    }

    return `${plan.amount} ${plan.currency.toUpperCase()}` +
      ` / ${t(`common:words.${plan.recurringInterval}`)} (+${t('common:words.vat')})`;
  }

  const onNavClick = () => {
    if(plan === 'free') {
      return;
    } else {
      dispatch({
        type: ADD_PRICE,
        payload: {...plan}
      });
    }
  }

  return (
    <div className={s.container}>
      <Card className={s.cardRoot}>
        <CardContent>
          <Typography variant="h5" component="h2">
            <Box fontWeight="fontWeightMedium" textAlign="center">
              {plan.product}
            </Box>
          </Typography>

          <PaymentInfo 
            priceText={getPriceText()} 
            secondaryText={t('youCanAlwaysUpdateYourMembership')}
          ></PaymentInfo>
          <PlansInfoList texts={t(`plans.${plan.productKey}.listTexts`, {returnObjects: true})}></PlansInfoList>

          <Link href='/signup'>
            <a>
              <Button 
                size="small"
                variant="contained"
                color="primary"
                disableElevation
                rounded
                onClick={(_) => onNavClick()}>
                {capitalizeFirst(t('common:words.choose'))} {plan.product}
              </Button>
            </a>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
