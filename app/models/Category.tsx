import { Article } from "./Article";
import { Localization } from "./Localization";

export interface Category {
  id: number;
  name: any;
  slug: string;
  locale: string;
  created_at: any;
  updated_at: any;
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
