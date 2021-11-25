import { Dialog, DialogContent, Typography, Box, IconButton} from '@material-ui/core'
import { useState, useEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { styles } from './upgrade.css'
import CloseIcon from '@material-ui/icons/Close'
import PlanSelector, { PriceData } from "../PlanSelector/PlanSelector"
import { useTranslation } from 'next-i18next'

interface Props {
  openUpgrade: any;
  handleCloseUpgrade(): any;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function DialogUpgrade(props:Props) {
  const s = styles();
  const { t } = useTranslation(['header', 'common', 'support']);

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

const [priceData, setPriceData] = useState<PriceData[]>(null)

const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

return (
  <div>
  <Dialog
    open={props.openUpgrade}
    onClose={props.handleCloseUpgrade}
    fullScreen={fullScreen}>
    <IconButton aria-label="close" className={s.closeButton} onClick={props.handleCloseUpgrade}>
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