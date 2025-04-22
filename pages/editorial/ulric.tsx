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

export default function santiago({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Ulric Rudebeck – mellan landskap och linjer</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Ulric Rudebeck – mellan landskap och linjer"
          />
          <meta
            property="og:title"
            content="Ulric Rudebeck – mellan landskap och linjer"
          />
          <meta property="og:image" content="/images/ulricone.jpg" />
          <meta
            property="og:description"
            content="Ulric Rudebeck – mellan landskap och linjer."
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/ulric`} />
          <link rel="canonical" href={`${publicUrl}/editorial/ulric`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/eedd25d6-e24d-4da7-bbe8-fdbe6d879554">
            <Image
              src={"/images/ulricone.jpg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Fjällvärlden i sommar
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Ulric Rudebeck – mellan landskap och linjer
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-22</div>
            <br />
            <br />
            <div className={s.mainText}>
              När landskapet återkom i Ulric Rudebecks måleri, var det med ny
              närvaro. Efter en längre period helt i abstraktionens tecken hade
              blicken för det yttre återvänt – men med förändrad ton. Inspirerad
              av konstnärer som Carl Fredrik Hill och Roland Svensson började
              han åter utforska naturmotiv, men utan att någonsin fastna i det
              föreställande. För honom handlar landskapet inte om utsikten, utan
              om det inre tillstånd det bär. Det osagda bakom det synliga.
              <br />
              <br />
              Ulrics konst rör sig i ett gränsland mellan yttre och inre
              världar. Ett motiv kan börja i ett minne – ett kargt fjäll, ett
              soldränkt ökenfält, havets horisont – men det som blir kvar på
              duken är något annat. En rörelse, ett ljus, en känsla av riktning.
              Ofta är det färgen som leder. Den är inte ett verktyg, utan ett
              språk. Det är genom den han för samtal med världen, och med sig
              själv.
              <br />
              <br />– Jag målar för att undersöka, inte för att förklara. Det
              finns en frihet i att låta uttrycket komma före tanken.
              <br />
              <br />
              Friheten i konsten står i kontrast till hans långa yrkesliv som
              chefsutvecklare och graphic facilitator, där kreativitet ofta
              styrs av syfte, struktur och andras behov. I ateljén finns inga
              sådana ramar. Här kan något ske utan att det måste bli något.
              Måleriet är en plats där han kan följa snarare än leda.
              <br />
              <br />
              Under en intensiv fas arbetade han helt abstrakt, i ett flöde där
              handen styrde mer än huvudet. Han beskriver det som att penseln
              fick ta över – och att det krävdes mod att släppa kontrollen.
              Resultatet blev ett måleri med helt ny energi, där varje verk
              växte fram genom rörelse snarare än plan. I det arbetet föddes
              också temat till hans senaste utställning, Between the lines – en
              titel som speglar både processen och intentionen.
              <br />
              <br />– Det handlar om vad som finns mellan formerna, mellan
              besluten. Det osagda är ofta det mest levande.
              <br />
              <br />
              Men konsten är inget nytt i Ulrics liv. Han har ritat och målat så
              länge han kan minnas – som barn, som tonåring, parallellt med
              arbete och familj. Skapandet har alltid funnits där, som en stilla
              tråd vid sidan av allt annat. Det var först för ungefär tjugo år
              sedan som den tråden blev tydligare, starkare – något han valde
              att ge plats.
              <br />
              <br />
              Sedan dess har måleriet blivit ett sätt att förankra sig. I
              upplevelsen. I nuet. I något som inte går att säga med ord.
              <br />
              <br />
              <div className={s.imageRow}>
                <div className={s.image}>
                  <Link href="https://artportable.com/art/4e296bd7-192c-4505-acc9-40a3cc94921c">
                    <Image
                      src={"/images/ulrictwo.jpg"}
                      width={"400px"}
                      height={"300px"}
                      objectFit="contain"
                      quality={10}
                      priority
                    />
                  </Link>
                  <div style={{ fontStyle: "italic", textAlign: "center" }}>
                    Snurran A240105-1
                  </div>
                </div>
                <div className={s.image}>
                  <Link href="https://artportable.com/art/268cb3fc-fa3b-49e7-8083-a9b33dcd938b">
                    <Image
                      src={"/images/ulricthree.jpg"}
                      width={"400px"}
                      height={"300px"}
                      objectFit="contain"
                      quality={10}
                      priority
                    />
                  </Link>

                  <div style={{ fontStyle: "italic", textAlign: "center" }}>
                    240102-01
                  </div>
                </div>
              </div>
              <br />
              <br />
              Hans verk rör sig mellan det abstrakta och det figurativa, och han
              låter det vara en öppen dörr i varje målning – ibland vet han inte
              förrän långt in i processen vilken riktning det tar. Ibland vet
              han det inte ens när målningen är klar. Men han vet när den är
              färdig. Det är en punkt han känner snarare än bestämmer.
              <br />
              <br />– Det är som om målningen själv säger: nu räcker det. Nu är
              det inte jag längre som ska tala.
              <br />
              <br />
              Att få visa sina verk, att ställa ut, är för Ulric ett
              privilegium. Inte för att kommunicera något färdigt, utan för att
              lämna över. Mötet med publiken är inte en leverans, utan en
              övergång. En målning får ett nytt liv i varje människa som stannar
              upp framför den.
              <br />
              <br />
              Och kanske är det just där hans konst får sitt djupaste uttryck –
              i mellanrummet. Mellan linjerna. Mellan konstnären och
              betraktaren. Mellan det som sägs och det som bara anas.
            </div>

            <br />

            <br />

            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/8648390e-ded0-4f4c-96e3-4bfb8944844b">
                  <Image
                    src={"/images/ulricfour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Med Ran´s vägledning
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/d459b4ef-e69e-448e-a596-ffabc779c7f8">
                  <Image
                    src={"/images/ulricfive.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Gult segel
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
              href="https://artportable.com/profile/@ulric"
            >
              Ulric Rudebeck
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
