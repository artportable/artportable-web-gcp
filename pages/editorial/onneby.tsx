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

export default function onneby({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>
            Anneli Önneby – konstnären som lyssnar till djurens berättelser
          </title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Anneli Önneby – konstnären som lyssnar till djurens berättelser"
          />
          <meta
            property="og:title"
            content="Anneli Önneby – konstnären som lyssnar till djurens berättelser"
          />
          <meta property="og:image" content="/images/onnebyjpeg" />
          <meta
            property="og:description"
            content="Anneli Önneby – konstnären som lyssnar till djurens berättelser"
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/onneby`} />
          <link rel="canonical" href={`${publicUrl}/editorial/onneby`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/5fadd34d-bf2a-4c18-82ae-122f01fe7ae5">
            <Image
              src={"/images/onneby.jpeg"}
              layout="fill"
              objectFit="cover"
              priority
              alt="Anneli Önneby konstverk"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic" }}>Cat nap</div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Anneli Önneby – konstnären som lyssnar till djurens berättelser
            </div>

            <br />
            <div className={s.mainText}>
              En katt slumrar i solvärmen. Runt den, i det tysta, händer något
              magiskt. Fåglar viskar hemligheter till varandra, en igelkott
              snusar runt i gräset och en ekorre stannar upp mitt i ett språng.
              De vet något som katten inte vet – att världen lever sitt eget liv
              medan den sover.
              <br />
              <br />
              Det är här, i ögonblicket mellan vila och rörelse, som Anneli
              Önneby hittar sina berättelser.
              <br />
              <br />– Jag är en iakttagande historieberättare. Jag fångar
              ögonblicket där djuren tar plats – när katten sover och fåglarna
              leker. Så fort den vaknar är scenen borta, men jag har redan
              bevarat den på duken.
              <br />
              <br />
              Annelis konst är fylld av värme, lekfullhet och ett tidlöst ljus,
              där djuren inte bara är motiv – de är huvudpersonerna. Katter,
              fåglar, ekorrar och igelkottar befolkar hennes målningar, bär på
              berättelser och bjuder in betraktaren till en värld där humor och
              stillhet samexisterar.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-03-25</div>
            <br />
            <br />
            <div className={s.title}>Färgen som en väg ut ur mörkret</div>
            <br />
            <div className={s.text}>
              Anneli har målat så länge hon kan minnas. Som barn fann hon tröst
              i färgerna – en plats där världen var ljusare, mer fantasifull och
              levande.
              <br />
              <br />
              – Jag har målat sedan barnsben. När jag var 7–8 år flydde jag in i
              min värld av färger. Vanliga människor tittar på en gräsmatta och
              ser grönt – jag ser färg, mer färg än det vanliga ögat.
              <br />
              <br />
              Men livet förändrade hennes måleri. Som ung vuxen skildrade hon
              istället en annan verklighet – alkoholister på parkbänkar, hemlösa
              i stadens skuggor, en dämpad färgskala av betong och ensamhet.
              <br />
              <br />
              Vändpunkten kom efter att hon överlevde tsunamin i Sri Lanka.
              <br />
              <br />
              – När jag kom hem var jag trasig, både fysiskt och själsligt. Det
              kändes som att den gamla jag dog där och att en ny version av mig
              föddes. Jag lämnade det mörka bakom mig och återvände till
              färgerna. Jag ville tillbaka till mitt ursprung – till färgen,
              till livet.
              <br />
              <br />
              Idag är färgen hennes signum. Hennes målningar är en motreaktion
              mot den grå, tunga tillvaron som omger oss. <br />
              <br />– Människor går klädda i svart, gatorna är av betong. Jag är
              en färgglad fjäril som fladdrar runt. Jag vill skapa en rofylld
              värld, fylld av humor och ljus.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/e0fa183f-fc9e-4621-98fe-d129499905ed">
                  <Image
                    src={
                      "https://artportable-cdn-edhmaucaccbngbgu.z01.azurefd.net/artportable-prod/images/9cc7749d-03dd-4b9c-a818-bb7f41d91dfa.jpg"
                    }
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Anneli Önneby konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Catnap och monstera
                </div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/20f073d0-f267-47e2-b1be-468b1ecdb7a2">
                  <Image
                    src={
                      "https://artportable-cdn-edhmaucaccbngbgu.z01.azurefd.net/artportable-prod/images/36ff91e6-b421-40d6-bf3b-33b004432571.jpg"
                    }
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Anneli Önneby konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Catnap och flamingo
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>En värld där djuren har ordet</div>
            <br />
            <div className={s.text}>
              Anneli målar ofta i serier, där varje bild bär en berättelse. Just
              nu arbetar hon med Catnap, en serie där katter i de mest udda och
              avslappnade sovpositioner vilar, medan andra djur rör sig omkring
              dem. <br />
              <br />
              – Så länge katten sover, händer allt det där magiska. Fåglarna
              snackar, igelkotten nosar runt, världen dansar i sin egen rytm.
              Men när katten vaknar? Då försvinner allt, som en dröm som löser
              upp sig. <br />
              <br />
              Djuren har alltid varit en del av hennes måleri. I hennes
              trädgårdsserie inspireras hon av sin egen trädgård, där rosor,
              buskar och fåglar skapar en levande tavla utanför ateljéfönstret.
              <br />
              <br />– Jag har 50–70 rosor i min trädgård. Jag älskar våren när
              livet återvänder, när knopparna slår ut och fjärilarna dansar
              mellan blommorna. Då tar jag ut staffliet och målar direkt där.
              <br />
              <br />
              Hennes konst är en hyllning till naturen – till de små scener som
              utspelar sig när vi inte ser.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Ljuset, leendet och den solvarma känslan
            </div>
            <br />
            <div className={s.text}>
              Annelis måleri handlar inte bara om färg, utan också om ljus och
              balans. Hon vill att betraktaren ska känna samma känsla som en
              solvarm sommareftermiddag.
              <br />
              <br />– Ljuset i mina målningar är som en trygg plats – som att
              sitta i solen med en kopp kaffe och känna värmen mot huden. Jag
              vill fortsätta förmedla den där solkusten i hjärtat. Det handlar
              om att skapa en atmosfär där människor får landa, le och känna
              värme – mitt i vardagens brus.
              <br />
              <br />
              Att hon arbetar i olja är ett medvetet val.
              <br />
              <br />– Olja torkar långsamt, och det är precis vad jag behöver.
              Jag vill att konsten ska få tid att leva, förändras och svara
              tillbaka. En tavla är som mentalt lego – jag bygger upp motivet,
              flyttar runt färger, letar efter balans mellan ljus och mörker,
              tills helheten känns rätt.
              <br />
              <br />
              Även om hennes bildvärld är färgsprakande och full av rörelse, är
              det just i balansen mellan det lekfulla och det stilla som
              helheten uppstår – en slags visuell poesi där varje detalj bär på
              en berättelse.
            </div>
            <br />
            <br />
            <div className={s.title}>Humor med hjärta</div>
            <br />
            <div className={s.text}>
              För Anneli är humor inte bara ett uttryck, utan en livshållning –
              och ett sätt att skapa kontakt.
              <br />
              <br />
              – Vi har skapat en tung och grå tillvaro. Humor är min
              motreaktion. Det underfundiga har inga gränser. Det går förbi
              språk, ålder, kön och kultur. Jag vill att mina målningar ska ge
              ett leende – det är det mest mänskliga vi har.
              <br />
              <br />I vissa målningar finns en samhällskommentar, ibland en
              feministisk twist – men alltid med värme och lekfullhet.
              <br />
              <br />– Vi måste våga skoja om världen igen. Vi får inte tappa vår
              nyfikenhet, vår fantasi. Då förtvinar vi människor.
            </div>
            <br />
            <br />
            <div className={s.title}>Konsten som livsluft</div>
            <br />
            <div className={s.text}>
              För Anneli är konsten inte bara ett yrke – det är ett sätt att
              leva, att andas och skapa mening.
              <br />
              <br />– Det är min livsnerv. Får jag inte måla så dör jag. Jag har
              så mycket färg och tanke i mig – det måste ut. När mitt barn blev
              allvarligt sjuk för några år sedan blev det ännu tydligare.
              Konsten blev min fristad, en plats där jag kunde skapa glädje,
              mitt i det svåra. <br />
              <br />
              Hon hoppas att hennes konst får bli det även för andra – en plats
              att landa i och känna sig hemma i.
              <br />
              <br />– Vi lever i en värld där allt går snabbt, där vi sällan
              berörs. Jag vill skapa bilder som stannar kvar, som ger något mer
              än ett ögonblick. Som omfamnar, på djupet.
            </div>
            <br />
            <br />
            <div className={s.title}>Framtidens färger</div>
            <br />
            <div className={s.text}>
              Just nu arbetar Anneli med två större serier – Catnap, som visas
              på NK Art Bakery sommaren 2025, och Trädgården, en hyllning till
              naturens återkomst och vardagens små mirakel. Hon ställer också ut
              på Stockholms konstsalong, Husby konstsalong och i Västerås.
              <br />
              <br />
              – Jag målar Catnap nu på vintern, medan trädgården vilar. När
              våren kommer, när knopparna slår ut igen – då fortsätter jag med
              Trädgården. Det följer livet, naturen, rytmen. Det är så jag
              skapar. <br />
              <br />
              Längre fram drömmer hon om att utforska skulptur. Men framför allt
              vill hon fortsätta måla för att sprida glädje, färg och liv.{" "}
              <br />
              <br />– Jag hoppas att människor med tomma väggar – eller tomma
              andetag – hittar mina målningar. Att de får vakna varje morgon och
              känna att det finns något där på väggen som omfamnar dem.
            </div>

            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/57a59376-02ef-433f-8334-e9c719a8e31c">
                  <Image
                    src={
                      "https://artportable-cdn-edhmaucaccbngbgu.z01.azurefd.net/artportable-prod/images/aa855dcb-bb59-4c13-b4a5-15e646ac0cb1.jpg"
                    }
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Anneli Önneby konstverk"
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Catnap och fikus
                </div>
              </div>
            </div>
            <br />
            <div style={{ fontSize: "20px" }}>
              Se fler verk av:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href="https://artportable.com/profile/@artbyaosweden"
              >
                Anneli Önneby
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
