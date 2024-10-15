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
import { LinearProgress } from "@material-ui/core";

import { useTranslation } from "next-i18next";
import clsx from "clsx";
import Button from "../Button/Button";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import I18nSelector from "../I18nSelector/I18nSelector";
import { styles } from "./header.css";
import { styles as sharedStyles } from "../../../styles/shared.css";
import React, { useContext, useEffect, useState } from "react";
import { useGetActivityToken } from "../../hooks/useGetActivityClient";
import ProfileIconButton from "../ProfileIconButton/ProfileIconButton";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import router from "next/router";
import { Membership } from "../../models/Membership";
import useSignupRedirectHref from "../../hooks/useSignupRedirectHref";
import "react-activity-feed/dist/index.css";
import NotificationIconButton from "../NotificationIconButton/NotificationIconButton";
import { LoadingContext } from "../../contexts/loading-context";
import { UserContext } from "../../contexts/user-context";
import { ChatClientContext } from "../../contexts/chat-context";
import { useGetUserProfilePicture } from "../../hooks/dataFetching/UserProfile";

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

export default function Header({ navBarItems }) {
  const { t } = useTranslation(["header", "support"]);
  const s = styles();
  const sShared = sharedStyles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const { socialId, username, isSignedIn, membership } =
    useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const signUpRedirectHref = useSignupRedirectHref();

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

  useEffect(() => {
    if (loadingFromContext) {
      setglobalIsLoading(true);
    } else {
      setglobalIsLoading(false);
    }
  }, [loadingFromContext]);

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
          backgroundColor: "#fdf9f7",
          borderBottom: "1px solid #cecece6b",
        }}
      >
        {!isSignedIn.value && (
          <>
            <div className={s.trialBanner}>
              <p>
                <a href="https://www.artportable.com/register">
                  {t("artportableTrial")}
                </a>
              </p>
            </div>
          </>
        )}
        <Toolbar>
          <div className={s.container}>
            <div className={s.logoContainer}>
              <Link href={logoHref}>
                <a>
                  <img
                    height={26}
                    width={135}
                    className={s.logo}
                    src="/Artportable_Logotyp_Black.svg"
                    alt="Logo Artportable"
                  />
                </a>
              </Link>
            </div>
            <nav className={s.navigation}>
              {isSignedIn.value && (
                <>
                  <MuiButton
                    classes={{ root: s.feed }}
                    color="default"
                    size="large"
                  >
                    <Link href="/">{t("discoverArt").toUpperCase()}</Link>
                  </MuiButton>
                  <MuiButton
                    classes={{ root: s.feed }}
                    color="default"
                    size="large"
                  >
                    <Link href="/feed">{t("myArtNetwork").toUpperCase()}</Link>
                  </MuiButton>
                </>
              )}
              {/*      <Link href={`/${t("header:storiesSlug")}`} passHref>
                <a>
                  <MuiButton color="default" size="large">
                    {t("stories").toUpperCase()}
                  </MuiButton>
                </a>
              </Link> */}
              {/*    <Link href="/showroom" passHref>
                <a>
                  <MuiButton color="default" size="large">
                    {t("exhibition").toUpperCase()}
                  </MuiButton>
                </a>
              </Link> */}
            </nav>
            {/* <RWebShare
              data={{
                text: t('common:description'),
                url: "https://artportable.com",
                title: t('common:inviteFriends'),
              }}
              onClick={() => trackGoogleAnalytics(ActionType.INVITE_FEED)}
            >
              <Button
                className={s.buttonInvite}
                size="small"
                variant="outlined"
                disableElevation
                rounded>
                {t('invite')}
              </Button>
            </RWebShare> */}
            {!isSignedIn.value && (
              <div className={s.login}>
                <Button
                  // className={s.createButton}
                  className={clsx(sShared.largeButton, sShared.blackButton)}
                  size="medium"
                  // variant="contained"
                  rounded
                  onClick={() => keycloak.login({ locale: router.locale })}
                  // onClick={() =>
                  //   keycloak.register({
                  //     locale: router.locale,
                  //     redirectUri: signUpRedirectHref,
                  //   })
                  // }
                >
                  {t("login")}
                </Button>
              </div>
            )}
            <div className={s.singleNotificationButton}>
              {isSignedIn.value && (
                <>
                  {activityToken && !isError && !isLoading ? (
                    <NotificationIconButton
                      activityToken={activityToken}
                      socialId={socialId.value}
                    />
                  ) : (
                    <IconButton aria-label="account" disabled aria-disabled>
                      <NotificationsIcon
                        classes={{ root: s.notificationIcon }}
                        style={{ fontSize: "30px" }}
                      />
                    </IconButton>
                  )}
                </>
              )}
            </div>
            {isSignedIn.value && (
              <>
                <div className={s.login}>
                  {customerStatus === "trialing" ? (
                    <div
                      style={{
                        color: "black",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={async () => {
                          try {
                            const customerId = await fetchCustomerId();
                            if (customerId) {
                              const portalUrl =
                                await fetchCustomerPortalSession(customerId);
                              if (portalUrl) {
                                window.location.href = portalUrl;
                              } else {
                                console.error(
                                  "Customer portal URL not received."
                                );
                              }
                            } else {
                              console.error("Customer ID not received.");
                            }
                          } catch (error) {
                            console.error("Error in processing:", error);
                          }
                        }}
                      >
                        {t("managePayment")}
                      </Button>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {!membership.isPending && membership.value === 3 ? (
                    <div className={s.upload}>
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
                    </div>
                  ) : (
                    <div className={s.upload}>
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
                    </div>
                  )}

                  <div className={s.upload}>
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

                  {membership.value < Membership.Portfolio && (
                    <UpgradePortfolio />
                  )}
                  {membership.value > 4 && (
                    <div style={{ color: "blue" }}>
                      <a
                        style={{ color: "blue" }}
                        href="/admin"
                        target="_self"
                        rel="noopener noreferrer"
                      >
                        ADMIN
                      </a>
                    </div>
                  )}
                  <div className={s.iconButtons}>
                    <div className={s.notificationButton}>
                      {activityToken && !isError && !isLoading ? (
                        <NotificationIconButton
                          activityToken={activityToken}
                          socialId={socialId.value}
                        />
                      ) : (
                        <IconButton aria-label="account" disabled aria-disabled>
                          <NotificationsIcon
                            classes={{ root: s.notificationIcon }}
                            style={{
                              fontSize: "30px",
                            }}
                          />
                        </IconButton>
                      )}
                    </div>
                    {/* <Link href="/messages">
                      <a>
                        <IconButton color="secondary" aria-label="account">
                          <Badge
                            badgeContent={unreadChatMessages}
                            max={99}
                            color="primary"
                            overlap="rectangular"
                          >
                            <MessageRoundedIcon style={{ fontSize: "30px" }} />
                          </Badge>
                        </IconButton>
                      </a>
                    </Link> */}

                    <ProfileIconButton
                      profilePicture={profilePicture}
                    ></ProfileIconButton>
                  </div>
                </div>
              </>
            )}

            <div className={s.menuDrawer}>
              <IconButton
                aria-label="menu"
                onClick={(_) => setOpenMenu(true)}
                className={s.iconMenuColor}
              >
                <Badge
                  classes={{ root: s.menuIconWithBadge }}
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

          <DrawerMenu
            open={openMenu}
            setOpen={setOpenMenu}
            unreadChatMessages={unreadChatMessages}
            navBarItems={navBarItems}
          ></DrawerMenu>
        </Toolbar>
      </AppBar>
      {globalIsLoading && (
        <LinearProgress
          style={{
            position: "absolute",
            top: "69px",
            width: "100vw",
            zIndex: 1,
          }}
        />
      )}
    </>
  );
}
