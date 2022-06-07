import Image from "./Image";

export default interface Artist {
  Username: string,
  ProfilePicture: string,
  Location: string,
  Images: Image[],
  Tags: string[],
  FollowedByMe: boolean,
  SocialId: string
}
