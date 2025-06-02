import React from "react";
import { styles } from "./aboutUs.css";
import { useTranslation } from "next-i18next";
import { Typography, Box, Card, CardContent, Grid } from "@material-ui/core";
import Link from "next/link";
import BannerText from "../BannerText/BannerText";

export default function AboutUs() {
  const s = styles();
  const { t } = useTranslation(["about"]);

  const team = [
    {
      name: "Melker Larson",
      title: "CEO",
      email: "melker@artportable.com",
    },
    {
      name: "Massi Wararoodi", 
      title: "CTO",
      email: "massi@artportable.com",
    },
    {
      name: "Johan Höök",
      title: "Business Development & Founder", 
      email: "johan@artportable.com",
    },
    {
      name: "Ulrika Melin",
      title: "Art Curator",
      email: "ulrika@artportable.com",
    },
    {
      name: "Diedrik Germer",
      title: "PR",
      email: "diedrik@artportable.com",
    },
  ];

  const services = [
    {
      icon: "/icons/artist-page.svg",
      title: t("artistPages"),
      description: t("whatWeDoDescription"),
    },
    {
      icon: "/icons/marketplace.svg", 
      title: t("artMarketplace"),
      description: t("whatWeDoDescription2"),
    },
    {
      icon: "/icons/exhibition.svg",
      title: t("exposureOpportunities"), 
      description: t("whatWeDoDescription3"),
    }
  ];

  const values = [
    { 
      icon: "/icons/values-art.svg",
      title: t("weBelieveDescription"),
      description: t("valueDescription1"),
    },
    { 
      icon: "/icons/values-accessibility.svg",
      title: t("weBelieveDescription2"), 
      description: t("valueDescription2"),
    },
   
    { 
      icon: "/icons/values-community.svg",
      title: t("weBelieveDescription4"), 
      description: t("valueDescription4"),
    }
  ];

  return (
    <div className={s.scandinavianContainer}>
      
      {/* Hero Section */}
      <section className={s.heroSection}>
        <div className={s.heroContent}>
          <div className={s.heroTextBlock}>
            <Typography variant="h1" className={s.heroTitle}>
              {t("aboutUs")}
            </Typography>
            <div className={s.accentLine}></div>
            <Typography variant="body1" className={s.heroSubtitle}>
              {t("digitalGallery")}
            </Typography>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className={s.missionSection}>
        <div className={s.contentContainer}>
          <div className={s.missionGrid}>
            <div className={s.missionTextContainer}>
              <Typography variant="h2" className={s.sectionLabel}>
                01 — {t("sectionMission")}
              </Typography>
              <Typography variant="body1" className={s.missionText}>
                {t("digitalGalleryDescription")}
              </Typography>
              <Typography variant="body1" className={s.missionText}>
                {t("digitalGalleryDescription2")}
              </Typography>
              <Typography variant="body1" className={s.missionText}>
                {t("digitalGalleryDescription3")}
              </Typography>
            </div>
            <div className={s.missionVisual}>
              <div className={s.geometricShape}>
                <img src={"/images/artportableCommercial.jpg"} style={{width: "100%", height: "100%"}} alt="Geometric Shape" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={s.servicesSection}>
        <div className={s.contentContainer}>
          <Typography variant="h2" className={s.sectionLabel}>
            02 — {t("sectionWhatWeDo")}
          </Typography>
          <div className={s.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={s.serviceItem}>
                <div className={s.serviceNumber}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className={s.serviceContent}>
                  <Typography variant="h3" className={s.serviceTitle}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" className={s.serviceDescription}>
                    {service.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={s.valuesSection}>
        <div className={s.contentContainer}>
          <Typography variant="h2" className={s.sectionLabel}>
            03 — {t("sectionValues")}
          </Typography>
          <div className={s.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={s.valueCard}>
                <Typography variant="h4" className={s.valueTitle}>
                  {value.title}
                </Typography>
                <Typography variant="body2" className={s.valueDescription}>
                  {value.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={s.teamSection}>
        <div className={s.contentContainer}>
          <Typography variant="h2" className={s.sectionLabel}>
            04 — {t("sectionTeam")}
          </Typography>
          <div className={s.teamGrid}>
            {team.map((person, index) => (
              <div key={person.name} className={s.teamMember}>
                <div className={s.teamInfo}>
                  <Typography variant="h4" className={s.teamName}>
                    {person.name}
                  </Typography>
                  <Typography variant="body2" className={s.teamRole}>
                    {person.title}
                  </Typography>
                  <Link href={`mailto:${person.email}`}>
                    <a className={s.teamEmail}>{person.email}</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={s.contactSection}>
        <div className={s.contentContainer}>
          <div className={s.contactGrid}>
            <div className={s.contactInfo}>
              <Typography variant="h2" className={s.sectionLabel}>
                05 — {t("sectionContact")}
              </Typography>
              <Typography variant="body1" className={s.contactText}>
                {t("yourWelcome")}
              </Typography>
            </div>
            <div className={s.contactDetails}>
              <div className={s.contactItem}>
                <Typography variant="body2" className={s.contactLabel}>
                  {t("emailLabel")}
                </Typography>
                <Link href="mailto:hello@artportable.com">
                  <a className={s.contactLink}>hello@artportable.com</a>
                </Link>
              </div>
              <div className={s.contactItem}>
                <Typography variant="body2" className={s.contactLabel}>
                  {t("openingHours")}
                </Typography>
                <Typography variant="body2" className={s.contactValue}>
                  {t("8-17")}
                </Typography>
                <Typography variant="body2" className={s.contactValue}>
                  {t("deviating")}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
