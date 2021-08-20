import { Box, Card, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Main from "../app/components/Main/Main";
import { useBreakpointDown } from "../app/hooks/useBreakpointDown";
import { styles } from "../styles/gdpr.css";

export default function GdprPage(props) {
  const mdPlusScreenOrDown = useBreakpointDown('mdPlus');
  const { t } = useTranslation(['gdpr']);
  const s = styles();
  const privacyList = t('gdpr:privacyList', { returnObjects: true });
  const privacyTexts = t('gdpr:privacyTexts', { returnObjects: true });

  return (
    <>
      <Main wide={mdPlusScreenOrDown ? true : false}>
        <Paper title={t('title')} className={s.gdprContainer}>
          <Box pr={10} pl={10} pb={10} pt={10}>
            <Typography className={s.title} variant="h1" gutterBottom>
              {t('title')}
            </Typography>
            <br/>
            <Typography className={s.text} variant="body2" gutterBottom>
              <Trans i18nKey="gdpr:privacyPartOne" />
            </Typography>
            <List dense={true} className={s.text}>
              { Array.isArray(privacyList) &&  
                privacyList.map((privacyPoint, index) => {
                 return (<ListItem key={index}>
                    <ListItemText
                      primary={`- ${privacyPoint}`}
                    />
                  </ListItem>)
                })
              }
            </List>
            {Array.isArray(privacyTexts) &&
            privacyTexts.map((privacyText, index) => {
              return <Typography key={index} variant="body2" className={s.text} gutterBottom>
                <Trans i18nKey={privacyText}/>
                <br/>
                <br/>
              </Typography>
            })
            }
          </Box>
        </Paper>
      </Main>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'footer', 'header', 'gdpr']),
    }
  }
}