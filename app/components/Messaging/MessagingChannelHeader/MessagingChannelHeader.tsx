import React, { useEffect, useRef, useState } from 'react';
import { Avatar, useChannelContext, useChatContext } from 'stream-chat-react';

import { TypingIndicator } from '../TypingIndicator/TypingIndicator';
import { getCleanImage } from '../MessagingUtils';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

const AvatarGroup = ({ members }: { members: ChannelMemberResponse[] }) => {
  if (members.length === 1) {
    return (
      <div className='messaging__channel-header__avatars'>
        <Avatar image={getCleanImage(members[0])} size={40} />;
      </div>
    );
  }

  if (members.length === 2) {
    return (
      <div className='messaging__channel-header__avatars two'>
        <span>
          <Avatar image={getCleanImage(members[0])} shape='square' size={40} />
        </span>
        <span>
          <Avatar image={getCleanImage(members[1])} shape='square' size={40} />
        </span>
      </div>
    );
  }

  if (members.length === 3) {
    return (
      <div className='messaging__channel-header__avatars three'>
        <span>
          <Avatar image={getCleanImage(members[0])} shape='square' size={40} />
        </span>
        <span>
          <Avatar image={getCleanImage(members[1])} shape='square' size={20} />
          <Avatar image={getCleanImage(members[2])} shape='square' size={20} />
        </span>
      </div>
    );
  }

  if (members.length >= 4) {
    return (
      <div className='messaging__channel-header__avatars four'>
        <span>
          <Avatar image={getCleanImage(members[members.length - 1])} shape='square' size={20} />
          <Avatar image={getCleanImage(members[members.length - 2])} shape='square' size={20} />
        </span>
        <span>
          <Avatar image={getCleanImage(members[members.length - 3])} shape='square' size={20} />
          <Avatar image={getCleanImage(members[members.length - 4])} shape='square' size={20} />
        </span>
      </div>
    );
  }

  return null;
};

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

  const members = Object.values(channel.state.members || {}).filter(
    (member) => member.user?.id !== client?.user?.id,
  );

  useEffect(() => {
    if (!channelName) {
      setTitle(
        members.map((member) => member.user?.name || member.user?.id || 'Unnamed User').join(', '),
      );
    }
  }, [channelName, members]);

  return (
    <div className='messaging__channel-header'>
      <div id='mobile-nav-icon' className={`${theme}`} onClick={() => toggleMobile()}>
        <MenuIcon />
      </div>
      <AvatarGroup members={members} />
      <div className='channel-header__name'>{channelName || title}</div>
      <div className='messaging__channel-header__right'>
        <TypingIndicator />
      </div>
    </div>
  );
};

export default React.memo(MessagingChannelHeader);
