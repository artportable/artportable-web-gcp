import Typography from '@material-ui/core/Typography';
import Button from '../app/components/Button/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlansInfoList from '../app/components/PlansInfoList/PlansInfoList';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import s from '../styles/plans.module.css'
import { capitalizeFirst } from '../app/utils/util'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Plans() {
  const { t } = useTranslation('plans');

  return (
    <>
      <div className={s.plansRootContainer}>
        <div className={s.steps}></div>
        <div className={s.header}>
          <Typography variant="h1">
            {t('welcomeTo')}
          </Typography>
          
        </div>
        <div className={s.paymentOptions}></div>
        <div className={s.options}>
          <div>
            <Card className={s.optionBase}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {t('plans.base.name')}
                </Typography>
                
                <PlansInfoList texts={getBaseTexts(t)}></PlansInfoList>

                <div>
                  <Button 
                    size="small" 
                    variant="contained" 
                    color="primary"
                    disableElevation 
                    roundedButton>
                    {capitalizeFirst(t('choose'))} {t('plans.base.name')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className={s.optionStandard}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {t('plans.portfolio.name')}
              </Typography>

              <PlansInfoList everythingFromPrevious texts={getPortfolioTexts(t)}></PlansInfoList>

              <div>
                <Button 
                  size="small" 
                  variant="contained" 
                  color="primary"
                  disableElevation 
                  roundedButton>
                  {capitalizeFirst(t('choose'))} {t('plans.portfolio.name')}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className={s.optionPremium}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {t('plans.portfolioPremium.name')}
              </Typography>

              <PlansInfoList everythingFromPrevious texts={getPortfolioPremiumTexts(t)}></PlansInfoList>

              <div>
                <Button 
                  size="small" 
                  variant="contained" 
                  color="primary"
                  disableElevation 
                  roundedButton>
                  {capitalizeFirst(t('choose'))} {t('plans.portfolioPremium.name')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={s.navigation}>
          <Button 
            size="small" 
            variant="contained" 
            color="primary"
            disableElevation 
            roundedButton>
            {capitalizeFirst(t('back'))}
          </Button>
          <Button 
            size="small" 
            variant="contained" 
            color="primary"
            disableElevation 
            roundedButton>
            {capitalizeFirst(t('next'))}
          </Button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { 
    props: {
      ...await serverSideTranslations(locale, ['header', 'plans']),
    } 
  };
}

function getBaseTexts(translator) {
  return [
    translator('plans.base.listTexts.0'),
    translator('plans.base.listTexts.1'),
    translator('plans.base.listTexts.2'),
    translator('plans.base.listTexts.3')
  ]
}

function getPortfolioTexts(translator) {
  return [
    translator('plans.portfolio.listTexts.0'),
    translator('plans.portfolio.listTexts.1'),
    translator('plans.portfolio.listTexts.2'),
    translator('plans.portfolio.listTexts.3'),
    translator('plans.portfolio.listTexts.4'),
    translator('plans.portfolio.listTexts.5')
  ]
}

function getPortfolioPremiumTexts(translator) {
  return [
    translator('plans.portfolioPremium.listTexts.0'),
    translator('plans.portfolioPremium.listTexts.1'),
    translator('plans.portfolioPremium.listTexts.2'),
    translator('plans.portfolioPremium.listTexts.3'),
  ]
}