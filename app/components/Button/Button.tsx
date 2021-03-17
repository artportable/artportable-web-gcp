import MuiButton from '@material-ui/core/Button';
import { styles } from './button.css'
import clsx from 'clsx'

export default function Button(props) {
  const { roundedButton, color, ...muiButtonProps } = props;
  const s = styles();
  const classes = [s.root];
  
  classes.push(color === 'secondary' ? s.secondary : '');
  classes.push(roundedButton ? s.rounded : '');


  return (
    <MuiButton {...muiButtonProps} color={color} className={clsx(classes)}>{props.children}</MuiButton>
  );
}