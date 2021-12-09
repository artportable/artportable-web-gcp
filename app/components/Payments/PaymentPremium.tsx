import { Paper } from '@material-ui/core'
import { useTranslation } from 'next-i18next' 
import { styles } from './paymentPremium.css'
import Header from '../Header/Header';

export default function PaymentPremium() {
  const s = styles();
  const { t } = useTranslation(['support']);
  return (
    <>
    <Header />
    <Paper elevation={1}>
      <h1>hej</h1>
      <img></img>
      <h2>Premium</h2>
      <h3>12 månader</h3>
      <p></p>
    </Paper>
    </>
  );
}
