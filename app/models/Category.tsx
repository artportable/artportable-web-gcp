import { Article } from "./Article";
import { Localization } from "./Localization";

export interface Category {
  id: number;
  name: string;
  slug: string;
  locale: string;
  created_at: Date;
  updated_at: Date;
  localizations: Localization[];
  articles: Article[];
}

export interface PublishCategory {
  id: number;
  name: string;
  slug: string;
  locale: string;
  created_at: Date;
  updated_at: Date;
}