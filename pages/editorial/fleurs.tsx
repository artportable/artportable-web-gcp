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

export default function fleurs({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>The Fleurs: På gränsen mellan dröm och verklighet</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="The Fleurs: På gränsen mellan dröm och verklighet"
          />
          <meta
            property="og:title"
            content="The Fleurs: På gränsen mellan dröm och verklighet"
          />
          <meta property="og:image" content="/images/fleurstwo.jpg" />
          <meta
            property="og:description"
            content="– Jag vandrar på gränsen mellan mörker och ljus och märker ut min
            väg med krita så att jag hittar tillbaka när min existens blir
            evig, säger Emely. "
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/fleurs`} />
          <link rel="canonical" href={`${publicUrl}/editorial/fleurs`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/ef93c6e3-a8a8-4aa3-a98d-032b1330b612">
            <Image
              src={"/images/fleursone.jpeg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Rev.8:10-11-Third trumpet ( wormwood)
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              The Fleurs: På gränsen mellan dröm och verklighet
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-05-12</div>
            <br />
            <br />
            <div className={s.mainText}>
              The Fleurs – alias för konstnären Emely Fleur – är en visionär
              kreatör som rör sig i skärningspunkten mellan ljus och mörker,
              dröm och mardröm. Hennes konstnärskap präglas av en djup
              fascination för gränslandet mellan verklighet och fantasi – en
              plats där identiteten ständigt omformas och där mening uppstår i
              mötet mellan motsatser.
              <br />
              <br />
              – Jag vandrar på gränsen mellan mörker och ljus och märker ut min
              väg med krita så att jag hittar tillbaka när min existens blir
              evig, säger Emely. Genom sitt alter ego The Fleurs förkroppsligar
              hon detta gränsland – många ansikten men samtidigt inget – ett
              konstnärskap som speglar människans sökande efter att förstå sig
              själv.
              <br />
              <br />
              <div className={s.title}>Ett nytt kapitel: Endtime Fantasies</div>
              <br />
              <div className={s.mainText}>
                2025 blir ett avgörande år för The Fleurs, då hon presenterar
                kapitel två av sin konstnärliga forskning{" "}
                <span style={{ fontStyle: "italic" }}>Endtime Fantasies</span>.
                Medan det första kapitlet utforskade apokalypsen genom samtidens
                bilder, leder det andra oss in i en postapokalyptisk värld.
                Genom fotomontage och collage fortsätter Emely att sammanfoga
                sin vardag med apokalyptiska symboler och referenser – men denna
                gång med ett nytt perspektiv.
                <br />
                <br />– I{" "}
                <span style={{ fontStyle: "italic" }}>
                  Endtime Fantasies
                </span>{" "}
                sammanfogade jag bilder från min vardag med
                nyhetsrapporteringens bildspråk och symboler från olika
                apokalyptiska berättelser. Nu bygger jag vidare på samma metod,
                men med fotografier från resor, främst Asien, där naturens
                skönhet ställs mot dess mörka historia. Detta kombineras med
                AI-genererat material, som tillsammans bildar min vision av en
                postapokalyps, berättar Emely.
                <br />
                <br />
                Kapitel två presenteras successivt på olika utställningar under
                året. Bland annat visas verken på Alviks bibliotek i augusti och
                på Hornstulls bibliotek i december. Den stora soloutställningen
                på Galleri 86 den 12–16 september blir en höjdpunkt, där både
                kapitel ett och två möts. På Affordable Art Fair kommer hon även
                att visa unika verk som, trots att de är fristående, har sitt
                ursprung i samma kreativa process.
              </div>
              <br />
              <div className={s.title}>Från mardröm till vision</div>
              <br />
              <div className={s.mainText}>
                När The Fleurs avslutade{" "}
                <span style={{ fontStyle: "italic" }}>Endtime Fantasies</span>{" "}
                trodde hon att temat apokalypsen var avslutat. Men responsen
                från publiken och världshändelserna gjorde det omöjligt att
                släppa ämnet. Det kändes som om apokalypsen redan var här – och
                då väcktes en ny fråga: Vad händer efter?
                <br />
                <br />– Det blev startpunkten för nästa steg: att utforska
                framtiden och gestalta en postapokalyptisk värld. Det handlar
                inte längre om undergång, utan om att finna vägen framåt,
                förklarar hon.
              </div>
              <br />
              <div className={s.title}>Processen: Ett intuitivt flöde</div>
              <br />
              <div className={s.mainText}>
                Emelys skapandeprocess börjar alltid med research – en noggrann
                insamling av intryck från litteratur, musik, nyheter och
                omgivningar. Hon samlar bilder och detaljer i sin vardag –
                strukturer, färgkombinationer och stadens ytor – för att senare
                låta intuitionen ta över.
                <br />
                <br />– Jag försöker inte kontrollera processen för mycket.
                Efter researchen låter jag mig själv försvinna in i känslan. Jag
                vet aldrig hur slutresultatet kommer att se ut, men jag känner
                när ett verk är färdigt. Det är som om bilden själv berättar när
                den är klar, säger Emely.
              </div>
              <br />
              <br />
              <div className={s.imageRow}>
                <div className={s.image}>
                  <Link href="https://artportable.com/art/ffa97343-ab9e-4e7c-89f4-a61df641a0aa">
                    <Image
                      src={"/images/fleurstwo.jpg"}
                      width={"400px"}
                      height={"300px"}
                      objectFit="contain"
                      quality={10}
                      priority
                    />
                  </Link>
                  <div style={{ fontStyle: "italic", textAlign: "center" }}>
                    The Maskball
                  </div>
                </div>
                <div className={s.image}>
                  <Link href="https://artportable.com/art/42e4e640-01f2-4d28-afa7-ba5ca77b8a69">
                    <Image
                      src={"/images/fleursthree.jpg"}
                      width={"400px"}
                      height={"300px"}
                      objectFit="contain"
                      quality={10}
                      priority
                    />
                  </Link>

                  <div style={{ fontStyle: "italic", textAlign: "center" }}>
                    Lady in red
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className={s.title}>Ett möte mellan konst och filosofi</div>
              <br />
              <div className={s.mainText}>
                Titlar som{" "}
                <span style={{ fontStyle: "italic" }}>
                  Hysteria, Apart och Endtime Fantasies
                </span>{" "}
                väcker nyfikenhet och antyder en mångtydighet. För The Fleurs är
                titeln ett första steg in i verket, en viskning som leder
                betraktaren vidare utan att låsa tolkningen.
                <br />
                <br />
                Konstnärskapet är också präglat av Emelys bakgrund inom både
                bildkonst och scenkonst, där influenser från studier i
                Stockholm, Berlin och Jakobstad smälter samman. Scenens dramatik
                och bildens intensitet kombineras i lager på lager av visuellt
                berättande.
                <br />
                <br /> – Min konst är teatralisk och laddad. I Berlin
                inspirerades jag av Brechts litteratur och stadens klubbscen –
                en råhet och mystik som fortfarande genomsyrar mitt arbete.
                Jakobstad bidrog med den nordiska enkelheten och naturens
                närvaro, säger Emely.
              </div>
              <br />
              <div className={s.title}>En evig rörelse</div>
              <br />
              <div className={s.mainText}>
                The Fleurs vill att hennes verk ska utmana och påverka. Hon vill
                att betraktaren ska känna något nytt – en tanke, en känsla,
                eller kanske en diskussion som dröjer sig kvar efter att
                utställningen är över.
                <br />
                <br />– Jag vill att min konst ska sätta igång något. Om någon
                lämnar utställningen med en ny insikt eller en känsla som de
                inte riktigt kan sätta ord på – då har jag lyckats, avslutar
                hon.
              </div>
              <br />
              <br />
            </div>

            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/08aed880-0dd2-4f94-9368-f41ea6af0db9">
                  <Image
                    src={"/images/fleursfour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Enlightened Hibiscus
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/bdd03caf-79d6-45fe-b186-6937cff5e924">
                  <Image
                    src={"/images/fleursfive.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Rev. 8:8 - Second Trumpet (water)
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
              href="https://artportable.com/profile/@The.Fleurs"
            >
              The Fleurs
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
