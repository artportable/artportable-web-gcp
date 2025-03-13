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

export default function konst({ navBarItems }) {
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { t } = useTranslation(["header"]);
  const s = styles();
  const { locale } = useRouter();

  return (
    <div style={{ backgroundColor: "white" }}>
      <Main navBarItems={navBarItems} fullWidth={true}>
        <Head>
          <title>Dana Ingessons inre landskap</title>
          <meta name="description" content={t("artistsPageDescripton")} />
          <meta
            property="og:title"
            content={"      Del 1: Konst för livet – en köpguide"}
          />
          <meta property="og:image" content="/images/arttwo.jpeg" />
        </Head>
        <div className={s.imageWrapper}>
          <Link href="https://artportable.com/art/07106225-1add-43c1-bac0-ca651e22cc8e">
            <Image
              src={"/images/arttwo.jpeg"}
              layout="fill"
              objectFit="cover"
            />
          </Link>
        </div>
        <div style={{ fontStyle: "italic" }}>Svaret är JA</div>
        <div className={s.textContainer}>
          <div>
            <div className={s.mainTitle}>
              Del 1: Konst för livet – en köpguide
            </div>
            <div style={{ fontSize: "18px" }}>
              Så köper du konst som känns personlig – inte bara snygg
            </div>
            <br />
            <div className={s.mainText}>
              I en tid där inredningstrender lätt styr våra val, är det lätt att
              tro att konst bara handlar om vad som ”passar i rummet”. Men konst
              är mer än bara en snygg detalj på väggen – det kan vara något som
              berör, berättar en historia eller speglar vem du är. Här får du
              tips på hur du kan hitta konst som inte bara ser bra ut, utan
              också känns rätt.
            </div>
            <br />
            <br />
            <div>av Erik Nordlander</div>
            <div>Publicerat: 2025-03-13</div>
            <br />
            <br />
            <div className={s.title}>
              Lita på magkänslan – inte bara färgpaletten
            </div>
            <br />
            <div className={s.text}>
              Färger och stil spelar förstås en roll, men ibland är det just den
              där odefinierbara känslan som gör ett konstverk till något du
              verkligen vill leva med. Ett motiv som väcker minnen, ett
              penseldrag som känns levande – det är ofta sådana detaljer som gör
              konst personlig. <br />
              <br /> Ställ dig själv några frågor:
              <ul>
                <li>Vad fastnar jag för direkt?</li>
                <li>Är det något i verket som påminner mig om något?</li>
                <li>Känner jag något – snarare än bara ser något?</li>
              </ul>
            </div>
            <br />
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/372e16cf-d777-424f-94de-1ae1a47b6af0">
                  <Image
                    src={"/images/artone.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>
                  Det bästa bordet är baren
                </div>
              </div>

              <div className={s.image}>
                <Link href="https://artportable.com/art/19063158-ee11-4d36-a02f-608edcbb30cb">
                  <Image
                    src={"/images/artthree.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>
                  Ljuva sommar på Bullerö
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className={s.title}>
              Sök bortom trender – hitta din egen stil
            </div>
            <br />
            <div className={s.text}>
              Trender kommer och går. Din konstsmak är något mycket mer
              personligt. Det är helt okej att dras till konst som inte är
              &quot;inne&quot; just nu – det gör din samling ännu mer unik. På
              Artportable hittar du konstnärer med olika uttryck – från drömska
              akvareller till kraftfulla abstrakta verk. Genom att upptäcka
              olika stilar kan du också utforska din egen smak och hitta konst
              som talar till just dig.
            </div>
            <br />
            <br />
            <div className={s.title}>Upptäck berättelserna bakom konsten</div>
            <br />
            <div className={s.text}>
              Många konstverk blir ännu mer levande när du vet vad som
              inspirerat dem. När du köper konst direkt från en konstnär får du
              ofta med mer än bara ett verk – du får en berättelse. Kanske
              handlar tavlan om en plats, en känsla eller en personlig
              upplevelse. Det gör att du får ett djupare band till verket – och
              till konsten i stort. På Artportable kan du läsa konstnärernas
              egna berättelser och hitta den där kopplingen som gör skillnad.
            </div>
            <br />
            <br />
            <div className={s.title}>Köp med hjärtat – inte med regler</div>
            <br />
            <div className={s.text}>
              Det finns inga rätt eller fel när det gäller att köpa konst. Den
              bästa vägledningen är den som kommer från dig själv. Det
              viktigaste är inte vad andra tycker – utan vad du känner. Och det
              är just det som gör konst till något unikt. Den ska inte bara
              pryda ditt hem – den ska bli en del av det.
            </div>
            <br />
            <div className={s.imageRow}>
              <div className={s.image}>
                <Link href="https://artportable.com/art/3b22a3ce-1d5b-4c4b-accb-9ec62dc201bd">
                  <Image
                    src={"/images/artfour.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>
                <div style={{ fontStyle: "italic" }}>Void I & II</div>
              </div>
              <div className={s.image}>
                <Link href="https://artportable.com/art/41f48610-1770-4eca-8949-5296f00f2d8c">
                  <Image
                    src={"/images/artfive.jpeg"}
                    width={"400px"}
                    height={"300px"}
                    objectFit="cover"
                    quality={10}
                    priority
                  />
                </Link>

                <div style={{ fontStyle: "italic" }}>
                  Diptych Written in the sand
                </div>
              </div>
            </div>
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
