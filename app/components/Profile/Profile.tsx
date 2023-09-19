import Link from 'next/link'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import { styles } from './profile.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RoomIcon from '@material-ui/icons/Room';
import { Typography, Box, Button } from '@material-ui/core';
import { useTranslation } from 'next-i18next'
import { capitalizeFirst, isNullOrUndefined } from '../../utils/util';
import { useRef, useState } from 'react'
import UserListDialog from '../UserListDialog/UserListDialog'
import { useGetFollowers } from '../../hooks/dataFetching/useGetFollowers'
import { useGetFollowing } from '../../hooks/dataFetching/useGetFollowing'

export default function Profile({ userProfile, userProfilePicture, onUpdateProfilePicture = null, hideAddBtn = false, divider = false, isMyProfile = false, linkToProfile = true }) {
  const s = styles();
  const { t } = useTranslation('common');
  const data = userProfile?.data;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const fileInput = useRef(null);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const followersData = useGetFollowers(data?.Username, followersOpen);
  const followingData = useGetFollowing(data?.Username, followingOpen);

  const handleFileUpload = event => {
    if (isNullOrUndefined(event?.target?.files[0])) {
      return;
    }

    var fr = new FileReader;
    fr.onload = function () {
      var img = new Image;
      img.onload = function () {
        onUpdateProfilePicture(event.target.files[0], img.width, img.height, 'profile')
      };

      img.src = fr.result.toString(); // is the data URL because called with readAsDataURL
    };
    fr.readAsDataURL(event.target.files[0]);
  };

  return (
    <Box textAlign="center">
      <input
        ref={fileInput}
        onChange={handleFileUpload}
        type="file"
        style={{ display: "none" }}
        multiple={false}
      />
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
          isMyProfile && !hideAddBtn &&
          <AddCircleIcon
            className={s.badgeIcon}
            color="primary"
            onClick={() => fileInput.current.click()} />
        }
      >
        {linkToProfile ?
          <Link href={`/profile/@${data?.Username}`}>
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
          :
          <Avatar className={s.avatar}>
            {userProfilePicture ? (
              <Avatar src={`${bucketUrl}${userProfilePicture}`}
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
        }
      </Badge>

      <Box fontWeight="fontWeightBold" marginTop={1}>
        <Typography variant="h5" className={s.fullName}>
          {linkToProfile ?
            <Link href={`/profile/@${data?.Username}`}>
              <a>
              {data?.Name} {' '}
              {data?.Surname && data?.Surname}
              </a>
            </Link>
            :
            <span>
              {data?.Name} {' '}
              {data?.Surname && data?.Surname}
            </span>
          }
        </Typography>
      </Box>

      <Box marginTop={1}>
        <Typography variant="h6" className={s.title}>
          {data?.Title}
        </Typography>
      </Box>

      <Box marginTop={1}>
        <Typography>
          {data?.Headline}
        </Typography>
      </Box>

      {data?.Location &&
        <Box display="flex" justifyContent="center" marginTop={1} marginBottom={2}>
          <RoomIcon color="secondary"></RoomIcon>
          <Typography>
            {data?.Location}
          </Typography>
        </Box>
      }
      {divider &&
        <Divider></Divider>
      }
      <Box className={s.counterBox}>
        <Button className={s.followersButton} onClick={() => setFollowersOpen(true)}>
          <Typography variant="body2" display="block">
            {data?.Followees}
          </Typography>
          <Typography variant="caption" display="block">
            {capitalizeFirst(t('words.followers'))}
          </Typography>
        </Button>
        <UserListDialog
          title={capitalizeFirst(t('words.followers'))}
          users={followersData}
          open={followersOpen}
          onClose={() => setFollowersOpen(false)}
        />
        <Button onClick={() => setFollowingOpen(true)} className={s.followeesButton}>
          <Typography variant="body2" display="block">
            {data?.Followers}
          </Typography>
          <Typography variant="caption" display="block">
            {capitalizeFirst(t('words.following'))}
          </Typography>
        </Button>
        <UserListDialog
          title={capitalizeFirst(t('words.following'))}
          users={followingData}
          open={followingOpen}
          onClose={() => setFollowingOpen(false)}
        />
        {data?.Artworks > 0 &&
          <Box>
            <Typography variant="body2" display="block">
              {data?.Artworks}
            </Typography>
            <Typography variant="caption" display="block">
              {capitalizeFirst(t('words.worksOfArt'))}
            </Typography>
          </Box>
        }
      </Box>
    </Box>
  );
}