import { StreamChat } from 'stream-chat';
import { useEffect, useRef } from 'react';
import { isNullOrUndefined } from '../utils/util';
import { useGetToken } from './useGetToken';

export function useGetChatClient(username, profilePicture, isSignedIn, setUnreadCount = null) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET;
  const chatClientRef = useRef(StreamChat.getInstance(apiKey));
  const token = useGetToken();

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
        }, user.Token).catch(error => console.warn(error));

        if (setUnreadCount !== null) {
          setUnreadCount(chatClientRef.current.user.total_unread_count);
        }

      } catch (error) {
        console.warn(error)
      }
    }

    if (!chatClientRef.current.user && isSignedIn) {
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
  }, [isSignedIn]);

  return chatClientRef.current;
}
