import Link from 'next/link'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import { styles } from './profile.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RoomIcon from '@material-ui/icons/Room';
import { Typography, Box} from '@material-ui/core';
import { useTranslation } from 'next-i18next'
import { capitalizeFirst, isNullOrUndefined } from '../../utils/util';
import { useContext, useEffect, useRef, useState } from 'react'
import UserListDialog from '../UserListDialog/UserListDialog'
import { useGetFollowers } from '../../hooks/dataFetching/useGetFollowers'
import { useGetFollowing } from '../../hooks/dataFetching/useGetFollowing'
import { useGetConnectionsCount } from '../../hooks/dataFetching/userGetConnectionsCount'
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from '../../contexts/user-context'
import { TokenContext } from '../../contexts/token-context'
import { useGetProfileUser } from '../../hooks/dataFetching/useGetProfileUser'
import { useGetUserProfile, useGetUserProfileSummary } from '../../hooks/dataFetching/UserProfile'
import usePostFollow from '../../hooks/dataFetching/usePostFollow'
import { useRedirectToLoginIfNotLoggedIn } from '../../hooks/useRedirectToLoginIfNotLoggedIn'
import Button from "../../components/Button/Button";
import { ActionType,
  CategoryType,trackGoogleAnalytics } from '../../utils/googleAnalytics'
import axios from 'axios'

export default function Profile({ userProfile, isFollowed, userProfilePicture, onUpdateProfilePicture = null, hideAddBtn = false, divider = false, isMyProfile = false, linkToProfile = true }) {
  const s = styles();
  const { t } = useTranslation(["common", "profile", "upload", "header"]);
  const data = userProfile?.data;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const fileInput = useRef(null);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const followersData = useGetFollowers(data?.Username, followersOpen);
  const followingData = useGetFollowing(data?.Username, followingOpen);
  const connectionscountData = useGetConnectionsCount(data?.Username);

  const { isSignedIn, username, socialId, membership, phone } =
    useContext(UserContext);
  const token = useContext(TokenContext);
  const profileUser = useGetProfileUser();
  const getUserProfile = useGetUserProfile(profileUser, username?.value);
  const [isUserFollowed, setUserFollow] = useState(getUserProfile?.data?.FollowedByMe);
  const { follow } = usePostFollow();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const userProfileSummary = useGetUserProfileSummary(profileUser);

  const [followers, setFollowers] = useState(connectionscountData?.data?.followers);
  const [following, setFollowing] = useState(connectionscountData?.data?.following);

  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  async function getUserFullname() {
    const userData = await axios.get(`${url}/api/artists/${profileUser}`);
    setFirstName(userData?.data?.Name);
    setLastName(userData?.data?.Surname);
  }


  useEffect(() => {
    console.log(userProfile);

  },)

  useEffect(() => {
    getUserFullname();
  }, [firstName, lastName])

  function toggleFollow() {
    redirectIfNotLoggedIn();
    follow(
      userProfileSummary.data?.SocialId,
      !isUserFollowed,
      socialId.value,
      token
    );
    setUserFollow(!isUserFollowed);
    if (isUserFollowed) {
      setFollowers(prevFollowers => prevFollowers - 1);
    } else {
      setFollowers(prevFollowers => prevFollowers + 1);
    }
  }

  useEffect(() => {
      setUserFollow(isUserFollowed);
  }, [isUserFollowed]);


  useEffect(() => {
    setFollowers(connectionscountData?.data?.followers);
    setFollowing(connectionscountData?.data?.following);
  }, [connectionscountData?.data?.followers]);


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
    <Box >
      {/* <input
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
      </Badge>  */}

      {/* <Box fontWeight="fontWeightBold" marginTop={1}>
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
      </Box> */}

      {/* <Box marginTop={1}>
        <Typography variant="h6" className={s.title}>
          {data?.Title}
        </Typography>
      </Box>

      <Box marginTop={1}>
        <Typography>
          {data?.Headline}
        </Typography>
      </Box> */}

      {/* {data?.Location &&
        <Box display="flex" justifyContent="center" marginTop={1} marginBottom={2}>
          <RoomIcon color="secondary"></RoomIcon>
          <Typography>
            {data?.Location}
          </Typography>
        </Box>
      } */}
      {divider &&
        <Divider></Divider>
      }

      <div className={s.fullNameCounter}>
      <Typography variant="h5" className={s.fullName}>
        <Link href={`/profile/@${userProfile?.data?.Username.toUpperCase()}`}>
            <a>
                {userProfile?.data?.Name.toUpperCase()} {' '}
                {userProfile?.data?.Surname && userProfile?.data?.Surname.toUpperCase()}
            </a>
        </Link>
      </Typography>
      <Box className={s.counterBox}>
        <Button className={s.followersButton} onClick={() => setFollowersOpen(true)}>
          <Typography variant="body2" >
          {connectionscountData?.loading && <CircularProgress  size={10}/>}
          {followers}
          </Typography>
          <Typography variant="caption" className={s.followFollowersArtworks}>
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
          <Typography variant="body2">
          {connectionscountData.loading && <CircularProgress size={10} />}
          {following}
          </Typography>
          <Typography variant="caption" className={s.followFollowersArtworks}>
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
          <Box className={s.followFollowersArtworks}>
            <Typography variant="body2">
              {data?.Artworks}
            </Typography>
            <Typography variant="caption">
              {capitalizeFirst(t('words.worksOfArt'))}
            </Typography>
          </Box>
        }
      </Box>
       {!isMyProfile &&
        <div className={s.chatFollowWrapper}>
        {
          <Button
            onClick={() => {
              redirectIfNotLoggedIn({
                pathname: "/messages",
                query: {
                  referTo: userProfileSummary.data?.SocialId,
                },
              });
              trackGoogleAnalytics(
                ActionType.SEND_MESSAGE,
                CategoryType.INTERACTIVE
              );
            }}
            className={s.followButton}
            rounded
            disabled={!isSignedIn}
          >

             Chat
          </Button>
        }
        <Button
          className={`${s.followButton} ${isUserFollowed ? s.following : ""}`}
          rounded
          disabled={!isSignedIn}
          onClick={() => {
            toggleFollow();
            !isUserFollowed
              ? trackGoogleAnalytics(
                  ActionType.FOLLOW_PROFILE,
                  CategoryType.INTERACTIVE
                )
              : null;
          }}
        >
          {capitalizeFirst(
            !isUserFollowed
              ? t("common:words.follow")
              : t("common:words.following")
          )}
        </Button>
        </div>
       }
      </div>
    </Box>
  );
}
