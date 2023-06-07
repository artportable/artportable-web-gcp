import React, { useEffect, useState } from "react";
import { styles } from "./exhibition.css";
import { useTranslation } from "next-i18next";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function Exhibition() {
  const s = styles();
  const { t } = useTranslation(["exhibition"]);
  const router = useRouter();

  return <div></div>;
}
