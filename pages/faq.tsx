import Main from "../app/components/Main/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/faq.css";
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../app/components/Footer/Footer";
import { useState } from "react";

export default function Faq({ navBarItems }) {
  const s = styles();
  const { t } = useTranslation(["faq", "support"]);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const { locale } = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpandedSection(isExpanded ? panel : false);
  };

  const faqSections = [
    {
      id: "section1",
      title: t("titleOne"),
      color: "#4a4a4a",
      questions: [
        { question: t("questionOne"), answer: t("answerOne") },
        { question: t("questionTwo"), answer: t("answerTwo") },
        { question: t("questionThree"), answer: t("answerThree") },
        { question: t("questionFour"), answer: t("answerFour") },
        { question: t("questionFive"), answer: t("answerFive") },
        { question: t("questionSix"), answer: t("answerSix") },
        { question: t("questionSeven"), answer: t("answerSeven") },
      ]
    },
    {
      id: "section2", 
      title: t("titleTwo"),
      color: "#6b6b6b",
      questions: [
        { question: t("questionEight"), answer: t("answerEight") },
        { question: t("questionNine"), answer: t("answerNine") },
        { question: t("questionTen"), answer: t("answerTen") },
        { question: t("questionEleven"), answer: t("answerEleven") },
        { question: t("questionTwelve"), answer: t("answerTwelve") },
      ]
    },
    {
      id: "section3",
      title: t("titleThree"), 
      color: "#8a8a8a",
      questions: [
        { question: t("questionThirteen"), answer: t("answerThirteen") },
        { question: t("questionFourteen"), answer: t("answerFourteen") },
        { question: t("questionFiftheen"), answer: t("answerFiftheen") },
        { question: t("questionSixteen"), answer: t("answerSixteen") },
        { question: t("questionSeventeen"), answer: t("answerSeventeen") },
      ]
    }
  ];

  return (
    <Main
      fullWidth={true}
      noHeaderPadding={true}
      navBarItems={navBarItems}
      isShow={false}
    >
      <Head>
        <meta name="title" content={t("faq")} />
        <meta name="description" content={t("notFound")} />
        <meta property="og:title" content={t("faq")} />
        <meta property="og:description" content={t("notFound")} />
        <meta property="og:url" content="https://artportable.com/faq" />
        <meta
          property="og:image"
          content="/images/artportable_tv_commercial.png"
        />
        <link rel="canonical" href={`${publicUrl}/${locale}/faq`} />
      </Head>
      
      <div className={s.scandinavianContainer}>
        
        {/* Hero Section */}
        <section className={s.heroSection}>
          <div className={s.heroContent}>
            <div className={s.heroTextBlock}>
              <Typography variant="h1" className={s.heroTitle}>
                {t("faq")}
              </Typography>
              <div className={s.accentLine}></div>
              <Typography variant="body1" className={s.heroSubtitle}>
                {t("heroSubtitle")}
              </Typography>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <div className={s.contentContainer}>
          {faqSections.map((section, sectionIndex) => (
            <section key={section.id} className={s.faqSection}>
              <Typography variant="h2" className={s.sectionLabel}>
                {String(sectionIndex + 1).padStart(2, '0')} — {section.title}
              </Typography>
              
              <div className={s.questionsContainer}>
                {section.questions.map((item, questionIndex) => (
                  <div key={`${section.id}-${questionIndex}`} className={s.questionWrapper}>
                    <Accordion 
                      className={s.questionAccordion}
                      expanded={expandedSection === `${section.id}-${questionIndex}`}
                      onChange={handleAccordionChange(`${section.id}-${questionIndex}`)}
                      elevation={0}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon className={s.expandIcon} />}
                        className={s.questionSummary}
                      >
                        <Typography variant="h4" className={s.questionTitle}>
                          {item.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={s.answerDetails}>
                        <Typography variant="body1" className={s.answerText}>
                          {item.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <section className={s.contactSection}>
          <div className={s.contentContainer}>
            <div className={s.contactContent}>
              <Typography variant="h2" className={s.contactTitle}>
                {t("notFound")}
              </Typography>
              <Typography variant="body1" className={s.contactText}>
                {t("contactSubtitle")}
              </Typography>
              <div className={s.contactActions}>
                <a 
                  href="mailto:hello@artportable.com"
                  className={s.contactButton}
                >
                  <MailOutlineIcon className={s.contactIcon} />
                  {t("contactUs")}
                </a>
              </div>
            </div>
          </div>
        </section>
        
      </div>
      <Footer />
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  const navBarItems = await getNavBarItems();
  return {
    props: {
      navBarItems: navBarItems,
      ...(await serverSideTranslations(locale, ["header", "footer", "faq", "support"])),
    },
    revalidate: 60,
  };
}
