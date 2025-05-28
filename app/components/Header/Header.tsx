import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
// import Badge from '@mui/material/Badge';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MuiButton from "@material-ui/core/Button";
import { LinearProgress, Popover, Typography } from "@material-ui/core";

import { useTranslation } from "next-i18next";
import clsx from "clsx";
import Button from "../Button/Button";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import I18nSelector from "../I18nSelector/I18nSelector";
import { styles } from "./header.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useGetActivityToken } from "../../hooks/useGetActivityClient";
import ProfileIconButton from "../ProfileIconButton/ProfileIconButton";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import router, { useRouter } from "next/router";
import { Membership } from "../../models/Membership";
import useSignupRedirectHref from "../../hooks/useSignupRedirectHref";
import "react-activity-feed/dist/index.css";
import NotificationIconButton from "../NotificationIconButton/NotificationIconButton";
import { LoadingContext } from "../../contexts/loading-context";
import { UserContext } from "../../contexts/user-context";
import { ChatClientContext } from "../../contexts/chat-context";
import { useGetUserProfilePicture } from "../../hooks/dataFetching/UserProfile";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Popper from "@mui/material/Popper";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import UpgradePortfolio from "../UpgradePortfolio/UpgradPortfolio";
import { RWebShare } from "react-web-share";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

