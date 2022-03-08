import React, { useState, useEffect, useContext } from "react";
import { Box, Card, CardContent, Typography, TextField, Tabs } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ADD_PRICE } from "../../redux/actions/signupActions";
import { capitalizeFirst, toCamelCase } from "../../utils/util";
import Button from "../Button/Button";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import PlansInfoList from "../PlansInfoList/PlansInfoList";
import { styles } from "./phoneInput.css";
import clsx from 'clsx';
// import PremiumSignupDialog from '../PremiumSignupDialog/PremiumSignupDialog';
import PremiumApply from "../PremiumApply/PremiumApply";
import { PriceData } from "../../../pages/plans";
import Dialog from '@material-ui/core/Dialog';
import { ActionType, CategoryType, trackGoogleAnalytics } from "../../utils/googleAnalytics";
import { UserContext } from "../../contexts/user-context";
import { Lead, zapierLeadFreemium, zapierLeadBasic } from "../../utils/zapierLead"


interface PhoneNumber {
  phone: FormValue;
}
interface FormValue {
  value: string;
  error: boolean
}
interface Props {
  plan: PriceData;
  hideButtons?: boolean;
  lead?: Lead;
}
export default function DialogConstruction({ plan, hideButtons, lead }: Props) {
  const { t } = useTranslation(['plans', 'common', 'checkout']);
  const s = styles();
  const dispatch = useDispatch();
  const href = plan.product === 'free' ? 'feed' : '/checkout';
  const [isHref, setIsHref] = useState(true);
  const [isPremiumSignupDialogOpen, setIsPremiumSignupDialogOpen] = useState(false);
  const planName = t(`plans.${plan.productKey}.name`, `${capitalizeFirst(plan.product)}`);
  const planSubtitle = t(`plans.${plan.productKey}.subtitle`, `${capitalizeFirst(plan.product)}`);
  const { email, family_name, given_name, phone, user_type } = useContext(UserContext);
  const [numberExists, setNumberExists] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
    phone.value = phoneNumber;
  }

  const uppgradeWithPhone = (event) => {
    if (!phone.value || phone.value === null) {
      event.stopPropagation();
      event.preventDefault();
      setNumberExists(false)
      return onNavClick();
    }
  }

    const onNavClick = () => {
    dispatch({
      type: ADD_PRICE,
      payload: { ...plan }
    });
    if (plan.product.toLowerCase() === 'free') {
      uppgradeWithPhone(event);
      trackGoogleAnalytics(ActionType.SIGN_UP_FREE, CategoryType.BUY);
      var [userType, interval] = user_type.value.split('-');
      if (userType === "artist")
        uppgradeWithPhone(event);
      return zapierLeadFreemium(lead = {
        name: { value: given_name.value + ' ' + family_name.value } ?? '',
        phoneNumber: { value: phone.value } ?? '',
        email: { value: email.value } ?? '',
        product: "free",
        type: { value: user_type.value } ?? ''
      });
    } else if (plan.product.toLowerCase() === 'portfolio') {
      trackGoogleAnalytics(ActionType.SIGN_UP_PORTFOLIE, CategoryType.BUY);
      zapierLeadBasic(lead = {
        name: { value: given_name.value + ' ' + family_name.value } ?? '',
        phoneNumber: { value: phone.value } ?? '',
        email: { value: email.value } ?? '',
        product: "portfolio",
        type: { value: user_type.value } ?? ''
      });
    }
    return true;
  }



  return (
   <div className={s.container}>
      {/* {!numberExists ?  */}
        <div>
          <TextField
            fullWidth
            placeholder={t('pphone')}
            value={phoneNumber}
            required
            variant="outlined"
            onChange={handleChange}
          />
          <Link passHref href={href}>
            <a>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                rounded
                onClick={() => setNumberExists(false)}
               >
                {t('send')}
              </Button>
            </a>
          </Link>
        </div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isPremiumSignupDialogOpen} onClose={() => setIsPremiumSignupDialogOpen(false)}>
        <PremiumApply />
      </Dialog>
      
    </div>
  )
}
