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
      name: "Erik Nordlander",
      title: "Marketing & Founder",
      email: "erik@artportable.com",
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
      description: t("whatWeDoDescription")
    },
    {
      icon: "/icons/marketplace.svg", 
      title: t("artMarketplace"),
      description: t("whatWeDoDescription2")
    },
    {
      icon: "/icons/exhibition.svg",
      title: t("exposureOpportunities"), 
      description: t("whatWeDoDescription3")
    }
  ];

  const values = [
    { 
      title: t("weBelieveDescription"),
      description: t("valueDescription1")
    },
    { 
      title: t("weBelieveDescription2"), 
      description: t("valueDescription2")
    },
    { 
      title: t("weBelieveDescription3"), 
      description: t("valueDescription3")
    },
    { 
      title: t("weBelieveDescription4"), 
      description: t("valueDescription4")
    }
  ];

  return (
    <>
      {/* Header Banner - like exhibitions page */}
      <BannerText title={t("aboutUs")} text={t("digitalGallery")} />

      {/* Main Content Container */}
      <div className={s.pageWrapper}>
        
        {/* Mission Section */}
        <div className={s.missionSection}>
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

        {/* What We Do Section */}
        <div className={s.sectionSpacing}>
          <Typography variant="h2" className={s.sectionHeading}>
            {t("whatWeDo")}
          </Typography>
          <div className={s.containerCard}>
            {services.map((service, index) => (
              <div key={index} className={s.serviceCard}>
                <div className={s.cardContent}>
                  <img src={service.icon} alt={service.title} className={s.serviceIcon} />
                  <Typography variant="h6" className={s.serviceTitle}>
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

        {/* Our Values Section */}
        <div className={s.sectionSpacing}>
          <Typography variant="h2" className={s.sectionHeading}>
            {t("weBelieve")}
          </Typography>
          <div className={s.containerCard}>
            {values.map((value, index) => (
              <div key={index} className={s.valueCard}>
                <div className={s.cardContent}>
                  <Typography variant="h6" className={s.valueTitle}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" className={s.valueDescription}>
                    {value.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section - Compact */}
        <div className={s.sectionSpacing}>
          <Typography variant="h2" className={s.sectionHeading}>
            {t("ourTeam")}
          </Typography>
          <div className={s.containerCard}>
            {team.map((person) => (
              <div key={person.name} className={s.teamCard}>
                <div className={s.cardContent}>
                  <Typography variant="h6" className={s.teamMemberName}>
                    {person.name}
                  </Typography>
                  <Typography variant="subtitle1" className={s.teamMemberTitle}>
                    {person.title}
                  </Typography>
                  <Typography variant="body2">
                    <Link href={`mailto:${person.email}`}>
                      <a className={s.emailLink}>{person.email}</a>
                    </Link>
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className={s.contactSection}>
          <Typography variant="h2" className={s.sectionHeading}>
            {t("contactUs")}
          </Typography>
          <div className={s.contactContainer}>
            <div className={s.contactContent}>
              <Typography variant="body1" className={s.contactText}>
                {t("yourWelcome")}
              </Typography>
              <div className={s.contactInfo}>
                <Typography variant="h6" className={s.contactLabel}>
                  Email
                </Typography>
                <Link href="mailto:hello@artportable.com">
                  <a className={s.emailLink}>hello@artportable.com</a>
                </Link>
              </div>
              <div className={s.contactInfo}>
                <Typography variant="h6" className={s.contactLabel}>
                  {t("openingHours")}
                </Typography>
                <Typography variant="body2">
                  {t("8-17")}
                </Typography>
                <Typography variant="body2">
                  {t("deviating")}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
