import React, { useCallback, useState } from 'react';
import { ImageDropzone } from 'react-file-utils';
import { Attachment, logChatPromiseExecution, UserResponse } from 'stream-chat';
import {
  ChannelContextValue,
  ChatAutoComplete,
  EmojiPicker,
  MessageInputProps,
  StreamMessage,
  UploadsPreview,
  useChannelContext,
  useMessageInput,
} from 'stream-chat-react';

import MoodIcon from '@material-ui/icons/Mood';
import GifIcon from '@material-ui/icons/Gif';
import SendIcon from '@material-ui/icons/Send';


import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType,
} from '../MessagingTypes';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

const GiphyIcon = () => (
  <div className='giphy-icon__wrapper'>
    <GifIcon style={{ color: "white" }} />
  </div>
);

interface InputProps extends MessageInputProps {
  artwork: any,
}

const MessagingInput: React.FC<InputProps> = (props) => {
  const { acceptedFiles, maxNumberOfFiles, multipleUploads, sendMessage } = useChannelContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();
  const { artwork } = props;
  const { t } = useTranslation(['messages']);

  const [giphyState, setGiphyState] = useState(false);

  const overrideSubmitHandler = (message: {
    attachments: Attachment[];
    mentioned_users: UserResponse[];
    text: string;
    parent?: StreamMessage;
  }) => {
    let updatedMessage;

    if (message.attachments?.length && message.text?.startsWith('/giphy')) {
      const updatedText = message.text.replace('/giphy', '');
      updatedMessage = { ...message, text: updatedText };
    }

    if (giphyState) {
      const updatedText = `/giphy ${message.text}`;
      updatedMessage = { ...message, text: updatedText };
    }

    if (sendMessage) {
      const newMessage = updatedMessage || message;
      const parentMessage = newMessage.parent;

      const messageToSend = {
        ...newMessage,
        parent: parentMessage
          ? {
            ...parentMessage,
            created_at: parentMessage.created_at?.toString(),
            pinned_at: parentMessage.pinned_at?.toString(),
            updated_at: parentMessage.updated_at?.toString(),
          }
          : undefined,
      };

      const sendMessagePromise = sendMessage(messageToSend);
      logChatPromiseExecution(sendMessagePromise, 'send message');
    }

    setGiphyState(false);
  };

  const messageInput = useMessageInput({ ...props, overrideSubmitHandler });

  useEffect(() => {
    if (artwork) {
      var inputMessage = t('referToArtwork', { artwork })
      messageInput.insertText(inputMessage);
    }
  }, [artwork])

  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      const { value } = event.target;

      const deletePressed =
        event.nativeEvent instanceof InputEvent &&
          event.nativeEvent.inputType === 'deleteContentBackward'
          ? true
          : false;

      if (messageInput.text.length === 1 && deletePressed) {
        setGiphyState(false);
      }

      if (!giphyState && messageInput.text.startsWith('/giphy') && !messageInput.numberOfUploads) {
        event.target.value = value.replace('/giphy', '');
        setGiphyState(true);
      }

      messageInput.handleChange(event);
    },
    [giphyState, messageInput],
  );

  return (
    <div className='str-chat__messaging-input'>
      <div
        className='messaging-input__button emoji-button'
        role='button'
        aria-roledescription='button'
        onClick={messageInput.openEmojiPicker}
        ref={messageInput.emojiPickerRef}
      >
        <MoodIcon />
      </div>
      <ImageDropzone
        accept={acceptedFiles}
        handleFiles={messageInput.uploadNewFiles}
        multiple={multipleUploads}
        disabled={
          (maxNumberOfFiles !== undefined && messageInput.numberOfUploads >= maxNumberOfFiles) ||
          giphyState
        }
      >
        <div className='messaging-input__input-wrapper'>
          {giphyState && !messageInput.numberOfUploads && <GiphyIcon />}
          <UploadsPreview {...messageInput} />
          <ChatAutoComplete
            commands={messageInput.getCommands()}
            innerRef={messageInput.textareaRef}
            handleSubmit={messageInput.handleSubmit}
            onSelectItem={messageInput.onSelectItem}
            onChange={onChange}
            value={messageInput.text}
            rows={1}
            maxRows={props.maxRows}
            placeholder='Send a message'
            onPaste={messageInput.onPaste}
            triggers={props.autocompleteTriggers}
            grow={props.grow}
            disabled={props.disabled}
            additionalTextareaProps={props.additionalTextareaProps}
          />
        </div>
      </ImageDropzone>
      <div
        className='messaging-input__button'
        role='button'
        aria-roledescription='button'
        onClick={messageInput.handleSubmit}
      >
        <SendIcon />
      </div>
      <EmojiPicker {...messageInput} />
    </div>
  );
};

export default React.memo(MessagingInput);
