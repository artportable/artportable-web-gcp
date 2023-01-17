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
import jobImage from "../../../public/images/art_free_trial.jpeg";
import { tableCellClasses } from "@mui/material";
import { Wrapper } from "@material-ui/pickers/wrappers/Wrapper";

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
      "Konstförmedlare",
      "Göteborg",
      "2022-11-29",
      "2023-01-02",
      "https://vgregion.varbi.com/what:job/jobID:570652/type:job/where:1/apply:1"
    ),
    createData(
      "Fotografredigerare",
      "Stockholm",
      "2022-12-06",
      "2023-11-29",
      "https://candidate.hr-manager.net/ApplicationForm/SinglePageApplicationForm.aspx?cid=1209&departmentId=18957&ProjectId=145645&MediaId=4621"
    ),
    createData(
      "Registrator konstdatabas",
      "Stockholm",
      "2022-11-28",
      "2022-12-14",
      "https://www.modernamuseet.se/stockholm/sv/om-museet/lediga-tjanster/?rmpage=job&rmjob=174"
    ),
    createData(
      "Museiintendent/Curator",
      "Umeå",
      "2022-11-23",
      "2023-02-6",
      "https://umu.varbi.com/what:job/jobID:476115/type:job/where:1/apply:1"
    ),
    createData(
      "UI Artist",
      "Stockholm",
      "2022-12-08",
      "2023-01-31",
      "https://emp.jobylon.com/jobs/154666-nordlight-ui-artist/"
    ),
  ];

  return (
    <main>
      <section className={s.pageContainer}>
        <div className={s.banner}>
          <div className={s.textImgContainer}>
            <div className={s.heroText}>
              <h1 className={s.headline}>
                Hitta ditt nästa jobb inom kultur
              </h1>
              <h2 className={s.description}>
                Vill du lägga upp en jobbannons på Artportable?&nbsp;
                <a href="/support">Kontakta oss här</a>
              </h2>
            </div>
            <div className={s.imageBorder}>
            <img
              className={s.artwork}
              src={jobImage.src}
              alt="Artportable ad banner"
              title="Artportable"
            />
            </div>
          </div>
        </div>

        <article className={s.jobContainer}>
          <div className={s.upperTextContainer}>
            <h3 className={s.upperText}>Lediga jobb: {data.length}st</h3>
          </div>
          {data.map((data) => (
            <>
              <div className={s.jobInfoContainer}>
                <div className={s.wrapperLeft}>
                  <div className={s.jobName}>{data.jobName}</div>
                  <div>Ort: {data.city}</div>
                </div>

                <div className={s.publish}>Publicerad: {data.published}</div>
                <div className={s.switchOrderContainer}>
                  <div className={s.apply}>Ansök senast: {data.apply}</div>
                </div>
                <div className={s.wrapperRight}>
                  <a href={data.readMore}>Läs mer</a>
                </div>
              </div>
            </>
          ))}
        </article>
      </section>
    </main>
  );
}
