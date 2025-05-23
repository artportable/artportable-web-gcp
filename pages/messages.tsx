import React, { useContext, useEffect, useState } from "react";
import Main from "../app/components/Main/Main";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { ChannelSort } from "stream-chat";
// import {
//   Channel,
//   ChannelList,
//   Chat,
//   MessageInput,
//   MessageList,
//   Window,
// } from "stream-chat-react";
// import MessagingChannelHeader from "../app/components/Messaging/MessagingChannelHeader/MessagingChannelHeader";
// import MessagingChannelList from "../app/components/Messaging/MessagingChannelList/MessagingChannelList";
// import MessagingChannelPreview from "../app/components/Messaging/MessagingChannelPreview/MessagingChannelPreview";
// import CreateChannel from "../app/components/Messaging/CreateChannel/CreateChannel";
// import CustomMessage from "../app/components/Messaging/CustomMessage/CustomMessage";
// import MessagingInput from "../app/components/Messaging/MessagingInput/MessagingInput";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { UserContext } from "../app/contexts/user-context";
import clsx from "clsx";
import { ChatClientContext } from "../app/contexts/chat-context";
import { getNavBarItems } from "../app/utils/getNavBarItems";

export default function MessagesPage(props) {
  const { t } = useTranslation(["messages"]);
  const { referTo, artwork, navBarItems } = props;
  const { username, socialId } = useContext(UserContext);
  const [referToChannel, setReferToChannel] = useState(null);
  const [artworkMessage, setArtworkMessage] = useState(artwork);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = "light";
  const sort: ChannelSort = {
    last_message_at: -1,
    updated_at: -1,
    cid: 1,
  };

  const chatClient = useContext(ChatClientContext);
  const [isCreating, setIsCreating] = useState(false);
  const [hasChannels, setHasChannels] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const filter = { members: { $in: [socialId.value] } };

  useEffect(() => {
    if (chatClient) {
      setIsCreating(Object.keys(chatClient.activeChannels).length === 0);
    }
  }, [chatClient, hasChannels]);

  useEffect(() => {
    async function setReferTo() {
      if (referTo) {
        try {
          var channel = chatClient.channel("messaging", {
            members: [referTo, socialId.value],
          });
          await channel.watch();
          setReferToChannel(channel);
          await channel.stopWatching();
        } catch (e) {
          console.log(e);
          setSnackbarOpen(true);
        }
      }
    }

    setReferTo();
  }, [referTo]);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const resetReferTo = () => {
    setReferToChannel(null);
    setArtworkMessage(null);
  };

  return (
    <Main noHeaderPadding wide navBarItems={navBarItems}>
      <div className="messages__main-container">
        {chatClient && chatClient.user && (
          <Chat client={chatClient} theme={`messaging ${theme}`}>
            <div
              className={clsx(
                "str-chat-mobile-nav",
                navOpen && !isCreating && "str-chat-mobile-nav--show"
              )}
              onClick={toggleNav}
            >
              <ChannelList
                filters={filter}
                sort={sort}
                customActiveChannel={referToChannel}
                List={(props) => (
                  <MessagingChannelList
                    {...props}
                    setIsLoading={setIsLoading}
                    onCreateChannel={() => setIsCreating(!isCreating)}
                    activeChannel={referToChannel}
                  />
                )}
                Preview={(props) => (
                  <MessagingChannelPreview
                    {...props}
                    {...{ setIsCreating, setHasChannels }}
                    resetReferTo={() => resetReferTo()}
                  />
                )}
              />
            </div>
            {isCreating && !isLoading && (
              <CreateChannel
                onClose={() => setIsCreating(false)}
                toggleMobile={toggleNav}
              />
            )}
            {!isCreating && (
              <Channel maxNumberOfFiles={10} multipleUploads={true}>
                <Window>
                  <MessagingChannelHeader
                    theme={theme}
                    toggleMobile={toggleNav}
                  />
                  <MessageList
                    messageActions={["delete", "edit", "flag", "mute", "react"]}
                    Message={CustomMessage}
                    TypingIndicator={() => null}
                  />
                  <MessageInput
                    focus
                    Input={(props) => (
                      <MessagingInput {...props} artwork={artworkMessage} />
                    )}
                  />
                </Window>
              </Channel>
            )}
          </Chat>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            variant="filled"
            severity="warning"
          >
            {t("messages:pleaseTryAgain")}
          </Alert>
        </Snackbar>
      </div>
    </Main>
  );
}

export async function getServerSideProps({ locale, query }) {
  const navBarItems = await getNavBarItems();
  var props = {
    navBarItems: navBarItems,
    ...(await serverSideTranslations(locale, [
      "header",
      "footer",
      "messages",
      "tags",
      "support",
      "plans",
    ])),
  };

  if (query.artwork) {
    props["artwork"] = JSON.parse(decodeURIComponent(query.artwork));
  }
  if (query.referTo) {
    props["referTo"] = query.referTo;
  }

  //you can make DB queries using the data in context.query
  return {
    props,
  };
}
