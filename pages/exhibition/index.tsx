import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Main from "../../app/components/Main/Main";
import { getNavBarItems } from "../../app/utils/getNavBarItems";
import { useTranslation } from "next-i18next";
import { styles } from "../../styles/exhibitions.css";
import { useBreakpointDown } from "../../app/hooks/useBreakpointDown";
import { useRouter } from "next/router";
import { useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import Typography from "@material-ui/core/Typography/Typography";
import BannerText from "../../app/components/BannerText/BannerText";
import MainOption from "../../app/components/Main/MainOption";

const exhibitions = [
  {
    slug: "artbakery-nk",
    title: "Art Bakery NK",
    address: "Regeringsgatan 47, 111 56 Stockholm",
    image: "/images/artbakery.png",
    artists: [
      {
        name: "Sepideh Sarrafzadeh",
        dates: "16 mars - 16 juni 2025",
        link: "sepideh",
      },
      {
        name: "Vivecka Norberg",
        dates: "16 mars - 16 juni 2025",
        link: "vivecka",
      },
      {
        name: "Anneli Önneby",
        dates: "17 juni - 17 sep. 2025",
        link: "artbyaosweden",
      },
      {
        name: "Lars Källgren",
        dates: "17 juni - 17 sep. 2025",
        link: "kallgren.lars",
      },
      {
        name: "Luuri Kononvo Gallery",
        dates: "18 sep. - 18 dec 2025",
        link: "iuriikononov",
      },
      {
        name: "Ganga Roslin Bladh",
        dates: "18 sep. - 18 dec. 2025",
        link: "ganga.art",
      },
    ],
  },
  {
    slug: "marriott",
    title: "AC Hotel by Marriott Stockholm Ulriksdal",
    address: "Kolonnvägen 41, Solna",
    image: "/images/ac.png",
    artists: [
      {
        name: "Catrine Lindström",
        dates: "14 april - 14 juni 2025",
        link: "artbymec",
      },
      { name: "Gro Folkan", dates: "14 april - 14 juni 2025", link: "g-fol" },
      {
        name: "Ingela Johansson",
        dates: "15 juni - 15 sep. 2025",
        link: "ingela.johansson",
      },
      {
        name: "Lina Murel Jardof",
        dates: "15 juni - 15 sep. 2025",
        link: "linamureljardorf",
      },
    ],
  },
  {
    slug: "arla",
    title: "Arla Sverige",
    address: "Solna",
    image: "/images/arla.png",
    artists: [
      {
        name: "Kononov Gallery",
        dates: "25 mars - 25 maj 2025",
        link: "iuriikononov",
      },
      {
        name: "Christel Jonsson",
        dates: "25 mars - 25 maj 2025",
        link: "chriart",
      },
      {
        name: "Christine Halloff",
        dates: "25 mars - 25 maj 2025",
        link: "christine.halloff",
      },
      {
        name: "Felix Oppenheim",
        dates: "25 mars - 25 maj 2025",
        link: "felix.oppenheim",
      },
      {
        name: "Anna Frenning",
        dates: "25 mars - 25 maj 2025",
        link: "anna.frenning",
      },
      {
        name: "Thor-Ulf Löfstedt",
        dates: "25 mars - 25 maj 2025",
        link: "thorulf.lofstedt",
      },
    ],
  },
  {
    slug: "artcafe-nk",
    title: "ArtCafe NK",
    address: "Hamngatan 18–20, 111 47 Stockholm",
    image: "/images/artcafe.png",
    artists: [
      {
        name: "Petra Risberg",
        dates: "24 mars – 23 juni 2025",
        link: "petra.risberg",
      },
      {
        name: "Dina Johnsen",
        dates: "23 juni - 23 sep. 2025",
        link: "dinajohnsen",
      },
      {
        name: "Margareta Öberg",
        dates: "23 sep. - 23 dec 2025",
        link: "margareta.ohberg",
      },
    ],
  },
  {
    slug: "balder",
    title: "Balder",
    address: "Fredsborgsgatan 24, 117 58 Stockholm",
    image: "/images/balder.png",
    artists: [
      {
        name: "Berit Emstrand",
        dates: "från 12 maj 2025",
        link: "berit.emstrand",
      },
      { name: "Olof Chronvall", link: "olofchronvall" },
    ],
  },
  {
    slug: "risberg",
    title: "Galleri Risberg",
    address: "Bergsgatan 36, 112 23 Stockholm",
    image: "/images/risberga.png",
    artists: [
      {
        name: "Christine Halloff",
        dates: "12 - 25 maj 2025",
        link: "christine.halloff",
      },
      {
        name: "Kent Wahlbeck",
        dates: "20 okt. - 2 nov. 2025",
        link: "kent",
      },
    ],
  },
  {
    slug: "kg10",
    title: "KG10",
    address: "Kungsgatan 10, 111 43 Stockholm",
    image: "/images/kg10.png",
    artists: [
      {
        name: "Nathalie Palmaer",
        dates: "12 maj - 12 nov. 2025",
        link: "palmaerart",
      },
      {
        name: "Stephanie Kinnard",
        dates: "12 maj - 12 nov. 2025",
        link: "stephanie_kinnard",
      },
      {
        name: "René Jacobsen",
        dates: "12 maj - 12 nov. 2025",
        link: "rene.jacobsen",
      },
    ],
  },
  {
    slug: "melanders",
    title: "Melanders Södermalm",
    address: "Åsögatan 111, 116 24 Stockholm",
    image: "/images/melanders.png",
    artists: [
      { name: "Katarina Persson", dates: "Pågående", link: "katarinapersson" },
    ],
  },
  {
    slug: "ps-matsal",
    title: "PS Matsal",
    address: "Nytorgsgatan 42, 116 40 Stockholm",
    image: "/images/ps.png",
    artists: [
      { name: "Oliw87", dates: "pågående", link: "oliw87" },
      { name: "Annika Berglöf", dates: "pågående", link: "annika.berglof" },
    ],
  },
  {
    slug: "anglais",
    title: "Scandic Anglais",
    address: "Humlegårdsgatan 23, 114 46 Stockholm",
    image: "/images/scandic.png",
    artists: [
      {
        name: "Kirsten Johansson",
        dates: "10 april - 10 maj 2025",
        link: "kjdesign",
      },
    ],
  },
  {
    slug: "crest",
    title: "Simon Crest",
    address: "Upplandsgatan 37, 113 28 Stockholm",
    image: "/images/simon.webp",
    artists: [
      { name: "Karin Holmström", dates: "pågående", link: "karin.holmstrom" },
    ],
  },
  {
    slug: "yono",
    title: "Yono Sabo",
    address: "Luntmakargatan 42, 111 37 Stockholm",
    image: "/images/sabo.png",
    artists: [
      {
        name: "Christer Åberg",
        dates: "1 april - 1 juni",
        link: "christer.aber",
      },
    ],
  },
];

export default function Index({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation("exhibitions");
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { locale } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <MainOption
        fullWidth={true}
        navBarItems={navBarItems}
        noHeaderPadding={isMobile}
      >
        <Head>
          <title>{t("title")}</title>
          <meta name="description" content={t("artportableExhibition")} />
          <meta name="url" content={t("exhibitionText")} />
          <link
            rel="canonical"
            href={`${publicUrl}/${locale}/artexhibitions`}
          />
        </Head>

        <BannerText title={t("title")} text={t("exhibitionText")} />

        <div className={s.containerCard}>
          {exhibitions.map((exhibition) => (
            <div key={exhibition.slug}>
              <a className={s.wrapperCard}>
                <div
                  style={{
                    height: "40%",
                    display: "flex",
                    alignItems: " center",
                  }}
                >
                  {" "}
                  <img
                    className={s.image}
                    src={exhibition.image}
                    alt={exhibition.title}
                  />
                </div>
                <div className={s.cardContent}>
                  <div className={s.statusText}>{t("onGoing")}</div>
                  <div className={s.artists}>
                    {exhibition.artists.map((artist, i) => (
                      <div key={artist.link} style={{ margin: "4px" }}>
                        <a
                          href={`https://artportable.com/profile/@${artist.link}`}
                          className={s.artistName}
                        >
                          {artist.name}
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className={s.adress}>{exhibition.address}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className={s.footerContainer}>
          <div className={s.bannerSquare}>
            <div className={s.aaf}>Affordable Art Fair</div>
          </div>
          <div className={s.footerBanner}>
            <div className={s.footerWrapper}>
              <div className={s.bannerContent}>
                <div className={s.bannerPreTitle}>
                  Artportable ställer ut på Affordable Art Fair
                </div>

                <div className={s.bannerDate}>3–6 oktober 2025</div>

                <div className={s.bannerAddress}>
                  Nacka Strandsmässan, Augustendals torget 6, 131 52 Nacka
                  Strand
                </div>

                <div className={s.bannerArtistsLabel}>Konstnärer</div>

                <div className={s.bannerArtists}>TBA</div>
              </div>
            </div>
          </div>
        </div>
      </MainOption>
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
