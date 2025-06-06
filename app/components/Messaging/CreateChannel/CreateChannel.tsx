// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Avatar, useChatContext } from 'stream-chat-react';
// import type { UserResponse } from 'stream-chat';
// import _debounce from 'lodash/debounce';

// import { XButton } from './XButton'
// import { XButtonBackground } from './XButtonBackground'
// import Button from '../../Button/Button';

// import type {
//   AttachmentType,
//   ChannelType,
//   CommandType,
//   EventType,
//   MessageType,
//   ReactionType,
//   UserType,
// } from '../MessagingTypes';

// const UserResult = ({ user }: { user: UserResponse<UserType> }) => (
//   <li className='messaging-create-channel__user-result'>
//     <Avatar image={user.image} size={40} />
//     {user.online && <div className='messaging-create-channel__user-result-online' />}
//     <div className='messaging-create-channel__user-result__details'>
//       <span>{user.name}</span>
//     </div>
//   </li>
// );

// type Props = {
//   onClose: () => void;
//   toggleMobile: () => void;
// };

// const CreateChannel: React.FC<Props> = (props) => {
//   const { onClose, toggleMobile } = props;

//   const { client, setActiveChannel } = useChatContext<
//     AttachmentType,
//     ChannelType,
//     CommandType,
//     EventType,
//     MessageType,
//     ReactionType,
//     UserType
//   >();

//   const [focusedUser, setFocusedUser] = useState<number>();
//   const [inputText, setInputText] = useState('');
//   const [resultsOpen, setResultsOpen] = useState(false);
//   const [searchEmpty, setSearchEmpty] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<UserResponse<UserType>>(null);
//   const [users, setUsers] = useState<UserResponse<UserType>[]>([]);

//   const inputRef = useRef<HTMLInputElement>(null);

//   const clearState = () => {
//     setInputText('');
//     setResultsOpen(false);
//     setSearchEmpty(false);
//   };

//   useEffect(() => {
//     const clickListener = () => {
//       if (resultsOpen) clearState();
//     };

//     document.addEventListener('click', clickListener);

//     return () => document.removeEventListener('click', clickListener);
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const findUsers = async () => {
//     if (searching) return;
//     setSearching(true);

//     try {
//       const response = await client.queryUsers(
//         {
//           id: { $ne: client.userID as string },
//           $and: [
//             { name: { $autocomplete: inputText } },
//             { name: { $nin: ['Daniel Smith', 'Kevin Rosen', 'Jen Alexander'] } },
//           ],
//         },
//         { id: 1 },
//         { limit: 6 },
//       );

//       if (!response.users.length) {
//         setSearchEmpty(true);
//       } else {
//         setSearchEmpty(false);
//         setUsers(response.users);
//       }

//       setResultsOpen(true);
//     } catch (error) {
//       console.log({ error });
//     }

//     setSearching(false);
//   };

//   const findUsersDebounce = _debounce(findUsers, 100, {
//     trailing: true,
//   });

//   useEffect(() => {
//     if (inputText) {
//       findUsersDebounce();
//     }
//   }, [inputText]); // eslint-disable-line react-hooks/exhaustive-deps

//   const createChannel = async () => {
//     const selectedUserId = selectedUser?.id;

//     if (!selectedUserId || !client.userID) return;

//     const conversation = await client.channel('messaging', {
//       members: [selectedUserId, client.userID],
//     });

//     await conversation.watch();

//     setActiveChannel?.(conversation);
//     setSelectedUser(null);
//     setUsers([]);
//     onClose();
//   };

//   const addUser = (addedUser: UserResponse<UserType>) => {
//     setSelectedUser(addedUser);
//     setResultsOpen(false);
//     setInputText('');
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const removeUser = (user: UserResponse<UserType>) => {
//     setSelectedUser(null);
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const handleKeyDown = useCallback(
//     (event: KeyboardEvent) => {
//       // check for up(ArrowUp) or down(ArrowDown) key
//       if (event.key === 'ArrowUp') {
//         setFocusedUser((prevFocused) => {
//           if (prevFocused === undefined) return 0;
//           return prevFocused === 0 ? users.length - 1 : prevFocused - 1;
//         });
//       }
//       if (event.key === 'ArrowDown') {
//         setFocusedUser((prevFocused) => {
//           if (prevFocused === undefined) return 0;
//           return prevFocused === users.length - 1 ? 0 : prevFocused + 1;
//         });
//       }
//       if (event.key === 'Enter') {
//         event.preventDefault();
//         if (focusedUser !== undefined) {
//           addUser(users[focusedUser]);
//           return setFocusedUser(undefined);
//         }
//       }
//     },
//     [users, focusedUser], // eslint-disable-line
//   );

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown, false);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [handleKeyDown]);

//   return (
//     <div className='str-chat str-chat-channel messaging light'>
//       <div className='str-chat__container'>
//         <div className='messaging-create-channel'>
//           <header>
//             <div className='messaging-create-channel__left'>
//               <div className='messaging-create-channel__left-text'>To: </div>
//               <div className='users-input-container'>
//                 {!!selectedUser && (
//                   <div className='messaging-create-channel__users'>
//                       <div
//                         className='messaging-create-channel__user'
//                         onClick={() => removeUser(selectedUser)}
//                         key={selectedUser.id}
//                       >
//                         <div className='messaging-create-channel__user-text'>{selectedUser.name}</div>
//                         <XButton />
//                       </div>
//                   </div>
//                 )}
//                 <form>
//                   <input
//                     autoFocus
//                     ref={inputRef}
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     placeholder={!selectedUser ? 'Start typing for suggestions' : ''}
//                     type='text'
//                     className='messaging-create-channel__input'
//                   />
//                 </form>
//               </div>
//               <div className='close-mobile-create' onClick={() => onClose()}>
//                 <XButtonBackground />
//               </div>
//             </div>
//             <Button
//               size="small"
//               variant="contained"
//               color="primary"
//               disableElevation
//               onClick={createChannel}
//             >
//               Start chat
//             </Button>
//           </header>
//           {inputText && (
//             <main>
//               <ul className='messaging-create-channel__user-results'>
//                 {!!users?.length && !searchEmpty && (
//                   <div>
//                     {users.map((user, i) => (
//                       <div
//                         className={`messaging-create-channel__user-result ${
//                           focusedUser === i && 'focused'
//                         }`}
//                         onClick={() => addUser(user)}
//                         key={user.id}
//                       >
//                         <UserResult user={user} />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 {searchEmpty && (
//                   <div
//                     onClick={() => {
//                       inputRef.current?.focus();
//                       clearState();
//                     }}
//                     className='messaging-create-channel__user-result empty'
//                   >
//                     No people found...
//                   </div>
//                 )}
//               </ul>
//             </main>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(CreateChannel);
