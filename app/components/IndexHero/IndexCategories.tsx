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
    router.push(`/latestart?category=${category}`);
  };

  return (
    <div className={s.container}>
      <div
        onClick={() => handleCategoryClick("oil")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/thoralf.jpg")`,
        }}
      >
        {" "}
        <div className={s.category}>{t("common:techniques:oil")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("acrylic")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/lovisacarlman.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:techniques:acrylic")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("aquarelle")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/mimmi.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:techniques:aquarelle")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("realism")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/bob.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:themes:realism")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("photography")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/thune.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>{t("common:techniques:photography")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("pastel")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/tove.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>{t("common:techniques:pastel")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("mixed-media")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/tanzi.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:techniques:mixed-media")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("nude")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/marieplosjo.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>{t("common:themes:nude")}</div>
      </div>
    </div>
  );
}
