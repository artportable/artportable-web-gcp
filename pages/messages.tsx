import React, { useContext, useEffect, useState } from 'react';
import Main from '../app/components/Main/Main'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ChannelSort, StreamChat } from 'stream-chat';
import { Channel, ChannelList, Chat, MessageInput, MessageList, Window } from 'stream-chat-react'
import MessagingChannelHeader from '../app/components/Messaging/MessagingChannelHeader/MessagingChannelHeader';
import MessagingChannelList from '../app/components/Messaging/MessagingChannelList/MessagingChannelList';
import MessagingChannelPreview from '../app/components/Messaging/MessagingChannelPreview/MessagingChannelPreview';
import CreateChannel from '../app/components/Messaging/CreateChannel/CreateChannel';
import CustomMessage from '../app/components/Messaging/CustomMessage/CustomMessage';
import MessagingInput from '../app/components/Messaging/MessagingInput/MessagingInput';
import { useGetChatClient } from '../app/hooks/useGetChatClient'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { UserContext } from '../app/contexts/user-context';
import { useGetUserProfilePicture } from '../app/hooks/dataFetching/UserProfile';



export default function MessagesPage(props) {
  const { t } = useTranslation(['messages']);
  const { referTo, artwork } = props;
  const { username, isSignedIn } = useContext(UserContext);
  const { data: profilePicture } = useGetUserProfilePicture(username.value);
  const [referToChannel, setReferToChannel] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = 'light';
  const sort: ChannelSort = {
    last_message_at: -1,
    updated_at: -1,
    cid: 1,
  };

  const chatClient = useGetChatClient(username.value, profilePicture, isSignedIn.value);
  const [isCreating, setIsCreating] = useState(Object.keys(chatClient.activeChannels).length === 0);
  const [hasChannels, setHasChannels] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const filter = { members: { $in: [username.value] } };

  useEffect(() => {
    setIsCreating(Object.keys(chatClient.activeChannels).length === 0);
  }, [hasChannels]);

  useEffect(() => {
    async function setReferTo() {
      if (referTo) {
        try {

          var channel = chatClient.channel('messaging', {
            members: [referTo, username.value],
          });
          await channel.watch();
          setReferToChannel(channel);
          await channel.stopWatching();
        }
        catch (e) {
          console.log(e);
          setSnackbarOpen(true);
        }
      }
    }

    setReferTo();
  }, [referTo]);

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  return (
    <Main noHeaderPadding>
      <div>
        {(chatClient && chatClient.user) &&
          <Chat client={chatClient} theme={`messaging ${theme}`}>
            <ChannelList
              filters={filter}
              sort={sort}
              List={(props) => {
                setIsLoading(props.loading);
                return <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} activeChannel={referToChannel} />;
              }
              }
              Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating, setHasChannels }} />}
            />
            {isCreating && !isLoading && (
              <CreateChannel onClose={() => setIsCreating(false)} toggleMobile={null} />
            )}
            {!isCreating &&
              <Channel maxNumberOfFiles={10} multipleUploads={true}>
                <Window>
                  <MessagingChannelHeader theme={theme} toggleMobile={null} />
                  <MessageList
                    messageActions={['delete', 'edit', 'flag', 'mute', 'react']}
                    Message={CustomMessage}
                    TypingIndicator={() => null}
                  />
                  <MessageInput focus Input={(props) => <MessagingInput {...props} artwork={artwork}/>} />
                </Window>
              </Channel>
            }
          </Chat>
        }
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} variant="filled" severity="warning">
            {t('messages:pleaseTryAgain')}
          </Alert>
        </Snackbar>
      </div>
    </Main>
  );
}

export async function getServerSideProps({ locale, query }) {
  // returns { id: episode.itunes.episode, title: episode.title}
  var props = {
    ...await serverSideTranslations(locale, ['header', 'footer', 'messages', 'tags']),
  };
  if (query.artwork) {
    props['artwork'] = JSON.parse(atob(query.artwork))
  }
  if (query.referTo) {
    props['referTo'] = query.referTo
  }

  //you can make DB queries using the data in context.query
  return {
    props
  };
}