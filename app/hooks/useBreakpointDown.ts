import { useWidth } from './useWidth'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

export function useBreakpointDown(downBreakpoint: Breakpoint) {
  const breakpoint: Breakpoint = useWidth();

  switch (downBreakpoint) {
    case 'sm':
      return breakpoint === 'sm' || breakpoint === 'xs';

    case 'smPlus':
      return breakpoint === 'smPlus' ||
        breakpoint === 'sm' ||
        breakpoint === 'xs';

    case 'md':
      return breakpoint === 'md' ||
      breakpoint === 'smPlus' ||
      breakpoint === 'sm' ||
      breakpoint === 'xs';

    case 'mdPlus':
      return breakpoint === 'mdPlus' ||
        breakpoint === 'md' ||
        breakpoint === 'smPlus' ||
        breakpoint === 'sm' ||
        breakpoint === 'xs';

    case 'lg':
      return breakpoint === 'lg' ||
        breakpoint === 'mdPlus' ||
        breakpoint === 'md' ||
        breakpoint === 'smPlus' ||
        breakpoint === 'sm' ||
        breakpoint === 'xs';

    case 'lgPlus':
      return breakpoint === 'lgPlus' ||
        breakpoint === 'lg' ||
        breakpoint === 'mdPlus' ||
        breakpoint === 'md' ||
        breakpoint === 'smPlus' ||
        breakpoint === 'sm' ||
        breakpoint === 'xs';

    case 'xl':
      return breakpoint === 'xl' ||
        breakpoint === 'lgPlus' ||
        breakpoint === 'lg' ||
        breakpoint === 'mdPlus' ||
        breakpoint === 'md' ||
        breakpoint === 'smPlus' ||
        breakpoint === 'sm' ||
        breakpoint === 'xs';
        
    default:
      return false;
  }
}