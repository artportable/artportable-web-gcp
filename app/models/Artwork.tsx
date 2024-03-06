import Image from "./Image";
import Owner from "./Owner";

export interface Artwork {
  Id: string;
  Owner: Owner;
  Title: string;
  Description: string;
  Published: Date;
  Price: number;
  Currency: string;
  SoldOut: boolean;
  MultipleSizes: boolean;
  Width: number;
  Height: number;
  Depth: number;
  PrimaryFile: Image;
  SecondaryFile: Image;
  TertiaryFile: Image;
  Tags: Array<any>;
  Likes: number;
  LikedByMe: boolean;
  Name: string;
  Surname: string;
  Username: string;
  Promoted: boolean;
}

export interface ArtworkForCreation {
  Title: string;
  Description: string;
  Price: number;
  Currency: string;
  SoldOut: boolean;
  MultipleSizes: boolean;
  Width: number;
  Height: number;
  Depth: number;
  PrimaryFile: Image;
  SecondaryFile: Image;
  TertiaryFile: Image;
  Tags: Array<any>;
}
