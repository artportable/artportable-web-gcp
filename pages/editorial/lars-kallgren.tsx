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

export default function lars({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Lars Källgren – Barn i aktivitet | Galleri Risberg</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Lars Källgren, konst, utställning, Galleri Risberg, barn i aktivitet, oljemålningar, konstnär, barndomens magi"
          />
          <meta
            property="og:title"
            content="Lars Källgren fångar barndomens magi i ny utställning på Galleri Risberg"
          />
          <meta property="og:image" content="/images/larsThree.jpeg" />
          <meta
            property="og:description"
            content="Utforska Lars Källgrens senaste utställning 'Barn i aktivitet', en samling målningar som hyllar barndomens glädje och rörelse."
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${publicUrl}/editorial/lars-kallgren`}
          />
          <link rel="canonical" href={`${publicUrl}/editorial/lars-kallgren`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/4ba15424-3bdc-41d6-a084-5f2c287db73b">
            <Image
              src={"/images/larsone.jpeg"}
              layout="fill"
              objectFit="cover"
              priority
              alt="Lars Källgren konstverk"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic" }}>
          Red Poppy stands for death. Renewal and life.
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Lars Källgren fångar barndomens magi i ny utställning på Galleri
              Risberg
            </div>

            <br />
            <div className={s.mainText}>
              I utställningen &quot;Barn i aktivitet&quot; visar konstnären Lars
              Källgren en serie målningar som skildrar barns rörelseglädje,
              nyfikenhet och närvaro. Med inspiration från sina egna barn och
              barnbarn vill han påminna om barndomens kraft och närhet till
              livet.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-03-19</div>
            <br />
            <br />
            <div className={s.title}>
              Barn i rörelse – en hyllning till barndomens magi
            </div>
            <br />
            <div className={s.text}>
              I utställningen "Barn i aktivitet" visar konstnären Lars Källgren
              en serie målningar som skildrar barns rörelseglädje, nyfikenhet
              och närvaro. Med inspiration från sina egna barn och barnbarn vill
              han påminna om barndomens kraft och närhet till livet. Lars
              Källgren har målat sedan tonåren och har idag en lång karriär
              bakom sig inom både konst och reklam. I sin nya utställning på
              Galleri Risberg presenterar han en samling verk som speglar barn i
              rörelse och aktivitet – en hyllning till den vardagliga men
              samtidigt magiska barndomsvärlden.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/27b549fa-9132-42a6-8b91-3a7a99cf9983">
                  <Image
                    src={"/images/larstwo.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Lars Källgren konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Flicka till häst
                </div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/c03f2ae2-aaeb-471d-b8fe-d8b3703d923a">
                  <Image
                    src={"/images/larsthree.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                    alt="Lars Källgren konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Flicka i blåsväder</div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>
              Inspiration från de närmaste – barn och barnbarn som motiv
            </div>
            <br />
            <div className={s.text}>
              – Jag vill visa att barn gärna gör andra saker än att bara hänga i
              mobilen, säger Lars Källgren. <br /> <br /> Inspirationen till
              verken kommer från hans närmaste omgivning – hans barn och
              barnbarn. <br /> – När jag ser dem fokuserade på mer fysiska
              aktiviteter blir jag glad. En promenad där man möter en katt och
              kärlek uppstår. Eller hur ett barn kan fascineras av en vattenpöl.
              Det lilla blir stort.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Teknik och uttryck – att måla med olja och bygga upp motiv
            </div>
            <br />
            <div className={s.text}>
              Lars målar främst i olja, ett medium han menar passar hans motiv
              bäst. <br /> – Oljan ger en mjukare och dovare färgskala. Jag
              börjar ofta med en blyertsskiss, målar hela duken i en ljus ton
              som får skina igenom, och bygger upp målningen steg för steg.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Konst som väcker minnen och känslor hos besökarna
            </div>
            <br />
            <div className={s.text}>
              Besökare har redan börjat känna igen sig i motiven. <br /> – En
              kvinna som såg målningarna sa: "Det där är ju jag som liten med
              min katt Rufus." Det är det som gör målningarna levande – att de
              väcker minnen och känslor.
            </div>
            <br />
            <br />
            <div className={s.title}>Konsten blir tillgänglig för fler</div>
            <br />
            <div className={s.text}>
              Att få ställa ut på Galleri Risberg känns rätt, tycker han. <br />
              – Det är ett mindre, fint och personligt galleri. Jag gillar det
              mycket. Inför vernissagen den 22 mars ser han mest fram emot att
              möta människor, prata om måleri och få dela sin konst.
            </div>
            <br />
            <br />
            <div className={s.title}>
              En karriär i bildens tjänst – från reklam till konst på heltid
            </div>
            <br />
            <div className={s.text}>
              Lars Källgren är född i Karlstad och flyttade till Stockholm 1970.
              Under många år arbetade han som art director och har grundat flera
              reklambyråer. Numera är han konstnär på heltid, och har på senare
              år även målat ett femtiotal porträtt på beställning. Han har också
              ett stort följe på sociala medier med över 136 000 följare på
              TikTok (Larsbästa) och visar sina verk även på Instagram
              (@larskazz).
              <br />
              <br />
              Vad hoppas han att besökarna tar med sig från utställningen?{" "}
              <br /> – Ett minne om sin egen barndom. Känslor. <br />
              Och framtiden? Nya idéer är redan på gång. <br /> – Jag har ett
              par teman jag vill prova.
            </div>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/97e625f5-d8e5-4cb0-bfa2-b86291403b58">
                  <Image
                    src={"/images/larsfour.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Lars Källgren konstverk"
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Flicka och get
                </div>
              </div>
            </div>
            <br />
            <div style={{ fontSize: "20px" }}>
              Se fler verk av:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href="https://artportable.com/profile/@kallgren.lars"
              >
                Lars Källgren
              </a>
            </div>
            <br />
            <br />
            <div className={s.title}>Redo att hitta konst som känns?</div>
            <br />
            <div className={s.text}>
              Låt dig inspireras av konstnärer som skapar med hjärta, själ och
              berättelse. Utforska originalkonst direkt från konstnärer på
              Artportable.com.
            </div>
            <br />
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
