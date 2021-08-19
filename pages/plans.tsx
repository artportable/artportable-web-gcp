import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { styles } from '../styles/plans.css'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react';
import PlanSelector from '../app/components/PlanSelector/PlanSelector';
import Price from '../app/models/Price';
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js'
import { useDispatch } from "react-redux";
import { LOGIN_USER } from '../app/redux/actions/userActions'
import { useGetToken } from '../app/hooks/useGetToken';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export default function Plans({ priceData }) {
  const { t } = useTranslation(['plans', 'common']);
  const s = styles();
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const dispatch = useDispatch();
  const token = useGetToken();

  useEffect(() => {
    if(initialized && keycloak.tokenParsed) {
      const parsedToken = keycloak.tokenParsed as any;
      const createUser = async () => {
        try {
          const response = await fetch(`${apiBaseUrl}/api/user`, {
            method: 'POST',
            body: JSON.stringify({
              Username: parsedToken.preferred_username,
              Name: parsedToken.given_name,
              Surname: parsedToken.family_name,
              Email: parsedToken.email,
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `Bearer ${token}`
            }
          });
          const data = await response.json();
  
          dispatch({
            type: LOGIN_USER,
            payload: { 
              username: data.Username,
              isSignedIn: true
            }
          });
        } catch (error) {
          console.warn(error);
        }
      }
  
      createUser();
    }
  }, [initialized]);

  return (
    <div className={s.plansRootContainer}>
      <div className={s.header}>
        <Typography variant="h1" align="center">
          <Box fontFamily="LyonDisplay" fontWeight="fontWeightMedium">
            {t('welcomeTo')}
          </Box>
        </Typography>
      </div>
      <div className={s.planSelector}>
        <Typography align="center" component="div">
          <Box fontWeight="fontWeightBold" marginBottom="15px"> {t('ourMemberships')}</Box>
        </Typography>
        <PlanSelector priceData={priceData}></PlanSelector>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  // @ts-ignore Used for ignoring cert validation, remove before prod
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
  
  const priceData = await getPriceData();

  return { 
    props: {
      priceData,
      ...await serverSideTranslations(locale, ['header', 'footer', 'plans', 'common']),
    } 
  };
}

async function getPriceData() {
  const freeYearPlan: Price =
    {
      amount: 0,
      currency: 'sek',
      id: 'free_month',
      product: 'free',
      productKey: 'free',
      recurringInterval: 'month'
    };
    const freeMonthPlan: Price =
    {
      amount: 0,
      currency: 'sek',
      id: 'free_year',
      product: 'free',
      productKey: 'free',
      recurringInterval: 'year'
    };

  try {
    return (
      fetch(`${apiBaseUrl}/api/payments/prices`)
      .then((response) => {
        return response.json();
      })
      .then((result: Array<Price>) => {
        result.push(freeYearPlan);
        result.push(freeMonthPlan);

        return result;
      })
    )
  } catch(e) {
    console.log('Could not fetch price info', e);
  }
}
