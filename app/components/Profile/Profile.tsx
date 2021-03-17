import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import { styles } from './profile.css'
import Button from '../Button/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RoomIcon from '@material-ui/icons/Room';
import { Typography, Box, createMuiTheme } from '@material-ui/core';
import { useTranslation } from 'next-i18next'

export default function Profile({ userId, user }) {
  const s = styles();
  const { t } = useTranslation('common');

  return (
    <Box textAlign="center">
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
          <AddCircleIcon 
            className={s.badgeIcon} 
            color="primary" 
            onClick={() => alert('upload picture')} />
        }
        
      >
        <Avatar className={s.avatar}>
          <AccountCircleIcon color="secondary" style={{fontSize: 160}}></AccountCircleIcon>
        </Avatar>
      </Badge>

      <Box fontWeight="fontWeightBold" marginTop={1}>
        <Typography variant="subtitle1">
            {user.username}
        </Typography>
      </Box>

      <Box marginTop={2}>
        <Typography>
          {user.shortDescription}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={1}>
        <RoomIcon color="secondary"></RoomIcon>
        <Typography>
          {user.location}
        </Typography>
      </Box>
        
        {/* <Button 
          className={s.editProfileButton}
          color="secondary" 
          variant="contained" 
          roundedButton 
          disableElevation>Redigera din profil
        </Button> */}

      <Box className={s.counterBox} borderTop='solid 1px #4e4e4e3b' marginTop={2}>
        <Box>
          <Typography variant="body2" display="block">
            {user.followers}
          </Typography>
          <Typography variant="caption" display="block">
            {t('words.followers')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" display="block">
            {user.follows}
          </Typography>
          <Typography variant="caption" display="block">
            {t('words.follows')}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" display="block">
            {user.worksOfArt}
          </Typography>
          <Typography variant="caption" display="block">
            {t('words.worksOfArt')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}