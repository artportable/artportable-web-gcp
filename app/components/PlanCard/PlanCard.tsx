import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ADD_PRICE } from "../../redux/actions/signupActions";
import { capitalizeFirst, toCamelCase } from "../../utils/util";
import Button from "../Button/Button";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import PlansInfoList from "../PlansInfoList/PlansInfoList";
import { styles } from "./planCard.css";
import clsx from 'clsx';
// import PremiumSignupDialog from '../PremiumSignupDialog/PremiumSignupDialog';
import PremiumApply from "../PremiumApply/PremiumApply";
import { PriceData } from "../PlanSelector/PlanSelector";
import Dialog from '@material-ui/core/Dialog';

interface Props {
  plan: PriceData;
  hideButtons?: boolean;
}

export default function PlanCard({ plan, hideButtons }: Props) {
  const { t } = useTranslation(['plans', 'common', 'checkout']);
  const s = styles();
  const dispatch = useDispatch();
  const href = plan.product === 'free' ? 'feed' : '/checkout';

  const [ isHref, setIsHref ] = useState(true);

  const [ isPremiumSignupDialogOpen, setIsPremiumSignupDialogOpen] = useState(false);
 
  const planName = t(`plans.${plan.productKey}.name`, `${capitalizeFirst(plan.product)}`);
  const planSubtitle = t(`plans.${plan.productKey}.subtitle`, `${capitalizeFirst(plan.product)}`);

  useEffect(() => {
    if (plan.product === "portfolioPremium") {
      setIsHref(false)
    }
  }, [plan]);
  
  function getPriceText() {
    if (plan.product === 'free') {
      return '-';
    } else if (plan.product === 'portfolioPremium') {
      return 'premium';
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
      <Card className={clsx(s.cardRoot, plan.productKey === "portfolio" && s.primaryCard)}>
        <CardContent>
          <Typography variant="h3" component="h2">
            <Box fontWeight="fontWeightMedium" textAlign="center" fontFamily="LyonDisplay">
              {planName}
            </Box>
          </Typography>

          <Typography variant="subtitle1" component="h3">
            <Box fontWeight="fontWeightMedium" textAlign="center" fontFamily="LyonDisplay">
              {planSubtitle}
            </Box>
          </Typography>

          <PaymentInfo 
            priceText={getPriceText()}
            secondaryText={t('youCanAlwaysUpdateYourMembership')}
          />
          <PlansInfoList texts={t(`plans.${plan.productKey}.listTexts`, '', {returnObjects: true})} />

          {!hideButtons &&
            <div className={s.button}>
              {isHref ? 
               <Link passHref href={href}>
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

             : 
             
             <Button 
                size="small"
                variant="contained"
                color="primary"
                disableElevation
                rounded
                onClick={() => setIsPremiumSignupDialogOpen(true)}>
                {plan.product === 'free' ?
                  t('signUp') :
                  `${capitalizeFirst(t('common:words.choose'))} ${planName}`
                }
              </Button>
            }
            </div>
          }
          
        </CardContent>
      </Card>
      <Dialog 
        fullWidth
        maxWidth="md" 
        open={isPremiumSignupDialogOpen} onClose={() => setIsPremiumSignupDialogOpen(false)}>
          <PremiumApply />
      </Dialog>
    </div>
  )
}

