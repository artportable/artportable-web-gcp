import { checkoutFormStyles } from './checkoutForm.css'
import { Box } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from '../Button/Button';
import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { capitalizeFirst } from '../../utils/util';
import Link from 'next/link';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export default function CheckoutForm({ email, fullName, plan }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [customerId, setCustomerId] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const styles = checkoutFormStyles();
  const { t } = useTranslation(['checkout', 'common']);

  const interval = t(plan?.recurringInterval);

  useEffect(() => {
    if (email !== null && fullName !== null && plan !== null) {
      // Create a Stripe customer as soon as the page loads
      fetch(`${apiBaseUrl}/api/payments/customers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email: email, fullName: fullName})
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
          setCustomerId(data?.id);
        })
        .catch(e => console.log(e));
      }
  }, [email, fullName, plan]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        },
        fontStyle: 'italic',
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Create payment method towards Stripe
  function createPaymentMethod() {
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const billingName = fullName;

    stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: billingName,
        },
      })
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          createSubscription({
            customerId: customerId,
            paymentMethodId: result.paymentMethod.id,
            priceId: plan.id,
          });
        }
      });
  };

  // Create subscription
  function createSubscription({ customerId, paymentMethodId, priceId }) {
    return (
      fetch(`${apiBaseUrl}/api/payments/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          paymentMethodId: paymentMethodId,
          priceId: priceId,
        }),
      })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.error) {
          // If the card is declined, display an error to the user.
          setError(error);
          throw result;
        }
        setSucceeded(true);
        return result;
      })
      .catch((error) => {
        setError(error);
      })
    );
  }

  return (
    <>
      <div className={styles.cardElementContainer}>
        <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
      </div>
      {/* Show any error that happens when processing the payment */}
      <div className={styles.cardErrorContainer} role="alert">
        {error}
      </div>

      <div className={styles.product}>
            <Box fontSize="1rem">
              {t('product')}
            </Box>
            <Box>
              {plan?.product}
            </Box>
          </div>
          <Box className={styles.subtotal}>
            <Box fontSize="1rem" fontWeight="bold">
              {t('total')}
            </Box>
            <Box>
              {`${plan?.amount} ${plan?.currency.toUpperCase()} / ${interval}`}
            </Box>
          </Box>
          <Box className={styles.divider}></Box>
          <Box display="flex" justifyContent="flex-end" marginTop="2rem">
            <Link href="/">
              <a>
                <Button
                  variant="contained" 
                  color="primary"
                  disableElevation 
                  rounded
                  onClick={createPaymentMethod}>
                  {capitalizeFirst(t('common:words.pay'))}
                </Button>
              </a>
            </Link>
          </Box>
    </>
  );
}