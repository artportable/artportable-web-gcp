import React, { useEffect, useState } from "react";
import { styles } from "./exhibition.css";
import { useTranslation } from "next-i18next";
import { Tabs, Typography } from "@material-ui/core";
import { useRouter } from "next/router";

export default function ExhibitionCard() {
  const s = styles();
  const { t } = useTranslation(["exhibition"]);
  const router = useRouter();

  return (
    <div>
      <Tabs>Hello</Tabs>
    </div>
  );
}
