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

export default function reshmi({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Sofia Reshmi – konsten att tejpa fast ett ögonblick</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Sofia Reshmi – konsten att tejpa fast ett ögonblick"
          />
          <meta
            property="og:title"
            content="Sofia Reshmi – konsten att tejpa fast ett ögonblick"
          />
          <meta property="og:image" content="/images/reshmis.jpg" />
          <meta
            property="og:description"
            content="Sofia Reshmi – konsten att tejpa fast ett ögonblick"
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/reshmi`} />
          <link rel="canonical" href={`${publicUrl}/editorial/reshmi`} />
        </Head>
        <div className={s.imageWrapper}>
          <Image
            src={"/images/reshmis.jpg"}
            layout="fill"
            objectFit="contain"
            priority
            alt="Sofia Reshmi konstverk"
          />
        </div>

        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Sofia Reshmi – konsten att tejpa fast ett ögonblick
            </div>

            <br />
            <div className={s.mainText}>
              Med varningstejp, Polaroider och direkta ord skapar Sofia Reshmi
              konst i ett mellanrum – där mänskliga möten skaver, önskningar
              kolliderar och känslor glider isär. I det där utrymmet mellan
              interaktion, motsägelse och distraktion hittar hon sin energi. Ett
              rum av laddad stillhet – som ibland bara varar ett ögonblick, men
              som hon lyckas tejpa fast, bokstavligt talat.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-04</div>
            <br />
            <br />
            <div className={s.text}>
              Hennes verk är färgstarka, högljudda och i ögonfallande –
              samtidigt råa, poetiska och skavande vackra. Det är konst som
              säger något direkt men lämnar mycket kvar att känna. En slags
              visuell diktradition med tejp som pensel, reklamens punchlines som
              språk, och filmens rytm i kompositionen.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/e187009b-8262-4dfe-a02a-91504e2f24df">
                  <Image
                    src={"/images/reshmitwo.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Sofia Reshmi konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Break between rounds
                </div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/74280be2-765f-4844-9566-7adaa1846a07">
                  <Image
                    src={"/images/reshmithree.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Sofia Reshmi konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Thinking about thinking
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>
              <span style={{ fontStyle: "italic" }}>
                {" "}
                &quot;Jag tejpar i mellanrum – mellan det sagda och det osagda,
                det närvarande och det undflyende. Det är där jag ser människor
                som tydligast.&quot;
              </span>
            </div>
            <br />
            <div className={s.text}>
              Att hon aldrig gått på konstskola är ingen tillfällighet – det är
              ett medvetet val, rotat i en längtan efter frihet. Hon vill inte
              rätta sig efter normer eller teorier, utan följa det som känns.
              Det sitter i ryggraden efter många år i reklambranschen, där
              snabba beslut, stark visuell närvaro och tydliga budskap är
              avgörande – men också i hennes personliga erfarenhet av att
              navigera livet utan färdiga mallar.
            </div>
            <br />
            <div className={s.text}>
              <span style={{ fontStyle: "italic" }}>
                &quot;Jag vill inte tänka på vad som är rätt eller fel i
                kulturella sammanhang. Jag går på magkänslan – alltid.&quot;
              </span>
              <br />
              <br />
              Hennes signaturstil växte fram organiskt – ur en fascination för
              det direkta, det analoga och det ofiltrerade. Polaroiden, med sin
              oförutsägbarhet och omedelbara karaktär, fångar det som är just
              nu. Varningstejpen hittade hon i sin verkstad – de korta, ibland
              absurda, ibland allvarstyngda budskapen väckte något i henne. De
              blev en spegling av en tid då hon själv brottades med känslomässig
              distans och närhet – både i livet och i familjen.
              <br />
              Själva tejpandet är en process i faser – intuitiv, befriande och
              ibland frustrerande. Den råa gesten kommer först, sedan söker hon
              efter balansen. Texten är ofta svårast. Orden ska kännas spontana
              men ändå träffa rätt – visuellt och emotionellt. När det blir för
              tillrättalagt, när känslan försvinner, då tar hon en paus. Det
              viktigaste är att det ska vara tilltalande – men inte perfekt.
              <br />
              <br />
              <span style={{ fontStyle: "italic" }}>
                {" "}
                &quot;Jag jobbar mycket med imperfektion. Allt behöver inte vara
                rakt, liksidigt och balanserat. Det blir så tråkigt då. Tejpen
                får vara en övning i oreda.&quot;
              </span>
            </div>
            <br />
            <br />
            <div className={s.text}>
              Hennes inspirationskällor är många, ofta oväntade. En italiensk
              läderratt, en lyktstolpe i Berlin med texten “Your husband is on
              Grinder”, en rörelse, en färg, ett minne. Det handlar inte om att
              samla på intryck, utan att filtrera – att särskilja vad som är
              meningsfullt från vad som bara är brus. Det är ett arbete i sig.
              <br />
              <br />
              Sofia bor och verkar i både Berlin och på Falsterbonäset – två
              platser som påverkar hennes konst på olika sätt. I Berlin finns
              inga gränser, bara ny graffiti varje vecka och en pulserande
              frihet. I Falsterbo finns havet, naturen, stillheten – och ett mer
              konservativt klimat som hon gärna trotsar med sin konst.
              <br />
              <br />
              <span style={{ fontStyle: "italic" }}>
                &quot;Jag försöker bortse från politiken och fokusera på magen.
                Känslan i platsen. Och Berlin är full av känsla.&quot;
              </span>
            </div>
            <br />

            <br />
            <div className={s.text}>
              Återkommande i hennes verk är temat om det dolda. Hon vet hur det
              är att leva med hemligheter – att inte kunna eller våga vara sann
              mot sig själv. Den erfarenheten har satt spår, och gett henne en
              särskild känslighet för allt som döljs, hålls tillbaka, kvävs i
              tystnad.
              <br />
              <br />
              Framåt drömmer hon om utställningar i Berlin och Amsterdam, och är
              i färd med att utforska ett nytt koncept – att få Polaroiden att
              röra sig. Hon är öppen för samarbeten, nya format, nya uttryck –
              så länge det känns rätt i magen.
              <br />
              <br />
              <span style={{ fontStyle: "italic" }}>
                &quot;I slutändan vill jag väcka ett WOW. Och sen få människor
                att titta närmre, och känna något de kanske inte visste fanns
                där.&quot;
              </span>
            </div>
            <br />
            <br />

            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/c73f95dd-73fc-4195-be94-ae261e14ad0b">
                  <Image
                    src={"/images/reshmifour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Sofia reshmi konstverk"
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Bored Housewives collection: I am cutting you off
                </div>
              </div>
            </div>
            <br />
            <div style={{ fontSize: "20px" }}>
              Se fler verk av:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href="https://artportable.com/profile/@x-ray_collectiveart"
              >
                Sofia Reshmi
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
