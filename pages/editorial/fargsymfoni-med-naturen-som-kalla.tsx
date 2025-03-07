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

export default function berit({ navBarItems }) {
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
            content={
              "Färgsymfoni med naturen som källa: Berit Emstrands konstnärliga resa"
            }
          />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/ec01b296-536b-43be-bbdc-8203b728219b">
            <Image
              src={"/images/beritart1.jpeg"}
              layout="fill"
              objectFit="cover"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", marginLeft: "10px" }}>Frihet</div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Färgsymfoni med naturen som källa: Berit Emstrands konstnärliga
              resa
            </div>
            <br />
            <div className={s.mainText}>
              Berit Emstrand är en konstnär vars akvarellmålningar återspeglar
              en djup förbundenhet med naturen. Från en uppväxt på en lantgård i
              Småland till en passionerad karriär som konstnär och pedagog, har
              naturens skiftningar och djurliv alltid varit en central
              inspirationskälla.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-03-06</div>
            <br />
            <br />
            <div className={s.title}>En uppväxt i naturens fåra</div>
            <br />
            <div className={s.text}>
              Emstrands konstnärliga resa tog sin början i barndomens skogar.
              Att växa upp omgiven av djur och natur lade grunden för hennes
              konstnärliga uttryck. Som barn tillbringade hon otaliga timmar i
              skogen, tecknande och utforskande. Tidiga motiv bestod av
              detaljerade skisser av blommor, grenar och djur. <br />
              <br /> Fåglar har en särskild plats i hennes konst. Barndomens
              närhet till bondgårdens djur väckte intresset för att avbilda
              levande varelser, och med åren kom hon att fånga både vilda och
              tama djur i sina verk. Fåglar, särskilt tranor och ugglor, har
              blivit ett återkommande motiv. Hon fascineras av deras graciösa
              rörelser och särpräglade kroppsspråk.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div>
                <Link href="https://artportable.com/art/1186b651-c622-4f97-9f90-934568b3b942">
                  <Image
                    src={"/images/beritart2.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>
                  För alltid tillsammans
                </div>
              </div>

              <div>
                <Link href="https://artportable.com/art/e8a20d2f-67e4-4c6a-8531-132c2c2fac08">
                  <Image
                    src={"/images/beritart3.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Trandans</div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Skapandets process och inspiration</div>
            <div className={s.text}>
              Den småländska naturen och flyttfåglarnas ankomst på våren
              inspirerar Emstrand. Med kameran som verktyg samlar hon
              referensbilder av landskap, vattendrag och djur, vilka hon sedan
              omvandlar till konstverk. Många av hennes målningar återspeglar
              Émådalen och dess vidsträckta slätter. <br /> Emstrands kreativa
              process inbegriper noggrann skissning och experimenterande med
              färgkombinationer. Hon utforskar balansen mellan inre känslor och
              yttre intryck och låter ibland färgen flöda spontant i mer
              abstrakta verk.
            </div>
            <br />
            <br />
            <div className={s.title}>Mytologi och konst</div>
            <br />
            <div className={s.text}>
              Folktrons väsen har också inspirerat Emstrand, vilket syns i verk
              som &quot;Näcken och skogsrået&quot;. Hennes konst fångar en
              dialog mellan människan och naturen, där människan växer samman
              med träd och landskap i ett evigt kretslopp.
            </div>
            <br />
            <br />
            <div className={s.title}>Teknik och material</div>
            <br />
            <div className={s.text}>
              Akvarell är hennes huvudsakliga medium, men hon arbetar även med
              olja och akryl. Hon värderar akvarellens spontanitet och
              utmaningen i att kontrollera dess flöde. Genom att blanda färger
              för att hitta rätt nyanser och ljusspel skapar hon målningar med
              djup och liv. Hon arbetar ofta med flera verk samtidigt, växlar
              mellan tekniker och använder olika penslar för att skapa variation
              i struktur och uttryck. Hennes process är en balans mellan
              planering och spontanitet.
            </div>
            <br />
            <div className={s.imageRow}>
              <div>
                <Link href="https://artportable.com/art/332571ea-8d37-4ec5-bc08-18c757005ac0">
                  <Image
                    src={"/images/berit4.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                  />
                </Link>
                <div style={{ fontStyle: "italic" }}>Tranor i vildmarken</div>
              </div>
              <div>
                <Link href="https://artportable.com/art/18a81c75-2fc1-475b-9f2c-0ebc7384a80b">
                  <Image
                    src={"/images/berit5.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Tranor i skymning</div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Utställningar och framtidsplaner</div>
            <br />
            <div className={s.text}>
              Emstrand har deltagit i flera utställningar, bland annat i
              Hultsfred, Göteborg, Stockholm och på Solkustens Konstrunda.
              Kommande utställningar inkluderar en separatutställning på Galleri
              Risberg samt en utställning på Liljeholmen, båda är i Stockholm.
              Hon förbereder också nya verk för sin permanenta utställning i
              Bockara, där hon visar en blandning av landskap, djur och
              mytologiska teman.
            </div>
            <br />
            <br />
            <div className={s.title}>Pedagogik och kursverksamhet</div>
            <br />
            <div className={s.text}>
              Som bildlärare och kursledare delar Emstrand sin kunskap med andra
              konstintresserade. Hon strävar efter att inspirera sina deltagare
              och introducerar nya tekniker och teman, inklusive experimentellt
              akvarellmåleri och blandtekniker.
            </div>
            <br />
            <br />
            <div className={s.title}>Konst som livskraft</div>
            <br />
            <div className={s.text}>
              Konsten är för Emstrand en fast punkt, en plats för reflektion och
              uttryck. Hennes bilder förmedlar lugn, harmoni och en kärlek till
              naturen. Hon hoppas att betraktarna finner glädje och hopp i
              hennes verk och ser fram emot att fortsätta utforska nya material
              och motiv. Med en ständigt växande inre kö av idéer fortsätter
              Berit Emstrand att skapa konst som fångar naturens skönhet och
              magi.
            </div>
          </div>
          <br />
          <br />
          <div style={{ fontSize: "20px" }}>
            Se fler verk av Berit:{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://artportable.com/profile/@berit.emstrand"
            >
              Berit Emstrand Portfolio
            </a>
          </div>
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
