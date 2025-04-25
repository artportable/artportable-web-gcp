import { useRouter } from "next/router";
import Head from "next/head";
import { styles } from "../../styles/exhibitions.css";
import Main from "../../app/components/Main/Main";
import { useMediaQuery, useTheme } from "@mui/material";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export const exhibitionData = {
  "artbakery-nk": {
    title: "Art Bakery NK",
    address: "Regeringsgatan 47, 111 56 Stockholm",
    image: "/images/artbakery.jpg",
    gallery: [
      "/images/artbakery-1.jpg",
      "/images/artbakery-2.jpg",
      "/images/artbakery-3.jpg",
      "/images/artbakery-4.jpg",
    ],
    description:
      "Beläget mitt emot det ikoniska varuhuset NK, är Art Bakery en levande mötesplats för konst och kultur. Här presenteras samtida konstnärer i en miljö som kombinerar det klassiska med det moderna. Utställningarna skiftar med säsongerna och erbjuder besökare en ständig källa till inspiration.",
    contactEmail: "hello@artportable.com",
  },
  kg10: {
    title: "KG10",
    address: "Kungsgatan 10, 111 43 Stockholm",
    image: "/images/KG101.jpg",
    gallery: ["/images/kg10-1.jpg", "/images/kg10-2.jpg"],
    description:
      "Mitt i city, bland utsikt över Kungsgatan och modern kontorsdesign, erbjuder KG10 ett dynamiskt kontorshotell för både små och stora företag. Här kombineras coworking och executive offices med fullt möblerade ytor och smarta servicelösningar. I detta professionella flöde vävs konsten sömlöst in i vardagen – från lobbyn till konferensrummen.",
    contactEmail: "hello@artportable.com",
  },
  "artcafe-nk": {
    title: "ArtCafé NK",
    address: "Hamngatan 18–20, 111 47 Stockholm",
    image: "/images/artcafe.webp",
    gallery: ["/images/artcafe-1.jpg", "/images/artcafe-2.jpg"],
    description:
      "I NK:s cafémiljö samsas samtal, kaffe och konst i en varm symfoni. Här får varje utställning sin egen rytm, från vårens spirande verk till vinterns mer dova toner. En plats där både öga och tanke får näring i varje möte.",
    contactEmail: "hello@artportable.com",
  },
  melanders: {
    title: "Melanders Södermalm",
    address: "Åsögatan 111, 116 24 Stockholm",
    image: "/images/Melanders.webp",
    gallery: ["/images/melanders-1.jpg", "/images/melanders-2.jpg"],
    description:
      "En livlig bistro på Södermalm där konsten vävs in i det sociala flödet. Här får du uppleva samtidskonst i ett nytt ljus – mitt bland samtal, dofter och levande miljö. Perfekt för en stunds reflektion mellan rätterna.",
    contactEmail: "hello@artportable.com",
  },
  anglais: {
    title: "Scandic Anglais",
    address: "Humlegårdsgatan 23, 114 46 Stockholm",
    image: "/images/anglais.jpg",
    gallery: ["/images/anglais-1.jpg", "/images/anglais-2.jpg"],
    description:
      "På detta ikoniska hotell vid Stureplan möts internationella gäster och lokala konstnärer. Loungen förvandlas till ett galleri där nya perspektiv och uttryck får ta plats. Här är konsten en del av upplevelsen – lika självklar som musiken i baren.",
    contactEmail: "hello@artportable.com",
  },
  marriott: {
    title: "AC Hotel by Marriott Stockholm Ulriksdal",
    address: "Kolonnvägen 41, Solna",
    image: "/images/Marriott.jpg",
    gallery: ["/images/marriott-1.jpg", "/images/marriott-2.jpg"],
    description:
      "Ett modernt hotellrum för idéer och uttryck. Konsten här rör sig genom foajéer och konferensytor som en stillsam följeslagare till resande gäster. Med ett varierat urval av konstnärer skapas en elegant kontrast till den urbana miljön utanför.",
    contactEmail: "hello@artportable.com",
  },
  risberg: {
    title: "Galleri Risberg",
    address: "Bergsgatan 36, 112 23 Stockholm",
    image: "/images/Risberg-2.png",
    gallery: ["/images/risberg-1.jpg", "/images/risberg-2.jpg"],
    description:
      "I detta galleri på Kungsholmen möts etablerade röster och nya perspektiv i ett dynamiskt program. Utställningarna på Galleri Risberg präglas av personligt uttryck och materialmässig variation. En plats för fördjupning i samtidskonst från flera håll.",
    contactEmail: "hello@artportable.com",
  },
  balder: {
    title: "Balder",
    address: "Fredsborgsgatan 24, 117 58 Stockholm",
    image: "/images/Balder.jpg",
    gallery: ["/images/balder-1.jpg", "/images/balder-2.jpg"],
    description:
      "I Balders imponerande lokal med generösa väggytor och takhöjd, möts konst och samhällsengagemang. Här har bland annat Läkare utan gränser sitt kontor, vilket skapar en dynamisk miljö där konstnärliga uttryck och humanitära värden samverkar.",
    contactEmail: "hello@artportable.com",
  },
  arla: {
    title: "Arla Sverige",
    address: "Solna",
    image: "/images/arla.jpg",
    gallery: ["/images/arla-1.jpg", "/images/arla-2.jpg"],
    description:
      "På Arlas kontor i Solna möts tradition och innovation, både i företagets värden och i konsten som pryder väggarna. Här lyfts både välkända namn och nya röster fram i en bredd av uttryck. En inspirerande plats för dialog mellan konst och kollega.",
    contactEmail: "hello@artportable.com",
  },
  "ps-matsal": {
    title: "PS Matsal",
    address: "Nytorgsgatan 42, 116 40 Stockholm",
    image: "/images/Matsal.jpg",
    gallery: ["/images/psmatsal-1.jpg", "/images/psmatsal-2.jpg"],
    description:
      "I hjärtat av Södermalm erbjuder PS Matsal en unik kombination av mat, möten och kreativitet. Här samsas matlagningskurser, vinprovningar och festligheter i en lokal som förenar modern design med historisk charm. Konsten får en naturlig plats i denna dynamiska miljö.",
    contactEmail: "hello@artportable.com",
  },
  "affordable-art-fair": {
    title: "Affordable Art Fair",
    address: "Nacka Strandsmässan, Augustendalstorget 6, 131 52 Nacka Strand",
    image: "/images/affordable.jpg",
    gallery: ["/images/affordable-1.jpg", "/images/affordable-2.jpg"],
    description:
      "Artportable medverkar återigen i Affordable Art Fair med ett noga kurerat urval av samtida konstnärer. Här får du möta konst som är både tillgänglig och tankeväckande – i ett format där passion och professionalism möts. Välkommen till årets mest färgstarka möte med samtidskonsten.",
    contactEmail: "hello@artportable.com",
  },
};

