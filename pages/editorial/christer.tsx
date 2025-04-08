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

export default function christer({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>
            &quot;Att ge oron en form&quot; – möt Christer Åberg, illustratör,
            journalist och författare
          </title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Konst för livet – hitta verket som väcker liv i ditt hem"
          />
          <meta
            property="og:title"
            content='"Att ge oron en form" – möt Christer Åberg, illustratör,
            journalist och författare'
          />
          <meta property="og:image" content="/images/chrisone.jpg" />
          <meta
            property="og:description"
            content="För vissa är konsten ett kall, för andra en slump. För Christer Åberg – illustratör, journalist,
            författare och musiker – är det snarare ett livslångt kretslopp. Med rötter i ett hem där både
            musik och bildkonst flödade genom generationerna, har berättandet alltid varit en självklar del
            av livet."
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/christer`} />
          <link rel="canonical" href={`${publicUrl}/editorial/christer`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/78e0b6d1-f480-455a-849a-1056ef8bcf98">
            <Image
              src={"/images/chrisfive.jpg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Så mycket sämre
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              &quot;Att ge oron en form&quot; – möt Christer Åberg, illustratör,
              journalist och författare
            </div>
            <br />

            <br />
            <div className={s.mainText}>
              För vissa är konsten ett kall, för andra en slump. För Christer
              Åberg – illustratör, journalist, författare och musiker – är det
              snarare ett livslångt kretslopp. Med rötter i ett hem där både
              musik och bildkonst flödade genom generationerna, har berättandet
              alltid varit en självklar del av livet.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-08</div>
            <br />

            <br />
            <div className={s.text}>
              – Jag har nog alltid skrivit och ritat, så långt tillbaka jag kan
              minnas, berättar Christer. På 70- talet sökte jag både till
              Konstfack och Journalisthögskolan, men valde den senare. Och på
              den vägen är det.
              <br />
              <br />
              Sedan dess har han rört sig fritt mellan uttrycksformerna – från
              journalistikens skarpa kontur till musikens känslolandskap och
              bildkonstens drömlika oro. För även om text och musik varit de
              främsta försörjningskanalerna, har bildskapandet alltid funnits
              där, som en underström. Det är i den oron som hans konstnärliga
              idéer tar form.
              <br />
              <br />– Jag har nog aldrig varit särskilt intresserad av det rent
              dekorativa. Snarare tvärtom – jag dras till det demonstrativt
              övertydliga. Som Gerhard Nordström, Lars Hillersberg, Christer
              Temptander eller Jan Stenmark. Jag vill inte måla nåt som bara
              “passar till soffan”.
            </div>

            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/6664ea97-2e8d-490b-b78e-843594c7d896">
                  <Image
                    src={"/images/chrisone.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Folkhemmet var byggt, det var folket som saknades...
                </div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/356d6c7c-b5aa-476a-8e1e-dc5e5af53368">
                  <Image
                    src={"/images/christwo.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Knähundspecialisten
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Konsten som oro – och handling</div>
            <br />
            <div className={s.text}>
              Det centrala begreppet i Christers konstnärskap är “oro” – inte
              som ett självändamål, utan som drivkraft. Bilderna är ofta uddiga,
              ibland otäcka, men alltid tankeväckande.
              <br />
              <br />– Som vi lever idag är mardrömmarna tyvärr ett högst vaket
              tillstånd. Jag vill ge oron en konkretion – och kanske i
              förlängningen också en handlingsväg.
              <br />
              <br />
              En dam på en utställning i Hammarby Sjöstad sammanfattade det
              kanske bäst, när hon utbrast:{" "}
              <span style={{ fontStyle: "italic" }}>
                “Fy! De där skulle jag aldrig ha på väggen!”
              </span>{" "}
              Ett omdöme Christer själv håller med om – och nästan verkar stolt
              över.
            </div>
            <br />
            <br />
            <div className={s.title}>
              När text möter bild – och PowerPoint blir pensel
            </div>
            <br />
            <div className={s.text}>
              Även om han arbetat i många digitala program, är det PowerPoint
              som blivit något av ett oväntat favoritverktyg i skapandet.
              <br />
              <br />
              – Det kanske är ett arv från åren som kriskommunikationskonsult,
              men PowerPoint erbjuder idag i princip samma funktioner som andra
              program. Sen målar jag ofta vidare med akryl och tusch ovanpå det
              digitala.
              <br />
              <br />
              Kombinationen av bild och text är en viktig del av uttrycket.
              Ibland får de stå sida vid sida, ibland växer de ihop till en
              gemensam berättelse. Det finns en tydlig dragning till det rimmade
              och hårt bundna, som en sorts motvikt till det fritt associativa
              bildspråket.
            </div>
            <br />
            <br />
            <div className={s.title}>Retrospektiv med framtidsblick</div>
            <br />
            <div className={s.text}>
              Christers senaste utställning blev till som en retrospektiv – inte
              för att summera ett avslutat verk, utan snarare för att synliggöra
              en konstnärlig röst som löpt parallellt med andra karriärer.
              <br />
              <br />– Jag har ju inte varit så produktiv bildmässigt genom åren,
              jämfört med text och musik. Det behövdes nästan en retrospektiv
              för att få ihop till en utställning.
              <br />
              <br />
              Nu väntar nya projekt – bland annat ett musikaliskt samarbete som
              utforskar 70-talsamericana på svenska. Men lusten att fortsätta
              skapa i flera uttryck lever kvar. På frågan om vad han vill säga
              till unga konstnärer svarar han med både skärpa och glimt i ögat:
              <br />
              <br />– Följ inga råd. Och lyssna till dina inre rovdjur – och se
              de som finns omkring dig. Hindra dem. Vi är alla bättre än så.
              <br />
              <br />
              <span style={{ fontWeight: 600 }}>
                Just nu visas Christer Åbergs verk på restaurangen Yono Sabo på
                Luntmakargatan 42 – en plats där konsten möter vardagen i
                ögonhöjd. Utställningen består främst av verk ur serien Våra
                inre rovdjur, som enligt konstnären själv gestaltar &quot;de där
                som får oss att bete oss mot vårt bättre vetande.&quot;
              </span>
              <br />
              <br />
              Att se dem i en ny kontext väcker blandade känslor.
              <br />
              <br />– Fåfängan får sig naturligtvis en boost av att se verken så
              här i en mer offentlig miljö.
              <br />
              <br />
              Men utställningen bär också ett allvarligare syfte: all
              försäljning går oavkortat till Ukrainas försvar.
              <br />
              <br />– Jag hoppas att jag säljer en del, för precis som den
              utställning jag hade på Konsthallen i höstas så går all
              försäljning, oavkortat till Ukrainas försvar.
              <br />
              <br />
              Rovdjuren får synas – men kanske också tyglas.
            </div>
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/41756a6f-0ede-414b-b177-053d25fda2ae">
                  <Image
                    src={"/images/christhree.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Göra stort
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/eee14547-8c7b-4200-a208-06f4283cb363">
                  <Image
                    src={"/images/chrisfour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Hela Sveriges bakar
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
              href="https://artportable.com/profile/@christer.aber"
            >
              Christer Åberg
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
