import { Localization } from "./Localization";

export interface ProductList {
  id: number;
  title: string;
  menuTitle: string;
  slug: string;
  topDescription: any;
  bottomDescription: any;
  metaTitle: string;
  metaDescription: any;
  tag: any;
  locale: string;
  ogImage: any;
  localizations: Localization[];
}