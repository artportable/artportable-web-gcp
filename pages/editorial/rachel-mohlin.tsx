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

export default function mohlin({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>
            Rachel Mohlin – &quot;Jag kommer lämna lögner efter mig&quot;
          </title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content='Rachel Mohlin – "Jag kommer lämna lögner efter mig"'
          />
          <meta
            property="og:title"
            content='Rachel Mohlin – "Jag kommer lämna lögner efter mig"'
          />
          <meta property="og:image" content="/images/rachelimage.jpeg" />
          <meta
            property="og:description"
            content='Rachel Mohlin – "Jag kommer lämna lögner efter mig"'
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${publicUrl}/editorial/rachel-mohlin`}
          />
          <link rel="canonical" href={`${publicUrl}/editorial/rachel-mohlin`} />
        </Head>
        <div style={{ marginTop: "20px" }}></div>
        <div className={s.imageWrapper}>
          <Image
            src={"/images/rachelimage.jpeg"}
            layout="fill"
            objectFit="contain"
            priority
            alt="Rachel Mohlin konstverk"
          />
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Rachel Mohlin. Foto: Matilda Rahm
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Rachel Mohlin – &quot;Jag kommer lämna lögner efter mig&quot;
              <br />
              <br />
            </div>

            <br />
            <div className={s.mainText}>
              <span style={{ fontWeight: "600" }}>
                Ett porträtt av Rachel Mohlin – Skådespelare. Imitatör.
                Författare. Regissör. Låtskrivare. Manusförfattare. och
                Bildskapare.
              </span>{" "}
              <br />
              <br />
              Rachel Mohlin rör sig fritt mellan uttryck – men alltid med
              människan i centrum. I varje roll, varje penseldrag, varje ord
              gömmer sig ett försök att förstå, att fånga något som känns. Eller
              som hon själv uttrycker det: <br />
              – Jag kommer lämna lögner efter mig – en fras som lika gärna kunde
              vara en målningstitel, en katalogrubrik eller en livsfilosofi.
              <br />
              <br />
              För den breda publiken är hon känd från tv och radio –{" "}
              <span style={{ fontStyle: "italic" }}>
                Kvarteret Skatan, Public Service, Partaj{" "}
              </span>{" "}
              med mera och som författare till romanen{" "}
              <span style={{ fontStyle: "italic" }}>Dungen</span>. Men det många
              inte vet är att bildkonsten varit en lika självklar del av hennes
              skapande sedan barnsben. Det började med brandtillsyningsblock på
              pappans kontor, där hon ritade slott och monster samtidigt som hon
              berättade högt för sig själv. Bild och berättelse växte fram hand
              i hand – och gör det fortfarande.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-03-28</div>
            <br />
            <br />
            <div className={s.title}>
              Målningen som en scen, färgen som ett språk
            </div>
            <br />
            <div className={s.text}>
              Redan i tonåren sökte hon sig till konsten på allvar. Uppmuntrad
              av sin bildlärare skapade hon sin egen utställning på Jönköpings
              Kulturhus. Sedan följde Konstskolan Bais och därefter år av
              teater, tv, film och manusarbete och måleriet förblev en stilla
              ström i bakgrunden. 2023 tog det åter fart – först som en del av
              en tv-serieprocess, sedan i arbetet med föreställningen
              EXTRAINSATT på Kulturhuset Stadsteatern, där hon även stod för
              scenografi och kostymskisser. Och där tog färgen och formen ny
              plats i hennes liv.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Image
                  src={"/images/rachelone.jpeg"}
                  width={"400px"}
                  height={"300px"}
                  objectFit="contain"
                  quality={10}
                  priority
                  alt="Rachel Mohlin konstverk"
                />
              </div>

              <div className={s.image}>
                <Image
                  src={"/images/racheltwo.jpeg"}
                  width={"400px"}
                  height={"300px"}
                  objectFit="cover"
                  quality={10}
                  priority
                  alt="Therese vesterlund konstverk"
                />
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>
              En stil i rörelse, ett konstnärskap i flera lager
            </div>
            <br />
            <div className={s.text}>
              Rachel Mohlins måleri är intuitivt och lekfullt, men samtidigt
              allvarligt närvarande. Hon arbetar ofta i blandteknik – blyerts,
              tusch, akryl på kraftiga akvarellpapper – och varje verk bär på
              ett inre rörelsemönster. Ansikten är ofta startpunkten, födda ur
              en tanke, en fråga eller en känsla som måste få landa i bild.
              Färgen rött återkommer som ett slags visuell signatur: – Jag
              lämnar sällan ifrån mig en målning utan något rött i sig.
            </div>
            <br />
            <br />
            <div className={s.title}>Konstnärer, gränser och små lögner</div>
            <br />
            <div className={s.text}>
              Hon inspireras av konstnärer som tänjer gränserna mellan uttryck:
              Marie-Louise Ekman, Marianne Lindberg De Geer, Jesper Waldersten –
              men också av stämningsrika berättare som Julie Delpy och Elizabeth
              Strout. Och verkligen även konstnärer som: Sara-Vide Ericson och
              Charlotte Salomon. Och som den berättare hon är, kan även
              målningarna ibland tala bokstavligen – med inskrivna repliker,
              skämt eller små lögner. – Jag hade en period när jag skrev på
              målningarna, berättar hon. – Korta dialoger, skämt, uppmaningar,
              eller bara rena rama lögner. Det kommer nog tillbaka. Det är
              faktiskt redan på gång. Faktum är att mitt nästa verk heter just:
              JAG SKALL LÄMNA LÖGNER EFTER MIG. (både måleri och scenkonst ryms
              i detta verk)
            </div>
            <br />
            <br />
            <div className={s.title}>
              Framtiden – broderi, brevpapper och bildberättelser
            </div>
            <br />
            <div className={s.text}>
              Rachel Mohlin ser sin konst som en levande förlängning av allt
              annat hon gör. Hon målar, skriver, gestaltar – ofta samtidigt.
              Nästa steg i skapandet blir att addera nya material: – Jag vill
              börja brodera på mina målningar. Nål och tråd skall bli mina nya
              följeslagare! <br />
              <br />
              Framtidsdrömmarna är mångfacetterade: att illustrera böcker, skapa
              textila tryck, designa ett brevpapper – kanske till och med en
              servis. Möjligheterna är många när uttryck inte behöver hålla sig
              inom ramarna.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Konsten som kraftkälla – i vardagen och i världen
            </div>
            <br />
            <div className={s.text}>
              – Konsten är allt, säger Rachel. En livsnödvändighet, ett andrum,
              en kraftkälla – både personligt och samhälleligt. <br /> – Utan
              konsten går det inte.
              <br />
              <br />
              Och till den som längtar efter att skapa, men inte vågar ta
              steget, skickar hon med ett enkelt men vackert råd: – Drömmen är
              starten. Med drömmen är du redan på rätt plats. Älska det stället
              – resten kommer.
              <br />
            </div>
            <br />

            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={s.image}>
                <Image
                  src={"/images/rachelthree.jpeg"}
                  width={"400px"}
                  height={"300px"}
                  objectFit="contain"
                  quality={10}
                  priority
                  alt="rachel mohlin konstverk"
                />
              </div>
            </div>

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
