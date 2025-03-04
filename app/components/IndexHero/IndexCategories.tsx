import { styles } from "./indexCategories.css";
import { useRouter } from "next/router";
import ackeberg from "./ackeberg.jpeg";
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
          backgroundImage: `url("/images/annabrandt.jpg")`,
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
          backgroundImage: `url("/images/plosjo.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:techniques:aquarelle")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("gouache")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/tindra.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%", // Keep full width
        }}
      >
        <div className={s.category}>{t("common:techniques:gouache")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("collage")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/christel.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>{t("common:techniques:collage")}</div>
      </div>
      <div
        onClick={() => handleCategoryClick("pastel")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/barbarapastell.jpg")`,
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
          backgroundImage: `url("/images/annabri.jpg")`,
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
