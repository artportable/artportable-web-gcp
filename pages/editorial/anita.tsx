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

export default function anita({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Anita Nyberg – måleriets oväntade uppvaknande</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Anita Nyberg – måleriets oväntade uppvaknande"
          />
          <meta
            property="og:title"
            content="Anita Nyberg – måleriets oväntade uppvaknande"
          />
          <meta property="og:image" content="/images/anitaone.jpg" />
          <meta
            property="og:description"
            content="Anita Nyberg – måleriets oväntade uppvaknande"
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/anita`} />
          <link rel="canonical" href={`${publicUrl}/editorial/anita`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/039b2a67-7dea-408b-a6fd-bd771e3071ed">
            <Image
              src={"/images/anitaone.jpg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Pastelll akvarell
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Anita Nyberg – måleriets oväntade uppvaknande
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-05-06</div>
            <br />
            <br />
            <div className={s.mainText}>
              Det började inte med en plan. Inte med en vision. Utan med en fas
              i livet där något nytt ville fram. Året var 2019 när Anita Nyberg,
              bosatt i Täby, Stockholm, kände att det var dags att väcka det
              kreativa som länge vilat i henne.
              <br />
              <br />
              – Den fasen jag var i livet just då… det var väl helt enkelt dags
              att få igång något kreativt, berättar hon.
              <br />
              <br />
              Hon började måla akvarell, utan större tanke på vad det skulle
              leda till. Men ganska snart blev hennes bilder uppmärksammade av
              andra. Några vänner såg potentialen i det hon skapade – och
              ordnade helt spontant hennes första vernissage. De fixade lokal
              och mingel, medan Anita ordnade med målningarna.
              <br />
              <br />
              – Det kom faktiskt lite överraskande. Jag hade inte planerat det
              själv, men det blev en fin start, även om det var oväntat mycket
              att stå i.
              <br />
              <br />
              Sedan dess har hennes konst utvecklats både tekniskt och
              uttrycksmässigt. Numera växlar hon mellan akvarell och akryl,
              ibland på duk, ibland på akrylpapper. Hon arbetar också med
              sprayfärg, pärlemor och glitter – material som tillför ett
              skimrande ljus och nya lager av betydelse.
              <br />
              <br />– Det kan bli lite mer glamouröst, lite roligare. Det
              glittrar till och ger målningen ett nytt perspektiv. Jag tycker om
              att leka med det.
              <br />
              <br />
              Det intuitiva är centralt i hennes skapande. Hon börjar inte med
              en idé, utan med färg, känsla och en inre rörelse. Tekniken har
              hon bland annat utvecklat genom kurser i{" "}
              <span style={{ fontStyle: "italic" }}>Vedic Art</span> med Curt
              Källman, där hon lärde sig att skapa från sitt inre – att måla
              utan mål.
              <br />
              <br />
              – Jag bara målar. Jag sätter mig, tar fram färgerna, penslar,
              svampar… och sen är jag igång. Ofta väldigt intensivt. Sen pausar
              jag, tittar, känner efter – och fortsätter.
              <br />
              <br />
              <div className={s.imageRow}>
                <div className={s.image}>
                  <Link href="https://artportable.com/art/522ea639-0d92-44a3-b83b-8e4263e63a47">
                    <Image
                      src={"/images/anitatwo.jpg"}
                      width={"400px"}
                      height={"300px"}
                      objectFit="contain"
                      quality={10}
                      priority
                    />
                  </Link>
                  <div style={{ fontStyle: "italic", textAlign: "center" }}>
                    Buketten
                  </div>
                </div>
                <div className={s.image}>
                  <Link href="https://artportable.com/art/66b3a7b2-2d49-46bf-a93f-4e7047033a12">
                    <Image
                      src={"/images/anitathree.jpg"}
                      width={"400px"}
                      height={"300px"}
                      objectFit="contain"
                      quality={10}
                      priority
                    />
                  </Link>

                  <div style={{ fontStyle: "italic", textAlign: "center" }}>
                    Glöd
                  </div>
                </div>
              </div>
              <br />
              <br />
              Hon berättar om en gång på en akvarellkurs när en annan deltagare
              sa: &quot;Det är som att du pratar med någon medan du målar&quot;.
              Anita hade aldrig tänkt på det så – men kände direkt igen sig.
              <br />
              <br />– Det kanske är precis det som händer. Jag har en slags inre
              dialog medan jag skapar.
              <br />
              <br />
              Anita målar fritt, utan förlaga, och sticker ofta ut i kursmiljöer
              där andra följer samma uppgift eller motiv. Hon följer alltid sin
              egen impuls – inte av trots, utan för att det är det enda som
              känns ärligt.
              <br />
              <br />– Det är mitt sätt att skapa, och det är det jag mår bra av.
              <br />
              <br />
              Hon beskriver sig som till största delen självlärd, även om hon
              har fått inspiration och stöd av kunniga lärare, inte minst
              Birgitta Kahri på ABF Stockholm. Tillsammans har de haft flera
              utställningar, och samarbetet har gett både trygghet och
              utveckling.
              <br />
              <br />
              – Birgitta har ett väldigt fint sätt att möta varje deltagare där
              den är. Hon låter mig måla i fred, men finns där med råd när jag
              behöver dem. Det har varit ett viktigt stöd.
              <br />
              <br />
              Hennes målningar är ofta livfulla, färgstarka, ibland romantiska –
              ibland milda och poetiska i pastell. De bär namn som{" "}
              <span style={{ fontStyle: "italic" }}>
                Hjärtat läker, Skönhet, In Heaven, Passion, Sorbet
              </span>
              . Varje titel rymmer en känsla, ett ögonblick, ett tillstånd.
              Många verk har särskild betydelse för henne, men hon tvekar att
              välja ett enskilt.
              <br />
              <br />– Det kanske låter pretentiöst att tycka så mycket om sina
              egna verk… men jag tror faktiskt att de flesta konstnärer gör det.
              Det är ju en del av en själv i varje målning.
              <br />
              <br />
              Det viktigaste för Anita är inte att förmedla ett budskap – utan
              att öppna upp för upplevelse. Hon blir som gladast när människor
              berättar att hennes konst gör dem glada.
              <br />
              <br />– Så sent som för ett par veckor sedan kom flera unga tjejer
              fram till mig i ateljén. De sa att de blev så glada av mina
              färger. Vi hade knappt pratat innan, men de hade sett mina verk.
              Det betydde mycket.
              <br />
              <br />
              För Anita är konsten en plats där hon får vara fri. Där livets
              mörker kan mötas med färg, humor och glädje. Där hon får måla –
              och kanske hjälpa andra att våga göra detsamma.
              <br />
              <br />– Jag tror verkligen att många skulle må bra av att måla
              fritt ibland. Det är läkande, på sätt vi kanske inte alltid
              förstår.
              <br />
              <br />
              Och kanske är det just det Anita Nybergs konst gör. Den förklarar
              inte. Den påstår inget. Den andas. Och ibland – glimrar den.
            </div>

            <br />

            <br />

            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/0ca381b2-f8a9-4337-8f8f-3c4fecec4a5f">
                  <Image
                    src={"/images/anitafour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Livet
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/cbb4c56e-8606-42c3-ae95-e0cfeb790d22">
                  <Image
                    src={"/images/anitafive.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Ljuset
                </div>
              </div>
            </div>
            <br />

            <br />
          </div>
          <div style={{ fontSize: "20px" }}>
            Se fler verk av:{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://artportable.com/profile/@anitanyberg"
            >
              Anita Nyberg
            </a>
          </div>
          <br />
          <div className={s.title}>Redo att hitta konst som känns?</div>
          <br />
          <div className={s.text}>
            Låt dig inspireras av konstnärer som skapar med hjärta, själ och
            berättelse. Utforska originalkonst direkt från konstnärer på &nbsp;
            <a
              style={{ textDecoration: "underline" }}
              href="https://artportable.com/discover"
            >
              Artportable.com
            </a>
          </div>
          <br />
          <br />
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
