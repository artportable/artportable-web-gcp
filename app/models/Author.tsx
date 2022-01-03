import { Picture } from "./CoverImage";

export interface Author {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  picture: Picture;
}