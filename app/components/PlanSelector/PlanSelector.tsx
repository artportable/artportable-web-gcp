import { useMediaQuery, useTheme, Container } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useState } from "react";
import { getDistinct } from "../../utils/util";
import PlanCard from "../PlanCard/PlanCard";
import Button from "../Button/Button";
import { styles } from "./planSelector.css";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import useSignupRedirectHref from "../../hooks/useSignupRedirectHref";
import { PriceData } from "../../../pages/plans";
import { UserContext } from "../../contexts/user-context";
import RemoveIcon from "@material-ui/icons/Remove";
// Remove the import since we'll use the public path directly
import Typography from "@material-ui/core/Typography/Typography";
import { useDispatch } from "react-redux";
import { ADD_PRICE } from "../../redux/actions/signupActions";

interface Props {
  priceData: PriceData[];
  landingPageMode?: boolean;
  showAll: boolean;
  requirePhone?: boolean;
}

interface Plan {
  id: string;
  name: string;
  type: string;
  colorTheme: string;
  prices: {
    month: string;
    year: string;
  };
  features: Array<{
    key: string;
    available: boolean | string;
  }>;
  buttonText: string;
  hasFreeTrial: boolean;
}

interface Feature {
  key: string;
  label: string;
}

export default function PlanSelector({
  priceData,
  landingPageMode,
  showAll,
  requirePhone = false,
}: Props) {
  const { t } = useTranslation(["plans", "common"]);
  const s = styles();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const signUpRedirectHref = useSignupRedirectHref();
  const [hideTabs, setHideTabs] = useState(false);
  const { email, family_name, given_name, phone, user_type, membership } =
    useContext(UserContext);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("smPlus"));
  
  // Set default to "month"
  const [paymentInterval, setPaymentInterval] = useState("month");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = getDistinct(priceData?.sort(compareAmounts), (p) => p.product);

  function compareAmounts(a, b) {
    return a.amount - b.amount;
  }

  // All available features for the table
  const allFeatures = [
    { key: "publishWorks", label: t("plans:featurePublishWorks") || t("featurePublishWorks") || "Publicera obegränsat med verk" },
    { key: "visibility", label: t("plans:featureVisibility") || t("featureVisibility") || "Synlighet i Artportables olika flöden" },
    { key: "commission", label: t("plans:featureYourArt") || t("featureYourArt") || "Din konst = dina pengar. Ta emot köpförfrågningar och sälj direkt utan provision" },
    { key: "discounts", label: t("plans:featureDiscounts") || t("featureDiscounts") || "Få rabatter på konstnärsmaterial (10-25%)" },
    { key: "exhibitions", label: t("plans:featureExhibitions") || t("featureExhibitions") || "Få utställningserbjudanden" },
    { key: "newsUpdates", label: t("plans:featureNewsUpdates") || t("featureNewsUpdates") || "Skapa nyhetsuppdateringar" },
    { key: "organizeWorks", label: t("plans:featureOrganizeWorks") || t("featureOrganizeWorks") || "Sortera och organisera dina verk som du vill" },
    { key: "personalAdvice", label: t("plans:featurePersonalAdvice") || t("featurePersonalAdvice") || "Personlig rådgivning vid köpförfrågningar" },
    { key: "statistics", label: t("plans:featureStatistics") || t("featureStatistics") || "Se statistik över dina mest populära verk och profilvisningar" },
    { key: "promotedWorks", label: t("plans:featurePromotedWorks") || t("featurePromotedWorks") || "3 marknadsförda verk per månad till ett värde av 1185kr" },
  ];

  // Convert priceData to plan structure
  const plansData: Plan[] = plans.map((planName) => {
    const monthlyPrice = priceData.find(
      (pd) => pd.product === planName && pd.recurringInterval === "month"
    );
    const yearlyPrice = priceData.find(
      (pd) => pd.product === planName && pd.recurringInterval === "year"
    );

    // Define features based on plan type
    let features = [];
    if (planName === "Portfolio Premium Plus") {
      features = [
        { key: "publishWorks", available: "Unlimited" },
        { key: "visibility", available: "Maximum" },
        { key: "commission", available: "0%" },
        { key: "discounts", available: "30% on materials" },
        { key: "exhibitions", available: true },
        { key: "newsUpdates", available: true },
        { key: "organizeWorks", available: true },
        { key: "personalAdvice", available: true },
        { key: "statistics", available: true },
        { key: "promotedWorks", available: "3 per month" },
        { key: "newsletter", available: "Monthly feature" },
        { key: "marketingSupport", available: true }
      ];
    } else if (planName === "Portfolio Premium") {
      features = [
        { key: "publishWorks", available: "Up to 1,500" },
        { key: "visibility", available: "High" },
        { key: "commission", available: "0%" },
        { key: "discounts", available: "20% on materials" },
        { key: "exhibitions", available: true },
        { key: "newsUpdates", available: true },
        { key: "organizeWorks", available: true },
        { key: "personalAdvice", available: true },
        { key: "statistics", available: true },
        { key: "promotedWorks", available: "1 per month" },
        { key: "newsletter", available: false },
        { key: "marketingSupport", available: false }
      ];
    } else if (planName === "Portfolio") {
      features = [
        { key: "publishWorks", available: "Up to 10" },
        { key: "visibility", available: "Standard" },
        { key: "commission", available: "0%" },
        { key: "discounts", available: "10% on materials" },
        { key: "exhibitions", available: true },
        { key: "newsUpdates", available: false },
        { key: "organizeWorks", available: false },
        { key: "personalAdvice", available: false },
        { key: "statistics", available: false },
        { key: "promotedWorks", available: false },
        { key: "newsletter", available: false },
        { key: "marketingSupport", available: false }
      ];
    } else {
      // Portfolio Mini
      features = [
        { key: "publishWorks", available: "Up to 3" },
        { key: "visibility", available: "Basic" },
        { key: "commission", available: "0%" },
        { key: "discounts", available: false },
        { key: "exhibitions", available: false },
        { key: "newsUpdates", available: false },
        { key: "organizeWorks", available: false },
        { key: "personalAdvice", available: false },
        { key: "statistics", available: false },
        { key: "promotedWorks", available: false },
        { key: "newsletter", available: false },
        { key: "marketingSupport", available: false }
      ];
    }

    return {
      id: planName.toLowerCase().replace(/\s+/g, ""),
      name: planName,
      type: planName === "Portfolio Premium Plus" ? "premium-plus" : 
            planName === "Portfolio Premium" ? "premium" : "basic",
      colorTheme: planName === "Portfolio Premium Plus" ? "green" : 
                  planName === "Portfolio Premium" ? "blue" : "red",
      prices: {
        month: monthlyPrice ? `${monthlyPrice.amount}kr/månad` : "Free",
        year: yearlyPrice ? `${yearlyPrice.amount}kr/år` : "Free",
      },
      features,
      buttonText: planName === "Portfolio Premium Plus" ? t("plans:selectPremiumPlus") || t("selectPremiumPlus") || "Select Premium Plus" :
                  planName === "Portfolio Premium" ? t("plans:selectPremium") || t("selectPremium") || "Select Premium" :
                  t("plans:selectBasic") || t("selectBasic") || "Select Basic",
      hasFreeTrial: planName !== "Portfolio Premium Plus",
    };
  });

  // Determine current plan based on membership
  const getCurrentPlan = () => {
    if (membership?.value === 3) {
      return "Portfolio Premium";  
    } else if (membership?.value === 2) { 
      return "Portfolio"; 
    } else if (membership?.value === 1) {
      return "Portfolio Mini"; 
    } else if (membership?.value === 0) {
      return "Free";
    }
    return null; // No current plan
  };

  const currentPlanName = getCurrentPlan();

  const filteredPlans = plansData.filter((plan) => {
    if (membership?.value === 2) {
      return (
        plan.name === "Portfolio" ||
        plan.name === "Portfolio Premium"
      );
    } else if (membership?.value === 3) {
      return plan.name === "Portfolio Premium";
    }
    return true;
  });

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    
    // Find the selected plan data
    const selectedPlanData = filteredPlans.find(plan => plan.id === planId);
    if (selectedPlanData) {
      // Find the corresponding price data
      const selectedPriceData = priceData.find(
        (pd) => pd.product === selectedPlanData.name && pd.recurringInterval === paymentInterval
      );
      
      if (selectedPriceData) {
        // Store plan in Redux immediately
        dispatch({
          type: ADD_PRICE,
          payload: { ...selectedPriceData },
        });
      }
    }
  };

  const handleContinue = () => {
    if (selectedPlan) {
      // Find the selected plan data
      const selectedPlanData = filteredPlans.find(plan => plan.id === selectedPlan);
      if (selectedPlanData) {
        // Find the corresponding price data from the original priceData prop
        const selectedPriceData = priceData.find(
          (pd) => pd.product === selectedPlanData.name && pd.recurringInterval === paymentInterval
        );
        
        if (selectedPriceData) {
          console.log("Selected plan data:", selectedPriceData);
          
          // If in landing page mode, trigger signup
          if (landingPageMode) {
            keycloak.register({
              locale: router.locale,
              redirectUri: signUpRedirectHref,
            });
            return;
          }
          
          // Normal plan selection flow
          if (keycloak.authenticated) {
            // User is logged in, proceed to checkout or plan update
            router.push(`/checkout`);
          } else {
            // User not logged in, redirect to signup with plan
            keycloak.register({
              locale: router.locale,
              redirectUri: `${window.location.origin}/checkout`,
            });
          }
        }
      }
    }
  };

  const getPlanFeatureValue = (plan: Plan, featureKey: string) => {
    const feature = plan.features.find(f => f.key === featureKey);
    return feature ? feature.available : false;
  };

  // Desktop Table Component
  const PlansTable = () => (
    <div className={s.desktopTableContainer}>
      {/* Plan Headers Row */}
      <div className={s.planHeadersRow}>
        <div className={s.emptyHeaderCell}>
          <h1 className={s.tableTitle}>{t("plans:choosePlan") || t("choosePlan") || "Choose Your Plan"}</h1>
        </div>
        {filteredPlans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const isCurrentPlan = plan.name === currentPlanName;
          
          let headerClass = s.planHeaderBoxGray;
          if (isSelected) {
            headerClass = s.planHeaderBoxSelected;
          } else if (isCurrentPlan) {
            headerClass = s.planHeaderBoxCurrent;
          }
          
          return (
            <div key={plan.id} className={s.planHeaderContainer}>
              {isCurrentPlan && (
                <div className={s.currentPlanLabel}>
                  {t("plans:currentPlan") || t("currentPlan") || "Current Plan"}
                </div>
              )}
              <div 
                className={headerClass}
                onClick={() => handlePlanSelect(plan.id)}
                style={{ cursor: 'pointer' }}
              >
                {plan.name}
                {isCurrentPlan && (
                  <div className={s.currentPlanBadge}>
                    ✓
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Row */}
      <div className={`${s.tableRow} ${s.priceRow}`}>
        <div className={s.featureLabelCell}>{t("plans:price") || t("common:price") || "Price"}</div>
        {filteredPlans.map((plan) => {
          const isUnselected = selectedPlan && selectedPlan !== plan.id;
          
          let cellClass;
          if (isUnselected) {
            cellClass = s.featureValueCellGrayed;
          } else if (plan.name === "Portfolio Premium") {
            cellClass = s.featureValueCellWhite;
          } else {
            cellClass = s.featureValueCellGray;
          }
          
          return (
            <div key={`${plan.id}-price`} className={cellClass}>
              {paymentInterval === "month" ? plan.prices.month : plan.prices.year}
            </div>
          );
        })}
      </div>

      {/* Feature Rows */}
      {allFeatures.map((feature, index) => (
        <div key={feature.key} className={`${s.tableRow} ${index % 2 === 1 ? s.evenRow : s.oddRow}`}>
          <div className={s.featureLabelCell}>
            {feature.label}
          </div>
          {filteredPlans.map((plan) => {
            const featureValue = getPlanFeatureValue(plan, feature.key);
            const isSelected = selectedPlan === plan.id;
            const isUnselected = selectedPlan && selectedPlan !== plan.id;
            
            let cellClass;
            if (isUnselected) {
              cellClass = s.featureValueCellGrayed;
            } else if (plan.name === "Portfolio Premium") {
              cellClass = s.featureValueCellWhite;
            } else {
              cellClass = s.featureValueCellGray;
            }
            
            const checkIconClass = isUnselected ? s.checkIconGrayed : s.checkIcon;
            const dashIconClass = isUnselected ? s.dashIconGrayed : s.dashIcon;
            
            return (
              <div key={`${plan.id}-${feature.key}`} className={cellClass}>
                {typeof featureValue === "string" ? (
                  featureValue
                ) : featureValue ? (
                  <img src="/icons/checkmark.svg" alt="Check" className={checkIconClass} />
                ) : (
                  <RemoveIcon className={dashIconClass} />
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Action Buttons Row */}
      {landingPageMode ? (
        <Button
          size="large"
          variant="contained"
          color="primary"
          rounded
          onClick={() =>
            keycloak.register({
              locale: router.locale,
              redirectUri: signUpRedirectHref,
            })
          }
          className={s.tableActionButtonLarge}
        >
          {t("joinTheCommunity")}
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          disableElevation
          className={s.tableActionButtonLarge}
          onClick={handleContinue}
          disabled={!selectedPlan}
        >
          {t("common:continue") || t("continue") || "Continue"}
        </Button>
      )}
    </div>
  );

  // Mobile Cards Component (simplified version)
  const PlansCards = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const currentPlan = filteredPlans[selectedTab];

    return (
      <div className={s.mobileContainer}>
                 {/* Plan Selection Tabs */}
         <div className={s.mobilePlanTabs}>
           {filteredPlans.map((plan, index) => {
             const isCurrentPlan = plan.name === currentPlanName;
             const tabClass = `${s.mobilePlanTab} ${
               selectedTab === index ? s.mobilePlanTabSelected : 
               isCurrentPlan ? s.mobilePlanTabCurrent : ''
             }`;
             
             return (
               <button
                 key={plan.id}
                 className={tabClass}
                 onClick={() => setSelectedTab(index)}
               >
                 <div className={s.mobilePlanTabContent}>
                                     {isCurrentPlan && (
                    <div className={s.mobileCurrentPlanLabel}>
                      {t("plans:current") || t("current") || "Current"}
                    </div>
                  )}
                   <div>{plan.name}</div>
                   {isCurrentPlan && <span className={s.mobileCurrentBadge}>✓</span>}
                 </div>
                 {selectedTab === index && <div className={s.tabArrow}></div>}
               </button>
             );
           })}
         </div>

        {/* Selected Plan Content */}
        <div className={s.mobileContent}>
          {/* Price Section */}
          <div className={s.mobilePriceSection}>
            <h3 className={s.mobilePriceLabel}>{t("plans:price") || t("common:price") || "Price"}</h3>
            <div className={s.mobilePriceValue}>
              {paymentInterval === "month" ? currentPlan?.prices?.month : currentPlan.prices.year}
            </div>
          </div>

          {/* Features List */}
          <div className={s.mobileFeaturesList}>
            {allFeatures
              .filter((feature) => {
                const planFeature = currentPlan?.features.find(f => f.key === feature.key);
                return planFeature?.available !== false;
              })
              .map((feature) => {
                const planFeature = currentPlan?.features.find(f => f.key === feature.key);
                
                return (
                  <div key={feature.key} className={s.mobileFeatureItem}>
                    <div className={s.mobileFeatureText}>
                      {feature.label}
                      {typeof planFeature?.available === "string" && (
                        <span className={s.featureLimitation}> ({planFeature.available})</span>
                      )}
                    </div>
                    <div className={s.mobileFeatureCheckmark}>
                      <img src="/icons/checkmark.svg" alt="Check" className={s.checkIcon} />
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Continue Button */}
          {landingPageMode ? (
            <Button
              size="large"
              variant="contained"
              color="primary"
              rounded
              onClick={() =>
                keycloak.register({
                  locale: router.locale,
                  redirectUri: signUpRedirectHref,
                })
              }
              className={s.fixedBottomButton}
            >
              {t("joinTheCommunity")}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disableElevation
              className={s.fixedBottomButton}
              onClick={handleContinue}
            >
              {t("common:continue") || t("continue") || "Continue"}
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={s.plansContainer}>
      {/* Payment Interval Toggle */}
      <Container className={s.plansIntervalContainer}>
        <ToggleButtonGroup
          value={paymentInterval}
          exclusive
          onChange={(event, newAlignment) => {
            if (newAlignment) {
              setPaymentInterval(newAlignment);
            }
          }}
        >
          <ToggleButton value="month" className={s.planToggleButton}>
            {t("monthlyPayment") || "Monthly"}
          </ToggleButton>
          <ToggleButton value="year" className={s.planToggleButton}>
            {t("yearlyPayment") || "Yearly"}
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>

      {/* Plan Comparison */}
      <Container className={s.planCardsContainer}>
        {isMobile ? <PlansCards /> : <PlansTable />}
      </Container>
    </div>
  );
}
