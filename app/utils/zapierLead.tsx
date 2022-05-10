import { AnyMxRecord } from "dns"

const zapierFreemiumApiUrl = process.env.NEXT_PUBLIC_ZAPIER_FREEMIUM
const zapierBasicApiUrl = process.env.NEXT_PUBLIC_ZAPIER_BASIC
const zapierBasicConfirmedApiUrl = process.env.NEXT_PUBLIC_ZAPIER_BASIC_CONFIRMED
const zapierPremiumApiUrl = process.env.NEXT_PUBLIC_ZAPIER_PREMIUM
const zapierFreeTrialApiUrl = process.env.NEXT_PUBLIC_ZAPIER_FREE_TRIAL
const zapierMonthlyInterestApiUrl = process.env.NEXT_PUBLIC_ZAPIER_MONTHLY_INTEREST
const zapierPortfolioPremiumInterestApiUrl = process.env.NEXT_PUBLIC_ZAPIER_PORTFOLIO_PREMIUM_INTEREST
const zapierArticleInterestApiUrl = process.env.NEXT_PUBLIC_ZAPIER_ARTICLE_INTEREST


export interface Lead {
  name: any;
  phoneNumber: any;
  email: any;
  type: any;
  product: any
} 

export interface PremiumLead {
  artistArtEnthusiast: any;
  name: any;
  phoneNumber: any;
  email: any,
  url:  any
}
export interface FreeTrial {
  email: any,
}
export interface MonthlyInterest {
  email: any,
}
export interface PortfolioPremiumInterest {
  email: any,
}
export interface ArticleInterest {
  email: any,
}

export const zapierLeadFreemium  = async (lead: Lead): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
         ...lead
        },
      }
    });
    const response = await fetch(zapierFreemiumApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}

export const zapierLeadBasic  = async (lead: Lead): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
         ...lead
        },
      }
    });
    const response = await fetch(zapierBasicApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}

export const zapierLeadBasicConfirmed  = async (lead: Lead): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
          ...lead
        },
      }
    });
    const response = await fetch(zapierBasicConfirmedApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}

export const zapierLeadPremium = async (premiumLead: PremiumLead): Promise<Response> => {

  try { 
    const FormRequest = JSON.stringify({
    "request": {
    "requester": {
        ...premiumLead
        },
      }
    });
    const response = await fetch(zapierPremiumApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}
export const zapierFreeTrial = async (freeTrial: FreeTrial): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
          ...freeTrial
        },
      }
    });
    const response = await fetch(zapierFreeTrialApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}
export const zapierMonthlyInterest = async (monthlyInterest: MonthlyInterest): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
          ...monthlyInterest
        },
      }
    });
    const response = await fetch(zapierMonthlyInterestApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}
export const zapierPortfolioPremiumInterest = async (portfolioPremiumInterest: PortfolioPremiumInterest): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
          ...portfolioPremiumInterest
        },
      }
    });
    const response = await fetch(zapierPortfolioPremiumInterestApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}
export const zapierArticleInterest = async (articleInterest: ArticleInterest): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
          ...articleInterest
        },
      }
    });
    const response = await fetch(zapierArticleInterestApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}