export default function ExhibitionDetailPage({ navBarItems }) {
  const { query } = useRouter();
  const { slug } = query;
  const data = exhibitionData[slug as string];
  const s = styles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  if (!data)
    return <div style={{ padding: "2rem" }}>Exhibition not found.</div>;

  return (
    <>
      <Main
        fullWidth={true}
        navBarItems={navBarItems}
        noHeaderPadding={isMobile}
      >
        <Head>
          <title>{data.title}</title>
          <meta name="keywords" content={data?.description} />
          <meta property="og:title" content={data?.title} />
          <meta property="og:image" content={data?.image} />
          <meta property="og:description" content={data?.description} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${publicUrl}/exhibition/${data?.slug}`}
          />
        </Head>

        <div className={s.pageWrapper}>
          <img src={data.image} alt={data.title} className={s.mainImage} />

          <div className={s.layoutWrapper}>
            {/* Left column */}
            <div className={s.leftCol}>
              <h1 className={s.title}>{data.title}</h1>
              <p className={s.address}>{data.address}</p>
              <p className={s.description}>{data.description}</p>
              <div className={s.contact}>
                <strong>Vill du ställa ut?</strong>
                <br />
                Kontakta oss på{" "}
                <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>
              </div>
            </div>

            {/* Right column - Gallery */}
            {/* <div className={s.rightCol}>
              <h3 className={s.galleryTitle}>Fler bilder</h3>
              <div className={s.galleryGrid}>
                {data.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className={s.galleryImage}
                  />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </Main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems,
      ...(await serverSideTranslations(locale, [
        "common",
        "footer",
        "header",
        "gdpr",
        "support",
        "plans",
        "exhibitions",
      ])),
    },
    revalidate: 60,
  };
}

// pages/exhibition/[slug].js
export async function getStaticPaths({ locales }) {
  const paths = Object.keys(exhibitionData).flatMap((slug) =>
    locales.map((locale) => ({
      params: { slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false, // or 'blocking' if you prefer on-demand
  };
}
