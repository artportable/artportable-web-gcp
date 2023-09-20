import React from 'react'
import { Box, Card, CardContent, CardHeader, Chip } from '@material-ui/core'

import { useTranslation } from 'next-i18next'
import { styles } from './tagsCard.css'
import TagChip from '../TagChip/TagChip'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function TagsCard({ tags }) {
  const s = styles()
  const { t } = useTranslation('profile')

  return (
    <Card elevation={0}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <CardHeader
            title={t('techniqueTools')}
            titleTypographyProps={{ variant: 'subtitle1' }}
          ></CardHeader>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            <Box className={s.tagsContainer}>
              {Array.from(tags)
                .map((tag: any) => tag.Tag)
                .map((tag: string) => {
                  return (
                    <TagChip
                    style={{fontSize:'0.9em'}}
                      isSmall={true}
                      key={tag}
                      title={tag}
                      onChipClick={null}
                      limitReached={true}
                    ></TagChip>
                  )
                })}
            </Box>
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}
