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

export default function selander({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Krister Selander – konsten som bara måste ut</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Krister Selander – konsten som bara måste ut"
          />
          <meta
            property="og:title"
            content="Krister Selander – konsten som bara måste ut"
          />
          <meta property="og:image" content="/images/selanderfour.jpeg" />
          <meta
            property="og:description"
            content="Krister Selander – konsten som bara måste ut"
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/selander`} />
          <link rel="canonical" href={`${publicUrl}/editorial/selander`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/24736167-dca4-4191-baf7-6e769e97bd8b">
            <Image
              src={"/images/selanderthree.jpeg"}
              layout="fill"
              objectFit="contain"
              priority
              alt="Krister Selander konstverk"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Kurt Cobain
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Krister Selander – konsten som bara måste ut
            </div>

            <br />
            <div className={s.mainText}>
              För Krister Selander började allt med en teckning som han själv
              beskriver som &quot;riktigt ful&quot;. En liten bild av hunden han
              haft – men det var något i uttrycket, något som väckte reaktioner.
              Någon såg potential och uppmuntrade honom att köpa penna och
              papper. Det blev starten på ett konstnärskap som idag präglas av
              lekfullhet, detaljrikedom och en kreativ nyfikenhet utan gränser.
              <br />
              <br />– Mitt konstnärskap är enkelt och utan skolning. Lekfullt.
              Jag är inte så petig med proportioner eller hur realistiskt något
              ska se ut – det får gärna spreta lite. Det viktiga är känslan.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-01</div>
            <br />
            <br />
            <div className={s.title}>
              Från Degerfors till Bohuslän – en resa genom liv och uttryck
            </div>
            <br />
            <div className={s.text}>
              Krister växte upp i bruksorten Degerfors, en plats som han själv
              beskriver som mer präglad av fotboll och skidor än konst och
              kultur. Musiken kom in i tonåren och blev ett avgörande inslag i
              livet – idag är han också deltidsmusiker, något som tydligt
              speglas i hans bildvärld. <br />
              <br />
              Efter flera år i Göteborg flyttade han ut till Björkö i Bohuslän –
              en plats som blev ett slags kreativ explosion.
              <br />
              <br />– Här lossnade något. Konsten hittade sin form, mitt uttryck
              blev tydligare. Även om det kanske hade hänt ändå, så tror jag att
              miljön spelade en viktig roll.
              <br />
              <br />
              Nu går flyttlasset tillbaka till city – både av praktiska skäl och
              längtan efter närheten till kultur, konserter och stadens puls.
              Men tanken på att återvända till skärgården en dag finns kvar, som
              en framtida frizon.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/aaf8ffae-62c7-4808-946a-d9b1efd8830f">
                  <Image
                    src={"/images/selanderone.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Krister Selander konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Katten Lisa
                </div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/37b7f798-7972-448f-8823-126f0ef58942">
                  <Image
                    src={"/images/selanderfour.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Krister selander konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Ska 4 Life
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>
              Porträtt, musikikoner och små gömda berättelser
            </div>
            <br />
            <div className={s.text}>
              Kristers konst har ofta sin utgångspunkt i människor – ofta
              musiker eller skådespelare – men också i platser, vardagsscener
              och nyfikna detaljer. Ett tidigt porträtt av Frank Zappa sålde
              direkt, och det blev startskottet för en hel serie målningar där
              han blandar uttryck, tekniker och referenser. <br />
              <br />– Jag älskar att nörda in mig i detaljer. En gitarrmodell,
              ett scenplagg, en accessoar. Det ska kännas att jag tänkt till.
              Några av mina verk på Kurt Cobain är sådana – hans Fender Mustang
              gitarr har fått mycket kärlek. Eller Tom Petty, där ett verk är en
              mix av skivomslag, musikvideor och symboler.
              <br />
              <br />
              Han inspireras av både fakta och fantasi – ibland byggs ett verk
              upp av flera bilder som smälter samman till något nytt och
              personligt. Det finns ofta en detalj som sticker ut – något som
              vid första ögonkastet kan kännas malplacerat, men som den som
              känner till motivet förstår.
              <br />
              <br />– Jag vill att den som köper något av mig ska känna att det
              är unikt, genomtänkt och gjort med både hjärna och hjärta.
            </div>
            <br />
            <br />
            <div className={s.title}>Skapandet – och kampen om tiden</div>
            <br />
            <div className={s.text}>
              Processen är ofta spontan. Ibland är det en miljö som styr, ibland
              en viss berättelse. Men det blir sällan exakt som planerat – och
              det är också charmen. Ett misstag kan döljas med ett plagg, ett
              objekt, en skugga. Ett slarv kan bli en detalj med karaktär.{" "}
              <br />
              <br />– Ofta blir det bättre när jag försöker rädda något som blev
              fel. Det får en egen twist. Det blir mer levande då. <br />
              <br />
              Vernissager är något Krister gillar – att få möta reaktionerna
              live. Instagram fungerar som hans fönster utåt, men relationen
              till sociala medier är minst sagt ambivalent.
              <br />
              <br />– Det är ett måste i dag, men det tar mycket energi. Allt
              handlar om att jaga följare, likes, algoritmer. Jag vill
              egentligen bara måla – inte kriga i flödena. Ibland önskar jag att
              någon annan tog den biten, så jag kunde fokusera på skapandet. En
              agent som tror på en – det hade varit drömmen.
            </div>
            <br />
            <br />
            <div className={s.title}>Framåt – men utan att forcera</div>
            <br />
            <div className={s.text}>
              För Krister handlar konsten inte om att klättra, konkurrera eller
              jaga erkännande. Det handlar om att få utlopp för något djupt
              personligt. Drivkraften kommer inifrån, inte utifrån.
              <br />
              <br />
              För Krister handlar konsten inte om att klättra, konkurrera eller
              jaga erkännande. Det handlar om att få utlopp för något djupt
              personligt. Drivkraften kommer inifrån, inte utifrån.
              <br />
              <br />
              Framtiden? Den får rulla på i samma spår – fler utställningar,
              kanske i Malmö eller Köpenhamn, lite kurser i nya tekniker, och
              mer inspiration från både konsertscener och galleriväggar.
            </div>
            <br />
            <br />
            <div className={s.title}>Ett råd till andra skapare?</div>
            <br />
            <div className={s.text}>
              – Gå på magkänslan. Filtrera säljsnack, välj dina forum med
              omsorg. Och kom ihåg: det viktigaste är att du själv trivs med det
              du gör.
            </div>
            <br />
            <br />

            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/8691a59f-ef1b-4cfd-849f-bf9f4645a42e">
                  <Image
                    src={"/images/selanderfive.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="konstverk"
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Keith
                </div>
              </div>
            </div>
            <br />
            <div style={{ fontSize: "20px" }}>
              Se fler verk av:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href="https://artportable.com/profile/@krister.selander"
              >
                Krister Selander
              </a>
            </div>
            <br />
            <br />
            <div className={s.title}>Redo att hitta konst som känns?</div>
            <br />
            <div className={s.text}>
              Låt dig inspireras av konstnärer som skapar med hjärta, själ och
              berättelse. Utforska originalkonst direkt från konstnärer på
              &nbsp;
              <a
                style={{ textDecoration: "underline" }}
                href="https://artportable.com/discover"
              >
                Artportable.com
              </a>
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
