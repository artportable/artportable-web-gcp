import React, { useEffect, useRef, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import {
  AggregatedActivity,
  connect,
  FeedAPIResponse,
  NotificationActivity,
  RealTimeMessage,
  StreamFeed,
} from "getstream";
import {
  Badge,
  Box,
  Button,
  Collapse,
  debounce,
  Paper,
  Typography,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationItem from "../NotificationItem/NotificationItem";
import { styles } from "./notificationIconButton.css";

type NotificationIconButtonProps = {
  activityToken: any;
  socialId: string;
};

const NotificationIconButton = (props: NotificationIconButtonProps) => {
  const { activityToken, socialId } = props;
  const [unreadNotificationsCount, setUnreadNotificationsCount] =
    useState<number>(0);
  const [unreadNotifications, setUnreadNotifications] = useState<
    NotificationActivity[]
  >([]);
  const [readNotifications, setReadNotifications] = useState<
    NotificationActivity[]
  >([]);
  const userFeed = useRef<StreamFeed>(null);
  const [isNextPage, setIsNextPage] = useState<boolean>(false);
  const [popoverAnchorEl, setPopoverAnchorEl] =
    useState<HTMLButtonElement | null>(null);
  const open = Boolean(popoverAnchorEl);
  const containerRef = useRef();
  const notificationCount = useRef(0);
  const s = styles();

  useEffect(() => {
    const initFeeds = async () => {
      const streamClient = connect(
        process.env.NEXT_PUBLIC_STREAM_KEY,
        activityToken,
        process.env.NEXT_PUBLIC_STREAM_APP_ID
      );
      userFeed.current = streamClient.feed(
        "notification",
        socialId
      ) as StreamFeed;
      const notificationsResponse = (await userFeed.current.get({
        limit: 3,
      })) as FeedAPIResponse;
      handleNotificationResponse(notificationsResponse);

      userFeed.current.subscribe(subscriptionDebounce);
    };
    if (socialId && activityToken) {
      initFeeds();
    }
    return () => {
      if (userFeed.current) {
        userFeed.current.unsubscribe();
      }
    };
  }, [socialId, activityToken]);

  const onLoadMore = async () => {
    if (readNotifications.length > 0 || unreadNotifications.length > 0) {
      var length = 3 + unreadNotifications.length + readNotifications.length;
      var notificationsReponse = await userFeed.current.get({ limit: length });
      handleNotificationResponse(notificationsReponse);
    }
  };

  const sortNotifications = (
    notificationActivities: NotificationActivity[]
  ) => {
    if (notificationActivities.length > 0) {
      notificationCount.current = notificationActivities.length;
      setReadNotifications(
        [...notificationActivities].filter((item) => item.is_seen)
      );
      setUnreadNotifications(
        [...notificationActivities].filter((item) => !item.is_seen)
      );
    }
  };

  const handleNotificationResponse = (
    notificationsResponse: FeedAPIResponse
  ) => {
    setIsNextPage(!!notificationsResponse.next);
    setUnreadNotificationsCount(notificationsResponse.unread);
    sortNotifications(notificationsResponse.results as NotificationActivity[]);
  };

  const recieveRealTimeUpdate = async (message: RealTimeMessage) => {
    var notificationResponse: FeedAPIResponse;
    if (userFeed.current) {
      if (message.new.length > 0) {
        notificationResponse = await userFeed.current.get({
          limit: notificationCount.current + message.new.length,
        });
      } else {
        notificationResponse = await userFeed.current.get({
          limit: readNotifications.length + unreadNotifications.length,
        });
      }
      handleNotificationResponse(notificationResponse);
    }
  };
  const subscriptionDebounce = debounce(recieveRealTimeUpdate, 1000);

  const onPopoverClose = async () => {
    setPopoverAnchorEl(null);
    if (userFeed.current) {
      var unreadIds = unreadNotifications.map(
        (notification) => notification.id
      );
      // need to collect feed twice because first get with mark_seen updates feed after collection
      var notificationsResponse = await userFeed.current.get({
        limit: 0,
        mark_read: unreadIds,
        mark_seen: unreadIds,
      });
      notificationsResponse = await userFeed.current.get({
        limit: notificationCount.current,
      });
      handleNotificationResponse(notificationsResponse);
    }
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="account"
        onClick={(event) => setPopoverAnchorEl(event.currentTarget)}
      >
        <Badge badgeContent={unreadNotificationsCount} max={99} color="primary">
          <NotificationsIcon style={{ fontSize: "30px" }} />
        </Badge>
      </IconButton>
      <div ref={containerRef}>
        <Popover
          open={open}
          anchorEl={popoverAnchorEl}
          onClose={() => onPopoverClose()}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          container={containerRef.current}
        >
          <Collapse
            className={s.container}
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Paper className={s.notifications}>
              <Box>
                <Typography variant={"subtitle2"}>Notifications</Typography>
              </Box>
              {readNotifications.length > 0 ||
              unreadNotifications.length > 0 ? (
                <>
                  {unreadNotifications && unreadNotifications.length > 0 ? (
                    <div>
                      <Typography className={s.newTitle}>New!</Typography>
                      {unreadNotifications.map((notification, i) => {
                        return (
                          <NotificationItem
                            key={i}
                            notificationActivity={notification}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <Typography>No new notifications</Typography>
                  )}
                  {readNotifications && readNotifications.length > 0 && (
                    <div>
                      <Typography className={s.oldTitle}>Earlier</Typography>
                      {readNotifications.map((notification, i) => {
                        return (
                          <NotificationItem
                            key={i}
                            notificationActivity={notification}
                          />
                        );
                      })}
                    </div>
                  )}
                  {isNextPage && (
                    <Button onClick={onLoadMore}>
                      <Typography>Load More</Typography>
                    </Button>
                  )}
                </>
              ) : (
                <Typography>Nothing to show</Typography>
              )}
            </Paper>
          </Collapse>
        </Popover>
      </div>
    </>
  );
};

export default NotificationIconButton;
