import MuiButton from '@material-ui/core/Button';
import s from './button.module.css'

export default function Button(props) {
  const rounded = props.roundedButton ? s.rounded : '';
  const { roundedButton, ...muiButtonProps } = props;


  return (
    <MuiButton {...muiButtonProps} className={`${rounded} ${s.overrides}`}>{props.children}</MuiButton>
  );
}