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

export default function konsttwo({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>
            Del 2: Konst för livet – hitta verket som väcker liv i ditt hem
          </title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Konst för livet – hitta verket som väcker liv i ditt hem"
          />
          <meta
            property="og:title"
            content='Del 2: Konst för livet – hitta verket som väcker liv i ditt hem"'
          />
          <meta property="og:image" content="/images/del-1.jpg" />
          <meta
            property="og:description"
            content="Konst som förändrar din vardag"
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${publicUrl}/editorial/konst-for-livet-del`}
          />
          <link
            rel="canonical"
            href={`${publicUrl}/editorial/konst-for-livet-del`}
          />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/eb7c1703-4c93-4939-9177-0a33c62fd180">
            <Image
              src={"/images/del-1.jpg"}
              layout="fill"
              objectFit="contain"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic", textAlign: "center" }}>
          Open fine art print
        </div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Del 2: Konst för livet – hitta verket som väcker liv i ditt hem
            </div>
            <br />
            <div style={{ fontSize: "24px" }}>
              Rytm och rörelse – konst som förändrar din vardag
            </div>
            <br />
            <div className={s.mainText}>
              När du letar efter konst att leva med – något som inte bara fyller
              en vägg, utan faktiskt gör skillnad i din vardag – finns det ett
              spår som är särskilt spännande att följa. Det är konsten som rör
              sig. Verken som bär på energi, rytm, riktning. De som nästan
              dansar av väggen.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-07</div>
            <br />
            <br />
            <div className={s.title}>När målningen inte vill stå still</div>
            <br />
            <div className={s.text}>
              Du kanske har sett dem. De där målningarna som inte verkar vilja
              stå still. Kanske ett motiv fångat mitt i ett steg, som en kropp
              som precis ska svänga om. Eller ett penseldrag som känns gjort i
              flykt, med ett visst tryck, som om det inte kunde hejdas. Ibland
              är det färger som kolliderar, splittras, rinner, möts. Och du
              känner det inte bara med ögonen – du känner det i kroppen. Det är
              ett sätt för konsten att säga:{" "}
              <span style={{ fontStyle: "italic" }}>
                titta, allt är i rörelse – även du.
              </span>
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/cb3f961e-964b-494e-bcff-278c70b5453f">
                  <Image
                    src={"/images/del-two.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Two hearts one step</div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/1bfd2e7d-e4b3-4e22-9a65-c77545e905be">
                  <Image
                    src={"/images/del-three.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  11
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Rörelse fångad i ett ögonblick</div>
            <br />
            <div className={s.text}>
              Den franske konstnären Edgar Degas målade dansare i slutet av
              1800-talet, men hans verk känns fortfarande oväntat moderna. Det
              är inte poserna som fastnar, utan ögonblicket mellan. När en fot
              just lämnar golvet. När kroppen fortfarande minns steget den tog,
              men redan är på väg någon annanstans. Den sortens verk fångar inte
              bara hur något ser ut – utan hur det känns att vara i rörelse.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Stillhet eller energi – vad längtar du efter?
            </div>
            <br />
            <div className={s.text}>
              När du letar efter ett konstverk som verkligen ska få betyda något
              för dig – tänk på det här: vill du ha stillhet, eller längtar du
              efter något som rör sig, som drar igång något i dig? Konst med
              rörelse passar inte överallt, men på rätt plats – till exempel i
              ett arbetsrum, ett vardagsrum eller en hall där du passerar ofta –
              kan den väcka något. Ge energi. Eller påminna dig om att du inte
              behöver vara klar för att vara på väg.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Det handlar inte om motivet – utan om känslan
            </div>
            <br />
            <div className={s.text}>
              Du behöver inte förstå exakt hur verket rör sig. Det viktiga är
              att du känner det. Det kan vara ett motiv – en dansare, ett
              vattenfall, fåglar i flykt. Men lika gärna ett abstrakt verk där
              inget föreställer något, men allt tycks befinna sig i ett
              tillstånd av förändring. Där färger drar åt olika håll, ytan bär
              spår av både tvekan och hast. Sådana verk är ofta laddade – inte
              med symboler, utan med närvaro.
            </div>
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/ddc6066a-2d66-4ab2-8971-fdf7cdd523bc">
                  <Image
                    src={"/images/del-four.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Förbindelse
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/2662ad4f-b762-4df8-9c80-ca204da6156b">
                  <Image
                    src={"/images/del-five.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Beyond Blonde
                </div>
              </div>
            </div>
            <br />
            <div className={s.title}>Släpp in rörelsen – och bjud in livet</div>
            <br />
            <div className={s.text}>
              Att släppa in rörelsen i ditt hem är att bjuda in liv – i dess
              vildhet, dess skönhet och dess oförutsägbarhet. Det passar inte
              överallt. Men där det passar, gör det skillnad. Nästa gång du ser
              ett verk som känns som att det vill ut ur ramen – stanna upp. Det
              kan vara precis det du behöver.
            </div>
            <br />
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
