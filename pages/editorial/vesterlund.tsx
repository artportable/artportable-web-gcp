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

export default function vesterlund({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Therese Vesterlund om sin väg in i måleriet</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            name="keywords"
            content="Therese Vesterlund, konst, utställning, Galleri, oljemålningar, konstnär"
          />
          <meta
            property="og:title"
            content=" Färg, harmoni och naturens energi – Therese Vesterlund om sin väg
            in i måleriet"
          />
          <meta property="og:image" content="/images/vesterlundthree.jpeg" />
          <meta
            property="og:description"
            content=" Färg, harmoni och naturens energi – Therese Vesterlund om sin väg
            in i måleriet"
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${publicUrl}/editorial/vesterlund`}
          />
          <link rel="canonical" href={`${publicUrl}/editorial/vesterlund`} />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/a4603229-cb4c-42c8-91c1-f49b5f17c4ad">
            <Image
              src={"/images/vesterlundone.jpeg"}
              layout="fill"
              objectFit="cover"
              priority
              alt="Therese vesterlund konstverk"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic" }}>Havets vågor</div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Färg, harmoni och naturens energi – Therese Vesterlund om sin väg
              in i måleriet
            </div>

            <br />
            <div className={s.mainText}>
              Therese Vesterlund fann vägen in i måleriets värld under en tid då
              livet plötsligt stannade upp. Under pandemin, när arbetslivet
              flyttade hem och den sociala kontakten minskade, började hon måla
              på allvar – och hittade ett nytt sätt att uttrycka sig. <br />{" "}
              <br />– Som barn tecknade jag en del, men det var först under
              Covid, när jag hade mycket tid för mig själv, som jag började måla
              på målardukar. Det blev ett sätt att fylla dagarna med något
              meningsfullt och samtidigt ett sätt att landa i mig själv,
              berättar hon. <br />
              <br /> Valet av akrylfärg som huvudsakligt medium var ett medvetet
              beslut – både praktiskt och kreativt. <br /> – Jag är både
              analytisk och kreativ, så jag läste på om skillnaderna mellan
              akryl och olja. Akrylen kändes mer flexibel och snabbare att
              arbeta med. Jag tittade på massor av webinarier och blev
              inspirerad av olika tekniker.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-03-20</div>
            <br />
            <br />
            <div className={s.title}>En stil rotad i naturens färger</div>
            <br />
            <div className={s.text}>
              Therese beskriver sin konst som naturrelaterad och abstrakt – med
              en twist. Inspirationen kommer ofta från skogen, vattnet och de
              mjuka, harmoniska färgtoner som naturen bjuder på. <br />
              <br />– Jag vill att målningarna ska ge energi, ett lugn och
              positiva vibbar. Färgerna är viktiga för mig – jag dras till milda
              toner i blått, grönt, rosa eller koppar. Skulle en målning kännas
              för dyster så målar jag ofta över den. <br />
              <br />
              Även om konsten är abstrakt så finns det ofta ett tema eller en
              känsla bakom varje verk. Det kan vara ett minne, en plats, ett
              djur eller något från vardagen som sätter igång skapandet.
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/5cc0e23e-4e63-479e-9d6a-48124d0bfbb6">
                  <Image
                    src={"/images/vesterlundthree.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="contain"
                    quality={10}
                    priority
                    alt="Therese vesterlund konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Solros explosion
                </div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/66ebcd4d-2916-459b-8905-85bc3fe7c7e0">
                  <Image
                    src={"/images/vesterlundtwo.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                    alt="Therese vesterlund konstverk"
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>Midsommaräng</div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>En kreativ balans i livet</div>
            <br />
            <div className={s.text}>
              Till vardags arbetar Therese som verksamhetsutvecklare inom
              strategiskt inköp – ett yrke som kräver struktur, målmedvetenhet
              och analys. Just därför blir måleriet en viktig kontrast i hennes
              liv. <br />
              <br />– Målningen är mitt sätt att varva ner, landa och hitta
              tillbaka till något mer intuitivt och fritt. Jag kan sitta på
              kvällarna och förbereda en målarduk, och måla vidare på helgen.
              Det är en balans som fungerar bra för mig. <br />
              <br />
              Yogan och ridningen är två andra viktiga delar i hennes liv – båda
              aktiviteter som, liksom konsten, ger både ro och energi.
            </div>
            <br />
            <br />
            <div className={s.title}>En process som får växa fram</div>
            <br />
            <div className={s.text}>
              Therese kreativa process varierar från gång till gång. Ibland
              börjar det med en tydlig inspiration – ett färgtema, ett djur, ett
              samtal eller ett webinarium. I andra fall växer målningen fram
              spontant. Hon arbetar ofta i lager, använder både modelling paste,
              penslar, svamp, händer, spatel och hårfön – tekniker som ger
              struktur, rörelse och djup i målningarna.
            </div>
            <br />
            <br />
            <div className={s.title}>Mot framtiden – med nya mål i sikte</div>
            <br />
            <div className={s.text}>
              Just nu ställer Therese ut åtta verk på ett café i Tungelsta, men
              hon har siktet tydligt inställt på att få visa sin konst i
              Stockholm inom kort. En dröm hon vill förverkliga är att ordna en
              egen vernissage i centrala Stockholm under våren eller försommaren
              2025 – något hon ser som ett viktigt nästa steg i sitt
              konstnärskap. <br />
              <br />– Det skulle vara fantastiskt att få möta betraktare och
              konstintresserade i ett fysiskt galleri, och att kunna visa min
              konst i en inspirerande miljö. Jag hoppas verkligen kunna skapa
              ett sådant tillfälle under våren eller försommaren. <br />
              <br />– Det skulle också vara roligt att delta i ett sammanhang
              som Affordable Art eller andra samlingsutställningar. Jag vill
              utvecklas som konstnär, förfina mina tekniker och kanske hitta nya
              vägar framåt.
            </div>
            <br />
            <br />
            <div className={s.title}>Konsten som energi och harmoni</div>
            <br />
            <div className={s.text}>
              För Therese har konsten blivit en viktig del av hennes identitet.
              Hon hoppas att hennes verk förmedlar det hon själv känner när hon
              skapar – harmoni, glädje och ett lugn mitt i vardagen. <br />
              <br />– Många säger att de blir glada av mina färgkombinationer,
              och det är precis det jag vill förmedla.
            </div>
            <br />
            <br />
            <div className={s.title}>
              Therese tips till den som vill börja måla:
            </div>
            <br />
            <div className={s.text}>
              – Börja enkelt, titta på webinarier, gå med i online-klubbar,
              testa olika tekniker och våga experimentera. Blir det inte som du
              tänkt – måla över och börja om. Det viktigaste är att du har kul.
              <br />
            </div>

            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/d1de54cf-7c26-4c27-9354-8594a895cbe6">
                  <Image
                    src={"/images/vesterlundfour.jpg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                    alt="vesterlund konstverk"
                  />
                </Link>
                <div style={{ fontStyle: "italic", textAlign: "center" }}>
                  Fire-works
                </div>
              </div>
            </div>
            <br />
            <div style={{ fontSize: "20px" }}>
              Se fler verk av:{" "}
              <a
                style={{ textDecoration: "underline" }}
                href="https://artportable.com/profile/@art_by_theresew"
              >
                Therese Vesterlund
              </a>
            </div>
            <br />
            <br />
            <div className={s.title}>Redo att hitta konst som känns?</div>
            <br />
            <div className={s.text}>
              Låt dig inspireras av konstnärer som skapar med hjärta, själ och
              berättelse. Utforska originalkonst direkt från konstnärer på
              Artportable.com.
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
