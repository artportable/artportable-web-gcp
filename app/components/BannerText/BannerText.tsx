import { styles } from "./bannerText.css";
import { useTranslation } from "next-i18next";

type BannerTextProps = {
  title: string;
  text: string;
  page?: boolean;
};

export default function BannerText({ title, text, page }: BannerTextProps) {
  const s = styles();

  return (
    <div className={s.container} style={{ alignItems: page ? "flex-start" : "flex-start" }}>
      <div className={s.title} style={{ marginLeft: page ? "50px" : "50px" }}>{title}</div>
      <div className={s.text} style={{ marginLeft: page ? "50px" : "50px" }}>{text}</div>
    </div>
  );
}
