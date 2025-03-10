import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Main from "../../app/components/Main/Main";
import ArtistsIndex from "../../app/components/Artists/ArtistsIndex";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "@material-ui/core/Link";
import { styles } from "../../styles/editorial.css";

export default function torleiv({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Torleiv Agdestein – Från geologi till måleri</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <link rel="canonical" href={`${publicUrl}/editorial`} />
          <meta
            property="og:title"
            content={"Torleiv Agdestein – Från geologi till måleri"}
          />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.site/art/9e655057-6329-4034-b85d-88599ccd6053">
            <Image
              src={"/images/torleivarticle.jpeg"}
              layout="fill"
              objectFit="cover"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic" }}>Vindstille i Fjæra</div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Torleiv Agdestein – Från geologi till måleri
            </div>
            <br />
            <div className={s.mainText}>
              Efter 42 år som geolog tog Torleiv Agdestein en drastisk vändning
              i livet och blev konstnär på heltid. En ryggoperation blev den
              avgörande faktorn som fick honom att omvärdera sin tillvaro. Under
              återhämtningsperioden upptäckte han på nytt naturens färger,
              årstidernas skiftningar och landskapens unika karaktär. Inspirerad
              av kurser i Italien, Frankrike och Spanien, samt ett möte med den
              norska konstnären Odd Emil Skullerud, tog han steget in i
              måleriets värld och började gestalta sina upplevelser på duk.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-03-06</div>
            <br />
            <br />
            <div className={s.title}>
              Skandinaviska kuster och konstnärliga influenser
            </div>
            <br />
            <div className={s.text}>
              Torleivs verk kännetecknas av färgstarka och figurativa
              skildringar av skandinaviska kustlandskap. Hans motiv består ofta
              av hällmarker, hav, öar och träd i förgrunden, där speglingar och
              ljuskontraster spelar en central roll. Han strävar efter att skapa
              en balans mellan kraftfulla färger och harmoniska kompositioner,
              vilket ger bilderna både liv och djup. <br /> <br /> Bland hans
              största konstnärliga inspirationskällor återfinns Edvard Munch,
              Vincent van Gogh, Harald Sohlberg och Edward Hopper. Han har
              experimenterat med deras tekniker genom att måla
              &quot;coverversioner&quot; av kända verk och skapa mash-ups där
              klassiska motiv kombineras på nya sätt. Exempelvis har han använt
              van Goghs expressiva penseldrag, Munchs förenklade naturformer och
              Hoppers dramatiska ljusspel för att utveckla sin egen konstnärliga
              stil.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.site/art/9e655057-6329-4034-b85d-88599ccd6053">
                  <Image
                    src={"/images/torleivarticle.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Vindstille i Fjæra</div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.site/art/91d7a500-b58f-49b2-b410-c04da73da392">
                  <Image
                    src={"/images/torleivart2.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Nattseilas</div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Geologins inflytande på konsten</div>
            <div className={s.text}>
              Hans bakgrund som geolog syns tydligt i hans konst. Kustlinjer och
              stenformationer i hans målningar är ofta präglade av en djup
              förståelse för landskapets geologiska historia. Hans serie
              &quot;Subscapes&quot; är inspirerad av jordskorpans deformationer
              och skildrar abstrakta vertikala snitt av underjordiska strukturer
              – en konstnärlig tolkning av geologiska processer.
            </div>
            <br />
            <br />
            <div className={s.title}>Kärleken till kusten</div>
            <br />
            <div className={s.text}>
              Att bo vid havet har format både Torleivs liv och konstnärskap.
              Från barndomens seglatser i Oslofjorden till nuvarande boende vid
              kusten i Moss, har havet alltid varit en källa till inspiration.
              Han fascineras av skärgårdens ständigt skiftande former och ljus,
              något som tydligt speglas i hans målningar.
            </div>
            <br />
            <br />
            <div className={s.title}>Skapandeprocessen</div>
            <br />
            <div className={s.text}>
              Torleivs måleri börjar ofta med fotografier av landskap som berört
              honom. Dessa fungerar som referenser, men under själva
              målarprocessen frigör han sig från fotografiets detaljer och låter
              känslan styra. Målet är att förmedla en förstärkt version av
              verkligheten, där färger, former och kontraster skapar en
              suggestiv och levande bildvärld.
            </div>
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.site/art/9e55ab3a-ba25-4042-a754-025aaa46ee44">
                  <Image
                    src={"/images/torleivart3.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic" }}>
                  Levd Siv ved levd Brygge
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.site/art/0b09ecde-865b-479e-b161-6534c6e8c9a3">
                  <Image
                    src={"/images/torleivart4.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Høysommer og Høyvann</div>
              </div>
            </div>
            <br />
            <div className={s.title}>Utställningar och framtidsplaner</div>
            <br />
            <div className={s.text}>
              Utställningar har spelat en stor roll i Torleivs konstnärliga
              utveckling. Han har haft 28 utställningar, varav nio
              soloutställningar. Möten med betraktare har gett honom insikt och
              inspiration att fortsätta utvecklas. Han planerar att ställa ut
              mer internationellt, med nyligen genomförda utställningar i
              Tyskland och Sverige. I september 2025 är en större utställning
              planerad på Gulden Kunstverk i Norge, och framtida mål inkluderar
              fler utställningar i både Norge och utlandet. <br />
              <br /> Hans förhoppning är att betraktare ska finna något att
              fördjupa sig i när de ser hans verk – en känsla av närvaro och
              dialog med motivet. Oavsett om det är en ensam klippa i havet
              eller ett kustlandskap badande i kvällsljus, strävar han efter att
              skapa konst som talar till både ögat och själen.
            </div>
          </div>
          <div></div>
        </div>
      </Main>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
        "footer",
        "feed",
        "support",
        "plans",
      ])),
    },
    revalidate: 60,
  };
}
