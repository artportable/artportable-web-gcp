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
          <Link href="https://artportable.com/editorial/rachel-mohlin">
            <Image
              src={"/images/racheltwo.jpeg"}
              width={"600px"}
              height={"300px"}
              objectFit="cover"
              priority
              quality={10}
            />
          </Link>
        </div>
        <div className={s.titles}>
          {" "}
          <Link
            href="https://artportable.com/editorial/rachel-mohlin"
            className={s.titleTwo}
          >
            Rachel Mohlin – &quot;Jag kommer lämna lögner efter mig&quot;
          </Link>{" "}
          <div>av Erik Nordlander</div>
          <div>Publicerat: 2025-03-28</div>
        </div>
      </div>

      <div className={s.wrapperTwo}>
        <div className={s.wrapperGrid}>
          <div className={s.imageText}>
            <div>
              <Link href="https://artportable.com/editorial/onneby">
                <Image
                  src={"/images/onneby.jpeg"}
                  width={"600px"}
                  height={"300px"}
                  objectFit="cover"
                  priority
                  quality={10}
                />
              </Link>
            </div>
            <div className={s.titles}>
              {" "}
              <Link
                href="https://artportable.com/editorial/onneby"
                className={s.titleGrid}
              >
                Anneli Önneby – konstnären som lyssnar till djurens berättelser
              </Link>{" "}
              <div>av Erik Nordlander</div>
              <div>Publicerat: 2025-03-25</div>
            </div>
          </div>
        </div>
        <div className={s.wrapperGrid}>
          <div className={s.imageText}>
            <div>
              <Link href="https://artportable.com/editorial/vesterlund">
                <Image
                  src={"/images/vesterlundthree.jpeg"}
                  width={"600px"}
                  height={"300px"}
                  objectFit="cover"
                  priority
                  quality={10}
                />
              </Link>
            </div>
            <div className={s.titles}>
              {" "}
              <Link
                href="https://artportable.com/editorial/vesterlund"
                className={s.titleGrid}
              >
                Färg, harmoni och naturens energi – Therese Vesterlund om sin
                väg in i måleriet
              </Link>{" "}
              <div>av Erik Nordlander</div>
              <div>Publicerat: 2025-03-20</div>
            </div>
          </div>
        </div>
        <div className={s.wrapperGrid}>
          <div className={s.imageText}>
            <div>
              <Link href="https://artportable.com/editorial/lars-kallgren">
                <Image
                  src={"/images/larsthree.jpeg"}
                  width={"600px"}
                  height={"300px"}
                  objectFit="cover"
                  priority
                  quality={10}
                />
              </Link>
            </div>
            <div className={s.titles}>
              {" "}
              <Link
                href="https://artportable.com/editorial/lars-kallgren"
                className={s.titleGrid}
              >
                Lars Källgren fångar barndomens magi i ny utställning på Galleri
                Risberg
              </Link>{" "}
              <div>av Erik Nordlander</div>
              <div>Publicerat: 2025-03-19</div>
            </div>
          </div>
        </div>
        <div className={s.wrapperGrid}>
          <div className={s.imageText}>
            <div>
              <Link href="https://artportable.com/editorial/konst-for-livet">
                <Image
                  src={"/images/arttwo.jpeg"}
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
                href="https://artportable.com/editorial/konst-for-livet"
                className={s.titleGrid}
              >
                Del 1: Konst för livet – en köpguide
              </Link>{" "}
              <div>av Erik Nordlander</div>
              <div>Publicerat: 2025-03-13</div>
            </div>
          </div>
        </div>
        <div className={s.wrapperGrid}>
          <div className={s.imageText}>
            <div>
              <Link href="https://artportable.com/editorial/mellan-farg">
                <Image
                  src={"/images/danatwo.jpeg"}
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
                href="https://artportable.com/editorial/mellan-farg"
                className={s.titleGrid}
              >
                Mellan färg och stillhet – Dana Ingessons inre landskap
              </Link>{" "}
              <div>av Erik Nordlander</div>
              <div>Publicerat: 2025-03-12</div>
            </div>
          </div>
        </div>
        <div className={s.wrapperGrid}>
          <div className={s.imageText}>
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
                className={s.titleGrid}
              >
                Torleiv Agdestein – Från geologi till måleri
              </Link>{" "}
              <div>av Erik Nordlander</div>
              <div>Publicerat: 2025-03-10</div>
            </div>
          </div>
        </div>{" "}
        <div className={s.wrapperGrid}>
          <div className={s.imageText}>
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
                className={s.titleGrid}
              >
                Färgsymfoni med naturen som källa: Berit Emstrands konstnärliga
                resa
              </Link>{" "}
              <div>av Erik Nordlander</div>
              <div>Publicerat: 2025-03-10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
