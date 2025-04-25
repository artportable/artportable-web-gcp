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

const exhibitions = [
  {
    slug: "artbakery-nk",
    title: "Art Bakery NK",
    address: "Regeringsgatan 47, 111 56 Stockholm",
    image: "/images/artbakery.jpg",
    artists: [
      { name: "Sepideh Sarrafzadeh", dates: "16 mars - 16 juni 2025" },
      { name: "Vivecka Norberg", dates: "16 mars - 16 juni 2025" },
      { name: "Anneli Önneby", dates: "17 juni - 17 sep. 2025" },
      { name: "Lars Källgren", dates: "17 juni - 17 sep. 2025" },
      { name: "Luuri Kononvo Gallery", dates: "18 sep. - 18 dec 2025" },
      { name: "Ganga Roslin Bladh", dates: "18 sep. - 18 dec. 2025" },
    ],
  },
  {
    slug: "marriott",
    title: "AC Hotel by Marriott Stockholm Ulriksdal",
    address: "Kolonnvägen 41, Solna",
    image: "/images/Marriott.jpg",
    artists: [
      { name: "Catrine Lindström", dates: "14 april - 14 juni 2025" },
      { name: "Gro Folkan", dates: "14 april - 14 juni 2025" },
      { name: "Ingela Johansson", dates: "15 juni - 15 sep. 2025" },
      { name: "Lina Murel Jardof", dates: "15 juni - 15 sep. 2025" },
    ],
  },
  {
    slug: "arla",
    title: "Arla Sverige",
    address: "Solna",
    image: "/images/arla.jpg",
    artists: [
      { name: "Kononov Gallery", dates: "25 mars - 25 maj 2025" },
      { name: "Christel Jonsson", dates: "25 mars - 25 maj 2025" },
      { name: "Christine Halldoff", dates: "25 mars - 25 maj 2025" },
      { name: "Felix Oppenheim", dates: "25 mars - 25 maj 2025" },
      { name: "Anna Frenning", dates: "25 mars - 25 maj 2025" },
      { name: "Thor-Ulf Löfstedt", dates: "25 mars - 25 maj 2025" },
    ],
  },
  {
    slug: "artcafe-nk",
    title: "ArtCafe NK",
    address: "Hamngatan 18–20, 111 47 Stockholm",
    image: "/images/artcafe.webp",
    artists: [
      { name: "Petra Risberg", dates: "24 mars – 23 juni 2025" },
      { name: "Dina Johnsen", dates: "23 juni - 23 sep. 2025" },
      { name: "Magareta Öberg", dates: "23 sep. - 23 dec 2025" },
    ],
  },
  {
    slug: "balder",
    title: "Balder",
    address: "Fredsborgsgatan 24, 117 58 Stockholm",
    image: "/images/Balder.jpg",
    artists: [{ name: "Berit Emstrand", dates: "från 12 maj 2025" }],
  },
  {
    slug: "risberg",
    title: "Galleri Risberg",
    address: "Bergsgatan 36, 112 23 Stockholm",
    image: "/images/Risberg-2.png",
    artists: [
      { name: "Christine Halldorf", dates: "12 - 25 maj 2025" },
      { name: "Kent Wahlbeck", dates: "20 okt. - 2 nov. 2025" },
    ],
  },
  {
    slug: "kg10",
    title: "KG10",
    address: "Kungsgatan 10, 111 43 Stockholm",
    image: "/images/KG101.jpg",
    artists: [
      { name: "Nathalie Palmaer", dates: "12 maj - 12 nov. 2025" },
      { name: "Stephanie Kinnard", dates: "12 maj - 12 nov. 2025" },
      { name: "René Jacobsen", dates: "12 maj - 12 nov. 2025" },
    ],
  },
  {
    slug: "melanders",
    title: "Melanders Södermalm",
    address: "Åsögatan 111, 116 24 Stockholm",
    image: "/images/Melanders.webp",
    artists: [{ name: "Katarina Persson", dates: "Pågående" }],
  },
  {
    slug: "ps-matsal",
    title: "PS Matsal",
    address: "Nytorgsgatan 42, 116 40 Stockholm",
    image: "/images/Matsal.jpg",
    artists: [
      { name: "Oliw87", dates: "pågående" },
      { name: "Annika Berglöf", dates: "pågående" },
    ],
  },
  {
    slug: "anglais",
    title: "Scandic Anglais",
    address: "Humlegårdsgatan 23, 114 46 Stockholm",
    image: "/images/anglais.jpg",
    artists: [{ name: "Kirsten Johansson", dates: "10 april - 10 maj 2025" }],
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
      <Main
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

        <div className={s.containerHeader}>
          <div className={s.containerWrapper}>
            <div className={s.titleHeader}>{t("title")}</div>
            <div className={s.textHeader}>{t("exhibitionText")}</div>
          </div>
        </div>

        <div className={s.containerCard}>
          {exhibitions.map((exhibition) => (
            <Link
              key={exhibition.slug}
              href={`/exhibition/${exhibition.slug}`}
              passHref
            >
              <a className={s.wrapperCard}>
                <div>
                  <img
                    className={s.image}
                    src={exhibition.image}
                    alt={exhibition.title}
                  />
                  <div style={{ fontSize: "28px" }}>{exhibition.title}</div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      fontWeight: "200",
                    }}
                  >
                    {exhibition.address}
                  </div>
                  <div style={{ marginTop: "20px", fontWeight: 500 }}>
                    {t("artist")}
                  </div>
                  <div style={{ fontWeight: "300" }}>
                    {exhibition.artists.map((artist, i) => (
                      <div key={i}>
                        <span style={{ textDecoration: "underline" }}>
                          {artist.name}
                        </span>{" "}
                        – {artist.dates}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </Link>
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
