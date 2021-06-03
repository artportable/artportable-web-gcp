import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export default function PaymentInfo({priceText, secondaryText}) {

  return (
    <Box textAlign="center" marginY={2}>
      <Typography variant="body2">
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