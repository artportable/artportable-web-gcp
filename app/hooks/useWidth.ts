import { Theme, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

type BreakpointOrNull = Breakpoint | null;

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
export function useWidth() {
  const theme: Theme = useTheme();
  const keys: Breakpoint[] = [
    "xl",
    "lgPlus",
    "lg",
    "mdPlus",
    "md",
    "smPlus",
    "sm",
    "xs",
  ];
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

export function useMainWidth(): {
  breakpoint: string;
  regular: number;
  wide: number;
} {
  const theme: Theme = useTheme();
  const width: Breakpoint = useWidth();

  switch (width) {
    case "xs":
      return theme.breakpointMainWidths.xs;
    case "sm":
      return theme.breakpointMainWidths.sm;
    case "smPlus":
      return theme.breakpointMainWidths.smPlus;
    case "md":
      return theme.breakpointMainWidths.md;
    case "mdPlus":
      return theme.breakpointMainWidths.mdPlus;
    case "lg":
      return theme.breakpointMainWidths.lg;
    case "lgPlus":
      return theme.breakpointMainWidths.lgPlus;
    case "xl":
      return theme.breakpointMainWidths.xl;
    default:
      break;
  }
}
