import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import { styles } from "./profile.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RoomIcon from "@material-ui/icons/Room";
import { Typography, Box, Button } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { capitalizeFirst, isNullOrUndefined } from "../../utils/util";
import { useRef, useState } from "react";
import UserListDialog from "../UserListDialog/UserListDialog";
import { useGetFollowers } from "../../hooks/dataFetching/useGetFollowers";
import { useGetFollowing } from "../../hooks/dataFetching/useGetFollowing";
import MessageAndFollowButton from "./MessageAndFollowButton";

export default function Profile({
  userProfile,
  userProfileSummary,
  userProfilePicture,
  onUpdateProfilePicture = null,
  hideAddBtn = false,
  divider = false,
  isMyProfile = false,
  linkToProfile = true,
}) {
  const s = styles();
  const { t } = useTranslation("common");
  const data = userProfileSummary?.data;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const fileInput = useRef(null);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const followersData = useGetFollowers(data?.Username, followersOpen);
  const followingData = useGetFollowing(data?.Username, followingOpen);

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

  return (
    <Box textAlign="center">
      <input
        ref={fileInput}
        onChange={handleFileUpload}
        type="file"
        style={{ display: "none" }}
        multiple={false}
      />
      <div className={s.nameAndFollowContainer}>
        <Typography className={s.fullName}>
          {linkToProfile ? (
            <Link href={`/profile/@${data?.Username}`}>
              <a>
                {data?.Name.toUpperCase()}{" "}
                {data?.Surname.toUpperCase() && data?.Surname.toUpperCase()}
              </a>
            </Link>
          ) : (
            <span>
              {data?.Name.toUpperCase()}{" "}
              {data?.Surname && data?.Surname.toUpperCase()}
            </span>
          )}
        </Typography>
        {/* {data?.Location &&
        <div className={s.location}>
          <RoomIcon color="secondary"></RoomIcon>
          <Typography>
            {data?.Location}
          </Typography>
        </div>
      } */}
        <div className={s.btnWrapper}>
          <div
            className={s.followerButton}
            onClick={() => setFollowersOpen(true)}
          >
            <Typography className={s.fontSize}>{data?.Followees}</Typography>
            <Typography className={s.fontSize}>
              {capitalizeFirst(t("words.followers"))}
            </Typography>
          </div>
          <UserListDialog
            title={capitalizeFirst(t("words.followers"))}
            users={followersData}
            open={followersOpen}
            onClose={() => setFollowersOpen(false)}
          />
          <div
            className={s.followeeButton}
            onClick={() => setFollowingOpen(true)}
          >
            <Typography className={s.fontSize}>{data?.Followers}</Typography>
            <Typography className={s.fontSize}>
              {capitalizeFirst(t("words.following"))}
            </Typography>
          </div>
          <UserListDialog
            title={capitalizeFirst(t("words.following"))}
            users={followingData}
            open={followingOpen}
            onClose={() => setFollowingOpen(false)}
          />
          {data?.Artworks > 0 && (
            <div className={s.artwork}>
              <Typography className={s.fontSize}>{data?.Artworks}</Typography>
              <Typography className={s.fontSize}>
                {capitalizeFirst(t("words.worksOfArt"))}
              </Typography>
            </div>
          )}
        </div>
        {!isMyProfile && (
          <MessageAndFollowButton
            userProfile={userProfile}
            userProfileSummary={userProfileSummary}
          />
        )}
      </div>
    </Box>
  );
}
