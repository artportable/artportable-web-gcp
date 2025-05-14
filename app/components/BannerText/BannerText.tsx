import { styles } from "./bannerText.css";
import { useTranslation } from "next-i18next";

type BannerTextProps = {
  title: string;
  text: string;
};

export default function BannerText({ title, text }: BannerTextProps) {
  const s = styles();

  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>
      <div className={s.text}>{text}</div>
    </div>
  );
}
