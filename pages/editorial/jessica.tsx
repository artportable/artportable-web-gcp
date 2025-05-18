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

export default function jessica({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>
            &quot;Konsten skapar helhet&quot; – Inredaren Jessica Spångberg om
            vikten av konst i kommersiella miljöer
          </title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content='"Konsten skapar helhet" – Inredaren
            Jessica Spångberg om vikten av konst i
            kommersiella miljöer'
          />
          <meta
            property="og:title"
            content='"Konsten skapar helhet" – Inredaren
            Jessica Spångberg om vikten av konst i
            kommersiella miljöerg'
          />
          <meta property="og:image" content="/images/jessica2.jpg" />
          <meta
            property="og:description"
            content="För Madeleine Santiago började allt med ett råd från en läkare. Året var 2012, och hon var
            sjukskriven för utmattningsdepression."
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`${publicUrl}/editorial/jessica`} />
          <link rel="canonical" href={`${publicUrl}/editorial/jessica`} />
        </Head>
        {/* <div className={s.imageWrapper}>
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
        </div> */}
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              &quot;Konsten skapar helhet&quot; – Inredaren Jessica Spångberg om
              vikten av konst i kommersiella miljöer
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-04-30</div>
            <br />
            <br />
            <div className={s.mainText}>
              Att skapa inspirerande miljöer där människor både kan arbeta och
              trivas är en konst i sig. För inredaren Jessica Spångberg handlar
              det om mer än att välja rätt möbler och färger – konsten på
              väggarna spelar en avgörande roll.
              <br />
              <br />– Att inreda ett rum är som att skapa ett konstverk, säger
              Jessica. Varje liten del ska harmoniera med resten. Konsten
              förstärker helhetskänslan markant och blir ofta pricken över i:et
              i ett projekt.
              <br />
              <br />
            </div>

            <br />
            <div className={s.title}>
              Balans mellan det personliga och det professionella
            </div>
            <br />
            <br />
            <div className={s.text}>
              När Jessica inreder kommersiella lokaler som kontor eller
              restauranger strävar hon efter att föra in en känsla av hemtrevnad
              – men utan att förlora den professionella tonen.
              <br />
              <br />– I ett privat hem finns inga gränser, medan en arbetsplats
              måste spegla företagets varumärke och värderingar. Det handlar om
              att skapa en plats där både medarbetare och besökare känner en
              koppling till verksamheten, säger hon.
              <br />
              <br />
              Materialvalen är också avgörande: slitstarka ytor och färger som
              håller över tid blir ett måste i offentliga miljöer.
            </div>

            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/0ce654de-4141-44e2-8342-f82b7b7445ba">
                  <Image
                    src={"/images/jessica1.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Över svarta vatten
                </div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/7c17bba7-ad0d-46dd-a2c8-1339a2c8d1b1">
                  <Image
                    src={"/images/jessica2.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Gamla fyran.
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>Konst som förhöjer upplevelsen</div>
            <br />
            <div className={s.text}>
              För Jessica är konsten en självklar del av varje
              inredningskoncept. Ibland låter hon konsten inspirera inredningen,
              ibland är det tvärtom.
              <br />
              <br />– En gång berättade en medarbetare att hon trivdes extra bra
              vid en viss plats på kontoret, bara för att hon kände sig lugn
              intill ett konstverk. Det visar vilken kraft konsten kan ha i en
              miljö, berättar Jessica.
              <br />
              <br />I vissa projekt skapar hon väggar fyllda med olika uttryck –
              fotokonst, akvareller, akryl och citat – för att spegla företagets
              själ på ett personligt sätt.
            </div>
            <br />
            <br />
            <div className={s.title}>Därför väljer Jessica Artportable</div>
            <br />
            <div className={s.text}>
              Jessica använder ofta Artportable i sitt arbete och ser
              plattformen som en ovärderlig resurs.
              <br />
              <br />
              Jessica använder ofta Artportable i sitt arbete och ser
              plattformen som en ovärderlig resurs.
              <br />
              <br />
              För några år sedan upptäckte hon den norska konstnären{" "}
              <a
                style={{ textDecoration: "underline", fontWeight: "bold" }}
                href="https://artportable.com/profile/@hannelinnes"
              >
                Hanne Linnes
              </a>{" "}
              via Artportable – ett möte som ledde till inköp av två större
              akrylverk.
              <br />
              <br />– Utan Artportable hade jag aldrig hittat henne. Plattformen
              ger konstnärer en chans att synas och oss inredare en chans att
              hitta unika verk som annars kanske gått oss förbi, säger Jessica.
              <br />
              <br />
              Direktkontakten med konstnärerna ser hon också som en viktig del
              av processen.
              <br />
              <br />– Det gör konsten mer personlig och skapar en närmare
              relation till verket och dess historia.
            </div>
            <br />
            <br />
            <div className={s.title}>Inspiration och drömmar framåt</div>
            <br />
            <div className={s.text}>
              Just nu inspireras Jessica av naturen och färgerna grönt och
              blått, som enligt henne ger trygghet och lugn. Framåt drömmer hon
              om att få inreda hotellrum – ett nytt område där hon kan skapa
              unika upplevelser genom kombinationen av konst och inredning.
              <br />
              <br />
              Hennes råd till andra?
              <br />
              <br />– Gå efter det du själv tycker om. Se förbi trender och
              skapa miljöer som känns äkta. Konsten och inredningen tillsammans
              kan verkligen påverka hur vi mår.
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/9af35d89-26fc-43aa-b55a-f33094828d54">
                  <Image
                    src={"/images/jessica3.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  All I Cause Is Death
                </div>
              </div>
              {/* <div className={s.image}>
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
              </div> */}
            </div>
            <br />
            <br />
          </div>
          {/* <div style={{ fontSize: "20px" }}>
            Se fler verk av:{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://artportable.com/profile/@madeleinesantiagoart"
            >
              Madeleine Santiago
            </a>
          </div> */}
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
