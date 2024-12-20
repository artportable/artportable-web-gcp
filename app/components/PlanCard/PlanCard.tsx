import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Tabs,
} from "@material-ui/core";
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
import PremiumApply from "../PremiumApply/PremiumApply";
import { PriceData } from "../../../pages/plans";
import Dialog from "@material-ui/core/Dialog";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import { UserContext } from "../../contexts/user-context";
import {
  Lead,
  zapierLeadFreemium,
  zapierLeadBasic,
} from "../../utils/zapierLead";

interface Props {
  plan: PriceData;
  hideButtons?: boolean;
  lead?: Lead;
  setHideTabs: any;
}
interface FormData {
  phone: FormValue;
}

interface FormValue {
  value: string;
  error: boolean;
}

export default function PlanCard({
  plan,
  hideButtons,
  lead,
  setHideTabs,
}: Props) {
  const { t } = useTranslation(["plans", "common", "checkout"]);
  const s = styles();
  const dispatch = useDispatch();
  const href = plan.product === "free" ? "feed" : "/checkout";

  // const [isHref, setIsHref] = useState(true);
  // const [isPremiumSignupDialogOpen, setIsPremiumSignupDialogOpen] = useState(false);

  const planName = t(
    `plans.${plan.productKey}.name`,
    `${capitalizeFirst(plan.product)}`
  );
  const planSubtitle = t(
    `plans.${plan.productKey}.subtitle`,
    `${capitalizeFirst(plan.product)}`
  );

  const planTrial = t(
    `plans.${plan.productKey}.trial`,
    `${capitalizeFirst(plan.product)}`
  );
  const { email, family_name, given_name, phone, user_type } =
    useContext(UserContext);
  const [numberExists, setNumberExists] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    phone: { value: "", error: false },
  });
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [formUntouched, setFormUntouched] = useState(true);

  useEffect(() => {
    if (Object.keys(formData).some((key) => formData[key].error)) {
      setFormHasErrors(true);
    } else {
      setFormHasErrors(false);
    }
  }, [formData]);

  const handleChange = (event, key: keyof FormData) => {
    validateFormValue(event.target.value, "phone");
    const newValue: FormValue = {
      value: event.target.value,
      error: false,
    };
    setFormData((prevValue) => ({
      ...prevValue,
      [key]: newValue,
    }));
  };

  const validateFormValue = (value, key: keyof FormData) => {
    if (formUntouched) {
      setFormUntouched(false);
    }

    const isInvalid = checkIsInvalid(value, key);

    const newFormValue: FormValue = {
      value: value,
      error: isInvalid,
    };

    setFormData((prevValue) => ({
      ...prevValue,
      [key]: newFormValue,
    }));
  };

  const validatePhone = (newValue: string): boolean => {
    if (/^[0-9]*$/.test(newValue)) {
      return false;
    }
    return true;
  };

  const checkIsInvalid = (newValue: string, key: keyof FormData): boolean => {
    switch (key) {
      case "phone":
        return validatePhone(newValue);
    }
  };

  const validateAllFields = () => {
    const phoneError = checkIsInvalid(formData.phone.value, "phone");

    const phoneFormValue = {
      phone: {
        ...formData.phone,
        error: phoneError,
      },
    };

    setFormData(phoneFormValue);

    if (phoneError) {
      setFormHasErrors(true);
      return false;
    } else {
      return true;
    }
  };

  // useEffect(() => {
  //   if (plan.product === "portfolioPremium") {
  //     setIsHref(false);
  //   }
  // }, [plan]);

  function getPriceText() {
    if (plan.product === "free") {
      return "-";
      // } else if (
      //   plan.product === "portfolioPremium" &&
      //   plan.amount === undefined
      // ) {
      //   return "premium";
    }

    return (
      `${plan.amount} ${plan.currency.toUpperCase()}` +
      ` / ${t(`common:words.${plan.recurringInterval}`)} (${t(
        "common:words.vat"
      )})`
    );
  }
  const addNumber = () => {
    if (validateAllFields()) {
      phone.value = formData.phone.value;
      // console.log(formData.phone.value)
    }
  };

  const upgradeWithPhone = (event) => {
    //console.log(numberExists)
    if (!phone.value) {
      setNumberExists(false);
      event.stopPropagation();
      event.preventDefault();
      // console.log(phone.value)
      // console.log(numberExists)
      return onNavClick();
    }
    return onNavClick();
  };

  const onNavClick = () => {
    dispatch({
      type: ADD_PRICE,
      payload: { ...plan },
    });
    if (plan.product.toLowerCase() === "free") {
      upgradeWithPhone(event);
      trackGoogleAnalytics(ActionType.SIGN_UP_FREE, CategoryType.BUY);
      var [userType, interval] = user_type.value.split("-");
      if (userType === "artist") upgradeWithPhone(event);
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
              {t(
                "För att gå vidare med din uppgradering behöver du ange ditt telefonnummer"
              )}
            </Typography>
          </div>
          <div>
            <TextField
              className={s.textField}
              fullWidth
              placeholder={t("Telefonnummer")}
              value={formData.phone.value}
              required
              variant="outlined"
              error={formData.phone.error}
              onChange={(e) => handleChange(e, "phone")}
              onBlur={(e) => validateFormValue(e.target.value, "phone")}
              helperText={formData.phone.error ? t("Endast siffror") : ""}
            />
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
          </div>
        </div>
      ) : (
        <div
          className={clsx(
            s.cardRoot,
            plan.productKey === "portfolio" && s.primaryCard
          )}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#ffe36b4a",
              borderRadius: "4px",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="h2">
                <Box className={s.header} textAlign="center">
                  {planName}
                </Box>
              </Typography>
              <Typography variant="body1">{planSubtitle}</Typography>
              <Typography variant="h3" style={{ textAlign: "center" }}>
                {plan?.productKey === "portfolio" && <Box>{planTrial}</Box>}
              </Typography>

              <Box className={s.planPrice}>
                <PaymentInfo
                  priceText={getPriceText()}
                  secondaryText={t("youCanAlwaysUpdateYourMembership")}
                />
              </Box>
              <PlansInfoList
                texts={t(`plans.${plan.productKey}.listTexts`, "", {
                  returnObjects: true,
                })}
              />
              {!hideButtons && (
                <div className={s.button}>
                  {/* {isHref ? ( */}
                  <Link passHref href={href}>
                    <a>
                      <Button
                        size="large"
                        variant="contained"
                        rounded
                        style={{
                          borderRadius: 35,
                          backgroundColor: "black",
                          color: "white",
                        }}
                        onClick={(event) => upgradeWithPhone(event)}
                      >
                        {plan.product === "free"
                          ? t("signUp")
                          : `${capitalizeFirst(
                              t("common:words.choose")
                            )} ${planName}`}
                      </Button>
                    </a>
                  </Link>
                </div>
              )}
            </CardContent>
          </div>
        </div>
      )}
    </div>
  );
}
