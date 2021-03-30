export interface FeedItem {
  Type: FeedItemType,
  User: string,
  ProfilePicture: string,
  Location: string,
  Published: Date,
  Likes: number,
  LikedByMe: boolean,
  Item: Item
}

interface Item {
  Id: string,
  PrimaryFile: string,
  SecondaryFile: string,
  TertiaryFile: string
}

export enum FeedItemType {
  Artwork,
  GroupPost
}