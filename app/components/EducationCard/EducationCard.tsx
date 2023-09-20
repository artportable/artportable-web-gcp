import React from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School'
import clsx from 'clsx'

import { useTranslation } from 'next-i18next'
import { styles } from './educationCard.css'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function EducationCard({ educations }) {
  const s = styles()
  const { t } = useTranslation('profile')

  return (
    <Card elevation={0}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <CardHeader
            title={t('education')}
            titleTypographyProps={{ variant: 'subtitle1' }}
          ></CardHeader>{' '}
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            {educations
              .sort((a, b) => (a.From < b.From ? 1 : -1))
              .map((e, i) => (
                <div className={s.container} key={i}>
                  <SchoolIcon color="primary" className={s.icon}></SchoolIcon>
                  <div className={s.textContainer}>
                    <div>{e.Name}</div>
                    <div
                      className={clsx(
                        s.yearsRow,
                        (e.From === 0 || e.To === 0) && s.displayNone
                      )}
                    >
                      <div className={s.years}>
                        {e.From
                          ? e.To
                            ? e.From + ' - ' + e.To
                            : e.From
                          : e.To
                          ? e.To
                          : ' '}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}
