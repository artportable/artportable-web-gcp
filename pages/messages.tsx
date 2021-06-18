import React, { useEffect, useState } from 'react';
import Main from '../app/components/Main/Main'
import { useTranslation } from 'next-i18next';
import { useStore } from 'react-redux';
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


export default function MessagesPage( props ) {
  const { t } = useTranslation(['upload']);
  const store = useStore();
  const isSignedIn = store.getState()?.user?.isSignedIn;

  const username = store.getState()?.user.username;
  const profilePicture = null; //store.getState()?.user?.profilePicture;
  const theme = 'light';
  const sort: ChannelSort = {
    last_message_at: -1,
    updated_at: -1,
    cid: 1,
  };

  const chatClient = useGetChatClient(username, profilePicture, isSignedIn);
  const [isCreating, setIsCreating] = useState(Object.keys(chatClient.activeChannels).length === 0);
  const [hasChannels, setHasChannels] = useState(false);
  const filter = { members: { $in: [username] } };

  useEffect(() => {
    setIsCreating(Object.keys(chatClient.activeChannels).length === 0);
  }, [hasChannels]);

  return (
    <Main noHeaderPadding>
      <div>
        {(chatClient && chatClient.user) &&
          <Chat client={chatClient} theme={`messaging ${theme}`}>
            <ChannelList
              filters={filter}
              sort={sort}
              List={(props) => (
                <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
              )}
              Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating, setHasChannels }} />}
            />         
            {isCreating && (
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
                  <MessageInput focus Input={MessagingInput} />
                </Window>
              </Channel>
            }
          </Chat>
        }
      </div>
    </Main>
  );
}

export async function getStaticProps(props) {
  console.log(props)
  console.log('Slut')
  return {
    props: {
      ...await serverSideTranslations(props.locale, ['header', 'upload', 'tags']),
    }
  };
}
