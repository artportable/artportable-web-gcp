import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//import Profile from "../Profile/Profile";
import Link from "next/link";
import { Typography, Box, Button } from "@material-ui/core";
import { Membership } from "../../models/Membership";
import { useTranslation } from "next-i18next";
import { styles } from "./profileCard.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../contexts/user-context";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RoomIcon from "@material-ui/icons/Room";
import { capitalizeFirst, isNullOrUndefined } from "../../utils/util";
import UserListDialog from "../UserListDialog/UserListDialog";
import { useGetFollowers } from "../../hooks/dataFetching/useGetFollowers";
import { useGetFollowing } from "../../hooks/dataFetching/useGetFollowing";
import { useGetConnectionsCount } from "../../hooks/dataFetching/userGetConnectionsCount";
import { Router, useRouter } from "next/router";
export default function ProfileCard({
  userProfile,
  userProfilePicture,
  onUpdateProfilePicture = null,
  hideAddBtn = false,
  divider = false,
  isMyProfile = false,
  linkToProfile = true,
}) {
  const s = styles();
  const { t } = useTranslation(["common", "feed"]);
  const { username, socialId, membership, phone } = useContext(UserContext);
  const data = userProfile?.data;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const fileInput = useRef(null);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const followersData = useGetFollowers(data?.Username, followersOpen);
  const followingData = useGetFollowing(data?.Username, followingOpen);
  const connectionscountData = useGetConnectionsCount(data?.Username);
  const router = useRouter();
  const handleFileUpload = (event) => {
    if (isNullOrUndefined(event?.target?.files[0])) {
      return;
    }

    var fr = new FileReader();
    fr.onload = function () {
      var img = new Image();
      img.onload = function () {
        onUpdateProfilePicture(
          event.target.files[0],
          img.width,
          img.height,
          "profile"
        );
      };

      img.src = fr.result.toString(); // is the data URL because called with readAsDataURL
    };
    fr.readAsDataURL(event.target.files[0]);
  };

  const rocketLink = "https://buy.stripe.com/28oeVn5ye6VLcdacNE";
  const premiumLink = "https://buy.stripe.com/cN2aF74ua6VL7WU6ps";

  const redirectToRocketUpgrade = () => {
    window.open(rocketLink);
  };

  const redirectToPremiumUpgrade = () => {
    window.open(premiumLink);
  };

  return (
    <Card elevation={3} className={s.cardContainer}>
      <CardContent>
        <div className={s.cardData}>
          <Box textAlign="center">
            <input
              ref={fileInput}
              onChange={handleFileUpload}
              type="file"
              style={{ display: "none" }}
              multiple={false}
            />

            <div className={s.profileData}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  isMyProfile &&
                  !hideAddBtn && (
                    <AddCircleIcon
                      className={s.badgeIcon}
                      color="primary"
                      onClick={() => fileInput.current.click()}
                    />
                  )
                }
              >
                {linkToProfile ? (
                  <Link href={`/profile/@${data?.Username}`}>
                    <a>
                      <Avatar className={s.avatar}>
                        {data?.ProfilePicture ? (
                          <Avatar
                            src={`${bucketUrl}${data?.ProfilePicture}`}
                            alt="Profile picture"
                            style={{ height: "120px", width: "120px" }}
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
                ) : (
                  <Avatar className={s.avatar}>
                    {userProfilePicture ? (
                      <Avatar
                        src={`${bucketUrl}${userProfilePicture}`}
                        alt="Profile picture"
                        style={{ height: "120px", width: "120px" }}
                      />
                    ) : (
                      <AccountCircleIcon
                        color="secondary"
                        className={s.noPictureIcon}
                      />
                    )}
                  </Avatar>
                )}
              </Badge>

              <Box fontWeight="fontWeightBold" marginTop={1}>
                <Typography variant="h5" className={s.fullName}>
                  {linkToProfile ? (
                    <Link href={`/profile/@${data?.Username}`}>
                      <a>
                        {data?.Name} {data?.Surname && data?.Surname}
                      </a>
                    </Link>
                  ) : (
                    <span>
                      {data?.Name} {data?.Surname && data?.Surname}
                    </span>
                  )}
                </Typography>
              </Box>

              {data?.Location && (
                <Box
                  className={s.locationData}
                  display="flex"
                  justifyContent="center"
                  marginTop={1}
                  marginBottom={2}
                >
                  <RoomIcon
                    color="secondary"
                    className={s.locationIcon}
                  ></RoomIcon>
                  <Typography>{data?.Location}</Typography>
                </Box>
              )}
              <Divider></Divider>
              <Box className={s.counterBox}>
                <Button
                  className={s.followersButton}
                  onClick={() => setFollowersOpen(true)}
                >
                  <Typography variant="body2" display="block">
                    {connectionscountData?.data?.followers}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {capitalizeFirst(t("words.followers"))}
                  </Typography>
                </Button>
                <UserListDialog
                  title={capitalizeFirst(t("words.followers"))}
                  users={followersData}
                  open={followersOpen}
                  onClose={() => setFollowersOpen(false)}
                />
                <Button
                  onClick={() => setFollowingOpen(true)}
                  className={s.followersButton}
                >
                  <Typography variant="body2" display="block">
                    {connectionscountData?.data?.following}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {capitalizeFirst(t("words.following"))}
                  </Typography>
                </Button>
                <UserListDialog
                  title={capitalizeFirst(t("words.following"))}
                  users={followingData}
                  open={followingOpen}
                  onClose={() => setFollowingOpen(false)}
                />
              </Box>
            </div>
          </Box>
        </div>
        {/*<Profile userProfile={userProfile} userProfilePicture={userProfilePicture} hideAddBtn={true} divider></Profile>*/}
        <div className={s.uploadButtons}>
          {membership.value > Membership.Base && (
            <Link href="/upload">
              <a>
                <Button className={s.uploadArtButton}>
                  {t("feed:uploadNewWorkOfArt")}
                </Button>
              </a>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
