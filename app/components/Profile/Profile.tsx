import Link from "next/link";
import Divider from "@material-ui/core/Divider";
import { styles } from "./profile.css";
import { Typography, Box } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { capitalizeFirst, isNullOrUndefined } from "../../utils/util";
import { useContext, useEffect, useRef, useState } from "react";
import UserListDialog from "../UserListDialog/UserListDialog";
import { useGetFollowers } from "../../hooks/dataFetching/useGetFollowers";
import { useGetFollowing } from "../../hooks/dataFetching/useGetFollowing";
import { useGetConnectionsCount } from "../../hooks/dataFetching/userGetConnectionsCount";
import CircularProgress from "@mui/material/CircularProgress";
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
import axios from "axios";
import Modal from "@mui/material/Modal";
import { Membership } from "../../models/Membership";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, Theme } from "@material-ui/core";
import EditProfileDialog from "../EditProfileDialog/EditProfileDialog";
import UploadIcon from "@material-ui/icons/Publish";
import { RWebShare } from "react-web-share";
import Offers from "../ExclusiveOffers/Offers";
import { CSSProperties } from "react";

export default function Profile({
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
}) {
  const s = styles();
  const { t } = useTranslation(["common", "profile", "upload", "header"]);
  const data = userProfile?.data;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const theme: Theme = useTheme();
  const downtheme = useTheme();

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
  const [isUserFollowed, setUserFollow] = useState(
    getUserProfile?.data?.FollowedByMe
  );
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
      userProfileSummary.data?.SocialId,
      !isUserFollowed,
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
    setUserFollow(isUserFollowed);
  }, [isUserFollowed]);

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
      <>
        {str}
        {index === array.length - 1 ? null : <br />}
      </>
    ));
  }

  return (
    <Box>
      {divider && <Divider></Divider>}
      <div className={s.fullNameCounter}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" className={s.fullName}>
            {userProfile?.data?.Name.toUpperCase()}{" "}
            {userProfile?.data?.Surname &&
              userProfile?.data?.Surname.toUpperCase()}{" "}
          </Typography>
        </div>

        <Box className={s.counterBox}>
          <Button
            className={s.followersButton}
            onClick={() => setFollowersOpen(true)}
          >
            <Typography variant="body2">
              {connectionscountData?.loading && <CircularProgress size={10} />}
              {followers}
            </Typography>
            <Typography variant="caption" className={s.followFollowersArtworks}>
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
            <Typography variant="body2">
              {connectionscountData.loading && <CircularProgress size={10} />}
              {following}
            </Typography>
            <Typography variant="caption" className={s.followFollowersArtworks}>
              {capitalizeFirst(t("words.following"))}
            </Typography>
          </Button>
          <UserListDialog
            title={capitalizeFirst(t("words.following"))}
            users={followingData}
            open={followingOpen}
            onClose={() => setFollowingOpen(false)}
          />
          {data?.Artworks > 0 && (
            <Box className={s.followFollowersArtworks}>
              <Typography variant="body2">{data?.Artworks}</Typography>
              <Typography variant="caption">
                {capitalizeFirst(t("words.worksOfArt"))}
              </Typography>
            </Box>
          )}
        </Box>
        {!isMyProfile && (
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
              <Box className={s.modal}>
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
              </Box>
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
                          startIcon={<UploadIcon />}
                          rounded
                        >
                          {t("upload:upload")}
                        </Button>
                      </a>
                    </Link>
                  )}
                </div>
              )}
              {/* {membership.value < Membership.Portfolio && (
                      <UpgradePortfolio />
                    )} */}
              <EditProfileDialog userProfile={getUserProfile?.data} />
            </div>
          </>
        )}
      </div>
      {!isMyProfile && (
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
      )}
      {isMyProfile && (
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
      )}

      {isMyProfile && (
        <div>
          <div className={s.hovs}>
            <Button rounded className={s.offersButton} onClick={handleOpen}>
              <div>
                <Typography
                  style={{ fontSize: "11px" }}
                  className={s.headerButtonOffers}
                >
                  {t("profile:exclusiveOffers").toLocaleUpperCase()}
                </Typography>
              </div>
            </Button>
            <Button
              rounded
              className={s.monthlyArtistButton}
              onClick={redirectToRocketUpgrade}
              style={{ marginBottom: "20px" }}
            >
              <Typography className={s.headerButtonRocket}>
                {t("profile:rocket")}
              </Typography>
              <img
                src="/rocket-white.png"
                alt="Rocket Icon"
                className={s.rocketIcon}
              />
            </Button>
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              className={s.modalContainer}
            >
              <Box className={s.modalOffers}>
                <Button
                  onClick={handleClose}
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: "20px",
                    color: "#f7f7f7",
                    marginTop: "20px",
                    marginBottom: "20px",
                    display: "flex",
                  }}
                >
                  {t("profile:closeButton")}
                </Button>
                <Offers></Offers>
              </Box>
            </Modal>
          </div>
        </div>
      )}
    </Box>
  );
}
