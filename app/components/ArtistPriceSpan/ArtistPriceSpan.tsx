import { styles } from './artistPriceSpan.css'
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

interface Props {
  prices: number[];
}

export default function ArtistPriceSpan({ prices }: Props) {
  const s = styles();

  const [hasPrices, setHasPrices] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if(prices) {
      setHasPrices(prices.some(p => p > 0));
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
    }
  }, [prices]);

  return (
    <>
      {hasPrices &&
        <div className={s.container}>
          <div className={s.icon}>
            <LocalOfferIcon color="secondary" /> 
          </div>
          <Typography variant="subtitle1" component="span">
            {minPrice} - {maxPrice} SEK
          </Typography>
        </div>
      }
    </>
  );
}