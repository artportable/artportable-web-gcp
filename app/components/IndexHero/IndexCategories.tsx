import { styles } from "./indexCategories.css";
import { useRouter } from "next/router";

export default function IndexCategories() {
  const s = styles();
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/discover?category=${category}`);
  };

  return (
    <div className={s.container}>
      <div onClick={() => handleCategoryClick("oil")} className={s.item}>
        Olja
      </div>
      <div onClick={() => handleCategoryClick("acrylic")} className={s.item}>
        Akryl
      </div>
      <div onClick={() => handleCategoryClick("aquarelle")} className={s.item}>
        Akvarell
      </div>
      <div onClick={() => handleCategoryClick("gouache")} className={s.item}>
        Gouache
      </div>
      <div onClick={() => handleCategoryClick("textile")} className={s.item}>
        Textil
      </div>
      <div onClick={() => handleCategoryClick("ceramic")} className={s.item}>
        Ceramics
      </div>
      <div onClick={() => handleCategoryClick("acrylic")} className={s.item}>
        News
      </div>
      <div onClick={() => handleCategoryClick("acrylic")} className={s.item}>
        More art
      </div>
    </div>
  );
}
