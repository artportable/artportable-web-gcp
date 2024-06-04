import { useContext, useEffect, useRef, useState, CSSProperties, Fragment } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import axios from "axios";
import clsx from 'clsx';
import Divider from "@material-ui/core/Divider";
import { useTheme, Theme, Typography, Box } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import UploadIcon from "@material-ui/icons/Publish";
import { RWebShare } from "react-web-share";
import { capitalizeFirst, isNullOrUndefined } from "../../utils/util";
import UserListDialog from "../UserListDialog/UserListDialog";
import { useGetFollowers } from "../../hooks/dataFetching/useGetFollowers";
import { useGetFollowing } from "../../hooks/dataFetching/useGetFollowing";
import { useGetConnectionsCount } from "../../hooks/dataFetching/userGetConnectionsCount";
import { UserContext } from "../../contexts/user-context";
import { TokenContext } from "../../contexts/token-context";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";
import {
  useGetUserProfile,
  useGetUserProfileSummary,
} from "../../hooks/dataFetching/UserProfile";
import usePostFollow from "../../hooks/dataFetching/usePostFollow";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import Button from "../../components/Button/Button";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import { Membership } from "../../models/Membership";
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog";
import Offers from "../ExclusiveOffers/Offers";
import Spacer from "../LayoutComponents/Spacer";
import { styles } from "./profilenew.css";

