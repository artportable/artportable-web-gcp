import { useTheme } from '@material-ui/core'
import { useMainWidth } from '../useWidth'

type mainContainerWidth = 'wide' | 'regular';

export const useGetColumnWidths = (
  mainContainerWidth: mainContainerWidth = 'regular',
  maxColumns: number = 6,
  minColumnWidth: number = 200)
    : { oldCols: number, colWidth: number } => {
  const breakpoint = useMainWidth();
  const theme = useTheme();
  const availableSpace = breakpoint[mainContainerWidth];
  if(availableSpace <= 0) { return { oldCols: 0, colWidth: 0 } }
  
  const spacing = theme.spacing(2);
  const possibleColumns = availableSpace / minColumnWidth;
  const columns =  possibleColumns > maxColumns ? maxColumns : possibleColumns;

  
  const getTotalSpacing = (cols) => (cols - 1) * spacing;
  const getAvailableArtworkSpace = 
    (availableSpace, cols = maxColumns) => availableSpace - getTotalSpacing(cols);
  const decimalColumns = getAvailableArtworkSpace(availableSpace, columns) / minColumnWidth;

  const colWidth = getWidth(availableSpace, spacing, minColumnWidth, maxColumns);

  return { oldCols: decimalColumns > maxColumns ? maxColumns : Math.floor(decimalColumns), colWidth };
}

const getWidth = (
  availableSpace: number,
  spacing: number,
  minColumnWidth: number,
  maxColumns: number): number => {
  const possibleColumns = availableSpace / minColumnWidth;
  const columnsToTry =  possibleColumns > maxColumns ? maxColumns : Math.floor(possibleColumns);

  const totalSpacing = columnsToTry * spacing;
  const availableSpaceMinusSpacing = availableSpace - totalSpacing;

  const assumedWidth = availableSpaceMinusSpacing / columnsToTry;

  if(assumedWidth >= minColumnWidth) {
    return assumedWidth;
  } else {
    const newColumnsToTry = columnsToTry - 1;
    return getWidth(availableSpace, spacing, minColumnWidth, newColumnsToTry);
  }
}

export default useGetColumnWidths;