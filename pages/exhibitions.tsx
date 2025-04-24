import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Main from "../app/components/Main/Main";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useTranslation } from "next-i18next";
import { styles } from "../styles/exhibitions.css";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { useRouter } from "next/router";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Exhibition({ navBarItems }) {
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
          <link rel="canonical" href={`${publicUrl}/${locale}/showroom`} />
        </Head>
        <div className={s.containerHeader}>
          <div className={s.containerWrapper}>
            <div className={s.titleHeader}>{t("title")}</div>
            <div className={s.textHeader}>{t("exhibitionText")}</div>
          </div>
        </div>

        <div className={s.containerCard}>
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/artbakery.jpg"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>Art Bakery NK</div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Regeringsgatan 47, 111 56 Stockholm
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Sepideh Sarrafzadeh
                </span>{" "}
                - 16 mars - 16 juni 2025
                <br />
                <span style={{ textDecoration: "underline" }}>
                  Vivecka Norberg
                </span>
                {""}
                {""} - 16 mars - 16 juni 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Anneli Önneby
                </span>{" "}
                {""}
                - 17 juni - 17 sep. 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Lars Källgren
                </span>{" "}
                {""}
                - 17 juni - 17 sep. 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Luuri Kononvo Gallery
                </span>{" "}
                {""}
                - 18 sep. - 18 dec 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Ganga Roslin Bladh
                </span>{" "}
                {""}- 18 sep. - 18 dec. 2025
              </div>
            </div>
          </div>
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/Marriott.jpg"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>
                AC Hotel by Marriott Stockholm Ulriksdal
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Kolonnvägen 41, Solna
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Catrine Lindström
                </span>{" "}
                - 14 april - 14 juni 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Gro Folkan
                </span>{" "}
                {""}
                - 14 april - 14 juni 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Ingela Johansson
                </span>{" "}
                {""}
                - 15 juni - 15 sep. 2025
                <br />
                <span style={{ textDecoration: "underline" }}>
                  Lina Murel Jardof
                </span>{" "}
                {""}
                - 15 juni - 15 sep. 2025
                <br />
                <span style={{ textDecoration: "underline" }}>
                  Ingela Johansson
                </span>{" "}
                {""}
                - 15 juni - 15 sep. 2025
                <br />
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/arla.jpg"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>Arla Sverige</div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Solna
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Kononov Gallery
                </span>{" "}
                - 25 mars - 25 maj 2025
                <br />
                <span style={{ textDecoration: "underline" }}>
                  Christel Jonsson
                </span>{" "}
                {""}
                - 25 mars - 25 maj 2025
                <br />
                <span style={{ textDecoration: "underline" }}>
                  Christine Halldoff
                </span>{" "}
                {""}
                - 25 mars - 25 maj 2025
                <br />
                <span style={{ textDecoration: "underline" }}>
                  Felix Oppenheim
                </span>{" "}
                {""}
                - 25 mars - 25 maj 2025
                <br />
                <span style={{ textDecoration: "underline" }}>
                  Anna Frenning
                </span>{" "}
                {""}
                - 25 mars - 25 maj 2025
                <br />
                <span style={{ textDecoration: "underline" }}>
                  Thor-Ulf Löfstedt
                </span>{" "}
                {""}
                - 25 mars - 25 maj 2025
                <br />
              </div>
            </div>
          </div>
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/artcafe.webp"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>ArtCafe NK</div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Hamngatan 18–20, 111 47 Stockholm
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Petra Risberg
                </span>{" "}
                - 24 mars – 23 juni 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Dina Johnsen
                </span>{" "}
                - 23 juni - 23 sep. 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Magareta Öberg
                </span>{" "}
                - 23 sep. - 23 dec 2025
              </div>
            </div>
          </div>{" "}
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/Balder.jpg"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>Balder</div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Fredsborgsgatan 24, 117 58 Stockholm
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Berit Emstrand
                </span>{" "}
                - från 12 maj 2025 <br />
              </div>
            </div>
          </div>
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/Risberg-2.png"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>Galleri Risberg</div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Bergsgatan 36, 112 23 Stockholm
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Christine Halldorf
                </span>{" "}
                - 12 - 25 maj 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Kent Wahlbeck
                </span>{" "}
                {""}
                - 20 okt. - 2 nov. 2025
                <br />
              </div>
            </div>
          </div>
          {/*  */}
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/kg10.jpeg"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>KG10</div>
              <div className={s.adress}>Kungsgatan 10, 111 43 Stockholm</div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Nathalie Palmaer
                </span>{" "}
                - 12 maj - 12 nov. 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  Stephanie Kinnard
                </span>
                - 12 maj - 12 nov. 2025 <br />
                <span style={{ textDecoration: "underline" }}>
                  René Jacobsen
                </span>
                - 12 maj - 12 nov. 2025
              </div>
            </div>
          </div>
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/melanders.webp"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>Melanders Södermalm</div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Åsögatan 111, 116 24 Stockholm
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Katarina Persson
                </span>{" "}
                - Pågående <br />
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          {""}
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/Matsal.jpg"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>PS Matsal</div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Nytorgsgatan 42, 116 40 Stockholm
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>Oliw87</span> {""}
                - pågående <br />
                <span style={{ textDecoration: "underline" }}>
                  Annika Berglöf
                </span>{" "}
                {""}
                - pågående
                <br />
              </div>
            </div>
          </div>
          <div className={s.wrapperCard}>
            <div>
              <img
                className={s.image}
                src="/images/anglais.jpg"
                alt="kg10 image"
              />{" "}
              <div style={{ fontSize: "28px" }}>Scandic Anglais</div>
              <div
                style={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  fontWeight: "200",
                }}
              >
                Humlegårdsgatan 23, 114 46 Stockholm
              </div>
              <div style={{ marginTop: "20px", fontWeight: 500 }}>
                {t("artist")}
              </div>
              <div style={{ fontWeight: "300" }}>
                <span style={{ textDecoration: "underline" }}>
                  Kirsten Johansson
                </span>{" "}
                - 10 april - 10 maj 2025
                <br />
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
      navBarItems: navBarItems,
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
