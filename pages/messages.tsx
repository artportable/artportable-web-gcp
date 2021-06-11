import React, { useEffect, useState } from 'react';
import Main from '../app/components/Main/Main'
import { useTranslation } from 'next-i18next';
import { useStore } from 'react-redux';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ChannelSort } from 'stream-chat';
import { Channel, ChannelList, Chat, MessageInput, MessageList, Window } from 'stream-chat-react'
import MessagingChannelHeader from '../app/components/Messaging/MessagingChannelHeader/MessagingChannelHeader';
import MessagingChannelList from '../app/components/Messaging/MessagingChannelList/MessagingChannelList';
import MessagingChannelPreview from '../app/components/Messaging/MessagingChannelPreview/MessagingChannelPreview';
import CreateChannel from '../app/components/Messaging/CreateChannel/CreateChannel';
import CustomMessage from '../app/components/Messaging/CustomMessage/CustomMessage';
import MessagingInput from '../app/components/Messaging/MessagingInput/MessagingInput';


export default function MessagesPage( props ) {
  const { t } = useTranslation(['upload']);
  const store = useStore();

  const [isCreating, setIsCreating] = useState(false);

  const isSignedIn = store.getState()?.user?.isSignedIn;
  console.log(props)
  const chatClient = props.chatClient;
  console.log(chatClient)

  const username = 'knatte'; //store.getState()?.user?.username;
  const profilepicture = 'https://getstream.io/random_svg/?name=Anders'; //store.getState()?.user?.profilePicture;
  const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYW5kZXJzYW5kIn0.mW_m6BRY6MFOUMin-7KyiAzPybZTBtILBc9re6GaQU0'; // TODO: Fetch from Store: store.getState()?.user?.chatToken;
  const theme = 'light';
  const sort: ChannelSort = {
    last_message_at: -1,
    updated_at: -1,
    cid: 1,
  };


  // useEffect(() => {
  //   // TODO: Do redirect of unauthed users in a better way
  //   if (!isSignedIn) {
  //     router.push('/');
  //   }
  // });

  return (
    <Main noHeaderPadding>
      <div>
        {chatClient &&
          <Chat client={chatClient} theme={`messaging ${theme}`}>
            <ChannelList
              sort={sort}
              List={(props) => (
                <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
              )}
              Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} />}
            />
            <Channel maxNumberOfFiles={10} multipleUploads={true}>
              {isCreating && (
                <CreateChannel onClose={() => setIsCreating(false)} toggleMobile={null} />
              )}
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
          </Chat>
        }


        {/* <Chat client={chatClient} theme={`messaging ${theme}`}>
          <div id='mobile-channel-list'>
            <ChannelList
              // filters={filters}
              sort={sort}
              options={options}
              List={(props) => (
                <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
              )}
              Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} />}
            />
          </div>
          <div>
            <Channel maxNumberOfFiles={10} multipleUploads={true}>
              {isCreating && (
                <CreateChannel onClose={() => setIsCreating(false)} />
              )}
              <Window>
                <MessagingChannelHeader theme={theme} />
                <MessageList
                  messageActions={['delete', 'edit', 'flag', 'mute', 'react', 'reply']}
                  Message={CustomMessage}
                  TypingIndicator={() => null}
                />
                <MessageInput focus Input={MessagingInput} />
              </Window>
              <MessagingThread />
            </Channel>
          </div>
        </Chat> */}
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
