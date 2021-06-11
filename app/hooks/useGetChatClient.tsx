import Token from '../models/Token';
import { StreamChat } from 'stream-chat';

export function useGetChatClient(username, profilePicture) {
  console.log('in!')
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASEURL;
  const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
  const chatClient = StreamChat.getInstance(apiKey);

  fetch(`${apiBaseUrl}/api/messages/connect?username=${username}`, {
    method: 'GET',
  })
  .then(response => {
    return response.json();
  })
  .then((data: Token) => {
    console.log(data.Token)
    // TODO: Enable Auth Checks on app in the Stream dashboard before prod
    chatClient.connectUser(
      {
          id: username,
          name: username,
          image: profilePicture ?? 'https://getstream.io/random_svg/?name=Anders', // TODO: Use avatar if null
      },
      data.Token //chatClient.devToken(username)
    );
  })
  .then(() => {
    return chatClient;
  })
  .catch((error) => {
    console.log(error);
  });
}
