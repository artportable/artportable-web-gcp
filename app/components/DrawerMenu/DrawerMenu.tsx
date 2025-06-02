import Link from "next/link";
import Image from "next/image";
import {
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
  Collapse,
  Divider,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationIconButton from "../NotificationIconButton/NotificationIconButton";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import SupervisorAccountSharpIcon from "@material-ui/icons/SupervisorAccountSharp";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
import PersonIcon from "@material-ui/icons/Person";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExploreIcon from "@material-ui/icons/Explore";
import CollectionsIcon from "@material-ui/icons/Collections";
import InfoIcon from "@material-ui/icons/Info";
import HelpIcon from "@material-ui/icons/Help";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { useTranslation } from "next-i18next";
import { styles } from "./drawerMenu.css";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import useSignupRedirectHref from "../../hooks/useSignupRedirectHref";
import { UserContext } from "../../contexts/user-context";
import { useContext, useEffect, useState } from "react";
import { useGetUserProfilePicture } from "../../hooks/dataFetching/UserProfile";
import { Membership } from "../../models/Membership";
import DialogConstruction from "../ContactDialog/contactDialog";
import { Locales, DisplayLocales } from "../../models/i18n/locales";
import Upgrade from "./Upgrade";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import ManageSubscriptionsDialog from "../ManageSubscriptions/ManageSubscriptionsDialog";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { FavoritesContext } from "../../contexts/FavoritesContext";

export default function DrawerMenu({
  open,
  setOpen,
  unreadChatMessages,
  navBarItems,
}) {
  const { t } = useTranslation(["header", "common", "support"]);
  const s = styles();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const { username, isSignedIn, membership } = useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const signUpRedirectHref = useSignupRedirectHref();
  const [openLanguage, setOpenopenLanguage] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [stripeId, setStripeId] = useState("");
  const [customerStatus, setCustomerStatus] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(0);
  
  const displayLocale = (() => {
    switch (router.locale) {
      case Locales.sv:
        return DisplayLocales.sv;
      case Locales.en:
        return DisplayLocales.en;
      case Locales.nb:
        return DisplayLocales.nb;
      case Locales.da:
        return DisplayLocales.da;
      default:
        return DisplayLocales.en;
    }
  })();

  const close = () => setOpen(false);
  const { favoriteIds } = useContext(FavoritesContext);

  const [openContact, setOpenContact] = useState(false);
  const [openManageSubscriptions, setOpenManageSubscriptions] = useState(false);
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [openListingPages, setOpenListingPages] = useState(false);

  function handleClickListingPages(event) {
    setOpenListingPages(!openListingPages);
    event.stopPropagation();
    event.preventDefault();
  }

  function handleClickLanguage(event) {
    setOpenopenLanguage(!openLanguage);
    event.stopPropagation();
    event.preventDefault();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerId = await fetchCustomerId();
        setStripeId(customerId);
        const customerData = await fetchCustomerData(customerId);
        const currentPeriodEnd =
          customerData?.subscriptions.data[0]?.current_period_end;

        if (currentPeriodEnd) {
          const currentTimeInSeconds = Math.floor(Date.now() / 1000);
          const secondsRemaining = currentPeriodEnd - currentTimeInSeconds;
          setDaysRemaining(Math.ceil(secondsRemaining / (60 * 60 * 24)));
        }

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

  function handleCloseLanguage(_, locale?: Locales) {
    if (locale !== undefined) {
      router.push(router.asPath, null, { locale: locale });
    }
  }

  const handleClickContact = () => {
    setOpenContact(true);
  };

  const handleCloseContact = () => {
    setOpenContact(false);
  };

  const handleClickManageSubscriptions = () => {
    setOpenManageSubscriptions(true);
  };

  const handleCloseManageSubscriptions = () => {
    setOpenManageSubscriptions(false);
  };

  const handleClickUpgrade = () => {
    setOpenUpgrade(true);
  };

  const handleCloseUpgrade = () => {
    setOpenUpgrade(false);
  };

  // Navigation menu items organized by section
  const navigationSections = [
    {
      title: t("upptäck"),
      items: [
        {
          href: "/discover",
          label: t("findArt"),
          icon: <ExploreIcon />,
        },
        {
          href: "/exhibition",
          label: t("exhibition"),
          icon: <AccountBalanceIcon />,
        },
        {
          href: "/curated",
          label: t("curatet"),
          icon: <CollectionsIcon />,
        },
        {
          href: "/newsroom",
          label: t("story"),
          icon: <FiberNewIcon />,
        },
      ],
    },
    {
      title: t("information"),
      items: [
        {
          href: "/about-us",
          label: t("aboutUs"),
          icon: <InfoIcon />,
        },
        {
          href: "/faq",
          label: t("FAQ"),
          icon: <HelpIcon />,
        },
      ],
    },
  ];

  return (
    <Drawer
      classes={{ paper: `${s.container} ${s.slideIn}` }}
      anchor="right"
      open={open}
      onClose={() => close()}
      variant="persistent"
      ModalProps={{
        keepMounted: true,
        disableAutoFocus: true,
        disableEnforceFocus: false,
        disableRestoreFocus: false,
      }}
    >
      {/* Header Section */}
      <Box className={s.drawerHeader}>
        <Box className={s.brandSection}>
          <Image
            src="/ArtportableLogo.svg"
            alt="ArtPortable Logo"
            width={100}
            height={44}
            className={s.brandLogo}
            priority
          />
        </Box>
        <IconButton
          aria-label="close menu"
          onClick={() => close()}
          className={s.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Scrollable Content Area */}
      <Box className={s.scrollableContent}>
        {/* User Section */}
        {isSignedIn.value ? (
          <Box className={s.userSection}>
            {/* Upgrade Section */}
            {membership.value < Membership.Portfolio && (
              <ListItem
                button
                className={`${s.profileItem} ${s.upgradeItem}`}
                onClick={() => {
                  handleClickUpgrade();
                  trackGoogleAnalytics(ActionType.UPGRADE, CategoryType.BUY);
                }}
              >
                <ListItemIcon className={s.listItemIcon}>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={t("upgrade")} 
                  className={s.listItemText}
                />
              </ListItem>
            )}

            {/* Admin Section */}
            {isSignedIn.value && membership.value > 4 && (
              <Link href="/admin">
                <a className={s.noDecoration}>
                  <ListItem button className={s.profileItem} onClick={() => close()}>
                    <ListItemIcon className={s.listItemIcon}>
                      <SupervisorAccountSharpIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="ADMIN" 
                      className={s.listItemText}
                    />
                  </ListItem>
                </a>
              </Link>
            )}

            {/* Profile Section */}
            <Link href={`/profile/@${username.value}`}>
              <a className={s.noDecoration}>
                <ListItem button className={s.profileItem} onClick={() => close()}>
                  <ListItemAvatar className={s.avatarSection}>
                    <ProfileAvatar
                      size={28}
                      profilePicture={profilePicture}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={t("profile")} 
                    className={s.listItemText}
                  />
                </ListItem>
              </a>
            </Link>

            {/* My Art Network */}
            <Link href="/feed">
              <a className={s.noDecoration}>
                <ListItem button className={s.profileItem} onClick={() => close()}>
                  <ListItemIcon className={s.listItemIcon}>
                    <SupervisorAccountSharpIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t("myArtNetwork")} 
                    className={s.listItemText}
                  />
                </ListItem>
              </a>
            </Link>

            {/* Upload Section */}
            <Link href="/upload">
              <a className={s.noDecoration}>
                <ListItem button className={s.profileItem} onClick={() => close()}>
                  <ListItemIcon className={s.listItemIcon}>
                    <InsertPhotoIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={t("upload")} 
                    className={s.listItemText}
                  />
                </ListItem>
              </a>
            </Link>

            {/* Upload Story */}
            {!membership.isPending && membership.value === 3 ? (
              <Link href="/upload-story">
                <a className={s.noDecoration}>
                  <ListItem button className={s.profileItem} onClick={() => close()}>
                    <ListItemIcon className={s.listItemIcon}>
                      <FeedOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t("uploadStory")} 
                      className={s.listItemText}
                    />
                  </ListItem>
                </a>
              </Link>
            ) : (
              <Link href="/upgrade">
                <a className={s.noDecoration}>
                  <ListItem button className={s.profileItem} onClick={() => close()}>
                    <ListItemIcon className={s.listItemIcon}>
                      <FeedOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t("uploadStory")} 
                      className={s.listItemText}
                    />
                  </ListItem>
                </a>
              </Link>
            )}

            {/* Payment Management */}
            {customerStatus === "trialing" && (
              <ListItem
                button
                className={s.profileItem}
                onClick={async () => {
                  try {
                    const customerId = await fetchCustomerId();
                    if (customerId) {
                      const portalUrl = await fetchCustomerPortalSession(customerId);
                      if (portalUrl) {
                        window.location.href = portalUrl;
                      } else {
                        console.error("Customer portal URL not received.");
                      }
                    } else {
                      console.error("Customer ID not received.");
                    }
                  } catch (error) {
                    console.error("Error in processing:", error);
                  }
                  close();
                }}
              >
                <ListItemText 
                  primary={t("managePayment")} 
                  className={s.listItemText}
                />
              </ListItem>
            )}
          </Box>
        ) : (
          /* Guest User Section */
          <Box className={s.userSection}>
            <ListItem
              button
              className={s.profileItem}
              onClick={() =>
                keycloak.register({
                  locale: router.locale,
                  redirectUri: signUpRedirectHref,
                })
              }
            >
              <ListItemIcon className={s.listItemIcon}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText 
                primary={t("signUp")} 
                className={s.listItemText}
              />
            </ListItem>

            <ListItem
              button
              className={s.profileItem}
              onClick={() => keycloak.login({ locale: router.locale })}
            >
              <ListItemIcon className={s.listItemIcon}>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText 
                primary={t("login")} 
                className={s.listItemText}
              />
            </ListItem>

            {/* Favorites for guest users */}
            {favoriteIds.length > 0 && (
              <Link href="/wishlist">
                <a className={s.noDecoration}>
                  <ListItem button className={s.profileItem} onClick={() => close()}>
                    <ListItemIcon className={s.listItemIcon}>
                      <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={t("myFavorites")} 
                      className={s.listItemText}
                    />
                    <Badge 
                      badgeContent={favoriteIds.length} 
                      className={s.favoriteBadge}
                    />
                  </ListItem>
                </a>
              </Link>
            )}
          </Box>
        )}

        {/* Navigation Sections */}
        {navigationSections.map((section, sectionIndex) => (
          <Box key={sectionIndex} className={s.navigationSection}>
            <Typography className={s.sectionHeader}>
              {section.title}
            </Typography>
            <List className={s.compactList}>
              {section.items.map((item, itemIndex) => (
                <Link key={itemIndex} href={item.href}>
                  <a className={s.noDecoration}>
                    <ListItem 
                      button 
                      className={`${s.listItem} ${s.touchTarget}`}
                      onClick={() => close()}
                    >
                      <ListItemIcon className={s.listItemIcon}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.label} 
                        className={s.listItemText}
                      />
                    </ListItem>
                  </a>
                </Link>
              ))}
            </List>
          </Box>
        ))}

        {/* Language Selection */}
        <Box className={s.languageSection}>
          <ListItem 
            button 
            onClick={handleClickLanguage}
            className={s.languageHeader}
          >
            <ListItemIcon className={s.listItemIcon}>
              <LanguageRoundedIcon />
            </ListItemIcon>
            <ListItemText 
              primary={displayLocale} 
              className={s.listItemText}
            />
            <Box 
              className={`${s.languageIcon} ${openLanguage ? s.languageIconExpanded : ''}`}
            >
              <ExpandMore />
            </Box>
          </ListItem>
          <Collapse in={openLanguage} timeout="auto">
            <List component="div" disablePadding className={s.compactList}>
              <ListItem
                button
                className={`${s.nested} ${s.touchTarget}`}
                onClick={(_) => handleCloseLanguage(_, Locales.sv)}
              >
                <ListItemText 
                  primary={t("Swedish")} 
                  className={s.nestedText}
                />
              </ListItem>
              <ListItem
                button
                className={`${s.nested} ${s.touchTarget}`}
                onClick={(_) => handleCloseLanguage(_, Locales.en)}
              >
                <ListItemText 
                  primary={t("english")} 
                  className={s.nestedText}
                />
              </ListItem>
              <ListItem
                button
                className={`${s.nested} ${s.touchTarget}`}
                onClick={(_) => handleCloseLanguage(_, Locales.nb)}
              >
                <ListItemText 
                  primary={t("Norsk")} 
                  className={s.nestedText}
                />
              </ListItem>
              <ListItem
                button
                className={`${s.nested} ${s.touchTarget}`}
                onClick={(_) => handleCloseLanguage(_, Locales.da)}
              >
                <ListItemText 
                  primary={t("Danska")} 
                  className={s.nestedText}
                />
              </ListItem>
            </List>
          </Collapse>
        </Box>
      </Box>

      {/* Footer Section - Logout - Always visible at bottom */}
      {isSignedIn.value && (
        <Box className={s.footerSection}>
          <ListItem 
            button 
            className={`${s.logoutItem} ${s.touchTarget}`}
            onClick={() => keycloak.logout()}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={t("logout")} />
          </ListItem>
        </Box>
      )}

      {/* Dialog Components */}
      <Upgrade
        openUpgrade={openUpgrade}
        handleCloseUpgrade={handleCloseUpgrade}
      />
    </Drawer>
  );
}
