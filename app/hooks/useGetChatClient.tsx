import { StreamChat } from 'stream-chat';
import { useEffect, useRef } from 'react';

export function useGetChatClient(username, profilePicture, isSignedIn, setUnreadCount = null) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;

  const chatClientRef = useRef(StreamChat.getInstance(apiKey)); 

  useEffect(() => {
    const initChat = async () => { 
      const response = await fetch(`${apiBaseUrl}/api/messages/connect?username=${username}`, {
        method: 'GET',
      });
      const user = await response.json();
      const result = await chatClientRef.current.connectUser({
        id: username,
        name: username,
        image: profilePicture ?? 'https://getstream.io/random_svg/?name=Anders', // TODO: Use avatar if null
      }, user.Token); 

      if(setUnreadCount !== null) {
        setUnreadCount(chatClientRef.current.user.total_unread_count);
      }
    } 

    if(!chatClientRef.current.user && isSignedIn) {
      initChat(); 
    }    

    return () => {
      if(chatClientRef && chatClientRef.current.user && !isSignedIn) {
        const disconnectChat = async () => {
          await chatClientRef.current.disconnectUser(); 
        }
        disconnectChat();

      }
    } 
  }, [isSignedIn]);

  return chatClientRef.current;
}
