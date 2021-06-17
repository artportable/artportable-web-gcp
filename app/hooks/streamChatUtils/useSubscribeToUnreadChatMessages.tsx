import { useEffect } from "react";
import { useGetChatClient } from "../useGetChatClient";

export const useSubscribeToUnreadChatMessages = (username, isSignedIn, profilePicture = null, setUnreadChatMessages) => {
  const chatClient = useGetChatClient(username, profilePicture, isSignedIn, setUnreadChatMessages);

  useEffect(() => {
    if(chatClient) {
      chatClient.on((event) => {
        if (event.total_unread_count !== undefined) {
          setUnreadChatMessages(event.total_unread_count);
        }
      });
      
    }

    return () => {
      chatClient.off((_) => {});
    }
  }, [chatClient]);
}

export default useSubscribeToUnreadChatMessages;