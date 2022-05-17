import { useState, useEffect } from 'react';
import { Snackbar, Step, Stepper, StepLabel, StepContent, Paper, Box, TextField, FormControl, Input, FormHelperText, OutlinedInput, InputLabel, Typography, Accordion, AccordionDetails, AccordionSummary, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next'
import { styles } from './shop.css'

import Button from '../Button/Button'
import clsx from "clsx";
import Alert, { Color } from '@material-ui/lab/Alert'
import OneTimeStripeCheckoutForm from '../OneTimeStripeCheckoutForm/OneTimeStripeCheckoutForm';
import { OneTimeStripeCheckoutFormProps } from '../OneTimeStripeCheckoutForm/OneTimeStripeCheckoutForm';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckIcon from '@material-ui/icons/Check'
import PremiumDialog from '../PaymentDialog/PremiumDialog';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FrameDialog from '../PaymentDialog/FrameDialog';
import ArticleDialog from '../PaymentDialog/ArticleDialog';
import MonthlyArtistDialog from '../PaymentDialog/MonthlyArtistDialog';
import CategoryPageDialog from '../PaymentDialog/CategoryPageDialog';

const artportablePurchase = 'zapier'
const stripeProduct = process.env.NEXT_PUBLIC_STRIPE_PRICE;


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

export default function Shop() {
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

  const [openPremiumDialog, setOpenPremiumDialog] = useState(false);
  const [openFrameDialog, setOpenFrameDialog] = useState(false);
  const [openArticleDialog, setOpenArticleDialog] = useState(false);
  const [openMonthlyArtistDialog, setOpenMonthlyArtistDialog] = useState(false);
  const [openCategoryPageDialog, setOpenCategoryPageDialog] = useState(false);

  function togglePremiumDialog() {
    setOpenPremiumDialog(!openPremiumDialog);
  }


  const handleClickPremiumDialog = () => {
    setOpenPremiumDialog(true);
  };

  function toggleFrameDialog() {
    setOpenFrameDialog(!openFrameDialog);
  }


  const handleClickFrameDialog = () => {
    setOpenFrameDialog(true);
  };

  function toggleArticleDialog() {
    setOpenArticleDialog(!openArticleDialog);
  }


  const handleClickArticleDialog = () => {
    setOpenArticleDialog(true);
  };

  function toggleMonthlyArtistDialog() {
    setOpenMonthlyArtistDialog(!openMonthlyArtistDialog);
  }


  const handleClickMonthlyArtistDialog = () => {
    setOpenMonthlyArtistDialog(true);
  };

  function toggleCategoryPageDialog() {
    setOpenCategoryPageDialog(!openCategoryPageDialog);
  }


  const handleClickCategoryPageDialog = () => {
    setOpenCategoryPageDialog(true);
  };


  return (
    <div>
      <div className={s.flexContainer}>
        <div className={s.item}>
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

                <Typography variant="h2" component="h2">{t('portfolioPremium')}</Typography>
                <Typography variant="h2" component="h2">{t('price')}</Typography>
                <Typography variant="h4" component="h2">{t('length')}</Typography>
                <div>
                  {/* <Typography onClick={() => { handleClickPremiumDialog(); }}>
                    {t('buy')}
                  </Typography> */}
                  <Button variant="contained" color="secondary"
                    onClick={() => { handleClickPremiumDialog(); }}>
                    {t('buy')}
                  </Button>


                  <PremiumDialog
                    open={openPremiumDialog}
                    onClose={togglePremiumDialog}
                  />
                </div>
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('premiumIncludes')}</Typography>
                <ul>
                  <li><Typography variant="subtitle1" component="p">{t('personalArtCoordinator')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('prioritized')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('support')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('publish')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('chat')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p" className={s.textLastLine}>{t('follow')}</Typography></li>
                </ul>
              </div>
            </div>
          </div>
        </Paper>
        </div>

        
        <div className={s.item}>
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

                <Typography variant="h2" component="h2">{t('frame')}</Typography>
                <Typography variant="h2" component="h2">{t('priceFrame')}</Typography>
                {/* <Typography variant="h4" component="h2">{t('length')}</Typography> */}
                <div>
                  {/* <Typography onClick={() => { handleClickFrameDialog(); }}>
                    {t('buy')}
                  </Typography> */}
                  <Button variant="contained" color="secondary"
                    onClick={() => { handleClickFrameDialog(); }}>
                    {t('buy')}
                  </Button>

                  <FrameDialog
                    open={openFrameDialog}
                    onClose={toggleFrameDialog}
                  />
                </div>
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('frameIncludes')}</Typography>
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
        </div>
        
        <div className={s.item}>
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
                <div>
                  {/* <Typography onClick={() => { handleClickArticleDialog(); }}>
                    {t('buy')}
                  </Typography> */}
                  <Button variant="contained" color="secondary"
                    onClick={() => { handleClickArticleDialog(); }}>
                    {t('buy')}
                  </Button>

                  <ArticleDialog
                    open={openArticleDialog}
                    onClose={toggleArticleDialog}
                  />
                </div>
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
        </div>
        
        <div className={s.item}>
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

                <Typography variant="h2" component="h2">{t('monthlyArtist')}</Typography>
                <Typography variant="h2" component="h2">{t('priceMonthlyArtist')}</Typography>
                {/* <Typography variant="h4" component="h2">{t('length')}</Typography> */}
                <div>
                  {/* <Typography onClick={() => { handleClickMonthlyArtistDialog(); }}>
                    {t('buy')}
                  </Typography> */}
                  <Button variant="contained" color="secondary"
                    onClick={() => { handleClickMonthlyArtistDialog(); }}>
                    {t('buy')}
                  </Button>

                  <MonthlyArtistDialog
                    open={openMonthlyArtistDialog}
                    onClose={toggleMonthlyArtistDialog}
                  />
                </div>
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('monthlyArtistIncludes')}</Typography>
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
        </div>
        
        <div className={s.item}>
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

                <Typography variant="h2" component="h2">{t('categoryPage')}</Typography>
                <Typography variant="h2" component="h2">{t('priceCategoryPage')}</Typography>
                {/* <Typography variant="h4" component="h2">{t('length')}</Typography> */}
                <div>
                  {/* <Typography onClick={() => { handleClickCategoryPageDialog(); }}>
                    {t('buy')}
                  </Typography> */}
                  <Button variant="contained" color="secondary"
                    onClick={() => { handleClickCategoryPageDialog(); }}>
                    {t('buy')}
                  </Button>

                  <CategoryPageDialog
                    open={openCategoryPageDialog}
                    onClose={toggleCategoryPageDialog}
                  />
                </div>
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('categoryPageIncludes')}</Typography>
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
        </div>

        </div>
      </div>

      
  );
}
