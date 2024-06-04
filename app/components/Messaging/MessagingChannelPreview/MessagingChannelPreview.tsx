// import React, { useEffect } from 'react';
// import {
//   ChannelPreviewUIComponentProps,
//   ChatContextValue,
//   useChatContext,
// } from 'stream-chat-react';

// import type { Channel } from 'stream-chat';

// import type {
//   AttachmentType,
//   ChannelType,
//   CommandType,
//   EventType,
//   MessageType,
//   ReactionType,
//   UserType,
// } from '../MessagingTypes';
// import clsx from 'clsx'
// import styles from './messagingChannelPreview.css'
// import { ChatAvatar } from '../MessagingUtils';

// const getTimeStamp = (channel: Channel) => {
//   let lastHours = channel.state.last_message_at?.getHours();
//   let lastMinutes: string | number | undefined = channel.state.last_message_at?.getMinutes();

//   if (lastHours === undefined || lastMinutes === undefined) {
//     return '';
//   }

//   if (lastMinutes.toString().length === 1) {
//     lastMinutes = `0${lastMinutes}`;
//   }

//   return `${lastHours}:${lastMinutes}`;
// };

// type Props = ChannelPreviewUIComponentProps & {
//   channel: Channel;
//   setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
//   setHasChannels: React.Dispatch<React.SetStateAction<boolean>>;
//   latestMessage?: string;
//   setActiveChannel?: ChatContextValue['setActiveChannel'];
//   resetReferTo: () => void;
// };

// const MessagingChannelPreview: React.FC<Props> = (props: Props) => {
//   const s = styles();
//   const { channel, latestMessage, setActiveChannel, setIsCreating, setHasChannels, unread, resetReferTo } = props;

//   const { channel: activeChannel, client } = useChatContext<
//     AttachmentType,
//     ChannelType,
//     CommandType,
//     EventType,
//     MessageType,
//     ReactionType,
//     UserType
//   >();

//   useEffect(() => setHasChannels(true), []);

//   const member = Object.values(channel.state.members).filter(
//     ({ user }) => user?.id !== client.userID,
//     ).find(m => true);

//   return (
//     <div
//       className={
//         clsx(
//           channel?.id === activeChannel?.id && 'selected',
//           'channel-preview__container',
//           unread > 0 && s.unread)
//       }
//       onClick={() => {
//         setIsCreating(false);
//         resetReferTo();
//         setActiveChannel?.(channel);
//       }}
//     >
//       <ChatAvatar image={member?.user?.image}/>
//       <div className='channel-preview__content-wrapper'>
//         <div className='channel-preview__content-top'>
//           <p className='channel-preview__content-name'>
//             {member?.user?.name ?? 'User'}
//           </p>
//           <p className='channel-preview__content-time'>{getTimeStamp(channel)}</p>
//         </div>
//         <p className='channel-preview__content-message'>{latestMessage || 'Send a message'}</p>
//       </div>
//     </div>
//   );
// };

// export default MessagingChannelPreview;
