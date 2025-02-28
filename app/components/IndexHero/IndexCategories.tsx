import { styles } from "./indexCategories.css";
import { useRouter } from "next/router";
import ackeberg from "./ackeberg.jpeg";

export default function IndexCategories() {
  const s = styles();
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/discover?category=${category}`);
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
        <div className={s.category}>Olja</div>
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
        <div className={s.category}>Akryl</div>
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
        <div className={s.category}>Akvarell</div>
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
        <div className={s.category}>Gouache</div>
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
        <div className={s.category}>Collage</div>
      </div>
      <div
        onClick={() => handleCategoryClick("pastell")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/barbarapastell.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>Pastell</div>
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
        <div className={s.category}>Mixed Media</div>
      </div>
      <div
        onClick={() => handleCategoryClick("naked")}
        className={s.item}
        style={{
          backgroundImage: `url("/images/marieplosjo.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <div className={s.category}>Naket</div>
      </div>
    </div>
  );
}
