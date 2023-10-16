import React from 'react';
import { ChannelListTeamProps, useChannelContext, useChatContext } from 'stream-chat-react';

import { SkeletonLoader } from './SkeletonLoader';

import AddIcon from '@material-ui/icons/Add';

import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from '../MessagingTypes';
import { ChatAvatar } from '../MessagingUtils';
import { useEffect } from 'react';
import { Channel } from 'stream-chat';

type Props = ChannelListTeamProps & {
  onCreateChannel: () => void;
  setIsLoading: (value: boolean) => void;
  activeChannel: Channel;
};

const MessagingChannelList: React.FC<Props> = (props) => {
  const { children, error = false, loading, onCreateChannel, activeChannel, setIsLoading } = props;
  const { client, channel, setActiveChannel } = useChatContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (activeChannel) {
      setActiveChannel(activeChannel);
    }
  }, [])

  const { id, image, name = 'Unknown User' } =
    client.user || {};


  const ListHeaderWrapper: React.FC = ({ children }) => {
    return (
      <div className='messaging__channel-list'>
        <div className='messaging__channel-list__header'>
          <ChatAvatar image={image} />
          <div className='messaging__channel-list__header__name'>{name || id}</div>
          <button aria-label='start new conversation' className='messaging__channel-list__header__button' onClick={onCreateChannel}>
            <AddIcon />
          </button>
        </div>
        {children}
      </div>
    );
  };

  if (error) {
    return (
      <ListHeaderWrapper>
        <div className='messaging__channel-list__message'>
          Error loading conversations, please try again momentarily.
        </div>
      </ListHeaderWrapper>
    );
  }

  if (loading) {
    return (
      <ListHeaderWrapper>
        <div className='messaging__channel-list__message'>
          <SkeletonLoader />
        </div>
      </ListHeaderWrapper>
    );
  }

  return <ListHeaderWrapper>{children}</ListHeaderWrapper>;
};

export default React.memo(MessagingChannelList);
