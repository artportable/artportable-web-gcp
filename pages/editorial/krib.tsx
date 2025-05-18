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

export default function krib({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>
            Krister ”KriB” Björklund målar inre landskap med global räckvidd
          </title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Naturen är perfekt i sin egen rytm – Krister ”KriB”
            Björklund målar inre landskap med global räckvidd"
          />
          <meta
            property="og:title"
            content="Naturen är perfekt i sin egen rytm – Krister ”KriB”
            Björklund målar inre landskap med global räckvidd"
          />
          <meta property="og:image" content="/images/kribone.jpg" />
          <meta
            property="og:description"
            content="Från en kreativ bubbla i Sundsvall till internationella konstscener – Krister ”KriB” Björklund
            skapar konst som berör, förundrar och bär spår av både natur och själ."
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/krib`} />
          <link rel="canonical" href={`${publicUrl}/editorial/krib`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/ec4e19ed-b34c-4a1f-b875-fec0c5e4cb04">
            <Image
              src={"/images/kribone.jpg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Landskap No 123
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Naturen är perfekt i sin egen rytm – Krister ”KriB” Björklund
              målar inre landskap med global räckvidd
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-05-06</div>
            <br />
            <br />
            <div className={s.mainText}>
              Från en kreativ bubbla i Sundsvall till internationella
              konstscener – Krister ”KriB” Björklund skapar konst som berör,
              förundrar och bär spår av både natur och själ.
              <br />
              <br />
              Redan som barn fanns skapandet där. Men det var först under en
              livskris i vuxen ålder som konsten blev avgörande.
              <br />
              <br />
              – Efter en lång period av psykisk ohälsa fick jag rådet att hitta
              ett kreativt uttryck för mitt inre kaos, berättar Krister. När jag
              befann mig i min kreativa bubbla upphörde tid och rum att
              existera. Allt det mörka tonades bort och ersattes av en känsla av
              att må bra.
              <br />
              <br />
              Resan från det privata måleriet till en offentlig karriär tog fart
              2016. Två år senare tog han steget till att bli heltidskonstnär.
              Idag har hans verk ställts ut i Europa, Japan och USA – och han
              har tilldelats flera internationella priser, däribland
              <span style={{ fontStyle: "italic" }}></span> och{" "}
              <span style={{ fontStyle: "italic" }}>
                International Prize Pegasus.
              </span>
              <br />
              <br />
              – Det är ett erkännande av mitt skapande. Min konst finns nu i 13
              länder, på 6 kontinenter – totalt 52 målningar.
              <br />
              <br />
              <div className={s.title}>Skog och vatten som vägledare</div>
              <br />
              KriB:s konst präglas av naturens flöden, stillhet och djup. Han
              målar inte landskap som de ser ut – utan som de känns inombords.
              <br />
              <br />
              – Naturen har alltid varit en självklar del av mitt liv. Vi var
              ofta ute i skogen när jag var barn – det var en plats för både
              respekt och vila. Jag försöker inte återskapa vad jag ser, utan
              vad jag upplever.
              <br />
              <br />
              En särskild plats återkommer han ofta till: ett naturreservat där
              älven möter havet.
              <br />
              <br />
              – Att stå där längst ut på udden, med skogen bakom sig och vatten
              på tre sidor, fyller mina energidepåer och väcker min inspiration
              till liv.
              <br />
              <br />
              <div className={s.imageRow}>
                <div className={s.image}>
                  <Link href="https://artportable.com/art/588ef0fa-b245-4e8c-b3f1-3fb49f9829b9">
                    <Image
                      src={"/images/kribtwo.jpg"}
                      width={"400px"}
                      height={"300px"}
                      objectFit="contain"
                      quality={10}
                      priority
                    />
                  </Link>
                  <div style={{ fontStyle: "italic", textAlign: "center" }}>
                    Beyond the mountains blue, lives a longing
                  </div>
                </div>
                <div className={s.image}>
                  <Link href="https://artportable.com/art/9a62c381-4cb0-42a6-a5f4-bc20c83c19ee">
                    <Image
                      src={"/images/kribthree.jpg"}
                      width={"400px"}
                      height={"300px"}
                      objectFit="contain"
                      quality={10}
                      priority
                    />
                  </Link>

                  <div style={{ fontStyle: "italic", textAlign: "center" }}>
                    Landscape No 91
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className={s.title}>När tekniken väljer konstnären</div>
              <br />
              KriB arbetar främst i akvarell och olja. Men valet av teknik sker
              aldrig efter regler.
              <br />
              <br />– Det är känslan jag vill förmedla som styr. Vissa gånger
              känns det som att jag inte väljer – det är tekniken som väljer
              mig.
              <br />
              <br />
              I ateljén råder ett slags kreativt kaos, där experimentlusten är
              starkare än kontrollbehovet.
              <br />
              <br />– En typisk dag är ett utforskande av processer,
              färgkombinationer och tålamod. Jag försöker inte styra för mycket,
              utan läser av målningen och förstärker det som vill komma fram.
              <br />
              <br />
              <div className={s.title}>Ett konstnärskap nära det inre</div>
              <br />
              Alla verk bär personlig betydelse, men vissa har blivit särskilt
              viktiga. Ett exempel är sviten{" "}
              <span style={{ fontStyle: "italic" }}>
                My Life’s Journey
              </span>{" "}
              från 2021 – fyra målningar som skildrar Kristers partner och
              hennes resa mot att leva fullt ut som kvinna.
              <br />
              <br />
              – Sviten är ett försök att fånga skönheten i en kropp i
              transformation, mitt i en pågående resa. Den är både personlig och
              universell, och den väckte stark respons internationellt. Artiklar
              publicerades i Sverige, England och USA.
              <br />
              <br />
              KriB beskriver sitt konstnärskap som ett pågående samtal med det
              undermedvetna – ett sätt att gestalta minnen, känslor och
              upplevelser som annars hade varit svåra att uttrycka.
              <br />
              <br />– Jag vill skapa en stark känslomässig koppling mellan mig
              och betraktaren. Mina målningar handlar om att uttrycka det som är
              svårt att sätta ord på – komplexiteten i mänskliga känslor.
              <br />
              <br />
              <div className={s.title}>En levande process</div>
              <br />
              För Krister Björklund är konstnärskapet inte ett mål – utan en
              resa utan karta.
              <br />
              <br />– Jag hoppas kunna ta min konst till nya höjder. Utveckla
              tekniken, processerna och fortsätta utforska det som pågår inom
              mig. Kreativ frihet är A och O.
              <br />
              <br />
              Och kanske är det just den friheten – i både naturen och konsten –
              som gör att hans verk rör sig så fritt mellan landskap, känslor
              och kontinenter.
            </div>

            <br />

            <br />

            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/6ed670a9-f5c5-4027-839e-2bb83da13e8c">
                  <Image
                    src={"/images/kribfour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Landskap No 129
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/ec4e19ed-b34c-4a1f-b875-fec0c5e4cb04">
                  <Image
                    src={"/images/kribfive.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Landskap No 123
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
              href="https://artportable.com/profile/@krib"
            >
              Kristen "Krib" Björklund
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
