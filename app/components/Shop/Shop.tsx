import { useState } from 'react';
import { Paper, Typography } from '@material-ui/core'
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
import PremiumDialog from '../PaymentDialog/PremiumDialog';
import FrameDialog from '../PaymentDialog/FrameDialog';
import ArticleDialog from '../PaymentDialog/ArticleDialog';
import MonthlyArtistDialog from '../PaymentDialog/MonthlyArtistDialog';
import CategoryPageDialog from '../PaymentDialog/CategoryPageDialog';

// const artportablePurchase = 'zapier'
// const stripeProduct = process.env.NEXT_PUBLIC_STRIPE_PRICE;

export default function Shop() {
  const s = styles();
  const { t } = useTranslation(['payment']);
  
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
        <Paper className={s.paper} elevation={2}>
          <div className={s.left}>
            <img
              className={s.productImage}
              src="/images/art_free_trial.jpeg"
              alt="artwork"
              title="Portfolio Premium" />
            <div>
              <div className={s.premiumText}>
                <Typography variant="h2" component="h2" style={{fontWeight: 500}}>{t('portfolioPremium')} </Typography>
                <Typography variant="h3" component="h2" style={{fontWeight: 100}}>{t('price')}</Typography>
                <div>
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
                  <li><Typography variant="subtitle1" component="p">{t('follow')}</Typography></li>
                </ul>
                  <div className={s.buttonFlex}>
                  <Button className={s.button} variant="contained" color="secondary" rounded
                    onClick={() => { handleClickPremiumDialog(); }}>
                    {t('buy')}
                  </Button>
                  </div>
              </div>
            </div>
          </div>
        </Paper>
        </div>

        <div className={s.item}>
        <Paper className={s.paper} elevation={2}>
          <div className={s.left}>
            <img
              className={s.productImage}
              src="/images/kopsida2.png"
              alt="artwork"
              title="Frame" />
            <div>
              <div className={s.premiumText}>
                <Typography variant="h2" component="h2" style={{fontWeight: 500}}>{t('frame')}</Typography>
                <Typography variant="h3" component="h2">{t('priceFrame')}</Typography>
                <div>
                  <FrameDialog
                    open={openFrameDialog}
                    onClose={toggleFrameDialog}
                  />
                </div>
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('frameIncludes')}</Typography>
                <ul>
                  <li><Typography variant="subtitle1" component="p">{t('exclusiveFrame')}</Typography></li>
                </ul>
                <div className={s.buttonFlex}>
                  <Button className={s.button} variant="contained" color="secondary" rounded
                    onClick={() => { handleClickFrameDialog(); }}>
                    {t('buy')}
                  </Button>
                  </div>
              </div>
            </div>
          </div>
        </Paper>
        </div>
        
        <div className={s.item}>
        <Paper className={s.paper} elevation={2}>
          <div className={s.left}>
            <img
              className={s.productImage}
              src="/images/kopsida4.png"
              alt="artwork"
              title="Article" />
            <div>
              <div className={s.premiumText}>
                <Typography variant="h2" component="h2" style={{fontWeight: 500}}>{t('article')}</Typography>
                <Typography variant="h3" component="h2">{t('priceArticle')}</Typography>
                <div>
                  <ArticleDialog
                    open={openArticleDialog}
                    onClose={toggleArticleDialog}
                  />
                </div>
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('articleIncludes')}</Typography>
                <ul>
                  <li><Typography variant="subtitle1" component="p">{t('writtenArticle')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('seo')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('ownership')}</Typography></li>
                </ul>
                <div className={s.buttonFlex}>
                  <Button className={s.button} variant="contained" color="secondary" rounded
                    onClick={() => { handleClickArticleDialog(); }}>
                    {t('buy')}
                  </Button>
                  </div>
              </div>
            </div>
          </div>
        </Paper>
        </div>
        
        <div className={s.item}>
        <Paper className={s.paper} elevation={2}>
          <div className={s.left}>
            <img
              className={s.productImage}
              src="/images/kopsida1.png"
              alt="artwork"
              title="Monthly Artist" />
            <div>
              <div className={s.premiumText}>
                <Typography variant="h2" component="h2" style={{fontWeight: 500}}>{t('monthlyArtist')}</Typography>
                <Typography variant="h3" component="h2">{t('priceMonthlyArtist')}</Typography>
                <div>
                  <MonthlyArtistDialog
                    open={openMonthlyArtistDialog}
                    onClose={toggleMonthlyArtistDialog}
                  />
                </div>
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('monthlyArtistIncludes')}</Typography>
                <ul>
                  <li><Typography variant="subtitle1" component="p">{t('visibility')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('tab')}</Typography></li>
                  <li><Typography variant="subtitle1" component="p">{t('inquiries')}</Typography></li>
                </ul>
                <div className={s.buttonFlex}>
                  <Button className={s.button} variant="contained" color="secondary" rounded
                    onClick={() => { handleClickMonthlyArtistDialog(); }}>
                    {t('buy')}
                  </Button>
                  </div>
              </div>
            </div>
          </div>
        </Paper>
        </div>
        
        <div className={s.item}>
        <Paper className={s.paper} elevation={2}>
          <div className={s.left}>
            <img
              className={s.productImage}
              src="/images/art_free_trial.jpeg"
              alt="artwork"
              title="Category Page" />
            <div>
              <div className={s.premiumText}>
                <Typography variant="h2" component="h2" style={{fontWeight: 500}}>{t('categoryPage')}</Typography>
                <Typography variant="h3" component="h2">{t('priceCategoryPage')}</Typography>
                <div>
                  <CategoryPageDialog
                    open={openCategoryPageDialog}
                    onClose={toggleCategoryPageDialog}
                  />
                </div>
                <Typography variant="h6" component="h2" className={s.textIncluded}>{t('categoryPageIncludes')}</Typography>
                <ul>
                  <li><Typography variant="subtitle1" component="p">{t('exclusiveCategoryPage')}</Typography></li>
                </ul>
                <div className={s.buttonFlex}>
                  <Button className={s.button} variant="contained" color="secondary" rounded
                    onClick={() => { handleClickCategoryPageDialog(); }}>
                    {t('buy')}
                  </Button>
                  </div>
              </div>
            </div>
          </div>
        </Paper>
        </div>

        </div>
      
        </div>
  );
}