export default function ProfileNew({
  userProfileUrl,
  userProfile,
  isFollowed,
  userProfilePicture,
  onUpdateProfilePicture = null,
  hideAddBtn = false,
  divider = false,
  isMyProfile = false,
  linkToProfile = true,
  staticUserProfile,
  chosenColor,
  chosenFont,
  useLightText,
}) {
  const s = styles();
  const { t } = useTranslation(["common", "profile", "upload", "header"]);
  const data = userProfile?.data;

  const theme: Theme = useTheme();

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
  const [isUserFollowed, setUserFollow] = useState(isFollowed);
  const { follow } = usePostFollow();
  const redirectIfNotLoggedIn = useRedirectToLoginIfNotLoggedIn();
  const userProfileSummary = useGetUserProfileSummary(profileUser);

  const [followers, setFollowers] = useState(
    connectionscountData?.data?.followers
  );
  const [following, setFollowing] = useState(
    connectionscountData?.data?.following
  );

  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function getUserFullname() {
    const userData = await axios.get(`${url}/api/artists/${profileUser}`);
    setFirstName(userData?.data?.Name);
    setLastName(userData?.data?.Surname);
  }

  useEffect(() => {
    getUserFullname();
  }, [firstName, lastName]);

  function toggleFollow() {
    redirectIfNotLoggedIn();
    follow(
      userProfileSummary?.data?.SocialId,
      !isFollowed,
      socialId.value,
      token
    );
    setUserFollow(!isUserFollowed);
    if (isUserFollowed) {
      setFollowers((prevFollowers) => prevFollowers - 1);
    } else {
      setFollowers((prevFollowers) => prevFollowers + 1);
    }
  }

  useEffect(() => {
    setUserFollow(isFollowed);
  }, [isFollowed]);

  useEffect(() => {}, [isUserFollowed]);

  useEffect(() => {
    setFollowers(connectionscountData?.data?.followers);
    setFollowing(connectionscountData?.data?.following);
  }, [connectionscountData?.data?.followers]);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const rocketLink = "https://buy.stripe.com/28oeVn5ye6VLcdacNE";

  const redirectToRocketUpgrade = () => {
    window.open(rocketLink);
  };
  const initialText = staticUserProfile?.About || "";
  const [showMore, setShowMore] = useState(false);

  const handleReadMoreClick = () => {
    setShowMore(!showMore);
  };

  const headlineStyle: CSSProperties = {
    textAlign: "left",
    fontWeight: 500,
    fontSize: "11px",
    letterSpacing: "1px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    WebkitLineClamp: showMore ? "unset" : 1,
  };

  function renderWithLineBreaks(text) {
    return text.split("\n").map((str, index, array) => (
      <Fragment key={index}>
        {str}
        {index === array.length - 1 ? null : <br />}
      </Fragment>
    ));
  }

  // Was here!
  return (
    <div
      className={clsx(s.profile, {
        [s.lightText]: useLightText,
      })}
      style={{ backgroundColor: chosenColor }}
    >
      <div className={s.profileContent}>
        <Spacer y={24} />
        <div className={s.fullNameCounter}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h5"
              className={s.fullName}
              style={{
                fontFamily: chosenFont,
                marginBottom: -1, // Avoid line sometimes visible to item below.
              }}>
              {userProfile?.data?.Name?.toUpperCase()}{" "}
              {userProfile?.data?.Surname &&
                userProfile?.data?.Surname.toUpperCase()}{" "}
            </Typography>
          </div>
        </div>
        <div className={s.counterBox}>
            <Button
              className={s.followersButton}
              onClick={() => setFollowersOpen(true)}
            >
              <Typography variant="body2" className={clsx({ [s.lightText]: useLightText })}>
                {connectionscountData?.loading && <CircularProgress size={10} />}
                {followers}
              </Typography>
              <Typography variant="caption" className={clsx(s.followFollowersArtworks, {
                    [s.lightText]: useLightText,
                  })}>
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
              className={s.followeesButton}
            >
              <Typography variant="body2" className={clsx({ [s.lightText]: useLightText })}>
                {connectionscountData.loading && <CircularProgress size={10} />}
                {following}
              </Typography>
              <Typography variant="caption" className={clsx(s.followFollowersArtworks, {
                [s.lightText]: useLightText,
              })}>
                {capitalizeFirst(t("words.following"))}
              </Typography>
            </Button>
            <UserListDialog
              title={capitalizeFirst(t("words.following"))}
              users={followingData}
              open={followingOpen}
              onClose={() => setFollowingOpen(false)}
            />
            {/* {data?.Artworks > 0 && (
              <div className={s.followFollowersArtworks}>
                <Typography variant="body2">{data?.Artworks}</Typography>
                <Typography variant="caption">
                  {capitalizeFirst(t("words.worksOfArt"))}
                </Typography>
              </div>
            )} */}
          </div>
      </div>
    </div>
  )
  return (
    <div
      className={clsx(s.profile, {
        [s.lightText]: useLightText,
      })}
      style={{ backgroundColor: chosenColor }}
      >
      {/* {divider && <Divider></Divider>} */}
      <div className={s.profileContent}>
        <div className={s.fullNameCounter}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h5"
              className={s.fullName}
              style={{
                fontFamily: chosenFont,
                marginBottom: -1, // Avoid line sometimes visible to item below.
              }}>
              {userProfile?.data?.Name?.toUpperCase()}{" "}
              {userProfile?.data?.Surname &&
                userProfile?.data?.Surname.toUpperCase()}{" "}
            </Typography>
          </div>

          <div className={s.counterBox}>
            <Button
              className={s.followersButton}
              onClick={() => setFollowersOpen(true)}
            >
              <Typography variant="body2" className={clsx({ [s.lightText]: useLightText })}>
                {connectionscountData?.loading && <CircularProgress size={10} />}
                {followers}
              </Typography>
              <Typography variant="caption" className={clsx(s.followFollowersArtworks, {
                    [s.lightText]: useLightText,
                  })}>
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
              className={s.followeesButton}
            >
              <Typography variant="body2" className={clsx({ [s.lightText]: useLightText })}>
                {connectionscountData.loading && <CircularProgress size={10} />}
                {following}
              </Typography>
              <Typography variant="caption" className={clsx(s.followFollowersArtworks, {
                [s.lightText]: useLightText,
              })}>
                {capitalizeFirst(t("words.following"))}
              </Typography>
            </Button>
            <UserListDialog
              title={capitalizeFirst(t("words.following"))}
              users={followingData}
              open={followingOpen}
              onClose={() => setFollowingOpen(false)}
            />
            {/* {data?.Artworks > 0 && (
              <div className={s.followFollowersArtworks}>
                <Typography variant="body2">{data?.Artworks}</Typography>
                <Typography variant="caption">
                  {capitalizeFirst(t("words.worksOfArt"))}
                </Typography>
              </div>
            )} */}
          </div>
          {!isMyProfile && (
            <div className={s.chatFollowWrapper}>
              {/* {
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
              } */}
              <Button
                className={`${s.followButton} ${
                  isUserFollowed ? s.following : ""
                }`}
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

              <Button rounded className={s.buyBottom} onClick={handleOpen}>
                {t("profile:buyingArt")}
              </Button>
              <Modal open={open} onClose={handleClose}>
                <div className={s.modal}>
                  <Typography
                    style={{
                      marginBottom: "10px",
                    }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {t("profile:buyingArtTitle")}
                  </Typography>
                  <Typography style={{ marginBottom: "10px" }}>
                    {t("profile:buyingArtBody")}
                  </Typography>
                  <Typography>{t("profile:buyingArtBodyTwo")}</Typography>
                </div>
              </Modal>
            </div>
          )}
        </div>
        <div className={s.editActions}>
          {isMyProfile && (
            <>
              <div className={s.editUploadButtons}>
                {membership.value > Membership.Base && (
                  <div>
                    {isMobile && (
                      <Link href="/upload">
                        <a>
                          <Button
                            className={s.uploadButton}
                            onClick={() =>
                              trackGoogleAnalytics(
                                ActionType.UPLOAD_IMAGE_PROFILE,
                                CategoryType.INTERACTIVE
                              )
                            }
                            rounded
                          >
                            {t("upload:upload")}
                          </Button>
                        </a>
                      </Link>
                    )}
                  </div>
                )}
                <EditProfileDialog userProfile={getUserProfile?.data} />
              </div>
            </>
          )}
        </div>
        {/* {!isMyProfile && ( */}
          <div className={s.readMore}>
            <div>
              <div style={headlineStyle}>{renderWithLineBreaks(initialText)}</div>
            </div>
            <div className={s.expandButton}>
              {initialText.length > 2 && (
                <div onClick={handleReadMoreClick}>
                  {showMore ? t("profile:readLess") : t("profile:readMore")}
                </div>
              )}
            </div>
          </div>
        {/* )} */}
        {/* {isMyProfile && (
          <div className={s.friends}>
            <RWebShare
              data={{
                text: t("common:description"),
                url: userProfileUrl,
                title: t("common:followersInvite"),
              }}
              onClick={() => trackGoogleAnalytics(ActionType.INVITE_PROFILE)}
            >
              <Button size="small" rounded variant="outlined">
                {t("followersInvite")}
              </Button>
            </RWebShare>
          </div>
        )} */}
      </div>
    </div>
  );
}
