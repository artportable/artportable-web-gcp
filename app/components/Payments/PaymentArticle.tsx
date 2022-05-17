import { useState, useEffect } from 'react';
import { Snackbar, Step, Stepper, StepLabel, StepContent, Paper, Box, TextField, FormControl, Input, FormHelperText, OutlinedInput, InputLabel, Typography, Accordion, AccordionDetails, AccordionSummary, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next'
import { styles } from './paymentPremium.css'
import { SendPaymentInfo, paymentRequest } from './Request';
import Button from '../Button/Button'
import clsx from "clsx";
import Alert, { Color } from '@material-ui/lab/Alert'
import OneTimeStripeCheckoutForm from '../OneTimeStripeCheckoutForm/OneTimeStripeCheckoutForm';
import { OneTimeStripeCheckoutFormProps } from '../OneTimeStripeCheckoutForm/OneTimeStripeCheckoutForm';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckIcon from '@material-ui/icons/Check'

const artportablePurchase = 'zapier'
const stripeProduct = process.env.NEXT_PUBLIC_STRIPE_PRICE_ARTICLE;


interface PurchaseFormData {
  fullName: FormValue;
  email: FormValue;
}

interface FormValue {
  value: string;
  error: boolean
}

const useStyles = makeStyles((theme) => ({
  accordion: {
    width: '100%',
  },
  heading: {
    fontSize: '1rem',
    flexBasis: '33.33%',
    flexShrink: 0,
    [theme.breakpoints.up('smPlus')]: {
      fontSize: '1.3rem'
    },
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: '0 24px 6px 24px',
    borderRadius: '4px'
  },
}));

export default function PaymentArticle() {
  const classes = useStyles();
  const s = styles();
  const { t } = useTranslation(['payment']);
  const [expanded, setExpanded] = useState(false);
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
  const promise = loadStripe(stripeKey);

  const [formData, setFormData] = useState<PurchaseFormData>({
    fullName: { value: '', error: false },
    email: { value: '', error: false },
  });
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [formUntouched, setFormUntouched] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<Color>("success");

  useEffect(() => {
    if (Object.keys(formData).some(key => formData[key].error)) {
      setFormHasErrors(true);
    } else {
      setFormHasErrors(false);
    }
  }, [formData]);

  const handleChange = (event, key: keyof PurchaseFormData) => {
    const newValue: FormValue = {
      value: event.target.value,
      error: false,
    }

    setFormData(prevValue => ({
      ...prevValue,
      [key]: newValue
    }));
  }
  const validateFormValue = (value, key: keyof PurchaseFormData) => {
    if (formUntouched) {
      setFormUntouched(false);
    }

    const isInvalid = checkIsInvalid(value, key);

    const newFormValue: FormValue = {
      value: value,
      error: isInvalid
    }

    setFormData(prevValue => ({
      ...prevValue,
      [key]: newFormValue
    }));
  }

  const validateEmail = (newValue: string): boolean => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newValue)) {
      return false;
    }
    return true;
  }

  const checkIsInvalid = (newValue: string, key: keyof PurchaseFormData): boolean => {
    switch (key) {
      case 'email':
        return validateEmail(newValue);
      case 'fullName':
        return newValue === '';
    }
  }
  const validateAllFields = () => {
    const emailError = checkIsInvalid(formData.email.value, 'email');
    const fullNameError = checkIsInvalid(formData.fullName.value, 'fullName');


    const emailFormValue = {
      email: {
        ...formData.email,
        error: emailError
      },
      fullName: {
        ...formData.fullName,
        error: fullNameError
      },
    }
    setFormData(emailFormValue);

    if (emailError || fullNameError) {
      setFormHasErrors(true);
      return false;
    } else {
      return true;
    }
  }

  const submit = async () => {
    if (validateAllFields()) {
      const response = await postDataToZendesk();

      handleResponse(response);
    }
  }

  const postDataToZendesk = async () => {
    try {
      const response = await fetch(artportablePurchase, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "request": {
            "requester": {
              "fullName": formData.fullName.value,
              "email": formData.email.value
            }
          }
        }),
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const handleResponse = (response: Response) => {
    if (response.status === 201) {
      resetForm();
      showSuccessMessage();
    } else {
      showErrorMessage();
    }
  }

  const showSuccessMessage = () => {
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }

  const showErrorMessage = () => {
    setSnackbarSeverity("warning");
    setSnackbarOpen(true);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  const resetForm = () => {
    setFormData({
      fullName: { value: '', error: false },
      email: { value: '', error: false },
    });
    setFormUntouched(true);
    setFormHasErrors(false);
  }
  const [valueRadio, setValueRadio] = useState('');
  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  function getSteps() {
    return [t('personalData'), t('paymentMethod'), t('confirmEventualSwish'), t('confirmation')];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className={s.right}>
            <div className={s.input}>
              <form>
                <Paper className={s.inputPaper}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      required
                      color="secondary"
                      className={s.inputField}
                      variant="outlined"
                      id="standard-required-name"
                      value={formData.fullName.value}
                      error={formData.fullName.error}
                      onChange={(e) => handleChange(e, 'fullName')}
                      onBlur={(e) => validateFormValue(e.target.value, 'fullName')}
                      aria-describedby="standard-name-helper-text"
                      placeholder={t('name')}
                      inputProps={{
                        'aria-label': 'Name',
                      }}
                    />
                  </FormControl>
                </Paper>
                <FormHelperText id="standard-name-helper-text" className={s.helperText}>{formData.fullName.error ? t('mustNotBeEmptyMessage') : ''}</FormHelperText>
                <Paper className={s.inputPaper}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      color="secondary"
                      className={s.inputField}
                      variant="outlined"
                      id="standard-required-email"
                      value={formData.email.value}
                      error={formData.email.error}
                      onChange={(e) => handleChange(e, 'email')}
                      onBlur={(e) => validateFormValue(e.target.value, 'email')}
                      aria-describedby="standard-email-helper-text"
                      placeholder={t('yourEmail')}
                      inputProps={{
                        'aria-label': 'Email',
                      }}
                    />

                  </FormControl>
                </Paper>
                <FormHelperText id="standard-name-helper-text" className={s.helperText}>{formData.email.error ? t('emailErrorMessage') : ''}</FormHelperText>
                <Button
                  fullWidth
                  disabled={formHasErrors || formUntouched}
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                  className={s.buttonNextStep1}
                >
                 {t('next')}
                </Button>
              </form>
            </div>
          </div>
        );
      case 1:
        return (
          <div className={s.container}>

            <Accordion className={s.accordion} onChange={handleChangeAccordion('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>{t('paymentOptions')}</Typography>
              </AccordionSummary>
              <AccordionDetails className={s.paymentOptions}>
                <FormControl component="fieldset" className={s.paymentOptions}>
                  <RadioGroup aria-label="payment" name="payment" value={valueRadio} onChange={handleChangeRadio}>
                    <div className={s.swishFlex}>
                    <FormControlLabel value="betalkort" control={<Radio />} label={<Typography className={s.radioLabel}>{t('card')}</Typography>} />
                      <img
                        className={s.paymentCards}
                        width={100}
                        src="/images/3_Card_color_horizontal.svg"
                        alt="paymentCards"
                        title="paymentCards" />
                    </div>
                    {(valueRadio === "betalkort") &&
                      <div>
                        <Elements stripe={promise}>
                          <OneTimeStripeCheckoutForm
                            email={formData.email.value}
                            fullName={formData.fullName.value}
                            products={[{ amount: 4000, currency: 'SEK', id: `${stripeProduct}`, name: 'Article' }]}
                            onSuccess={() => setActiveStep(3)} />
                        </Elements>
                      </div>
                    }
                    <div className={s.swishFlex}>                     
                     <FormControlLabel value="swish" control={<Radio />} label={<Typography className={s.radioLabel}>{t('swish')}</Typography>} />
                      <img
                        className={s.swishLogo}
                        width={100}
                        src="/images/swishlogo.svg"
                        alt="swishlogo"
                        title="swish" />
                    </div>
                    {(valueRadio === "swish") &&
                      <div className={s.swish}>
                        <Typography variant="subtitle1" component="h4">{t('scanQr')}</Typography>
                        <div className={s.qrCode}>
                          <img
                            width={200}
                            src="/images/qrswish.svg"
                            alt="swishqr"
                            title="qr code" />
                          <Typography variant="h4" component="h2" className={s.swishNumer}>1234461489</Typography>
                        </div>
                      </div>
                    }
                  </RadioGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <div className={s.buttonFlex}>
              <Button
    
                variant="outlined"
                color="secondary"
                onClick={handleBack}
                className={s.buttonBackStep2}
              >
                {t('back')}
              </Button>
              {(valueRadio === "betalkort") &&
                <Button
                  disabled
                 
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                  className={s.buttonNextStep2}
                >
                  {t('next')}
                </Button>
              }
              {(valueRadio === "swish") &&
                <Button

                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                  className={s.buttonNextStep2}
                >
                  {t('next')}
                </Button>
              }
            </div>
          </div>
        );
      case 2:
        return <div>
          <Typography className={s.successHeading}>
          {t('whenConfirmed')}
          </Typography>
          <div className={s.buttonFlex}>
            <Button

              onClick={handleBack}
              className={s.buttonBackStep2}
              variant="outlined"
              color="secondary"
            >
             {t('back')}
            </Button>
            <Button

              variant="contained"
              color="secondary"
              onClick={handleNext}
              className={s.buttonNextStep2}
            >
             {t('next')}
            </Button>
          </div>
        </div>
      case 3:
        return <div>
          <Paper square elevation={0} className={s.successHeading}>
            {(valueRadio === "swish") &&
              <div className={s.successDiv}>
                <CheckIcon
                  className={s.confirmIcon} />
                <Typography className={s.successHeading}>{t('artCoordinator')}</Typography>
              </div>
            }
            {(valueRadio === "betalkort") &&
              <div className={s.successDiv}>
                <CheckIcon
                  className={s.confirmIcon} />
                <Typography className={s.successHeading}>{t('paymentConfirmed')}</Typography>
              </div>
            }
            <div className={s.buttonFlex}>
              {(valueRadio === "swish") &&
                <Button

                  onClick={handleBack}
                  className={s.buttonBackStep2}
                  variant="outlined"
                  color="secondary"
                >
                  {t('back')}
                </Button>
              }
              {(valueRadio === "betalkort") &&
                <Button
                  disabled
                  onClick={handleBack}
                  className={s.buttonBackStep2}
                  variant="outlined"
                  color="secondary"
                >
                  {t('back')}
                </Button>
              }
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
                className={s.buttonNextStep2}
              >
                {t('done')}
              </Button>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert onClose={(e) => handleSnackbarClose(e, "")} variant="filled" severity={snackbarSeverity}>
                {t(`${snackbarSeverity}Message`)}
              </Alert>
            </Snackbar>
          </Paper>
        </div>
      default:
        return 'Unknown step';
    }
  }


  return (
    <div>
      <div className={s.flexContainer}>
        <Paper elevation={2}>
          <div className={s.left}>
            <img
              className={s.productImage}
              src="/images/art_free_trial.jpeg"
              alt="artwork"
              title="lotwinther" />
            <div>
              <div className={s.premiumText}>
                <img
                  className={s.logoArtportable}
                  src="/Artportable_Logotyp_Black.svg"
                  alt="hej"
                  title="Premium" />

                <Typography variant="h2" component="h2">{t('article')}</Typography>
                <Typography variant="h2" component="h2">{t('priceArticle')}</Typography>
                {/* <Typography variant="h4" component="h2">{t('length')}</Typography> */}
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('articleIncludes')}</Typography>
                <ul>
                  <li><Typography variant="subtitle1" component="p">{t('personalArtCoordinator')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('prioritized')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('support')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p" className={s.textLastLine}>{t('follow')}</Typography></li>
                </ul>
              </div>
            </div>
          </div>
        </Paper>
        <div className={s.stepperContainer}>
          <Paper elevation={2} >
            <Stepper activeStep={activeStep} orientation="vertical" className={s.accordionPaper}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
          {activeStep === steps.length && (
            <Paper square elevation={2} className={classes.resetContainer}>
              <div className={s.doneDiv}>
                <Typography className={s.successHeading}>{t('welcome')}</Typography>
              </div>

              {/* <Button
                onClick={handleReset}
                className={s.buttonBackStep2}
                variant="outlined"
                color="secondary"
              >
                Börja om
              </Button>
              <Button
                className={s.buttonNextStep2}
                fullwidth
                variant="contained"
                color="secondary"
                disableElevation
                onClick={() => submit()}
                disabled={formHasErrors || formUntouched}
              >
                Klar
              </Button> */}
              <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={(e) => handleSnackbarClose(e, "")} variant="filled" severity={snackbarSeverity}>
                  {t(`${snackbarSeverity}Message`)}
                </Alert>
              </Snackbar>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
}
