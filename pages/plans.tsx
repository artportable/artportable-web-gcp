import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { styles } from "../styles/plans.css";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useState } from "react";
import PlanSelector from "../app/components/PlanSelector/PlanSelector";
import Price from "../app/models/Price";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../app/redux/actions/userActions";
import { getDistinct } from "../app/utils/util";
import { ADD_PRICE } from "../app/redux/actions/signupActions";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../app/utils/googleAnalytics";
import { UserContext } from "../app/contexts/user-context";
import router from "next/router";
import { inputValueFromEvent } from "react-activity-feed/dist/utils";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface SelectedPlanData {
  plan: string;
  interval: string;
  isArtist: boolean;
}

export interface PriceData {
  id: string;
  product:
    | "Portfolio Premium Plus"
    | "Portfolio Premium"
    | "Portfolio"
    | "free";
  productKey: string;
  currency: string;
  recurringInterval: string;
  amount?: number;
}

export default function Plans({ priceData }) {
  const { t } = useTranslation(["plans", "common"]);
  const s = styles();
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const dispatch = useDispatch();
  const { email, family_name, given_name, phone, user_type } =
    useContext(UserContext);
  const [loading, setLoading] = useState(true);

  function redirectCreatedUser(plan, isArtist) {
    dispatch({
      type: ADD_PRICE,
      payload: { ...plan },
    });
    switch (plan.productKey) {
      case "free":
        trackGoogleAnalytics(
          ActionType.SIGN_UP_FREE_COMPLETED,
          CategoryType.BUY
        );
        router.push("/");
        break;
      case "portfolio":
        trackGoogleAnalytics(
          ActionType.SIGN_UP_PORTFOLIE_COMPLETED,
          CategoryType.BUY
        );
        router.push("/checkout");
        break;
      case "portfolioPremium":
        trackGoogleAnalytics(
          ActionType.SIGN_UP_PREMIUM_COMPLETED,
          CategoryType.BUY
        );
        router.push("/checkout");
        break;
      case "portfolioPremiumPlus":
        trackGoogleAnalytics(
          ActionType.SIGN_UP_PREMIUM_COMPLETED,
          CategoryType.BUY
        );
        router.push("/checkout");
        break;
      default:
        console.error(`Unknown plan productKey: ${plan.productKey}`);
    }
  }

  useEffect(() => {
    if (initialized && keycloak.token) {
      const parsedToken = keycloak.tokenParsed as any;
      const createUser = async () => {
        try {
          const response = await fetch(`${apiBaseUrl}/api/user`, {
            method: "POST",
            body: JSON.stringify({
              Username: parsedToken.preferred_username,
              Name: parsedToken.given_name,
              Surname: parsedToken.family_name,
              Email: parsedToken.email,
              PhoneNumber: parsedToken.phone_number,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${keycloak.token}`,
            },
          });
          const status = await response.status;

          if (status == 201) {
            const data = await response.json();
            dispatch({
              type: LOGIN_USER,
              payload: {
                username: data.Username,
                isSignedIn: true,
              },
            });

            const userType = parsedToken.user_type;

            var [plan, interval] = userType.split("-");

            var isArtist = false;
            if (plan == "artist") {
              plan = "free";
              isArtist = true;
            }
            const p = priceData.find((pd) => {
              return (
                pd.productKey.toLowerCase().trim() ===
                  plan.toLowerCase().trim() &&
                pd.recurringInterval.toLowerCase().trim() ===
                  interval.toLowerCase().trim()
              );
            });

            if (p) {
              redirectCreatedUser(p, isArtist);
            } else {
              console.error(
                "No matching price found for plan:",
                plan,
                "interval:",
                interval
              );
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.warn(error);
        }
      };

      createUser();
    }
  }, [initialized, keycloak.token]);

  return (
    <div>
      {loading ? (
        <></>
      ) : (
        <div className={s.plansRootContainer}>
          <div className={s.headerDiv}>
            <Typography className={s.header} variant="h1" align="center">
              <Box fontFamily="LyonDisplay" fontWeight="fontWeightMedium">
                {t("welcomeTo")}
              </Box>
            </Typography>
          </div>
          <div className={s.planSelector}>
            <Typography align="center" component="div">
              <Box fontWeight="fontWeightBold" marginBottom="15px">
                {" "}
                {t("ourMemberships")}
              </Box>
            </Typography>
            <PlanSelector showAll={true} priceData={priceData}></PlanSelector>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ locale }) {
  // @ts-ignore Used for ignoring cert validation, remove before prod
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  const priceData = await getPriceData();

  return {
    props: {
      priceData,
      ...(await serverSideTranslations(locale, [
        "header",
        "footer",
        "plans",
        "common",
        "premium",
        "support",
      ])),
    },
  };
}

export async function getPriceData() {
  const freeYearPlan: Price = {
    amount: 0,
    currency: "sek",
    id: "free_month",
    product: "free",
    productKey: "free",
    recurringInterval: "month",
  };
  const freeMonthPlan: Price = {
    amount: 0,
    currency: "sek",
    id: "free_year",
    product: "free",
    productKey: "free",
    recurringInterval: "year",
  };

  try {
    const response = await fetch(`${apiBaseUrl}/api/payments/prices`);

    if (!response.ok) {
      // Log the status code and status text
      console.error(
        `Failed to fetch price data: ${response.status} ${response.statusText}`
      );
      // You can throw an error or return default data
      throw new Error(`Failed to fetch price data`);
    }

    const result = await response.json();

    // Check if result is an array
    if (!Array.isArray(result)) {
      console.error("Price data is not an array:", result);
      throw new Error("Price data is not an array");
    }

    result.push(freeYearPlan);
    result.push(freeMonthPlan);

    return result;
  } catch (e) {
    console.error("Could not fetch price info", e);
    // Return default price data or handle accordingly
    return [freeYearPlan, freeMonthPlan]; // Return at least the free plans
  }
}
