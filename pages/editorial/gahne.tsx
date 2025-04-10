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

export default function gahne({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Kristina Gahne – Måleriet som en dialog</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Kristina Gahne – Måleriet som en dialog"
          />
          <meta
            property="og:title"
            content="Kristina Gahne – Måleriet som en dialog"
          />
          <meta property="og:image" content="/images/gahnefive.jpg" />
          <meta
            property="og:description"
            content="För konstnären Kristina Gahne är skapandet inte en strikt planerad process eller ett
            kontrollerat resultat – utan snarare ett samtal."
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/gahne`} />
          <link rel="canonical" href={`${publicUrl}/editorial/gahne`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/348728d6-26cd-4738-8f09-04b519f8e31f">
            <Image
              src={"/images/gahneone.jpg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>Onshore</div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Kristina Gahne – Måleriet som en dialog
            </div>
            <br />

            <br />
            <div className={s.mainText}>
              För konstnären Kristina Gahne är skapandet inte en strikt planerad
              process eller ett kontrollerat resultat – utan snarare ett samtal.
              Ett samspel mellan henne själv och själva processen, där
              intuition, känsla och närvaro i stunden får ta plats. I hennes
              måleri får det omedvetna stort utrymme, och penseldragen formas
              lika mycket av impulser som av eftertanke.
              <br />
              <br />– Det är som att något drar mig vidare, något jag kommer i
              kontakt med. En del kanske kallar det flow, berättar Kristina. Jag
              målar utan att tänka – i alla fall till en början. Sedan stannar
              jag upp och reflekterar. Ibland krävs det mental problemlösning,
              ibland känslomässig. Det är en växelverkan mellan spontanitet och
              eftertanke.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-10</div>
            <br />

            <br />
            <div className={s.title}>När målningen säger ifrån</div>
            <br />
            <br />
            <div className={s.text}>
              Att avgöra när en målning är färdig sker, enligt Kristina, mer med
              känslan än med intellektet.
              <br />
              <br />
              – Den brukar säga till själv! Det bara känns färdigt. Men jag
              behöver ofta låta målningen vila. Ibland ställer jag undan den ett
              tag, för att kunna se på den med nya ögon. Jag arbetar också ofta
              med flera verk parallellt – det ger processen luft.
              <br />
              <br />
              Kristinas konst har inga tydliga, återkommande teman – åtminstone
              inte medvetet. I stället låter hon idéerna styra. Det är ofta
              bilder jag burit med mig länge, som återkommer och till slut blir
              starten på ett verk. Tidigare styrdes motiven mer av kurser och
              uppgifter, men i det egna skapandet är det lusten och nyfikenheten
              som leder vägen.
            </div>

            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/8f084d05-fc4c-4f52-8857-d5cdfd70423c">
                  <Image
                    src={"/images/gahnetwo.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Hus med barn
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/643c2c81-153b-4393-b5d9-7e1e99cf3f3e">
                  <Image
                    src={"/images/gahnethree.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Pojken
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Det levda livet som inspiration</div>
            <br />
            <div className={s.text}>
              Inspirationen hämtas ur livet självt – naturen, vardagen, resor,
              möten, andra konstnärer. Ibland går Kristina tillbaka i tiden och
              använder privata fotografier som förlagor.
              <br />
              <br />– Det finns något vackert i att omvandla minnen till nya
              uttryck.
              <br />
              <br />
              Hon nämner särskilt samtida, ofta kvinnliga konstnärer som
              inspirerar henne – fria, modiga och kreativa röster. Ett slags
              konstnärligt systerskap som stärker det egna uttrycket.
              <br />
              <br />– Idéer kan komma från vad som helst – ibland bara dyker de
              upp, mitt i vardagen.
            </div>
            <br />
            <br />
            <div className={s.title}>Konst utan avsikt – men med närvaro</div>
            <br />
            <div className={s.text}>
              Kristina målar inte med ett särskilt budskap i åtanke. Det handlar
              främst om den egna skaparglädjen – men kanske också om att
              förmedla något, om än subtilt.
              <br />
              <br />
              – Jag har inga medvetna intentioner. Men visst vore det fint om
              min konst kunde beröra någon annan. Det räcker långt.
              <br />
              <br />
              Att sätta ord på sitt konstnärskap är inte alltid lätt. Men hon
              återger en kommentar som fastnat:
              <br />
              <br />– Någon sa att mina målningar är avskalade. Det tyckte jag
              kändes fint. Det kan jag förstå.
            </div>
            <br />
            <br />
            <div className={s.title}>Utställningar och framåtblickar</div>
            <br />
            <div className={s.text}>
              Just nu är Kristina aktuell med två utställningar. Den 5–11 maj
              ställer hon ut på Galleri Cupido i Gamla stan, och mellan 5–21
              april medverkar hon i Husby Konstsalong med verket Another Day in
              Paradise.
              <br />
              <br />
              Och vad är det som driver henne att fortsätta skapa?
              <br />
              <br />– Lust, glädje, inspiration... Det är just det som driver
              mig. Att omvandla en idé till en färdig bild – det är en
              fantastisk känsla.
              <br />
              <br />
            </div>
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/54059d04-f91a-4494-a27b-f1a05793cc68">
                  <Image
                    src={"/images/gahnefour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Apelsiner i en trasig korg
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/e96af85f-b5bb-4091-b659-a1856dda4985">
                  <Image
                    src={"/images/gahnefive.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Stad i ljus
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
              href="https://artportable.com/profile/@kgahne"
            >
              Kristina Gahne
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
