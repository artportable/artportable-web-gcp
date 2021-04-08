import Link from 'next/link'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import { styles } from './profile.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RoomIcon from '@material-ui/icons/Room';
import { Typography, Box } from '@material-ui/core';
import { useTranslation } from 'next-i18next'
import { capitalizeFirst } from '../../utils/util';

export default function Profile({ userProfile, divider = false }) {
  const s = styles();
  const { t } = useTranslation('common');
  const data = userProfile?.data;
  const bucketUrl = 'https://artportable-images.s3.eu-north-1.amazonaws.com/Images/'; // TODO: Fetch from config

  return (
    <Box textAlign="center">
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
          !data?.ProfilePicture &&
            <AddCircleIcon
              className={s.badgeIcon}
              color="primary"
              onClick={() => alert('upload picture')} />
        }
      >
        <Link href={`/@${data?.Username}`}>
          <a>
            <Avatar className={s.avatar}>
              {data?.ProfilePicture ? (
                <Avatar src={`${bucketUrl}${data?.ProfilePicture}`}
                  alt="Profile picture"
                  style={{ height: '120px', width: '120px' }}
                />
              ) : (
                <AccountCircleIcon
                  color="secondary"
                  className={s.noPictureIcon}
                />
              )}
            </Avatar>
          </a>
        </Link>
      </Badge>

      <Box fontWeight="fontWeightBold" marginTop={1}>
        <Typography variant="subtitle1">
          <Link href={`/@${data?.Username}`}>
            <a>
              {data?.Username}
            </a>
          </Link>
        </Typography>
        <Typography variant="caption" className="title">
          {data?.Title}
        </Typography>
      </Box>

      <Box marginTop={2}>
        <Typography>
          {data?.Headline}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={1} marginBottom={2}>
        <RoomIcon color="secondary"></RoomIcon>
        <Typography>
          {data?.Location}
        </Typography>
      </Box>
      { divider &&
        <Divider></Divider>
      }
      <Box className={s.counterBox}>
        <Box>
          <Typography variant="body2" display="block">
            {data?.Followees}
          </Typography>
          <Typography variant="caption" display="block">
            {capitalizeFirst(t('words.followers'))}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" display="block">
            {data?.Followers}
          </Typography>
          <Typography variant="caption" display="block">
            {capitalizeFirst(t('words.following'))}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" display="block">
            {data?.Artworks}
          </Typography>
          <Typography variant="caption" display="block">
            {capitalizeFirst(t('words.worksOfArt'))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}