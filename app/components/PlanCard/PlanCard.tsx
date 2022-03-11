import React, { useState, useEffect, useContext } from "react";
import { Box, Card, CardContent, Typography, TextField, Tabs, FormGroup } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ADD_PRICE } from "../../redux/actions/signupActions";
import { capitalizeFirst, toCamelCase } from "../../utils/util";
import Button from "../Button/Button";
import PaymentInfo from "../PaymentInfo/PaymentInfo";
import PlansInfoList from "../PlansInfoList/PlansInfoList";
import { styles } from "./planCard.css";
import clsx from "clsx";
// import PremiumSignupDialog from '../PremiumSignupDialog/PremiumSignupDialog';
import PremiumApply from "../PremiumApply/PremiumApply";
import { PriceData } from "../../../pages/plans";
import Dialog from "@material-ui/core/Dialog";
import { ActionType, CategoryType, trackGoogleAnalytics } from "../../utils/googleAnalytics";
import { UserContext } from "../../contexts/user-context";
import { Lead, zapierLeadFreemium, zapierLeadBasic } from "../../utils/zapierLead";

interface Props {
  plan: PriceData;
  hideButtons?: boolean;
  lead?: Lead;
  setHideTabs: any;
}
interface ZendeskFormData {
  phone: FormValue;
}

interface FormValue {
  value: string;
  error: boolean
}

