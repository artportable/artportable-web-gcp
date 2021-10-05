import React from "react";
import { StreamChat } from 'stream-chat';
import { AttachmentType, ChannelType, CommandType, EventType, MessageType, ReactionType, UserType } from '../components/Messaging/MessagingTypes';

export const ChatClientContext = React.createContext<StreamChat<
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType>>(null);
