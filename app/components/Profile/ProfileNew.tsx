import {
  useContext,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  Fragment,
} from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import axios from "axios";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import {
  useTheme,
  Theme,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import Modal from "@mui/material/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import UploadIcon from "@material-ui/icons/Publish";
import EditIcon from "@material-ui/icons/Edit";
import { RWebShare } from "react-web-share";
import { capitalizeFirst, isNullOrUndefined } from "../../utils/util";
import { createExcerpt } from "../../utils/textUtils";
import UserListDialog from "../UserListDialog/UserListDialog";
import { UserContext } from "../../contexts/user-context";
import { TokenContext } from "../../contexts/token-context";
import { useGetFollowers } from "../../hooks/dataFetching/useGetFollowers";
import { useGetFollowing } from "../../hooks/dataFetching/useGetFollowing";
import { useGetConnectionsCount } from "../../hooks/dataFetching/userGetConnectionsCount";
import { useGetProfileUser } from "../../hooks/dataFetching/useGetProfileUser";
import {
  useGetUserProfile,
  useGetUserProfileSummary,
} from "../../hooks/dataFetching/UserProfile";
import usePostFollow from "../../hooks/dataFetching/usePostFollow";
import { useRedirectToLoginIfNotLoggedIn } from "../../hooks/useRedirectToLoginIfNotLoggedIn";
import useRefreshToken from "../../hooks/useRefreshToken";
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
import Preferences from "./Preferences";
import { styles } from "./profilenew.css";
import router, { useRouter } from "next/router";
import MessageRequestDialog from "../MessageRequestDialog/MessageRequestDialog";
import { UrlObject } from "url";
import Image from "next/image";
export default function ProfileNew({
  userProfileUrl,
  userProfile,
  isFollowed,
  userProfilePicture,
  onUpdateProfilePicture = null,
  hideAddBtn = false,
  divider = false,
  isMyProfile = false,
  isPremium = false,
  linkToProfile = true,
  staticUserProfile,
  chosenColor,
  chosenFont,
  useLightText,
}) {
  const s = styles();
  const { t } = useTranslation(["common", "profile", "upload", "header"]);
  const data = userProfile?.data;
  const { refreshToken } = useRefreshToken();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const theme: Theme = useTheme();

  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const followersData = useGetFollowers(data?.Username, followersOpen);
  const followingData = useGetFollowing(data?.Username, followingOpen);
  const connectionscountData = useGetConnectionsCount(data?.Username);
  const [advert, setAdvert] = useState(false);
  const handleClick = () => {
    setAdvert(true);
    // router.push("https://payment.artportable.com/b/aEU6oRd0Gfsh5OM6rD");
  };

  const handleClose = () => {
    setAdvert(!advert);
  };

  const { isSignedIn, email, username, socialId, membership, phone } =
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
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  useEffect(() => {
    if (refreshTrigger) {
      window.location.reload();
    }
  }, [refreshTrigger]);

  const [messageRequestDialogOpen, setMessageRequestDialogOpen] =
    useState(false);

  function toggleMessageRequestDialog() {
    setMessageRequestDialogOpen(!messageRequestDialogOpen);
  }

  function messageRequest(originalRedirect?: UrlObject | string) {
    toggleMessageRequestDialog();
  }

  const [editHeadlineOpen, setEditHeadlineOpen] = useState(false);
  const [headline, setHeadline] = useState("");
  const toggleEditHeadline = () => setEditHeadlineOpen(!editHeadlineOpen);
  useEffect(() => {
    setHeadline(getUserProfile.data?.Headline || "");
  }, [getUserProfile?.data?.Headline]);
  // If user has no headline but has About text, show first part of About.
  const headlineBackup =
    createExcerpt(getUserProfile?.data?.About, 100) ||
    t("profile:clickToEditIntro");

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

  const handlePush = () => {
    router.push("https://payment.artportable.com/b/bIY8wZd0G5RH4KI6st");
  };

  const updateUser = async (values) => {
    try {
      await refreshToken().then(() =>
        fetch(`${apiBaseUrl}/api/profile/${username.value}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        })
      );
      toggleEditHeadline();
      // Update with mutate on getUserProfile which is also used in EditProfileDialog, so they are synced.
      getUserProfile.mutate();
    } catch (error) {}
  };

  return (
    <div
      className={clsx(s.profile, {
        [s.lightText]: useLightText,
      })}
      style={{ backgroundColor: chosenColor }}
    >
      {isMyProfile && (
        <Preferences isPremium={isPremium} getUserProfile={getUserProfile} />
      )}
      <div className={s.profileContent}>
        <Spacer y={isMobile ? 24 : 80} />
        <Typography
          component="h1"
          className={s.fullName}
          style={{
            fontFamily: chosenFont + ", Gotham",
            marginBottom: -1, // Avoid line sometimes visible to item below.
          }}
        >
          {userProfile?.data?.Name ? userProfile?.data?.Name.toUpperCase() : ""}{" "}
          {userProfile?.data?.Surname
            ? userProfile?.data?.Surname.toUpperCase()
            : ""}
        </Typography>
        <Spacer y={20} />
        {isSignedIn.value && (
          <div className={s.counterBox}>
            <Button
              className={s.followersButton}
              onClick={() => setFollowersOpen(true)}
              style={{ paddingRight: 5 }}
            >
              <Typography
                variant="caption"
                className={clsx(s.followFollowersArtworks, {
                  [s.lightText]: useLightText,
                })}
              >
                {capitalizeFirst(t("words.followers"))}
              </Typography>
              <Typography
                variant="body2"
                className={clsx({ [s.lightText]: useLightText })}
              >
                {connectionscountData?.loading && (
                  <CircularProgress size={10} />
                )}
                {followers}
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
              style={{ paddingLeft: 5 }}
            >
              <Typography
                variant="caption"
                className={clsx(s.followFollowersArtworks, {
                  [s.lightText]: useLightText,
                })}
              >
                {capitalizeFirst(t("words.following"))}
              </Typography>
              <Typography
                variant="body2"
                className={clsx({ [s.lightText]: useLightText })}
              >
                {connectionscountData.loading && <CircularProgress size={10} />}
                {following}
              </Typography>
            </Button>

            <UserListDialog
              title={capitalizeFirst(t("words.following"))}
              users={followingData}
              open={followingOpen}
              onClose={() => setFollowingOpen(false)}
            />
          </div>
        )}

        <Spacer y={20} />

        {!isMyProfile && headline && (
          <>
            <Typography>
              <span
                style={{
                  display: "inline-block",
                  maxWidth: isMobile ? 261 : 371,
                  wordBreak: "break-word",
                }}
              >
                {headline}
              </span>
            </Typography>
            <Spacer y={24} />
          </>
        )}

        {isMyProfile && (
          <>
            <Typography
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  position: "relative",
                  maxWidth: isMobile ? 261 : 371,
                  cursor: "pointer",
                }}
                onClick={toggleEditHeadline}
              >
                {headline ? headline : headlineBackup}
                <EditIcon
                  style={{
                    position: "absolute",
                    top: -16,
                    right: -16,
                    width: ".8em",
                    height: "auto",
                  }}
                />
              </span>
            </Typography>

            <Dialog
              className={s.headlineModal}
              open={editHeadlineOpen}
              onClose={toggleEditHeadline}
              maxWidth="md"
              aria-labelledby="artwork-modal-title"
              aria-describedby="artwork-modal-description"
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <DialogTitle>{t("profile:editHeadline")}</DialogTitle>
                <DialogContent
                  style={{
                    textAlign: "right",
                  }}
                >
                  {`${headline.length < 100 ? headline.length : 100}/100`}
                </DialogContent>
              </div>
              <DialogContent>
                <TextField
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                  inputProps={{ maxLength: 100 }}
                  multiline={false} // Allow only one line, no line breaks.
                  style={{
                    width: 360,
                    maxWidth: "100%",
                  }}
                />
                <Spacer y={24} />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexFlow: "row nowrap",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="text"
                    onClick={() => {
                      setHeadline(userProfileSummary.data?.Headline || ""); // Reset headline
                      toggleEditHeadline();
                    }}
                  >
                    {capitalizeFirst(t("common:words.cancel"))}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => updateUser({ Headline: headline })}
                  >
                    {capitalizeFirst(t("common:words.save"))}
                  </Button>
                </div>
                <Spacer y={24} />
              </DialogContent>
            </Dialog>

            <Button onClick={handleClick} className={s.annonsera}>
              {t("common:words.christmas")} <br />
              {t("common:words.husohem")}
            </Button>
            <Dialog
              className={s.advertModal}
              fullWidth={true}
              maxWidth={isMobile ? "xs" : "md"}
              aria-labelledby="artwork-modal-title"
              aria-describedby="artwork-modal-description"
              open={advert}
              PaperProps={{
                style: {
                  height: isMobile ? "65vh" : "90vh",
                  width: isMobile ? "90vw" : "90vw",
                  margin: isMobile ? "5vw auto" : "0 auto",
                },
              }}
            >
              <div style={{ marginBottom: "50px" }}></div>
              {isMobile ? (
                <Image
                  src="/images/husohemMobile.png"
                  alt="artworkimage"
                  width={500}
                  height={600}
                  quality={100}
                  unoptimized
                  className={s.mobileImage}
                />
              ) : (
                <Image
                  src={"/images/husohemsv.png"}
                  alt="artworkimage"
                  width={300}
                  height={400}
                  quality={100}
                  objectFit="contain"
                  unoptimized
                  style={{ maxWidth: "80%", height: "auto", margin: "0 auto" }}
                />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                  justifyContent: "space-between",
                }}
              >
                <Button className={s.closeButton} onClick={handleClose}>
                  {t("common:words.close")}
                </Button>
                <Button className={s.buyButton} onClick={handlePush}>
                  {t("common:words.getStarted")}
                </Button>
              </div>

              <DialogContent
                style={{
                  textAlign: "right",
                }}
              ></DialogContent>
            </Dialog>
            <Spacer y={isMobile ? 24 : 80} />
          </>
        )}

        {isMyProfile && membership.value > Membership.Base && isMobile && (
          <>
            <div className={s.headerActions}>
              <Link href="/upload">
                <a>
                  <Button
                    className={s.actionButton}
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
            </div>
            <Spacer y={24} />
          </>
        )}

        {!isMyProfile && (
          <>
            <div className={s.headerActions}>
              <Button
                className={clsx(s.actionButton, {
                  [s.following]: isUserFollowed,
                  "light-text": useLightText,
                })}
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
              <Button
                className={clsx(s.messageButton)}
                rounded
                onClick={() => {
                  messageRequest({
                    query: {
                      referTo: userProfile?.data?.Username,
                    },
                  });
                }}
              >
                {capitalizeFirst(t("common:contact"))}
              </Button>
              <MessageRequestDialog
                open={messageRequestDialogOpen}
                onClose={toggleMessageRequestDialog}
                props={{
                  referTo: userProfile?.data?.Username,
                  userProfile,
                }}
              />
            </div>
            <Spacer y={24} />
          </>
        )}
      </div>
    </div>
  );
}
