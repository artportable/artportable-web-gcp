import { ChannelMemberResponse } from "stream-chat";
import { UserType } from "./MessagingTypes";

export const getCleanImage = (member: ChannelMemberResponse<UserType>) => {
  if (!member?.user?.image) return '<AccountCircleIcon/>'; // TODO: Return <AccountCircleIcon/> & make sure user image is returned down below

  if (typeof member.user?.image === 'string' && member.user?.image?.includes('jen-avatar')) {
    return member.user?.image as string;
  }

  return member.user.image;
};
