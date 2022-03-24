const zapierFreemiumApiUrl = process.env.NEXT_PUBLIC_ZAPIER_FREEMIUM
const zapierBasicApiUrl = process.env.NEXT_PUBLIC_ZAPIER_BASIC
const zapierBasicConfirmedApiUrl = process.env.NEXT_PUBLIC_ZAPIER_BASIC_CONFIRMED
const zapierPremiumApiUrl = process.env.NEXT_PUBLIC_ZAPIER_PREMIUM
const zapierFreeTrialApiUrl = process.env.NEXT_PUBLIC_ZAPIER_FREE_TRIAL

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