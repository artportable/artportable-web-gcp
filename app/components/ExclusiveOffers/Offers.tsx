import React from 'react'
import { Card, CardContent, CardHeader, Link } from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School'
import clsx from 'clsx'

import { useTranslation } from 'next-i18next'
import { styles } from './offers.css'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import minRam  from "../../../public/offers/minramwhite.png";
import Image from 'next/image'

export default function Offers() {
  const s = styles()
  const { t } = useTranslation('profile')

  return (
        <div>
          <div className={s.title}>
         {t("offerTitle")} 
          </div>
          <div className={s.frame}>
            <div style={{width: "190px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link href='https://www.minram.se'>
            <Image  src={minRam} alt="logo"/>
            </Link>
            </div>
       
          <div style={{marginTop: "20px", fontSize: "16px"}}>
              {t("offerText")}<a href="https://www.minram.se" style={{color: "black", cursor: "pointer", fontWeight: "bold"}}>www.minram.se</a>. {" "} {t("useOffer")} <p style={{color: "black", fontWeight: "bold"}}>MINRAMART</p> {t("onCheckout")}
        </div>
        </div>
        </div>
        

  )
}
