import { useContext, useEffect, useState } from "react";
import Button from '../Button/Button'
import { Dialog, DialogActions, DialogContent, IconButton, Typography, Box } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from 'next-i18next'
import { styles } from './upgradPortfolioProfile.css'
import PlanSelector from "../PlanSelector/PlanSelector"
import { PriceData } from "../../../pages/plans";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ActionType, CategoryType, trackGoogleAnalytics } from "../../utils/googleAnalytics";
import { UserContext } from "../../contexts/user-context";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export default function DialogConstruction() {
  const s = styles();
  const { t } = useTranslation(['header', 'common', 'profile']);
  const [open, setOpen] = useState(false);
  const { email, family_name, given_name, phone, user_type } = useContext(UserContext);
  const [numberExists, setNumberExists] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 
  const [priceData, setPriceData] = useState<PriceData[]>(null)

  useEffect(() => {
    const abortCont = new AbortController();
    async function getPriceData() {
      try {
          var response = await fetch(`${apiBaseUrl}/api/payments/prices`, {signal: abortCont.signal })
          if (response.ok)
          (setPriceData(await response.json()))
      } catch(e) {
        if (e.name == 'AbortError') {
          console.log('fetch aborted')
        }
        console.log('Could not fetch price info', e);
      }
    }
    getPriceData()
    return () => abortCont.abort();
  }, [])

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <div>
      <div className={s.upgradeDesktopDiv}>
      <Button className={s.upgradeButton} rounded size="small" variant="outlined" onClick={() => { handleClickOpen(); trackGoogleAnalytics(ActionType.UPGRADE_ACCOUNT_GOLD_BOTTOM, CategoryType.BUY) }}>
      {t('profile:upgradeButton')}
      </Button>
      </div>
      <div className={s.dialogHeight}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}>
        <IconButton aria-label="close" className={s.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography className={s.header} aria-label="close" variant="h2" align="center">
          <Box>
          {t('header:upgradeHeading')}
          </Box>
        </Typography>
        <DialogContent className={s.spacingBottom}>
        <PlanSelector showAll={false} priceData={priceData}></PlanSelector>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
