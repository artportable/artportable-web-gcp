import React, { useEffect, useState } from "react";
import { styles } from "./exhibition.css";
import { useTranslation } from "next-i18next";
import { Tabs, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function Exhibition() {
  const s = styles();
  const { t } = useTranslation(["exhibition"]);
  const router = useRouter();

  const subjectOptions = [
    {
      value: "/artiklar",
      label: t("articles"),
    },
    {
      value: "/redaktionellt",
      label: t("editorial"),
    },
    {
      value: "/konstnaersportraett",
      label: t("artistPortrait"),
    },
    {
      value: "/kampanj",
      label: t("offers"),
    },
    {
      value: "/kurser",
      label: t("courses"),
    },
    {
      value: "/flerartiklar",
      label: t("moreArticlesMenu"),
    },
  ];

  return (
    <div>
      <Tabs>Hello</Tabs>
    </div>
  );
}