import { FavoritesContext } from "../../contexts/FavoritesContext";
import FavoritesPopper from "./FavoritesPopper";
import Fade from "@mui/material/Fade";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchField from "../SearchField/SearchField";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Header({ navBarItems }) {
  const { t } = useTranslation(["header", "support"]);
  const s = styles();
  const sShared = sharedStyles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const { socialId, username, isSignedIn, membership } =
    useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const signUpRedirectHref = useSignupRedirectHref();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = (query) => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const [unreadChatMessages, setUnreadChatMessages] = useState(0);
  const logoHref = "/";
  const [openMenu, setOpenMenu] = useState(false);
  const [globalIsLoading, setglobalIsLoading] = useState(false);
  const {
    token: activityToken,
    isError,
    isLoading,
  } = useGetActivityToken(username.value, socialId.value, isSignedIn.value);

  const chatClient = useContext(ChatClientContext);
  const { loading: loadingFromContext } = useContext(LoadingContext);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [stripeId, setStripeId] = useState("");
  const [customerStatus, setCustomerStatus] = useState("");

  const { favoriteIds } = useContext(FavoritesContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "open" : undefined;

  useEffect(() => {
    if (loadingFromContext) {
      setglobalIsLoading(true);
    } else {
      setglobalIsLoading(false);
    }
  }, [loadingFromContext]);

  useEffect(() => {}, [customerStatus]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = await fetchCustomerId();
        setStripeId(customerId);

        const customerDataPromise = fetchCustomerData(customerId);

        const [customerData] = await Promise.all([customerDataPromise]);
        setCustomerStatus(customerData?.subscriptions.data[0]?.status);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };

    if (username?.value) fetchData();
  }, [username?.value]);

  const fetchCustomerId = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/User/${username?.value}/customerid`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.error("There was a problem fetching the customer ID:", error);
      throw error;
    }
  };

  const fetchCustomerData = async (customerId) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/Admin/UsersByStripeSubscription/${customerId}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("There was a problem fetching the customer data:", error);
      throw error;
    }
  };

  const fetchCustomerPortalSession = async (customerId) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/Payments/customers/${customerId}/portal-session`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return data.Url;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      throw error;
    }
  };

  //TODO: On logout or refresh perhaps, unsubscribe to events to avoid memory leak
  // https://getstream.io/chat/docs/react/event_listening/?language=javascript#stop-listening-for-events

  return (
    <>
      <AppBar
        elevation={0}
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #cecece6b",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div className={s.container}>
            <div className={s.wrapper}>
              <div className={s.logoButton}>
                {isMobile && isSignedIn.value ? (
                  <Link href={logoHref}>
                    <a>
                      <img
                        height={"auto"}
                        width={40}
                        className={s.logo}
                        src="/Artportable.Knapp.svg"
                        alt="Logo Artportable"
                      />
                    </a>
                  </Link>
                ) : isMobile ? (
                  <Link href={logoHref}>
                    <a>
                      <img
                        height={"auto"}
                        width={115}
                        className={s.logo}
                        src="/ArtportableLogo.svg"
                        alt="Logo Artportable"
                      />
                    </a>
                  </Link>
                ) : (
                  <Link href={logoHref}>
                    <a>
                      <img
                        height={"auto"}
                        width={175}
                        className={s.logo}
                        src="/ArtportableLogo.svg"
                        alt="Logo Artportable"
                      />
                    </a>
                  </Link>
                )}
              </div>
              
            {!isMobile && (
                <div className={s.searchContainer}>
                <SearchField
                  onFilter={handleSearch}
                  searchQuery={searchQuery}
                  iconOnly={isMobile}
                />
              </div>
            )}

              <div className={s.rightSection}>
              {isMobile && (
                <SearchField
                  onFilter={handleSearch}
                  searchQuery={searchQuery}
                  iconOnly={isMobile}
                />
            )}
                {!isSignedIn.value && (
                  <div>
                    {favoriteIds.length > 0 && (
                      <>
                        <section
                          aria-describedby={id}
                          onMouseLeave={handleClose}
                          onScroll={handleClose}
                          onMouseEnter={handleClick}
                        >
                          <IconButton>
                            <BookmarkIcon style={{ color: "blue" }} />
                          </IconButton>

                          <Popper
                            style={{
                              zIndex: 20000,
                              height: "auto",
                              width: "35%",
                            }}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            transition
                          >
                            {({ TransitionProps }) => (
                              <Fade {...TransitionProps} timeout={450}>
                                <section
                                  style={{
                                    padding: "15px",
                                  }}
                                >
                                  <FavoritesPopper
                                    id={favoriteIds}
                                  ></FavoritesPopper>
                                </section>
                              </Fade>
                            )}
                          </Popper>
                        </section>
                      </>
                    )}
                  </div>
                )}
                
                {!isSignedIn.value && (
                  <div className={s.login}>
                    <Button
                      className={s.loginButton}
                      onClick={() =>
                        keycloak.register({ locale: router.locale })
                      }
                      // onClick={() =>
                      //   keycloak.register({
                      //     locale: router.locale,
                      //     redirectUri: signUpRedirectHref,
                      //   })
                      // }
                    >
                      {t("sell")}
                    </Button>
                  </div>
                )}

                {isSignedIn.value && (
                  <>
                    <div className={s.buttons}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: " center",
                        }}
                      >
                        {membership.value < Membership.PortfolioPremium && (
                          <Link href="/upgrade">
                            <a>
                              <Button
                                onClick={() =>
                                  trackGoogleAnalytics(
                                    ActionType.UPLOAD_IMAGE_HEADER,
                                    CategoryType.INTERACTIVE
                                  )
                                }
                                className={s.upgradeButton}
                                rounded
                              >
                                {t("upgrade")}
                              </Button>
                            </a>
                          </Link>
                        )}

                        {membership.value === 3 && (
                          <Link href="/upload-story">
                            <a>
                              <Button
                                onClick={() =>
                                  trackGoogleAnalytics(
                                    ActionType.UPLOAD_IMAGE_HEADER,
                                    CategoryType.INTERACTIVE
                                  )
                                }
                                className={s.uploadStoryButton}
                                rounded
                                endIcon={<FeedOutlinedIcon />}
                              >
                                {t("uploadStory")}
                              </Button>
                            </a>
                          </Link>
                        )}
                        {membership.value < 3 ? (
                          <Link href="/upgrade">
                            <a>
                              <Button
                                onClick={() =>
                                  trackGoogleAnalytics(
                                    ActionType.UPLOAD_IMAGE_HEADER,
                                    CategoryType.INTERACTIVE
                                  )
                                }
                                className={s.uploadStoryButton}
                                rounded
                                endIcon={<FeedOutlinedIcon />}
                              >
                                {t("uploadStory")}
                              </Button>
                            </a>
                          </Link>
                        ) : (
                          <></>
                        )}

                        <Link href="/upload">
                          <a>
                            <Button
                              onClick={() =>
                                trackGoogleAnalytics(
                                  ActionType.UPLOAD_IMAGE_HEADER,
                                  CategoryType.INTERACTIVE
                                )
                              }
                              className={s.uploadButton}
                              rounded
                              endIcon={<ColorLensIcon />}
                            >
                              {t("upload")}
                            </Button>
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className={s.loggedIn}>
                      <div className={s.iconButtons}>
                        <div className={s.notificationButton}>
                          {activityToken && !isError && !isLoading ? (
                            <NotificationIconButton
                              activityToken={activityToken}
                              socialId={socialId.value}
                            />
                          ) : (
                            <IconButton
                              aria-label="account"
                              disabled
                              aria-disabled
                            >
                              <NotificationsIcon
                                style={{
                                  fontSize: "30px",
                                }}
                              />
                            </IconButton>
                          )}
                        </div>

                        <ProfileIconButton
                          profilePicture={profilePicture}
                        ></ProfileIconButton>
                      </div>
                    </div>
                  </>
                )}

                {!isSignedIn.value && (
                  <div className={s.loginMobile}>
                    <Button
                      className={s.loginButtonMobile}
                      onClick={() =>
                        keycloak.register({ locale: router.locale })
                      }
                      // onClick={() =>
                      //   keycloak.register({
                      //     locale: router.locale,
                      //     redirectUri: signUpRedirectHref,
                      //   })
                      // }
                    >
                      {t("sell")}
                    </Button>
                  </div>
                )}

                <div className={s.menuDrawer}>
                  <IconButton
                    aria-label="menu"
                    onClick={(_) => setOpenMenu(true)}
                  >
                    <Badge
                      badgeContent={unreadChatMessages}
                      max={99}
                      color="primary"
                      overlap="rectangular"
                    >
                      <MenuIcon style={{ fontSize: "30px" }} />
                    </Badge>
                    <MenuIcon
                      classes={{ root: s.menuIcon }}
                      style={{ fontSize: "30px" }}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
            <div className={s.titleWrapper}>
              {/* <div className={s.titlesOnHeader}>
                <Link href={"/latestart"} passHref>
                  {t("latest")}
                </Link>
                <br />
              </div> */}
              <div className={s.titlesOnHeader}>
                <Link href={"/discover"} passHref>
                  {t("findArt")}
                </Link>
              </div>
              <div className={s.titlesOnHeader}>
                <Link href={"/curated"} passHref>
                  {t("curatet")}
                </Link>
              </div>
              {/* <div className={s.titlesOnHeader}>
                <Link href={"/collaboration"} passHref>
                  {t("collaboration")}
                </Link>
              </div> */}
              {/* <div className={s.titlesOnHeader}>
                <Link href={"/artists"} passHref>
                  {t("artists")}
                </Link>
              </div> */}
              <div className={s.titlesOnHeader}>
                <Link href={"/newsroom"} passHref>
                  {t("story")}
                </Link>
              </div>
              <div className={s.titlesOnHeader}>
                <Link href={"/exhibition"} passHref>
                  {t("exhibition")}
                </Link>
              </div>
              {isSignedIn.value && (
                <div className={s.titlesOnHeader}>
                  <Link href="/feed">{t("myArtNetwork")}</Link>
                </div>
              )}
              <div className={s.titlesOnHeader}>
                <Link href={`${t("header:storiesSlug")}`} passHref>
                  {t("articles")}
                </Link>
              </div>
            </div>
          </div>

          <DrawerMenu
            open={openMenu}
            setOpen={setOpenMenu}
            unreadChatMessages={unreadChatMessages}
            navBarItems={navBarItems}
          ></DrawerMenu>
        </Toolbar>
      </AppBar>
      {/* {globalIsLoading && (
        <LinearProgress
          style={{
            position: "absolute",
            top: "69px",
            width: "100vw",
            zIndex: 1,
          }}
        />
      )} */}
    </>
  );
}
