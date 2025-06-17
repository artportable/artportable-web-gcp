import { useMediaQuery, useTheme, Container } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useTranslation } from "next-i18next";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { getDistinct } from "../../utils/util";
import Button from "../Button/Button";
import { styles } from "./planSelector.css";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import useSignupRedirectHref from "../../hooks/useSignupRedirectHref";
import { PriceData } from "../../../pages/plans";
import { UserContext } from "../../contexts/user-context";
import RemoveIcon from "@material-ui/icons/Remove";
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

interface PlansDisplayProps {
  filteredPlans: Plan[];
  allFeatures: Feature[];
  paymentInterval: string;
  selectedPlan: string | null;
  currentPlanName: string | null;
  handlePlanSelect: (id: string) => void;
  handleContinue: () => void;
  landingPageMode?: boolean;
  signUpRedirectHref: string;
}

// Extracted and Memoized PlansTable Component
const PlansTable = React.memo(({ 
  filteredPlans, 
  allFeatures, 
  paymentInterval, 
  selectedPlan, 
  currentPlanName, 
  handlePlanSelect, 
  handleContinue, 
  landingPageMode, 
  signUpRedirectHref 
}: PlansDisplayProps) => {
  const { t } = useTranslation(["plans", "common"]);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  const getPlanFeatureValue = (plan: Plan, featureKey: string) => {
    const feature = plan.features.find(f => f.key === featureKey);
    return feature ? feature.available : false;
  };

  return (
    <div className={s.desktopTableContainer}>
      <div className={s.planHeadersRow}>
        <div className={s.emptyHeaderCell}>
          <h1 className={s.tableTitle}>{t("plans:choosePlan") || "Choose Your Plan"}</h1>
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
                  {t("plans:currentPlan") || "Current Plan"}
                </div>
              )}
              <div 
                className={headerClass}
                onClick={() => handlePlanSelect(plan.id)}
                style={{ cursor: 'pointer' }}
              >
                {plan.name}
                {isCurrentPlan && (
                  <div className={s.currentPlanBadge}>✓</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${s.tableRow} ${s.priceRow}`}>
        <div className={s.featureLabelCell}>{t("plans:price") || t("common:price") || "Price"}</div>
        {filteredPlans.map((plan) => (
          <div key={`${plan.id}-price`} className={selectedPlan && selectedPlan !== plan.id ? s.featureValueCellGrayed : s.featureValueCellGray}>
            {paymentInterval === "month" ? plan.prices.month : plan.prices.year}
          </div>
        ))}
      </div>

      {allFeatures.map((feature, index) => (
        <div key={feature.key} className={`${s.tableRow} ${index % 2 === 1 ? s.evenRow : s.oddRow}`}>
          <div className={s.featureLabelCell}>{feature.label}</div>
          {filteredPlans.map((plan) => {
            const featureValue = getPlanFeatureValue(plan, feature.key);
            const isUnselected = selectedPlan && selectedPlan !== plan.id;
            const checkIconClass = isUnselected ? s.checkIconGrayed : s.checkIcon;
            const dashIconClass = isUnselected ? s.dashIconGrayed : s.dashIcon;
            
            return (
              <div key={`${plan.id}-${feature.key}`} className={isUnselected ? s.featureValueCellGrayed : s.featureValueCellGray}>
                {typeof featureValue === "string" ? featureValue : featureValue ? (
                  <img src="/icons/checkmark.svg" alt="Check" className={checkIconClass} />
                ) : (
                  <RemoveIcon className={dashIconClass} />
                )}
              </div>
            );
          })}
        </div>
      ))}

      {landingPageMode ? (
        <Button size="large" variant="contained" color="primary" rounded onClick={() => keycloak.register({ locale: router.locale, redirectUri: signUpRedirectHref })} className={s.tableActionButtonLarge}>
          {t("joinTheCommunity")}
        </Button>
      ) : (
        <Button type="submit" variant="contained" disableElevation className={s.tableActionButtonLarge} onClick={handleContinue} disabled={!selectedPlan}>
          {t("common:continue")}
        </Button>
      )}
    </div>
  );
});

interface PlansCardsProps extends Omit<PlansDisplayProps, 'selectedPlan'> {}

// Extracted and Memoized PlansCards Component
const PlansCards = React.memo(({ 
  filteredPlans, 
  allFeatures, 
  paymentInterval, 
  currentPlanName, 
  handlePlanSelect, 
  handleContinue, 
  landingPageMode, 
  signUpRedirectHref 
}: PlansCardsProps) => {
  const { t } = useTranslation(["plans", "common"]);
  const s = styles();
  const [selectedTab, setSelectedTab] = useState(0);
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();

  const currentPlan = filteredPlans[selectedTab];

  useEffect(() => {
    // When the tab changes, update the selected plan in the parent
    if (currentPlan) {
      handlePlanSelect(currentPlan.id);
    }
  }, [selectedTab, currentPlan, handlePlanSelect]);



  return (
    <div className={s.mobileContainer}>
       <div className={s.mobilePlanTabs}>
         {filteredPlans.map((plan, index) => {
           const isCurrentPlan = plan.name === currentPlanName;
           const tabClass = `${s.mobilePlanTab} ${selectedTab === index ? s.mobilePlanTabSelected : isCurrentPlan ? s.mobilePlanTabCurrent : ''}`;
           
           return (
             <button key={plan.id} className={tabClass} onClick={() => setSelectedTab(index)}>
               <div className={s.mobilePlanTabContent}>
                 {isCurrentPlan && <div className={s.mobileCurrentPlanLabel}>{t("plans:current") || "Current"}</div>}
                 <div>{plan?.name}</div>
                 {isCurrentPlan && <span className={s.mobileCurrentBadge}>✓</span>}
               </div>
               {selectedTab === index && <div className={s.tabArrow}></div>}
             </button>
           );
         })}
       </div>

      {currentPlan && (
        <div className={s.mobileContent}>
          <div className={s.mobilePriceSection}>
            <h3 className={s.mobilePriceLabel}>{t("plans:price") || "Price"}</h3>
            <div className={s.mobilePriceValue}>
              {paymentInterval === "month" ? currentPlan.prices.month : currentPlan.prices.year}
            </div>
          </div>

          <div className={s.mobileFeaturesList}>
            {allFeatures
              .filter(feature => {
                const planFeature = currentPlan.features.find(f => f.key === feature.key);
                return planFeature?.available !== false;
              })
              .map(feature => {
                const planFeature = currentPlan.features.find(f => f.key === feature.key);
                
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

          {landingPageMode ? (
            <Button size="large" variant="contained" color="primary" rounded onClick={() => keycloak.register({ locale: router.locale, redirectUri: signUpRedirectHref })} className={s.fixedBottomButton}>
              {t("joinTheCommunity")}
            </Button>
          ) : (
            <Button type="submit" variant="contained" disableElevation className={s.fixedBottomButton} onClick={handleContinue}>
              {t("common:continue") } 
            </Button>
          )}  
        </div>
      )}
    </div>
  );
});

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
  const { membership } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("smPlus"));
  
  const [paymentInterval, setPaymentInterval] = useState("month");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plansData = useMemo(() => {
    if (!priceData) return [];
    
    const plans = getDistinct(priceData.sort((a, b) => a.amount - b.amount), (p) => p.product);


    return plans.map((planName) => {
      const monthlyPrice = priceData.find(pd => pd.product === planName && pd.recurringInterval === "month");
      const yearlyPrice = priceData.find(pd => pd.product === planName && pd.recurringInterval === "year");
      
      const translationKey = planName.charAt(0).toLowerCase() + planName.slice(1).replace(/\s+/g, '');

      let features = [];
      if (planName === "Portfolio Premium") {
        features = [
            { key: "publishWorks", available: "Max 1,500" },
            { key: "visibility", available: true },
            { key: "commission", available: true },
            { key: "discounts", available: true },
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
            { key: "publishWorks", available: "Max 10" },
            { key: "visibility", available: true },
            { key: "commission", available: true },
            { key: "discounts", available: true },
            { key: "exhibitions", available: true },
            { key: "newsUpdates", available: false },
            { key: "organizeWorks", available: false },
            { key: "personalAdvice", available: false },
            { key: "statistics", available: false },
            { key: "promotedWorks", available: false },
            { key: "newsletter", available: false },
            { key: "marketingSupport", available: false }
        ];
      } else { // Portfolio Mini
        features = [
            { key: "publishWorks", available: "Max 3" },
            { key: "visibility", available: true },
            { key: "commission", available: true },
            { key: "discounts", available: false },
            { key: "exhibitions", available: true },
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
        name: t(`plans.${translationKey}.name`),
        type: planName.includes("Premium") ? "premium" : "basic",
        colorTheme: planName.includes("Plus") ? "green" : planName.includes("Premium") ? "blue" : "red",
        prices: {
          month: monthlyPrice ? `${monthlyPrice.amount}kr/månad` : "",
          year: yearlyPrice ? `${yearlyPrice.amount}kr/år` : "",
        },
        features,
        buttonText: t(`plans:select${planName.replace(/\s+/g, "")}`) || "Select Plan",
        hasFreeTrial: !planName.includes("Plus"),
      };
    });
  }, [priceData, t]);

  const allFeatures = useMemo(() => [
    { key: "publishWorks", label: t("plans:featurePublishWorks") },
    { key: "visibility", label: t("plans:featureVisibility")  },
    { key: "commission", label: t("plans:featureYourArt")  },
    { key: "discounts", label: t("plans:featureDiscounts")  },
    { key: "exhibitions", label: t("plans:featureExhibitions")  },
    { key: "newsUpdates", label: t("plans:featureNewsUpdates")  },
    { key: "organizeWorks", label: t("plans:featureOrganizeWorks")  },
    { key: "personalAdvice", label: t("plans:featurePersonalAdvice") },
    { key: "statistics", label: t("plans:featureStatistics") },

  ], [t]);
  
  const currentPlanName = useMemo(() => {
    if (membership?.value === 3) return "Portfolio Premium";
    if (membership?.value === 2) return "Portfolio";
    if (membership?.value === 1) return "Portfolio Mini";
    if (membership?.value === 0) return "Free";
    return null;
  }, [membership]);

  const filteredPlans = useMemo(() => {
    if (showAll) return plansData;
    return plansData.filter((plan) => {
      if (membership?.value === 2) return plan.name === "Portfolio" || plan.name === "Portfolio Premium";
      if (membership?.value === 3) return plan.name === "Portfolio Premium";
      return true;
    });
  }, [plansData, membership, showAll]);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    
    const selectedPlanData = filteredPlans.find(plan => plan.id === planId);
    if (selectedPlanData) {
      const selectedPriceData = priceData.find(
        (pd) => pd.product === selectedPlanData.name && pd.recurringInterval === paymentInterval
      );
      
      if (selectedPriceData) {
        dispatch({ type: ADD_PRICE, payload: { ...selectedPriceData } });
      }
    }
  };

  const handleContinue = () => {
    if (selectedPlan) {
      const selectedPlanData = filteredPlans.find(plan => plan.id === selectedPlan);
      if (selectedPlanData) {
        const selectedPriceData = priceData.find(
          (pd) => pd.product === selectedPlanData.name && pd.recurringInterval === paymentInterval
        );
        
        if (selectedPriceData) {
          if (landingPageMode) {
            keycloak.register({ locale: router.locale, redirectUri: signUpRedirectHref });
            return;
          }
          
          if (keycloak.authenticated) {
            router.push(`/checkout`);
          } else {
            keycloak.register({ locale: router.locale, redirectUri: `${window.location.origin}/checkout` });
          }
        }
      }
    }
  };
  
  return (
    <div className={s.plansContainer}>
      <Container className={s.plansIntervalContainer}>
        <ToggleButtonGroup
          value={paymentInterval}
          exclusive
          onChange={(event, newAlignment) => {
            if (newAlignment) setPaymentInterval(newAlignment);
          }}
        >
          <ToggleButton value="month" className={s.planToggleButton}>
            {t("monthlyPayment") || "Monthly"}
          </ToggleButton>
          {plansData.some(p => p.prices.year !== 'Free') && (
            <ToggleButton value="year" className={s.planToggleButton}>
              {t("yearlyPayment") || "Yearly"}
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </Container>

      <Container className={s.planCardsContainer}>
          <PlansCards
            filteredPlans={filteredPlans}
            allFeatures={allFeatures}
            paymentInterval={paymentInterval}
            currentPlanName={currentPlanName}
            handlePlanSelect={handlePlanSelect}
            handleContinue={handleContinue}
            landingPageMode={landingPageMode}
            signUpRedirectHref={signUpRedirectHref}
          />
      </Container>
    </div>
  );
}
