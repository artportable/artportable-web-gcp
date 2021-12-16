const zapierFreemiumApiUrl = process.env.NEXT_PUBLIC_ZAPIER_PAYMENT

export interface SendPaymentInfo {
  name: any;
  phoneNumber: any;
  email: any;
  product: "portfolioPremium" | "showroom" | "artportable Magazine"
} 

export const paymentRequest  = async (payment: SendPaymentInfo): Promise<Response> => {

  try {
    const FormRequest = JSON.stringify({
      "request": {
        "requester": {
         ...payment
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