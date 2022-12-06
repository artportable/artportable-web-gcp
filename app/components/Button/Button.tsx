import MuiButton from "@material-ui/core/Button";
import { styles } from "./button.css";
import clsx from "clsx";

export default function Button(props) {
  const { rounded, underlined, ...muiButtonProps } = props;
  const s = styles();
  const classes = [s.root];

  classes.push(rounded ? s.rounded : "");
  classes.push(underlined ? s.underlined : "");

  return (
    <MuiButton {...muiButtonProps} className={clsx(classes, props.className)}>
      {props.children}
    </MuiButton>
  );
}
