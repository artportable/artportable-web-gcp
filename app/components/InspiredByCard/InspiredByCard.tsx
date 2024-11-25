import { Card, CardContent, CardHeader } from "@material-ui/core";

import { useTranslation } from "next-i18next";

export default function InspiredByCard({ text }) {
  const { t } = useTranslation("profile");

  return (
    <Card
      elevation={0}
      style={{
        marginTop: "2vh",
        marginBottom: "2vh",
        backgroundColor: "white",
      }}
    >
      <CardHeader
        title={t("inspiredBy")}
        titleTypographyProps={{ variant: "subtitle1" }}
        style={{ padding: 0, fontStyle: "italic" }}
      ></CardHeader>
      <CardContent style={{ padding: 0 }}>{text}</CardContent>
    </Card>
  );
}
