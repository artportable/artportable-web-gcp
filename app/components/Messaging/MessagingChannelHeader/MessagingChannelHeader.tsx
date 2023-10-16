import React, { useEffect, useState } from 'react';
import { useChannelContext, useChatContext } from 'stream-chat-react';

import { TypingIndicator } from '../TypingIndicator/TypingIndicator';
import { ChatAvatar } from '../MessagingUtils';

import IconButton from '@material-ui/core/IconButton';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import type { ChannelMemberResponse } from 'stream-chat';

import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from '../MessagingTypes';

type Props = {
  theme: string;
  toggleMobile: () => void;
};

const MessagingChannelHeader: React.FC<Props> = (props) => {
  const { theme, toggleMobile } = props;

  const { client } = useChatContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  const { channel } = useChannelContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  const [channelName, setChannelName] = useState(channel.data?.name || '');
  const [title, setTitle] = useState('');

  const member = Object.values(channel.state.members || {}).filter(
    (member) => member.user?.id !== client?.user?.id,
  ).find(_ => true);

  useEffect(() => {
    if (!channelName) {
      setTitle(
        member?.user?.name || member?.user?.id || 'Unnamed User',
      );
    }
  }, [channelName, member]);
  return (
    <div className='messaging__channel-header'>
      <div id='mobile-nav-icon' className={`${theme}`} onClick={() => toggleMobile()}>
        <IconButton aria-label='mobile'>
          <PeopleAltIcon />
        </IconButton>
      </div>
      <ChatAvatar image={member?.user?.image}/>
      <div className='channel-header__name'>{channelName || title}</div>
      <div className='messaging__channel-header__right'>
        <TypingIndicator />
      </div>
    </div>
  );
};

export default React.memo(MessagingChannelHeader);
