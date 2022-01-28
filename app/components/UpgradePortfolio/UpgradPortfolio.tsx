import { useEffect, useState } from "react";
import Button from '../Button/Button'
import { Dialog, DialogActions, DialogContent, IconButton, Typography, Box } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'next-i18next'
import { styles } from './upgradPortfolio.css'
import PlanSelector, { PriceData } from "../PlanSelector/PlanSelector"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ActionType, CategoryType, trackGoogleAnalytics } from "../../utils/googleAnalytics";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function DialogConstruction() {
  const s = styles();
  const { t } = useTranslation(['header', 'common']);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 
  const [priceData, setPriceData] = useState<PriceData[]>(null)

  useEffect(() => {
    async function getPriceData() {
      try {
          var response = await fetch(`${apiBaseUrl}/api/payments/prices`)
          if (response.ok)
          (setPriceData(await response.json()))
          
      } catch(e) {
        console.log('Could not fetch price info', e);
      }
    }
    getPriceData()
  }, [])

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <div>
      <div className={s.upgradeDesktopDiv}>
      <Button className={s.upgradeButton} rounded size="small" variant="outlined" color="black" onClick={() => { handleClickOpen(); trackGoogleAnalytics(ActionType.UPGRADE, CategoryType.BUY) }}>
      {t('header:upgradeButton')}
      </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}>
        <IconButton aria-label="close" className={s.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography className={s.spacing} aria-label="close" variant="h2" align="center">
          <Box fontFamily="LyonDisplay" fontWeight="fontWeightMedium">
          {t('header:upgradeHeading')}
          </Box>
        </Typography>
        <DialogContent className={s.spacingBottom}>
        <PlanSelector showAll={false} priceData={priceData}></PlanSelector>
        </DialogContent>
      </Dialog>
    </div>
  );
}
