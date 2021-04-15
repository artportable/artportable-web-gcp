import { Card, CardContent, CardHeader } from '@material-ui/core'
import Box from '@material-ui/core/Box'

import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import HttpsIcon from '@material-ui/icons/Https'
import Icon from '@material-ui/core/Icon';

import { useTranslation } from 'react-i18next';

export default function SocialNetworksCard({ userProfile }) {
  const { t } = useTranslation('profile');

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('socialNetworks')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
        <Box>
          <InstagramIcon color="primary"></InstagramIcon>
        </Box>
        <Box>
          <FacebookIcon color="primary"></FacebookIcon>
        </Box>
        <Box>
          <LinkedInIcon color="primary"></LinkedInIcon>
        </Box>
        <Box>
          <Icon className="fab fa-dribbble" color="primary"></Icon>
        </Box>
        <Box>
          <Icon className="fab fa-dribbble" color="primary"></Icon>
        </Box>
        <Box>
          <HttpsIcon color="primary"></HttpsIcon>
        </Box>
      </CardContent>
    </Card>
  );
}