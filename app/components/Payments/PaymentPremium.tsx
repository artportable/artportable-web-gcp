import { useState } from 'react';
import { Paper, TextField, FormControl, Input, FormHelperText, OutlinedInput, InputLabel, Typography, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next' 
import { styles } from './paymentPremium.css'
import Header from '../Header/Header';
import { SendPaymentInfo, paymentRequest } from './Request';

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
  });
  const handleChangesegfeg = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <>
    {/* <Header /> */}
    <Paper elevation={1} className={s.paperDiv}>
      <div className={s.flexContainer}>
      <div className={s.left}>
      <h1>Betala Portfolio Premium</h1>
      <img width={150}
        src="/Artportable_Emblem_Gold.svg"
        alt="hej"
        title="Premium"/>
      <h2>Premium</h2>
      <h3>12 månader</h3>
      <p>Bli prioriterad i flödet</p>
      <p> Personlig Konstkoordinator</p>
      <p>Support</p>
      <p>Allt från Portfolio</p>
      </div>
      <div className={s.right}>
      <div className={s.input}>
      <form >
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          color="secondary"
          className={s.inputField}
            id="standard-required-name"
            value={values.name}
            onChange={handleChangesegfeg('name')}
            aria-describedby="standard-name-helper-text"
            inputProps={{
              'aria-label': 'Name',
            }}
          />
          <FormHelperText id="standard-name-helper-text" className={s.helperText}>För- och efternamn</FormHelperText>
        </FormControl>
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
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
       </div>
        
      </div>
      </div>
    </Paper>
    </>
  );
}
