import { useTheme } from '@material-ui/core'
import { useMainWidth } from '../useWidth'

type mainContainerWidth = 'wide' | 'regular';

export const useGetColumns = (
  mainContainerWidth: mainContainerWidth = 'regular',
  maxColumns: number = 6,
  minColumnWidth: number = 200)
    : number => {
  const breakpoint = useMainWidth();
  const theme = useTheme();
  const spacing = theme.spacing(2);
  const availableSpace = breakpoint[mainContainerWidth];
  const possibleColumns = availableSpace / minColumnWidth;
  const columns =  possibleColumns > maxColumns ? maxColumns : possibleColumns;

  const getTotalSpacing = (cols) => (cols - 1) * spacing;
  const getAvailableArtworkSpace = 
    (availableSpace, cols = maxColumns) => availableSpace - getTotalSpacing(cols);
  const decimalColumns = getAvailableArtworkSpace(availableSpace, columns) / minColumnWidth;

  return decimalColumns > maxColumns ? maxColumns : Math.floor(decimalColumns);
}

export default useGetColumns;