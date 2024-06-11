import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "next-i18next";

import { styles } from "./cataloguedByArtportable.css";

import router, { useRouter } from "next/router";
import { Locales } from "../../models/i18n/locales";

export default function CataloguedByArtportable(props) {
  const s = styles();
  const { t } = useTranslation(["index"]);

  return (
    <div className={s.container}>
      <div style={{ margin: "22px" }}>
        <img
          className={s.image}
          src={"images/catalogued.png"}
          alt="imageCover"
        />
      </div>

      <div className={s.textButtonWrapper}>
        <div style={{ fontWeight: "bold", fontSize: "24px" }}>
          Catalogued by Artportable
        </div>
        <br />
        <div
          style={{ fontSize: "14px" }}
          dangerouslySetInnerHTML={{
            __html: t("cataloguedText").replace(/\n/g, "<br />"),
          }}
        />
        <div>
          <Button className={s.button} style={{ color: "white" }}>
            <a
              target="_blank"
              href="https://payment.artportable.com/b/7sI28B5yefshfpm01n"
              rel="noopener noreferrer"
            >
              {t("orderHere")}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
