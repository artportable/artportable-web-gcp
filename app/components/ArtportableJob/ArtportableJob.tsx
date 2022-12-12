import { useState, useEffect } from "react";
import { Dialog, IconButton, Link, Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import CloseIcon from "@material-ui/icons/Close";
import { styles } from "./artportablejob.css";
import {
  ActionType,
  CategoryType,
  trackGoogleAnalytics,
} from "../../utils/googleAnalytics";
import router from "next/router";
import { Locales } from "../../models/i18n/locales";
import mork_skog from "../../../public/images/daniel_zausnig_mork_skog.jpg";
import { tableCellClasses } from "@mui/material";

export default function ArtportableJob(props: any) {
  const s = styles();
  const { t } = useTranslation(["profile"]);

  function createData(
    jobName: string,
    city: string,
    published: string,
    apply: string,
    readMore: string
  ) {
    return { jobName, city, published, apply, readMore };
  }

  const data = [
    createData(
      "UX designer",
      "Stockholm",
      "2022-12-12",
      "2022-12-12",
      "https://www.artportable.com"
    ),
    createData(
      "Web developer",
      "Uppsala",
      "2022-8-15",
      "2022-12-12",
      "https://www.artportable.com"
    ),
    createData(
      "Art director",
      "Stockholm",
      "2022-8-12",
      "2023-12-12",
      "https://www.artportable.com"
    ),
    createData(
      "Artist",
      "Lund",
      "2022-9-12",
      "2023-12-12",
      "https://www.artportable.com"
    ),
    createData(
      "Writer",
      "Malmö",
      "2012-12-12",
      "2022-12-12",
      "https://www.artportable.com"
    ),
  ];

  return (
    <div>
      <div className={s.banner}>
        <div className={s.textImgContainer}>
          <div className={s.headline}>Hitta ditt kulturjobb i Sverige!</div>
          <img
            className={s.artwork}
            src={mork_skog.src}
            alt="Konstverk av Daniel Zausnig"
            title="Daniel Zausnig"
          />
        </div>
      </div>

      <div className={s.jobContainer}>
        <div className={s.upperText}>Lediga jobbannonser: {data.length}st</div>
        {data.map((data) => (
          <>
            <div className={s.info}>
              <div className={s.jobs}>
                <div className={s.jobName}>{data.jobName}</div>
                <div>Ort: {data.city}</div>
                <div>Publicerad den {data.published}</div>

                <div className={s.apply}>Ansök senast: {data.apply}</div>
              </div>
              <div>
                <a href={data.readMore}>Läs mer</a>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
