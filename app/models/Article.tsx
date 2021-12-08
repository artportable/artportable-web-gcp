import { Author } from "./Author";
import { Category, PublishCategory } from "./Category";
import { CoverImage } from "./CoverImage";
import { Localization } from "./Localization";

export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  publishCategory: PublishCategory;
  locale: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  coverImage: CoverImage;
  authors?: Author[];
  categories?: Category[];
  localizations: Localization[];
}
