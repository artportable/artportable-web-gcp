import { ConnectionOpen, StreamChat } from 'stream-chat';
import { useContext, useEffect, useRef } from 'react';
import { AttachmentType, ChannelType, CommandType, EventType, MessageType, ReactionType, UserType } from '../components/Messaging/MessagingTypes';
import { TokenContext } from '../contexts/token-context';

export function useGetChatClient(username, profilePicture, isSignedIn, setUnreadCount = null) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const chatClientRef = useRef(StreamChat.getInstance<AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType>(apiKey));
    
  const token = useContext(TokenContext);

  useEffect(() => {
    const initChat = async () => {

      const response = await fetch(`${apiBaseUrl}/api/messages/connect?username=${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      const user = await response.json();

      try {
        const result = await chatClientRef.current.connectUser({
          id: username,
          name: username,
          image: `${bucketUrl}${profilePicture}`,
        }, user.Token) as ConnectionOpen<ChannelType, CommandType, UserType>
        if (setUnreadCount !== null) {
          setUnreadCount(result.me.total_unread_count);
        }

      } catch (error) {
        console.warn(error)
      }
    }

    if (!chatClientRef.current.user && isSignedIn && token !== null) {
      initChat();
    }

    return () => {
      if (chatClientRef && chatClientRef.current.user && !isSignedIn) {
        const disconnectChat = async () => {
          await chatClientRef.current.disconnectUser();
        }
        disconnectChat();

      }
    }
  }, [isSignedIn, token]);

  return chatClientRef.current;
}
