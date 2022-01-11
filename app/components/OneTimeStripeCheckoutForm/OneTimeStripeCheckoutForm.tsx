import { checkoutFormStyles } from './onteTimeStripeCheckoutForm.css'
import { Box, CircularProgress, Snackbar, Typography, Paper } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from '../Button/Button';
import React, { useState } from "react";
import { useTranslation } from 'next-i18next';
import { capitalizeFirst } from '../../utils/util';
import { Alert, AlertTitle, Color } from '@material-ui/lab';
import Product from '../../models/Product';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface OneTimeStripeCheckoutFormProps {
  email: string;
  fullName: string;
  products: Product[];
  onSuccess: () => void;
}

export default function OneTimeStripeCheckoutForm({ email, fullName, products, onSuccess }: OneTimeStripeCheckoutFormProps) {
  const [error, setError] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<Color>("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const stripe = useStripe();
  const elements = useElements();
  const styles = checkoutFormStyles();
  const { t } = useTranslation(['checkout', 'common']);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
        fontStyle: 'italic',
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const showSuccessMessage = () => {
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }
  const showErrorMessage = () => {
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // Create payment method towards Stripe
  function createPaymentMethod() {
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.

    setProcessing(true);

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
          showErrorMessage();
          setProcessing(false);
          setDisabled(true);
        } else {
          createPurchase({
            email: email,
            fullName: fullName,
            paymentMethodId: result.paymentMethod.id,
            prices: products.map(product => product.id)
          })
            .then((result) => {
              // showSuccessMessage();
              onSuccess();
              setProcessing(false);
            }).catch((error) => {
              showErrorMessage();
            });
        }
      });
  };

  // Create subscription
  function createPurchase({ email, fullName, paymentMethodId, prices }) {
    return (
      fetch(`${apiBaseUrl}/api/payments/purchases`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            email: email,
            fullName: fullName
          },
          paymentMethodId: paymentMethodId,
          products: prices
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.status === 500 || result.error) {
            // If the card is declined, display an error to the user.
            showErrorMessage();
            throw result;
          }
          else if (result.Status === 'succeeded') {
            onSuccess();
            // showSuccessMessage();
            
            return result;
          }
          else if (result.Status === 'requires_action' || result.Status === "requires_confirmation") {
            return stripe.confirmCardPayment(result.Id, { payment_method: paymentMethodId })
              .then((resultConfirm) => {
                if (resultConfirm.error) { // If 3D Secure is declined, display an error to the user.
                  showErrorMessage();
                  throw resultConfirm;
                } else {
                  if (resultConfirm.paymentIntent.status === 'succeeded') {
                    onSuccess();
                    // showSuccessMessage();
                
                    return resultConfirm;
                  }
                }
              })
              .catch((error) => {
                throw error;
              });
          }
        })
        .catch((error) => {
          showErrorMessage();
          setProcessing(false);
          throw error;
        })
    );
  }

  return (
    <>

      <div className={styles.container}>
        <div>
          <Typography variant="h6" component="h2" className={styles.heading}>{t('cardDetails')}</Typography>
        </div>

        <div className={styles.cardElementContainer}>
          <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
        </div>

        {/* Show any error that happens when processing the payment */}
        <div className={styles.cardErrorContainer} role="alert">
          {error}
        </div>

        <div className={styles.productsRow}>
          <Box fontSize="1rem">
            {products.length > 1 ? t('products') : t('product')}
          </Box>
          <Box className={styles.products}>
            {products.map((product) => {
              return <Typography key={product.id}>{product.name}</Typography>
            })
            }
          </Box>
        </div>
        <Box className={styles.subtotal}>
          <Box fontSize="1rem" fontWeight="bold">
            {t('total')}
          </Box>
          <Box>
            {`${products.reduce((accum, product) => accum + product.amount, 0)} ${products[0].currency.toUpperCase()}`}
          </Box>
        </Box>
        <Box className={styles.divider}></Box>
        <Box display="flex" position="relative" justifyContent="flex-end" marginTop="2rem">
          <Button
            className={styles.payButton}
            variant="contained"
            color="secondary"
            disableElevation
            rounded
            onClick={createPaymentMethod}
            disabled={processing || disabled}
          >
            {capitalizeFirst(t('common:words.pay'))}
            {processing && (
              <CircularProgress
                color="secondary"
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Button>
        </Box>

      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={(e) => handleSnackbarClose(e, "")}
        >
          <AlertTitle>{snackbarSeverity === 'success' ? t('paymentsuccessful') : t('paymentUnsuccessful')}</AlertTitle>
          {snackbarSeverity !== 'success' && t('tryAgain')}
        </Alert>
      </Snackbar>

    </>
  );
}