export default function PlanCard({ plan, hideButtons, lead, setHideTabs }: Props) {
  const { t } = useTranslation(["plans", "common", "checkout"]);
  const s = styles();
  const dispatch = useDispatch();
  const href = plan.product === "free" ? "feed" : "/checkout";
  const [isHref, setIsHref] = useState(true);
  const [isPremiumSignupDialogOpen, setIsPremiumSignupDialogOpen] = useState(false);

  const planName = t(`plans.${plan.productKey}.name`, `${capitalizeFirst(plan.product)}`);
  const planSubtitle = t(`plans.${plan.productKey}.subtitle`, `${capitalizeFirst(plan.product)}`);
  const { email, family_name, given_name, phone, user_type } = useContext(UserContext);
  const [numberExists, setNumberExists] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [formData, setFormData] = useState<ZendeskFormData>({
    phone: { value: '', error: false },
  });
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [formUntouched, setFormUntouched] = useState(true);

  useEffect(() => {
    if (Object.keys(formData).some(key => formData[key].error)) {
      setFormHasErrors(true);
    } else {
      setFormHasErrors(false);
    }
  }, [formData]);

  const handleChange = (event, key: keyof ZendeskFormData) => {
    formHasErrors;
    formUntouched;
    const newValue: FormValue = {
      value: event.target.value,
      error: false,
    }

    setFormData(prevValue => ({
      ...prevValue,
      [key]: newValue
    }));
  }

  const validateFormValue = (value, key: keyof ZendeskFormData) => {
    if (formUntouched) {
      setFormUntouched(false);
    }

    const isInvalid = checkIsInvalid(value, key);

    const newFormValue: FormValue = {
      value: value,
      error: isInvalid
    }

    setFormData(prevValue => ({
      ...prevValue,
      [key]: newFormValue
    }));
  }

  const validatePhone = (newValue: string): boolean => {
    if (/^[0-9]*$/.test(newValue)) {
      return false;
    }
    return true;
  }

  const checkIsInvalid = (newValue: string, key: keyof ZendeskFormData): boolean => {
    switch (key) {
      case 'phone':
        return validatePhone(newValue);
    }
  }

  const validateAllFields = () => {
    const phoneError = checkIsInvalid(formData.phone.value, 'phone');

    const phoneFormValue = {
      phone: {
        ...formData.phone,
        error: phoneError
      }
    }

    setFormData(phoneFormValue);

    if (phoneError) {
      setFormHasErrors(true);
      return false;
    } else {
      return true;
    }
  }

  const submit = async () => {
    if (validateAllFields()) {
    }
  }

  useEffect(() => {
    if (plan.product === "portfolioPremium") {
      setIsHref(false);
    }
  }, [plan]);

  const handleChange2 = (e) => {
    setPhoneNumber(e.target.value);
  };

  function getPriceText() {
    if (plan.product === "free") {
      return "-";
    } else if (
      plan.product === "portfolioPremium" &&
      plan.amount === undefined
    ) {
      return "premium";
    }

    return (
      `${plan.amount} ${plan.currency.toUpperCase()}` +
      ` / ${t(`common:words.${plan.recurringInterval}`)} (${t(
        "common:words.vat"
      )})`
    );
  }

  const addNumber = async () => {
    if(validateAllFields()) {
    setNumberExists(false);
    phone.value = formData.phone.value;
    console.log(formData.phone.value)
    }
  };

  const uppgradeWithPhone = (event) => {
    setPhoneNumber(event.target.value);
    setHideTabs(true);
    event.stopPropagation();
    event.preventDefault();
    if (!phone.value) {
      return onNavClick();
    }
  };

  const onNavClick = () => {
    setNumberExists(false);
    dispatch({
      type: ADD_PRICE,
      payload: { ...plan },
    });
    if (plan.product.toLowerCase() === "free") {
      uppgradeWithPhone(event);
      trackGoogleAnalytics(ActionType.SIGN_UP_FREE, CategoryType.BUY);
      var [userType, interval] = user_type.value.split("-");
      if (userType === "artist") uppgradeWithPhone(event);
      return zapierLeadFreemium(
        (lead = {
          name: { value: given_name.value + " " + family_name.value } ?? "",
          phoneNumber: { value: phone.value } ?? "",
          email: { value: email.value } ?? "",
          product: "free",
          type: { value: user_type.value } ?? "",
        })
      );
    } else if (plan.product.toLowerCase() === "portfolio") {
      trackGoogleAnalytics(ActionType.SIGN_UP_PORTFOLIE, CategoryType.BUY);
      zapierLeadBasic(
        (lead = {
          name: { value: given_name.value + " " + family_name.value } ?? "",
          phoneNumber: { value: phone.value } ?? "",
          email: { value: email.value } ?? "",
          product: "portfolio",
          type: { value: user_type.value } ?? "",
        })
      );
    }
    return true;
  };

  return (
    <div className={s.container}>
      {!numberExists ? (
        <div>
          <div className={s.h3}>
            <Typography>
              För att gå vidare med din uppgradering behöver du ange ditt
              telefonnummer
            </Typography>
          </div>
          <div>
            <TextField
              className={s.textField}
              fullWidth
              placeholder={t("Telefonnummer...")}
              value={formData.phone.value}
              required
              variant="outlined"
              error={formData.phone.error}
              onChange={(e) => handleChange(e, 'phone')}
              onBlur={(e) => validateFormValue(e.target.value, 'phone')}
              helperText={formData.phone.error ? t('emailErrorMessage') : ''}
            />
            <FormGroup>
            <Link passHref href={href}>
              <a>
                <Button
                  className={s.button}
                  variant="contained"
                  color="primary"
                  disableElevation
                  rounded
                  onClick={addNumber}
                  disabled={formHasErrors || formUntouched}
                >
                  {t("common:words.add")}
                </Button>
              </a>
            </Link>
            </FormGroup>
          </div>
        </div>
      ) : (
        <Card
          className={clsx(
            s.cardRoot,
            plan.productKey === "portfolio" && s.primaryCard
          )}
        >
          <CardContent>
            <Typography variant="h6" component="h2">
              <Box
                className={s.header}
                textAlign="center"
              >
                {planName}
              </Box>
            </Typography>

            <Typography variant="body1">
              <Box
                textAlign="center"
              >
                {planSubtitle}
              </Box>
            </Typography>

            <PaymentInfo
              priceText={getPriceText()}
              secondaryText={t("youCanAlwaysUpdateYourMembership")}
            />
            <PlansInfoList
              texts={t(`plans.${plan.productKey}.listTexts`, "", {
                returnObjects: true,
              })}
            />

            {!hideButtons && (
              <div className={s.button}>
                {isHref ? (
                  <Link passHref href={href}>
                    <a>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        disableElevation
                        rounded
                        onClick={(event) => uppgradeWithPhone(event)}
                      >
                        {plan.product === "free"
                          ? t("signUp")
                          : `${capitalizeFirst(
                            t("common:words.choose")
                          )} ${planName}`}
                      </Button>
                    </a>
                  </Link>
                ) : (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    disableElevation
                    rounded
                    onClick={() => {
                      setIsPremiumSignupDialogOpen(true);
                      trackGoogleAnalytics(
                        ActionType.SIGN_UP_PREMIUM,
                        CategoryType.BUY
                      );
                    }}
                  >
                    {plan.product === "free"
                      ? t("signUp")
                      : `${capitalizeFirst(
                        t("common:words.choose")
                      )} ${planName}`}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        open={isPremiumSignupDialogOpen}
        onClose={() => setIsPremiumSignupDialogOpen(false)}
      >
        <PremiumApply />
      </Dialog>
    </div>
  );
}
