import Main from "../app/components/Main/Main";
import ZendeskForm from "../app/components/ZendeskFormMenu/ZendeskFormMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/faq.css";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import Head from "next/head";
import clsx from "clsx";
import { useRouter } from "next/router";
import Footer from "../app/components/Footer/Footer";

export default function Faq({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["support"]);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { locale } = useRouter();

  return (
    <Main
      fullWidth={true}
      noHeaderPadding={true}
      navBarItems={navBarItems}
      isShow={false}
    >
      <Head>
        <meta name="title" content={t("contactUs")} />
        <meta name="description" content={t("yourWelcome")} />
        <meta property="og:title" content={t("contactUs")} />
        <meta property="og:description" content={t("yourWelcome")} />
        <meta property="og:url" content="https://artportable.com/support" />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />
        <link rel="canonical" href={`${publicUrl}/${locale}/support`} />
      </Head>
      <body className={s.container}>
        <section className={s.headerContainer}>
          <h1>{t("faq:faq")}</h1>
        </section>
        <section className={s.faqContainer}>
          <article className={s.faqAnswers}>
            <section id="section1" className={s.titlesWrapper}>
              <p className={s.numbers} style={{ backgroundColor: "#a684ff" }}>
                1
              </p>
              <h1 className={s.h1}>{t("faq:titleOne")}</h1>
            </section>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionOne")}</h4>
              <p className={s.paragraph}>{t("faq:answerOne")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionTwo")}</h4>
              <p className={s.paragraph}>{t("faq:answerTwo")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionThree")}</h4>
              <p className={s.paragraph}>{t("faq:answerThree")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionFour")}</h4>
              <p className={s.paragraph}>{t("faq:answerFour")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionFive")}</h4>
              <p className={s.paragraph}>
                {t("faq:answerFive")} <br />
              </p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionSix")}</h4>
              <p className={s.paragraph}>{t("faq:answerSix")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionSeven")}</h4>
              <p className={s.paragraph}>{t("faq:answerSeven")}</p>
            </article>
            <section id="section2" className={s.titlesWrapper}>
              <p className={s.numbers} style={{ backgroundColor: "#ff8383" }}>
                2
              </p>
              <h1 className={s.subTitle}>{t("faq:titleTwo")}</h1>
            </section>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionEight")}</h4>
              <p className={s.paragraph}>{t("faq:answerEight")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionNine")}</h4>
              <p className={s.paragraph}>{t("faq:answerNine")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionTen")}</h4>
              <p className={s.paragraph}>{t("faq:answerTen")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionEleven")}</h4>
              <p className={s.paragraph}>{t("faq:answerEleven")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionTwelve")}</h4>
              <p className={s.paragraph}>{t("faq:answerTwelve")}</p>
            </article>
            <section id="section3" className={s.titlesWrapper}>
              <p className={s.numbers} style={{ backgroundColor: "#ffca40" }}>
                3
              </p>
              <h1 style={{ fontSize: "30px" }}>{t("faq:titleThree")}</h1>
            </section>

            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionThirteen")}</h4>
              <p className={s.paragraph}>{t("faq:answerThirteen")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionFourteen")}</h4>
              <p className={s.paragraph}>{t("faq:answerFourteen")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionFiftheen")}</h4>
              <p className={s.paragraph}>{t("faq:answerFiftheen")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionSixteen")}</h4>
              <p className={s.paragraph}>{t("faq:answerSixteen")}</p>
            </article>
            <article className={s.articles}>
              <h4 className={s.subTitle}>{t("faq:questionSeventeen")}</h4>
              <p className={s.paragraph}>{t("faq:answerSeventeen")}</p>
            </article>
          </article>
          <aside className={s.boxNav}>
            <section className={s.titlesWrapper}>
              <p
                className={s.numbers}
                style={{
                  backgroundColor: "#a684ff",
                  fontSize: "10px",
                  width: "30px",
                  height: "30px",
                }}
              >
                1
              </p>
              <a
                href="#section1"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                {" "}
                {t("faq:titleOne")}
              </a>
            </section>
            <section className={s.titlesWrapper}>
              <p
                className={s.numbers}
                style={{
                  backgroundColor: "#ff8383",
                  fontSize: "10px",
                  width: "30px",
                  height: "30px",
                }}
              >
                2
              </p>
              <a
                href="#section2"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                {t("faq:titleTwo")}
              </a>
            </section>
            <section className={s.titlesWrapper}>
              <p
                className={s.numbers}
                style={{
                  backgroundColor: "#ffca40",
                  fontSize: "10px",
                  width: "30px",
                  height: "30px",
                }}
              >
                3
              </p>
              <a
                href="#section3"
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                {t("faq:titleThree")}
              </a>{" "}
            </section>

            <section
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ borderBottom: "1px solid black" }}></div>
              <p>{t("faq:notFound")}</p>
              <a
                className={s.contactButton}
                href="mailto:hello@artportable.com"
              >
                {t("faq:contactUs")}
              </a>
            </section>
          </aside>
        </section>
        <Footer />
      </body>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, ["header", "footer", "faq"])),
    },
    revalidate: 60,
  };
}
