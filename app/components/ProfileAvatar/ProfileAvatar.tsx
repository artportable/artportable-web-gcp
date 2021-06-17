import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'

const ProfileAvatar = ({ size, profilePicture }) => {
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;

  return (
    <>
      {profilePicture ? (
        <Avatar src={`${bucketUrl}${profilePicture}`}
          alt="Profile picture"
          style={{ width: size, height: size}}
        />
      ) : (
        <AccountCircleIcon style={{ fontSize: size }} color="secondary"></AccountCircleIcon>
      )}
    </>
  );
}

export default ProfileAvatar;