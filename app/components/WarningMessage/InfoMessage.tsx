import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";

import styles from "./warningMessage.css";

export default function Button(props) {
  const s = styles();
  const { t } = useTranslation(["upload"]);

  return (
    <div className={s.information}>
      <div
        style={{ display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <div style={{ fontWeight: 600 }}>{t("tips")}</div>
        <div>
          <ul>
            <li>{t("tipsOne")}</li>
            <li>{t("tipsTwo")}</li>
            <li>{t("tipsThree")}</li>
            <li>{t("tipsFour")}</li>
            <li>{t("tipsFive")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
