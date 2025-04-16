import { styles } from "./indexCategories.css";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Button from "../Button/Button";
import Link from "@mui/material/Link";

export default function IndexCategories() {
  const { t } = useTranslation(["common"]);
  const s = styles();
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/discover?category=${category}`);
  };

  return (
    <div className={s.container}>
      <div
        onClick={() => handleCategoryClick("landscape")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/landscape.jpeg")`,
        }}
      >
        {" "}
        <div className={s.category}>{t("common:themes:landscape")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("nature")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/nature.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:themes:nature")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("abstract")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/abstract.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:themes:abstract")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("figurative")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/figurative.png")`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:themes:figurative")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("sculpture")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/sculpture.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>{t("common:medium:sculpture")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("still-life")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/still-life.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>{t("common:themes:still-life")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("photography")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/photography.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:techniques:photography")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("mixed-media")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/mixed-media.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>{t("common:techniques:mixed-media")}</div>
      </div>
    </div>
  );
}
