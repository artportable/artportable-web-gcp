import React from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School'
import clsx from 'clsx'

import { useTranslation } from 'next-i18next'
import { styles } from './offers.css'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import minRam  from "../../../public/offers/minram-logo.png";
import Image from 'next/image'

export default function Offers() {
  const s = styles()
  const { t } = useTranslation('profile')

  return (
        <div>
          <div className={s.title}>
         Exklusivt erbjudande till dig som Artportable medlem! 
          </div>
          <div style={{ display: "flex", flexDirection: "column", border: "2px solid green", padding: "20px", marginBottom: "30px", borderRadius: "30px",  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease-in-out",}}>
          <Image  src={minRam} alt="logo" width={300} height={50} />
          <div style={{marginTop: "20px", fontSize: "20px"}}>
            
              Letar du efter den perfekta ramen för ditt konstverk? Som en uppskattning av vårt samarbete med Minram, är vi glada att kunna erbjuda alla våra betalande medlemmar en exklusiv rabatt på 25% på alla beställningar hos <a href="https://www.minram.se" style={{textDecoration: "underline", color: "green", cursor: "pointer"}}>MinRam</a>. Använd rabattkoden MINRAMART vid utcheckningen för att ta del av detta fantastiska erbjudande!
        </div>
        </div>
        </div>
        

  )
}
