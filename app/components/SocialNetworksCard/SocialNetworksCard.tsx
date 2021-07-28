import React from 'react'
import { Card, CardContent, CardHeader, Link } from '@material-ui/core'
import Box from '@material-ui/core/Box'

import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import LanguageIcon from '@material-ui/icons/Language';
import Icon from '@material-ui/core/Icon';

import { useTranslation } from 'react-i18next';
import { styles } from './socialNetwork.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SocialNetworksCard({ data }) {
  const s = styles();
  const { t } = useTranslation('profile');

  const websiteName = data.Website?.replace(/(^\w+:|^)\/\//, '')?.replace(/^www\./, '');

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('socialNetworks')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent classes={{ root: s.cardContent }}>
        {data.Instagram && <Box>
          <a href={'//' + data.Instagram} className={s.row}>
            <div className={s.icon}><InstagramIcon color="primary"></InstagramIcon></div>
            Instagram
          </a>
        </Box>}
        {data.Facebook && <Box>
          <a href={'//' + data.Facebook} className={s.row}>
            <div className={s.icon}><FacebookIcon color="primary"></FacebookIcon></div>
            Facebook
          </a>
        </Box>}
        {data.LinkedIn && <Box>
          <a href={'//' + data.LinkedIn} className={s.row}>
            <div className={s.icon}><LinkedInIcon color="primary"></LinkedInIcon></div>
            LinkedIn
          </a>
        </Box>}
        {data.Dribble && <Box>
          <a href={'//' + data.Dribble} className={s.row}>
            <div className={s.icon}>
              <Icon color="primary" className="fab fa-dribbble">
                {/* <FontAwesomeIcon icon={["fab", "dribbble"]}/> */}
              </Icon>
            </div>
            Dribbble
          </a>
        </Box>}
        {data.Behance && <Box>
          <a href={'//' + data.Behance} className={s.row}>
            <div className={s.icon}>
              <Icon color="primary" className="fab fa-behance-square">
                {/* <FontAwesomeIcon icon={["fab", "behance-square"]}/> */}
              </Icon>
            </div>
            Behance
          </a>
        </Box>}
        {data.Website && <Box>
          <a href={'//' + data.Website} className={s.row}>
            <div className={s.icon}>
              <LanguageIcon color="primary"></LanguageIcon>
              </div>
            <span className={s.sitename}>{websiteName}</span>
          </a>
        </Box>}
      </CardContent>
    </Card>
  );
}