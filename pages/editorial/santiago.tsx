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
          <title>Madeleine Santiago – konsten som blev en livsväg</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Madeleine Santiago – konsten som blev en livsväg"
          />
          <meta
            property="og:title"
            content="Madeleine Santiago – konsten som blev en livsväg"
          />
          <meta property="og:image" content="/images/gahnefive.jpg" />
          <meta
            property="og:description"
            content="För Madeleine Santiago började allt med ett råd från en läkare. Året var 2012, och hon var
            sjukskriven för utmattningsdepression."
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/santiago`} />
          <link rel="canonical" href={`${publicUrl}/editorial/santiago`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/a6470b32-6279-4de2-9b0e-4f719a3cd6cc">
            <Image
              src={"/images/santiagoone.jpg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Lyckans värld
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Madeleine Santiago – konsten som blev en livsväg
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-15</div>
            <br />
            <br />
            <div className={s.mainText}>
              För Madeleine Santiago började allt med ett råd från en läkare.
              Året var 2012, och hon var sjukskriven för utmattningsdepression.
              Rekommendationen var enkel: gör något kreativt. Det blev starten
              på en resa som skulle förändra hennes liv i grunden.​
              <br />
              <br />– – Jag köpte färg och dukar och tänkte att måla kan väl
              inte vara så svårt. Det blev ett par ögon, en fjäril, ett försök
              på en blomma – en grårosa sörja. Så svårt! Men också så
              fantastiskt. Jag väckte en passion där och då.
              <br />
              <br />
              Att måla blev för Madeleine inte bara en väg tillbaka, utan en väg
              framåt. Den ursprungliga terapin övergick snabbt i ett intensivt
              skapande. Fem år senare sa hon upp sig från sitt arbete och tog
              steget fullt ut – mot konsten som liv och yrke.​
            </div>
            <br />

            <br />

            <br />
            <div className={s.title}>Från vardag till färgexplosion</div>
            <br />
            <br />
            <div className={s.text}>
              Madeleines konst är omisskännlig: starka färger, flödande känslor
              och motiv som talar direkt till hjärtat. Kvinnor i stora
              färgstarka klänningar är ett återkommande tema – ett uttryck för
              frihet, minnen från barndomens dans, och en kärlek till rörelse
              och form. Det finns något djupt personligt i varje verk, oavsett
              om det är ett porträtt, ett djurmotiv eller ett abstrakt
              experiment.​
              <br />
              <br />– Jag målar från känsla, alltid. Det är där jag hittar
              närvaro. Det är där betraktaren ofta känner igen sig. Jag lämnar
              en liten bit av mig själv i varje målning.
            </div>

            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/573398db-22f6-48ec-ad04-71abca76ac63">
                  <Image
                    src={"/images/santiagotwo.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  I’m with you
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/349b0838-6236-438d-b838-2fa8d5b9c09b">
                  <Image
                    src={"/images/santiagothree.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Klädd i drömmar
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Självlärd med stark röst</div>
            <br />
            <div className={s.text}>
              Trots att hon är självlärd har Madeleine snabbt skapat sig en
              självklar plats på den svenska konstscenen. Hon har ställt ut på
              slott, gallerier och i välbesökta konstrundor – och hennes verk
              syns regelbundet i TV-rutan. Ett särskilt minne är mötet med
              Pernilla Wahlgren.​
              <br />
              <br />– Jag minns första gången jag lämnade över en målning till
              Pernilla och hela Wahlgrens Värld-teamet var där och filmade. Det
              kändes helt surrealistiskt. Sen dess har hon köpt flera målningar
              – och till och med gett en till Bianca. Det är sådana stunder man
              nyper sig i armen.
              <br />
              <br />
              Madeleine beskriver sin stil som en blandning av traditionella
              tekniker och moderna uttryck – alltid med ett lekfullt öga och en
              varm hand. En distanskurs i måleri på ArtistLab och en
              porträttkurs via Studieförbundet har varit till hjälp, men det är
              den egna vägen som format hennes konstnärskap.​
              <br />
              <br />– Jag älskar det lite naiva och charmiga. Perfektion är inte
              mitt mål – känslan är allt.
            </div>
            <br />
            <br />
            <div className={s.title}>Att våga börja</div>
            <br />
            <div className={s.text}>
              För den som står där Madeleine själv stod 2012, med ett brustet
              inre men en längtan att skapa, har hon ett tydligt råd:​
              <br />
              <br />
              – Våga! Börja i det lilla. Måla ur dig det du känner – för din
              egen skull. Jämför dig inte, lek med färgerna och känn vad de gör
              med dig. Det kan bli början på något du aldrig kunde ana.
              <br />
              <br />
              Idag är Madeleine Santiago inte bara en konstnär – hon är ett
              levande bevis på hur skapandet kan hela, lyfta och förvandla. I
              varje målning finns ett spår av den resan – och en öppen inbjudan
              till dig som betraktare: att känna, att drömma, att våga.
            </div>
            <br />
            <br />

            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/46996bcd-e0c1-4a57-8dff-431f3f8e524d">
                  <Image
                    src={"/images/santiagofour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  I harmoni
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/17c4c4a4-2323-48b4-aaf5-52cfd2faceca">
                  <Image
                    src={"/images/santiagofive.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  See you again
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
              href="https://artportable.com/profile/@madeleinesantiagoart"
            >
              Madeleine Santiago
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
