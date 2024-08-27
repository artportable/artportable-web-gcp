import Link from "next/link";
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
      case Locales.fi:
        return DisplayLocales.fi;
      case Locales.is:
        return DisplayLocales.is;
      case Locales.de:
        return DisplayLocales.de;
      default:
        return DisplayLocales.en;
    }
  })();

  const close = () => setOpen(false);

  const [openContact, setOpenContact] = useState(false);
  const [openManageSubscriptions, setOpenManageSubscriptions] = useState(false);
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [openListingPages, setOpenListingPages] = useState(false);

  function handleClickListingPages(event) {
    setOpenListingPages(!openListingPages);
    event.stopPropagation();
  }

  function handleClickLanguage(event) {
    setOpenopenLanguage(!openLanguage);
    event.stopPropagation();
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

  const forceReload = () => {
    router.reload();
  };

  return (
    <Drawer
      classes={{ paper: s.container }}
      anchor="right"
      open={open}
      onClose={() => close()}
      ModalProps={{ keepMounted: true }}
    >
      <div className={s.closeButtonFlex}>
        <IconButton
          aria-label="close menu"
          onClick={() => close()}
          className={s.closeButton}
        >
          <CloseIcon style={{ fontSize: "30px" }} />
        </IconButton>
      </div>

      <div className={s.languageElement} style={{ marginTop: "10px" }}>
        <Divider />
        <ListItem button onClick={handleClickLanguage}>
          <ListItemIcon>
            <Badge max={99} color="primary" overlap="rectangular">
              <LanguageRoundedIcon color="secondary" style={{ fontSize: 30 }} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={displayLocale} />
          {openLanguage ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openLanguage} timeout="auto">
          <List component="div" disablePadding>
            <ListItem
              button
              className={s.nested}
              onClick={(_) => handleCloseLanguage(_, Locales.sv)}
            >
              <ListItemText primary={t("Swedish")} />
            </ListItem>
            <ListItem
              button
              className={s.nested}
              onClick={(_) => handleCloseLanguage(_, Locales.en)}
            >
              <ListItemText primary={t("english")} />
            </ListItem>
            <ListItem
              button
              className={s.nested}
              onClick={(_) => handleCloseLanguage(_, Locales.nb)}
            >
              <ListItemText primary={t("Norsk")} />
            </ListItem>
            <ListItem
              button
              className={s.nested}
              onClick={(_) => handleCloseLanguage(_, Locales.da)}
            >
              <ListItemText primary={t("Danska")} />
            </ListItem>
            <ListItem
              button
              className={s.nested}
              onClick={(_) => handleCloseLanguage(_, Locales.fi)}
            >
              <ListItemText primary={t("Suomi")} />
            </ListItem>
            <ListItem
              button
              className={s.nested}
              onClick={(_) => handleCloseLanguage(_, Locales.is)}
            >
              <ListItemText primary={t("Íslenska")} />
            </ListItem>
            <ListItem
              button
              className={s.nested}
              onClick={(_) => handleCloseLanguage(_, Locales.de)}
            >
              <ListItemText primary={t("Deutsch")} />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
      </div>

      <List>
        {isSignedIn.value ? (
          <>
            {membership.value < Membership.Portfolio && (
              <div>
                <ListItem
                  button
                  divider
                  onClick={() => {
                    handleClickUpgrade();
                    trackGoogleAnalytics(ActionType.UPGRADE, CategoryType.BUY);
                  }}
                >
                  <ListItemText primary={t("upgrade")} />
                </ListItem>
                <Upgrade
                  openUpgrade={openUpgrade}
                  handleCloseUpgrade={handleCloseUpgrade}
                />
              </div>
            )}
            <Link href={`/profile/@${username.value}`} passHref>
              <ListItem button divider onClick={() => close()}>
                <ListItemAvatar>
                  <ProfileAvatar
                    size={30}
                    profilePicture={profilePicture}
                  ></ProfileAvatar>
                </ListItemAvatar>
                <ListItemText primary={t("profile")} />
              </ListItem>
            </Link>
            <Link href="/feed" passHref>
              <ListItem button divider onClick={() => close()}>
                <ListItemIcon>
                  <Badge max={99} color="primary">
                    <SupervisorAccountSharpIcon
                      color="secondary"
                      style={{ fontSize: 30 }}
                    />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={t("myArtNetwork")} />
              </ListItem>
            </Link>
            {/* <Link href="/messages" passHref>
              <ListItem button divider onClick={() => close()}>
                <ListItemIcon>
                  <Badge
                    badgeContent={unreadChatMessages}
                    max={99}
                    color="primary"
                  >
                    <MessageRoundedIcon
                      color="secondary"
                      style={{ fontSize: 30 }}
                    />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={t("messages")} />
              </ListItem>
            </Link> */}

            {membership.value > Membership.Base && (
              <>
                <Link href="/upload" passHref>
                  <ListItem button divider onClick={() => close()}>
                    <ListItemIcon>
                      <InsertPhotoIcon
                        color="secondary"
                        style={{ fontSize: 30 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("upload")} />
                  </ListItem>
                </Link>
              </>
            )}

            {!membership.isPending && membership.value === 3 ? (
              <div className={s.upload}>
                <Link href="/upload-story">
                  <ListItem button divider onClick={() => close()}>
                    <ListItemIcon>
                      <InsertPhotoIcon
                        color="primary"
                        style={{ fontSize: 30 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("uploadStory")} />
                  </ListItem>
                </Link>
              </div>
            ) : (
              <div className={s.upload}>
                <Link href="/upgrade">
                  <ListItem button divider onClick={() => close()}>
                    <ListItemIcon>
                      <FeedOutlinedIcon
                        color="secondary"
                        style={{ fontSize: 30 }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={t("uploadStory")} />
                  </ListItem>
                </Link>
              </div>
            )}

            {customerStatus === "trialing" ? (
              <div style={{ color: "black", marginRight: "10px" }}>
                <div
                  onClick={async () => {
                    try {
                      const customerId = await fetchCustomerId();
                      if (customerId) {
                        const portalUrl = await fetchCustomerPortalSession(
                          customerId
                        );
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
                  }}
                >
                  <ListItem button divider onClick={() => close()}>
                    <ListItemText primary={t("managePayment")} />
                  </ListItem>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <>
            <ListItem button divider>
              <ListItemText
                primary={t("signUp")}
                onClick={() =>
                  keycloak.register({
                    locale: router.locale,
                    redirectUri: signUpRedirectHref,
                  })
                }
              />
            </ListItem>
            <ListItem
              button
              divider
              onClick={() => keycloak.login({ locale: router.locale })}
            >
              <ListItemText primary={t("login")} />
            </ListItem>

            <Link href="/newsletter" passHref>
              <a>
                <ListItem button divider onClick={() => close()}>
                  <ListItemText primary={t("subscribeNewsletter")} />
                </ListItem>
              </a>
            </Link>
          </>
        )}
        {/* <Link href="/" passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("discover")} />
            </ListItem>
          </a>
        </Link> */}
        {/* <Link href="https://artportable.store/" passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("store")} />
            </ListItem>
          </a>
        </Link> */}
        {navBarItems && navBarItems.length > 0 && (
          <div>
            <ListItem button onClick={handleClickListingPages}>
              <ListItemText primary={t("productLists")} />
              {openListingPages ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openListingPages} timeout="auto">
              <List component="div" disablePadding>
                {navBarItems.map((item, index) => {
                  navBarItems.sort((a, b) => {
                    if (a.menuTitle.toUpperCase() < b.menuTitle.toUpperCase())
                      return -1;
                    if (a.menuTitle.toUpperCase() > b.menuTitle.toUpperCase())
                      return +1;
                  });
                  if (item.locale == router.locale)
                    return (
                      <Link href={"/" + item.slug} passHref key={index}>
                        {/* onClick={(_) => router.push(`/${item.slug}`)} */}
                        <a>
                          {/* <a onClick={(_) =>  { router.push(`/${item.slug}`); forceReload();}}> */}
                          <ListItem
                            button
                            className={s.nested}
                            onClick={() => close()}
                          >
                            {/* <ListItem button className={s.nested} onClick={() => { close(); router.push(`${'/' + item.slug}`);}}> */}
                            <ListItemText primary={item.menuTitle} />
                          </ListItem>
                        </a>
                      </Link>
                    );
                })}
              </List>
            </Collapse>
            <Divider />
          </div>
        )}

        <Link href="/artists" passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("artists")} />
            </ListItem>
          </a>
        </Link>
        <Link href={`${t("header:storiesSlug")}`} passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("stories")} />
            </ListItem>
          </a>
        </Link>
        {/* <Link href="/kurser" passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("courses")} />
            </ListItem>
          </a>
        </Link> */}
        {/* <Link href="/kampanj" passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("offers")} />
            </ListItem>
          </a>
        </Link> */}
        {isSignedIn.value && (
          <Link href="/medlemserbjudanden" passHref>
            <a>
              <ListItem button divider onClick={() => close()}>
                <ListItemText primary={t("membershipOffers")} />
              </ListItem>
            </a>
          </Link>
        )}
        {/* <Link href="/showroom" passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("exhibition")} />
            </ListItem>
          </a>
        </Link> */}
        <Link href="/about-us" passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("aboutUs")} />
            </ListItem>
          </a>
        </Link>
        <Link href="/support" passHref>
          <a>
            <ListItem button divider onClick={() => close()}>
              <ListItemText primary={t("contactUs")} />
            </ListItem>
          </a>
        </Link>

        {isSignedIn.value ? (
          <>
            <ListItem button divider onClick={() => keycloak.logout()}>
              <ListItemIcon>
                <ExitToAppIcon style={{ fontSize: 30 }} />
              </ListItemIcon>
              <ListItemText primary={t("logout")} />
            </ListItem>
          </>
        ) : (
          ""
        )}
      </List>
    </Drawer>
  );
}
