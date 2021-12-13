import { useState } from 'react';
import { Paper, TextField, FormControl, Input, FormHelperText, OutlinedInput, InputLabel, Typography, Accordion, AccordionDetails, AccordionSummary, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next' 
import { styles } from './paymentPremium.css'
import Header from '../Header/Header';
import { SendPaymentInfo, paymentRequest } from './Request';
import Button from '../Button/Button'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  accordion: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: '1.5rem'
  },
}));

export default function PaymentPremium() {
  const classes = useStyles();
  const s = styles();
  const { t } = useTranslation(['support']);
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState({
    name: '',
    phoneNumber: '',
  });
  const [valueRadio, setValueRadio] = useState('');
  const handleChangesegfeg = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChangeRadio = (event) => {
    setValueRadio(event.target.value);
  };



  return (
    <>
    {/* <Header /> */}
    <Paper elevation={1} className={s.paperDiv}>
      <div className={s.flexContainer}>
      <div className={s.left}>
      <h1>Betala Portfolio Premium</h1>
      <img width={150}
        src="/Images/Artportable_Logotyp_Black.jpg"
        alt="hej"
        title="Premium"/>
      <h2>Premium</h2>
      <h3>12 månader</h3>
      <p>Bli prioriterad i flödet</p>
      <p> Personlig Konstkoordinator</p>
      <p>Support</p>
      <p>Publicera dina verk</p>
      <p>Chatta och få förfrågningar om dina konstverk</p>
      <p>Följ och interagera med andra konstnärer</p>
      <p>Läs artiklar och få uppdateringar om utställningar</p>
      </div>
      <div className={s.right}>
      <div className={s.input}>
      <form >
        <Paper>
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          color="secondary"
          className={s.inputField}
            id="standard-required-name"
            value={values.name}
            onChange={handleChangesegfeg('name')}
            aria-describedby="standard-name-helper-text"
            placeholder="För- och efternamn"
            inputProps={{
              'aria-label': 'Name',
            }}
          />
          <FormHelperText id="standard-name-helper-text" className={s.helperText}>För- och efternamn</FormHelperText>
        </FormControl>
        </Paper>
       </form>
       <div className={s.container}>
      <Accordion className={s.accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Betalningsalternativ</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <FormControl component="fieldset">
            <RadioGroup aria-label="payment" name="payment" value={valueRadio} onChange={handleChangeRadio}>
              <div className={s.swishFlex}>
              <FormControlLabel value="swish" control={<Radio />} label={<Typography className={s.radioLabel}>Swish</Typography>} />
              <img 
                className={s.swishLogo}
                width={100}
                src="/Images/swishlogo.svg"
                alt="swishlogo"
                  title="swish"/>
         </div>
              {(valueRadio === "swish") && 
               <div className={s.swishNumber}>
               <OutlinedInput
                 color="secondary"
                 required
                 className={s.phoneNumber}
                 id="standard-required-name"
                 value={values.phoneNumber}
                 onChange={handleChangesegfeg('phoneNumber')}
                 aria-describedby="standard-phonenumber-helper-text"
                 placeholder="Telefonnummer mobil"
                 inputProps={{
                   'aria-label': 'phoneNumber',
                 }}
               />
               <FormHelperText id="standard-phonenumber-helper-text" className={s.helperText}>Telefonnummer</FormHelperText>
               </div>
              }
              <div className={s.swishFlex}>
                <FormControlLabel value="betalkort" control={<Radio />} label={<Typography className={s.radioLabel}>Betalkort</Typography>} />
                <img 
                  className={s.s}
                  width={100}
                  src="/Images/3_Card_color_horizontal.svg"
                  alt="swishlogo"
                    title="swish"/>
              </div>
              {(valueRadio === "betalkort") && 
               <div className={s.swishNumber}>
               <OutlinedInput
                 color="secondary"
                 className={s.phoneNumber}
                 id="standard-required-name"
                 value={values.name}
                 onChange={handleChangesegfeg('name')}
                 aria-describedby="standard-name-helper-text"
                 placeholder="Stripebetalning"
                 inputProps={{
                   'aria-label': 'Name',
                 }}
               />
                <FormHelperText id="standard-name-card-info-text" className={s.helperText}>Telefonnummer mobil</FormHelperText>
               </div>
              }
            </RadioGroup>
        </FormControl>
        </AccordionDetails>
      </Accordion>
      {(valueRadio === "swish" && expanded === 'panel1') && 
        <Button
        size="large"
        fullWidth
        variant="contained"
        color="secondary"
        disableElevation
        rounded>Betala
        </Button>
            }
      </div>
       </div> 
      
       
        
      </div>
      <div className={s.thirdDiv}>
        <div className={s.thirdText}>
      <Typography variant="h4">Öppna Swish på telefonen</Typography>
          <ArrowDownwardIcon color='secondary' />
          <Typography variant="h4">Genomför betalningen</Typography>
          <ArrowDownwardIcon color='secondary'/>
          <Typography variant="h4">Klart</Typography>
          </div>
          <img
          className={s.swishPhone}
            width={400}
            height={450}
            src="/Images/swishphone.png"
            alt="swishlogo"
            title="swish"/>
        </div>
        </div>
    </Paper>
    </>
  );
}
