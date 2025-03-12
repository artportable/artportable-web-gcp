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

export default function dana({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Dana Ingessons inre landskap</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            property="og:title"
            content={"Mellan färg och stillhet – Dana Ingessons inre landskap"}
          />
          <meta property="og:image" content="/images/danatwo.jpeg" />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/7a6575cb-e877-43a5-ab31-e3ac346088e9">
            <Image
              src={"/images/danatwo.jpeg"}
              layout="fill"
              objectFit="cover"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic" }}>Seductive feelings</div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Mellan färg och stillhet – Dana Ingessons inre landskap
            </div>
            <br />
            <div className={s.mainText}>
              Dana Ingessons konstnärskap bjuder in till ett stilla samtal – där
              färg, form och stämning tillsammans väver fram berättelser som
              saknar början och slut. Hennes målningar rör sig i ett poetiskt
              landskap, där det sagda ofta döljer sig mellan linjerna, och det
              osagda får ta plats. – Jag ser min konst som en berättelse i
              ständig rörelse, inspirerad av den japanska filosofin Wabi Sabi,
              där det ofullkomliga, tillfälliga och åldrade ses som något
              vackert, säger hon. I hennes verk får det sköra och tidlösa leva
              sida vid sida – som en påminnelse om att allting förändras, men
              aldrig riktigt försvinner.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-03-12</div>
            <br />
            <br />
            <div className={s.title}>En livslång resa i bild och känsla</div>
            <br />
            <div className={s.text}>
              Att uttrycka sig genom färg och form har alltid varit en självklar
              del av Dana Ingessons liv. Hennes konstnärliga väg har kantats av
              starka milstolpar – som att ställa ut på Louvren nära Mona Lisa,
              och att motta ett pris i Cannes av Marina Picasso. Men det som
              driver henne vidare är något ännu djupare. – Det är den inre
              längtan att fortsätta berätta som får mig att skapa.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/30940408-bf4b-492e-a0f5-3dda4accff26">
                  <Image
                    src={"/images/danaone.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Tunes in the night</div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/f5097253-23f7-44da-83d7-d7a34204661f">
                  <Image
                    src={"/images/danathree.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Cozy narrow street</div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>
              Inspiration från vardagens sköra ögonblick
            </div>
            <div className={s.text}>
              Dana hämtar sin inspiration från vardagen – både det lilla och det
              stora. – Glädje, sorg, små ögonblick, stora händelser. Ett
              fragment av en dag kan bära en hel berättelse. Oavsett om hon
              arbetar i akvarell, akryl eller olja, bär hennes verk samma
              poetiska andning – men det är akvarellen som ligger henne allra
              närmast. – Den är den svåraste och mest levande tekniken, säger
              hon.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Mellan det figurativa och det abstrakta
            </div>
            <br />
            <div className={s.text}>
              Dana låter intuitionen leda skapandet. Ibland räcker en enda linje
              – andra gånger växer målningen långsamt fram. Ett särskilt verktyg
              i hennes process är palettkniven. – Den är kraftfull men känslig,
              och hjälper mig att både forma linjer och utmana tekniken.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Plats för betraktarens egen berättelse
            </div>
            <br />
            <div className={s.text}>
              För Dana handlar konsten inte bara om vad hon själv uttrycker –
              utan om vad betraktaren får uppleva. – Jag dukar fram bordet, men
              lämnar utrymme för att var och en ska skapa sin egen berättelse.
              Hon hoppas att hennes verk kan ge en stunds stillhet, en känsla av
              ljus i det mörka.
            </div>
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/e5c40580-3983-40fa-a2ac-75daa4302769">
                  <Image
                    src={"/images/danafour.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic" }}>The sounds of light</div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/deb4f4a5-760e-4e5d-bffe-b108c22f8f9e">
                  <Image
                    src={"/images/danafive.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>
                  Feeling of constant dance
                </div>
              </div>
            </div>
            <br />
            <div className={s.title}>Möten mellan konst och musik</div>
            <br />
            <div className={s.text}>
              Ett särskilt ögonblick i hennes karriär var när ett av hennes verk
              valdes ut till gitarristen Sam Desmets projekt Unity in Diversity,
              där målningen ackompanjerade en tolkning av Evert Taubes &quot;Så
              skimrande var aldrig havet&quot; – ett möte mellan bildkonst och
              musik, och en hedrande länk till en svensk ikon.
            </div>
            <br />
            <div className={s.title}>Ett landskap av minnen och stillhet</div>
            <br />
            <div className={s.text}>
              Konstkritikern Alexandra Konshakova har beskrivit Dana Ingessons
              målningar som &quot;minnen av landskap snarare än
              avbildningar&quot; – en formulering som Dana själv känner igen sig
              i. Hennes verk speglar ett inre landskap – färgat av nordisk
              natur, ljus och stillhet.
            </div>
            <br />
            <div className={s.title}>Konsten som livets poesi</div>
            <br />
            <div className={s.text}>
              För Dana är konsten mer än ett uttryck – den är ett sätt att leva,
              en plats där känslor får form och tankar får vila. I år väntar
              flera soloutställningar samt medverkan i den internationella
              akvarellutställningen Fabriano in Aquarello i Italien, där hon
              ännu en gång får representera Sverige på världsscenen.
            </div>
            <br />
            <div className={s.title}>Drömmen som bär vidare</div>
            <br />
            <div className={s.text}>
              Framtidsdrömmen är lika enkel som kraftfull. – Jag hoppas att
              konsten får bära mig vidare – över mörka vatten till ljusare
              strömmar.
            </div>
          </div>
          <br />
          <br />
          <div style={{ fontSize: "20px" }}>
            Se fler verk av:{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://artportable.com/profile/@dana-ingesson"
            >
              Dana Ingesson
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
