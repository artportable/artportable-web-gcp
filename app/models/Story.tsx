import Image from "./Image";

export interface Story {
  Id: string;
  Slug: string;
  Title: string;
  Description: string;
  Published: Date;
  PrimaryFile: Image;
  SecondaryFile: Image;
  TertiaryFile: Image;
  Name: string;
  Surname: string;
  Username: string;
  ProfilePicture: string;
  Exhibition: boolean;
  IsBoosted: boolean;
}

export interface StoryForCreation {
  Title: string;
  Description: string;
  PrimaryFile: Image;
  SecondaryFile: Image;
  TertiaryFile: Image;
  Exhibition: boolean;
}
