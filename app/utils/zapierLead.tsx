const zapierFreemiumApiUrl = process.env.NEXT_PUBLIC_ZAPIER_FREEMIUM
const zapierBasicApiUrl = process.env.NEXT_PUBLIC_ZAPIER_BASIC

export interface Lead {
  name: any;
  phoneNumber: any;
  email: any;
  type: any;
  product: "portfolioPremium" | "portfolio" | "free"
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
