const zapierApiUrl = process.env.NEXT_PUBLIC_ZAPIER_LEADS

export interface Lead {
  name: any;
  phoneNumber: any;
  email: any;
  type: any;
  product: "portfolioPremium" | "portfolio" | "free"
} 

export const zapierLead = async (lead: Lead): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
         ...lead
        },
      }
    });
    const response = await fetch(zapierApiUrl, {
      method: 'POST',
      body: FormRequest
    });

    return response;
  } catch (error) {
  }
}