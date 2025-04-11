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

export default function catrine({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>
            Catrine Näsmark – Porträtt, motorer och mod att måla livet som det
            är
          </title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Catrine Näsmark – Porträtt, motorer och mod att måla
            livet som det är"
          />
          <meta
            property="og:title"
            content="Catrine Näsmark – Porträtt, motorer och mod att måla
            livet som det är"
          />
          <meta property="og:image" content="/images/catrinefour.jpg" />
          <meta
            property="og:description"
            content="En Cadillac Eldorado från 1974, ett porträtt av drottningen och en hoj med sidovagn som
            blivit målarduk – välkommen till Catrine Näsmarks värld."
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/catrine`} />
          <link rel="canonical" href={`${publicUrl}/editorial/catrine`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/41e5ae95-d299-48b6-a1be-62e46fdc7cb0">
            <Image
              src={"/images/catrineone.jpg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          flytta nu (efterab. tryck)
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Catrine Näsmark – Porträtt, motorer och mod att måla livet som det
              är
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-11</div>
            <br />
            <br />
            <div className={s.mainText}>
              En Cadillac Eldorado från 1974, ett porträtt av drottningen och en
              hoj med sidovagn som blivit målarduk – välkommen till Catrine
              Näsmarks värld. Här går konst och liv i ett, och gränsen mellan
              äventyr och ateljé suddas ut.
              <br />
              <br />– Jag målade på nätterna, scenograferade på dagarna. Sen tog
              måleriet över allt. Nu är det bilar, berättelser och porträtt i
              tvåmetersformat som gäller – och ibland en kunglig gäst eller två,
              säger hon med ett skratt.
              <br />
              <br />
              Efter en stenhård utbildning på Royal Danish Academy of Fine Arts
              kastade sig Catrine rakt ut i arbetslivet dagen efter examen. Åren
              i Köpenhamn förändrade henne i grunden.
              <br />
              <br />– Det var tufft. Inget medhårsstrykande, som i Sverige. Allt
              blev ifrågasatt. Men jag är otroligt glad att jag klarade det –
              det gav mig skinn på näsan.
              <br />
              <br />
              Scenografi var länge hennes yrke, men måleriet smög sig in på
              nätter och helger tills det till slut tog över helt. Idag ser hon
              tillbaka på scenografens sätt att närma sig text – som en viktig
              grund även för måleriet.
              <br />
              <br />– När jag målar porträtt gör jag ofta omfattande research.
              Som i serien{" "}
              <span style={{ fontStyle: "italic" }}>
                Women of the Frontier
              </span>{" "}
              – tjugo kvinnor som förändrat historien. Jag läste, lyssnade, såg
              filmer, och lät det sjunka in. Porträttet blir min tolkning av
              deras berättelse, precis som en scenograf tolkar ett manus.
            </div>
            <br />

            <br />
            <div className={s.title}>När hojen blir duk</div>
            <br />
            <br />
            <div className={s.text}>
              I Catrines målningar dyker återkommande teman upp: gamla bilar,
              motorcyklar, långa resor, impulsiva inköp. Men det handlar inte om
              nostalgi eller teknik – det handlar om känsla.
              <br />
              <br />
              – Jag har en svaghet för Cadillacs. De luktar så gott, säger mina
              barn. Och jag måste bara ha dem. Sen kommer jag på att jag inte
              kan meka, säljer bilen – och målar av upplevelsen.
              <br />
              <br />
              Målningarna är som minnesfragment, laddade med frihet, galenskap
              och glädje. Som när hon körde Stockholm–Bordeaux på en gammal
              motorcykel med en tavla fastsurrad på ryggen – en resa som blev
              till målningen{" "}
              <span style={{ fontStyle: "italic" }}>Bennys Äventyr.</span>
              <br />
              <br />– Det är inte bilen eller hojen, det är känslan.
              Gemenskapen, äventyret. Jag älskar det där opraktiska. Att köra en
              Eldorado från ’74 är som att köra ett konstverk. Och jag vill
              liksom <span style={{ fontStyle: "italic" }}>vara</span> den
              bilen.
              <br />
              <br />
              Just nu har hon en gammal BMW K 1100 i garaget – med målade kåpor
              och ett nytt motiv, rakt på, utan regler.
              <br />
              <br />– För att den är min, och jag kan. Såklart.
            </div>

            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/93f33fde-926e-4cdc-94bc-c44c0602c662">
                  <Image
                    src={"/images/catrinetwo.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Benny å jag på dagen (efterarb. tryck)
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/52ed1e5b-a83f-4c6d-a8fd-8a00dcc58758">
                  <Image
                    src={"/images/catrinethree.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  FF
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Porträtt med pondus</div>
            <br />
            <div className={s.text}>
              Att måla människor har blivit ett livslångt engagemang. Under de
              senaste 25 åren har Catrine gjort allt från privata beställningar
              till uppdrag av kunglig dignitet. Bland annat finns hennes
              porträtt av kung Carl XVI Gustaf och drottning Silvia på Kungliga
              slottet i Stockholm.
              <br />
              <br />– Det var jättekul. Jag har massor av roliga historier
              därifrån… men de får stanna hos mig. Förutom en: jag föreslog att
              drottningen skulle åka bakpå min hoj. Men Säpo sa nej.
              <br />
              <br />
              Det som fascinerar henne med porträtt är mångfalden – att varje
              människa är en hel värld.
              <br />
              <br />– Ingen är ensidig. Jag vill fånga ett uttryck, en
              situation, något som känns levande. Porträtten får gärna vara
              stora – det är en hyllning, då ska det ta plats.
              <br />
              <br />
              Hennes process är lyhörd och intuitiv. Hon fotograferar hemma hos
              personen, gärna i rörelse, för att fånga energi och miljö.
              <br />
              <br />– Vi går igenom bilderna tillsammans. Det handlar om
              karaktär, färger, balans, form, dynamik. Det är ett samarbete –
              ett samtal i färg.
            </div>
            <br />
            <br />
            <div className={s.title}>Från Djursholm till Bromma</div>
            <br />
            <div className={s.text}>
              Catrines verk har visats på allt från gallerier till offentliga
              platser. På Bromma flygplats hänger hennes porträtt av Amelia
              Earhart, som fick nytt liv efter att fasaden renoverades. På
              Djursholms Slott visade hon 2022 serien{" "}
              <span style={{ fontStyle: "italic" }}>Länge Leve Konungen</span> –
              en personlig höjdpunkt eftersom hon själv kommer därifrån.
              <br />
              <br />
              – Det var extra kul att få ställa ut där jag har rötter.
              Kungaporträtten blev en berättelse om makt och historia, men också
              om människan bakom titeln.
              <br />
              <br />
              Hemma är konsten alltid närvarande – både i arbete och i vardag.
              Tvillingsönerna är mitt i kreativa utbildningar inom teater och
              film, och huset fylls av gitarrspel, manusdiskussioner och
              måleriprojekt.
              <br />
              <br />– Jag drar med dem på allt. Utställningar, märkliga
              teaterföreställningar, till och med Ramstein-konserter. Och jag
              har tur: min pojkvän älskar konstvärlden lika mycket som jag.
            </div>
            <br />
            <br />
            <div className={s.title}>Nästa steg: Atlantis</div>
            <br />
            <div className={s.text}>
              Vad drömmer då en konstnär som redan målat allt från kungligheter
              till kåpor? Svaret är: något helt annat. Just nu arbetar Catrine
              tillsammans med kompositören Roger Assar Johansson i ett nytt
              projekt där konst möter opera.
              <br />
              <br />
              – Jag kan inte säga för mycket… men det handlar om Atlantis. Och
              det kommer i juni. Det blir något jag aldrig gjort tidigare.
              <br />
              <br />
              Hon håller också kurser i porträttmåleri, där hennes filosofi är
              enkel: alla kan måla – om man ger det tid.
              <br />
              <br />– Tid, lite mer tid, och ännu mer tid. Och så måste det få
              vara kul. Leklusten är det viktigaste vi har.
              <br />
              <br />
              Musiken är också en ständig följeslagare. I ateljén ljuder just nu
              Weyes Blood, 070 Shake, Sievert Höjem och Deserta. Och alltid: två
              stora koppar kaffe, hög volym och känslan av att kliva in i ett
              rum som väntar på att målas fram.
            </div>
            <br />

            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/fc234c2e-f018-467a-9f86-f9a72806f296">
                  <Image
                    src={"/images/catrinefour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Queen E
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/428b2625-d583-45e9-ad80-4e735362aaf1">
                  <Image
                    src={"/images/catrinefive.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Amelia
                </div>
              </div>
            </div>
            <br />

            <br />
            <div className={s.title}>Catrine Näsmark</div>
            <div className={s.text}>
              Konstnär, porträttmålare och livsbejakare
              <br />
              Bosatt i Stockholm
              <br />
              Utbildad vid Royal Danish Academy of Fine Arts
              <br />
              Aktuell med: ett Atlantis-projekt (juni 2025)
            </div>
            <br />
            <br />
          </div>
          <div style={{ fontSize: "20px" }}>
            <a
              style={{ textDecoration: "underline" }}
              href="https://artportable.com/profile/@catrine.nasmark"
            >
              Se fler verk av Catrine på Artportable
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
