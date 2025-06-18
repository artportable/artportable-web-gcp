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

import { UserContext } from "../app/contexts/user-context";
import router from "next/router";


const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface SelectedPlanData {
  plan: string;
  interval: string;
  isArtist: boolean;
}

export interface PriceData {
  id: string;
  product:
    | "Portfolio Mini"
    | "Portfolio"
    | "Portfolio Premium"

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
      case "portfolio":
        router.push("/checkout");
        break;
      case "portfolioPremium":

        router.push("/checkout");
        break;
      case "portfolioMini":
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

            if (typeof userType !== 'string' || userType.trim() === '') {
              setLoading(false);
              return;
            }

            let [plan, interval] = userType.split("-");

            if (!interval) {
              interval = 'month';
            }

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
            <PlanSelector showAll={false} priceData={priceData}></PlanSelector>
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
      // Return an empty array or handle as needed
      return [];
    }

    return result;
  } catch (error) {
    console.error("Error in getPriceData:", error);
    // Depending on requirements, you might want to return a default
    // or empty array, or rethrow the error.
    return [];
  }
}