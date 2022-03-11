import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    hidden: {
      display: 'none',
    }
  }),
);


export default function PaymentInfo({priceText, secondaryText}) {
  const s = styles();
  return (
    <Box textAlign="center" marginY={2}>
      <Typography className={clsx((priceText === "premium" || priceText === "-") && s.hidden)} variant="body2">
        {priceText}
      </Typography>
      <Box marginTop={1}>
        <Typography variant="body2" color="textSecondary">
          {secondaryText}
        </Typography>
      </Box>
    </Box>
  );
}