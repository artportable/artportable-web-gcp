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
  Title: string,
  PrimaryFile: File,
  SecondaryFile: File,
  TertiaryFile: File
}

interface File {
  Name: string,
  Width: number,
  Height: number
}

export enum FeedItemType {
  Artwork,
  GroupPost
}