import React from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Typography } from '@material-ui/core';
import SimilarPortfolio from '../SimilarPortfolio/SimilarPortfolio';
import { styles } from './similarPortfoliosSection.css';

export default function SimilarPortfoliosSection({ portfolios }) {
  const { t } = useTranslation(['profile']);
  const s = styles();

  return (
    <>
      <Typography variant="h4" component="h1">
        <Box fontWeight="medium" marginBottom={3}>
          {t('similarPortfolios')}
        </Box>
      </Typography>
      <div className={s.portfolioGrid}>
        {portfolios[0] && <SimilarPortfolio data={portfolios[0]}></SimilarPortfolio>}
        {portfolios[1] && <SimilarPortfolio data={portfolios[1]}></SimilarPortfolio>}
        {portfolios[2] && <SimilarPortfolio data={portfolios[2]}></SimilarPortfolio>}
      </div>
    </>
  );
}
