import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { ADD_PRICE } from "../../redux/actions/signupActions";
import { capitalizeFirst, toCamelCase } from "../../utils/util";
import Button from "../Button/Button";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import PlansInfoList from "../PlansInfoList/PlansInfoList";
import { styles } from "./planCard.css";

export default function PlanCard({ plan }) {
  const { t } = useTranslation(['plans', 'common', 'checkout']);
  const s = styles();
  const dispatch = useDispatch();

  const planName = t(`plans.${plan.productKey}.name`, `${capitalizeFirst(plan.product)}`);

  function getPriceText() {
    if (plan.product === 'free') {
      return '-';
    }

    return `${plan.amount} ${plan.currency.toUpperCase()}` +
      ` / ${t(`common:words.${plan.recurringInterval}`)} (+${t('common:words.vat')})`;
  }

  const onNavClick = () => {
    dispatch({
      type: ADD_PRICE,
      payload: {...plan}
    });
  }

  return (
    <div className={s.container}>
      <Card className={s.cardRoot}>
        <CardContent>
          <Typography variant="h3" component="h2">
            <Box fontWeight="fontWeightMedium" textAlign="center">
              {planName}
            </Box>
          </Typography>

          <PaymentInfo 
            priceText={getPriceText()}
            secondaryText={t('youCanAlwaysUpdateYourMembership')}
          ></PaymentInfo>
          <PlansInfoList texts={t(`plans.${plan.productKey}.listTexts`, '', {returnObjects: true})}></PlansInfoList>

          <Link href='/checkout'>
            <a>
              <Button 
                size="small"
                variant="contained"
                color="primary"
                disableElevation
                rounded
                onClick={(_) => onNavClick()}>
                {plan.product === 'free' ?
                  t('signUp') :
                  `${capitalizeFirst(t('common:words.choose'))} ${planName}`
                }
              </Button>
            </a>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
