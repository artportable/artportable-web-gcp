import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import { styles } from "./profileAvatar.css";

const ProfileAvatar = ({ size, profilePicture }) => {
  const s = styles();
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const style = { width: size, height: size };

  // Adjust icon size to be about 0.209 larger than avatar size for them to take up the same space
  const iconAdjustment = size * 0.209;

  return (
    <>
      {profilePicture ? (
        <Avatar
          src={`${bucketUrl}${profilePicture}`}
          alt="Profile picture"
          style={style}
        />
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <div style={style} className={s.iconBackground}></div>
            <div style={style}>
              <AccountCircleIcon
                style={{
                  position: "relative",
                  bottom: `${iconAdjustment / 2}px`,
                  right: `${iconAdjustment / 2}px`,
                  fontSize: size + iconAdjustment,
                }}
                color="primary"
              ></AccountCircleIcon>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileAvatar;
