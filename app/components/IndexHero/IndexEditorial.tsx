import Link from "@material-ui/core/Link";
import { styles } from "./indexEditorial.css";
import { useRouter } from "next/router";
import Image from "next/image";

export default function IndexEditorial() {
  const s = styles();
  const router = useRouter();

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div>
          <Link href="https://artportable.com/editorial/torleiv-agdestein-fran-geologi-till-maleri">
            <Image
              src={"/images/torleivarticle.jpeg"}
              width={"600px"}
              height={"300px"}
              objectFit="cover"
              quality={10}
              priority
            />
          </Link>
        </div>
        <div className={s.titles}>
          {" "}
          <Link
            href="https://artportable.com/editorial/torleiv-agdestein-fran-geologi-till-maleri"
            className={s.title}
          >
            Torleiv Agdestein – Från geologi till måleri
          </Link>{" "}
          <div>av Erik Nordlander</div>
          <div>Publicerat: 2025-03-10</div>
        </div>
      </div>
      <div className={s.wrapper}>
        <div>
          <Link href="https://artportable.com/editorial/fargsymfoni-med-naturen-som-kalla">
            <Image
              src={"/images/beritart2.jpeg"}
              width={"600px"}
              height={"300px"}
              objectFit="cover"
              quality={10}
              priority
            />
          </Link>
        </div>
        <div className={s.titles}>
          {" "}
          <Link
            href="https://artportable.com/editorial/fargsymfoni-med-naturen-som-kalla"
            className={s.title}
          >
            Färgsymfoni med naturen som källa: Berit Emstrands konstnärliga resa
          </Link>{" "}
          <div>av Erik Nordlander</div>
          <div>Publicerat: 2025-03-10</div>
        </div>
      </div>
    </div>
  );
}
