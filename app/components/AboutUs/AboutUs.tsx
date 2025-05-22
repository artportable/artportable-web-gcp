import React, { useEffect, useState } from "react";
import { styles } from "./aboutUs.css";
import { useTranslation } from "next-i18next";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";

interface ImageProps {
  artwork: string;
  username: string;
  imageLink: string;
  name: string;
}

export default function AboutMe() {
  const s = styles();
  const { t } = useTranslation(["about"]);
  const router = useRouter();

  const staff = [
    {
      name: "Cosmo",
      image: "/staff/artportable_cosmo.jpg",
      email: "hello@artportable.com",
    },
  ];

  const board = [
    {
      name: "Melker Larson",
      title: "CEO",
      image: "",
      email: "melker@artportable.com",
    },
    {
      name: "Massi Wararoodi",
      title: "CTO",
      image: "",
      email: "massi@artportable.com",
    },
    {
      name: "Erik Nordlander",
      title: "Marketing & Founder",
      image: "/staff/artportable_erik.jpg",
      email: "erik@artportable.com",
    },
    {
      name: "Johan Höök",
      title: "Business Development & Founder",
      image: "/staff/artportable_johan.jpeg",
      email: "johan@artportable.com",
    },
    {
      name: "Ulrika Melin",
      title: "Art Curator",
      image: "/staff/artportable_ulrika.jpg",
      email: "ulrika@artportable.com",
    },
    {
      name: "Diedrik Germer",
      title: "PR",
      image: "/staff/artportable_ulrika.jpg",
      email: "diedrik@artportable.com",
    },
  ];
  const applyEn = [
    { image: "/staff/missyou_en.png", email: "work@artportable.com" },
  ];
  const applySv = [
    { image: "/staff/missyou_sv.png", email: "work@artportable.com" },
  ];

  return (
    <div className={s.container}>
      <div className={s.headerDiv}>
        <div className={s.headerTypo}>{t("aboutUs")}</div>
        <br />
        <div className={s.subHeaderTypo}>{t("digitalGallery")}</div>
        <br />
        <div className={s.subHeaderTypo}>{t("digitalGalleryDescription")}</div> 
        <br />
        <div className={s.subHeaderTypo}>{t("digitalGalleryDescription2")}</div>
        <br />
        <div className={s.subHeaderTypo}>{t("digitalGalleryDescription3")}</div>

      </div>
      <div className={s.subHeaderTypoTwo}>{t("whatWeDo")}</div>
  
      <ul>
        <li className={s.subHeaderTypoText}>{t("whatWeDoDescription")}</li>
        <li className={s.subHeaderTypoText}>{t("whatWeDoDescription2")}</li>
        <li className={s.subHeaderTypoText}>{t("whatWeDoDescription3")}</li>
      </ul>
      <br />
      <div className={s.subHeaderTypoTwo}>{t("weBelieve")}</div>
      <br />
      <div className={s.subHeaderTypoText}>{t("weBelieveDescription")}</div>
    <br />
      <div className={s.subHeaderTypoText}>{t("weBelieveDescription2")}</div>
      <br />
      <div className={s.subHeaderTypoText}>{t("weBelieveDescription3")}</div>
      <br />
      <div className={s.subHeaderTypoText}>{t("weBelieveDescription4")}</div>
      <br />
      <div className={clsx(s.bottomDiv, s.staffDiv)}>
        {board.map((person) => (
          <div key={person.name} className={s.wrapper}>
            {/* <div className={s.frame}>
              <img
                className={s.image}
                src={person?.image}
                alt="staff image"
                title=""
              />
            </div> */}
            <Typography className={s.bold}>{person?.name}</Typography>
            <Typography>{person?.title}</Typography>
            <Typography>
              <a href={`mailto:${person?.email}`}>{person?.email}</a>
            </Typography>
          </div>
        ))}
      </div>
      <div >
        <Typography variant="h1" className={s.headerTypo}>
          {t("contactUs")}
        </Typography>
        <div >
          <Paper className={s.paperLeft} elevation={0}>
            <Typography className={clsx(s.textBlock, s.textBlockWidth)}>
              {t("yourWelcome")}
            </Typography>
            <div className={s.iconTextFlex}>
             
              <Typography className={s.linkText}>
                <a href="mailto:hello@artportable.com">hello@artportable.com</a>
              </Typography>
            </div>

            <div className={s.textBlock}>
              <Typography className={s.typoBold}>
                {t("openingHours")}
              </Typography>
              <Typography>{t("8-17")}</Typography>
              <Typography>{t("deviating")}</Typography>
            </div>
            {/* <div className={s.zendeskForm}>
              <ZendeskForm />
            </div> */}
          </Paper>
        </div>
      </div>
    </div>
  );
}
