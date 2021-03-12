import { checkoutFormStyles } from './checkoutForm.css'
import { Button, Hidden } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

// TODO: Fetch from store
const customerEmail = "test3@hejtest.com";
const customerFullName = "Mrs Test"
const priceIdFromStore = 'price_1IRdujA3UXZjjLWxbwLujK5l';

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [customerId, setCustomerId] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const styles = checkoutFormStyles();

  useEffect(() => {
    // Create a Stripe customer as soon as the page loads
    fetch("http://localhost:5001/api/payments/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: customerEmail, fullName: customerFullName})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCustomerId(data?.id);
      })
      .catch(e => console.log(e));
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
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

    let billingName = customerFullName;
    let priceId = priceIdFromStore;

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
            priceId: priceId,
          });
        }
      });
  };

  // Create subscription
  function createSubscription({ customerId, paymentMethodId, priceId }) {
    return (
      fetch('http://localhost:5001/api/payments/subscriptions', {
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
      {/* <Button
        disabled={processing || disabled || succeeded}
        id="submit"
        onClick={createPaymentMethod}
        >
        <span id="button-text">
          {processing ? ("Laddar...") : ("Pay now")}
        </span>
      </Button> */}
      {/* Show any error that happens when processing the payment */}
      <div className={styles.cardErrorContainer} role="alert">
        {error}
      </div>

      {/* Show a success message upon completion */}
      {/* {!succeeded && (
        <div className={styles.resultMessage}>
          Payment succeeded!
        </div>
      )} */}
    </>
  );
}