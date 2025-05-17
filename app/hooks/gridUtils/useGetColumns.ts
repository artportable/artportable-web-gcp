import { useTheme } from "@material-ui/core";
import { useMainWidth } from "../useWidth";

type mainContainerWidth = "wide" | "regular";

export const useGetColumnWidths = (
  mainContainerWidth: mainContainerWidth = "regular",
  maxColumns: number = 6,
  minColumnWidth: number = 200
): { width: number; numberOfColumns: number } => {
  const breakpoint = useMainWidth();
  const theme = useTheme();
  const availableSpace = breakpoint[mainContainerWidth];

  if (availableSpace <= 0) {
    return { width: 0, numberOfColumns: 2 };
  }

  const spacing = theme.spacing(2);

  const newColumns = getNumberOfColumnsAndWidth(
    availableSpace,
    spacing,
    minColumnWidth,
    maxColumns
  );

  return newColumns;
};

const getNumberOfColumnsAndWidth = (
  availableSpace: number,
  spacing: number,
  minColumnWidth: number,
  maxColumns: number
): { width: number; numberOfColumns: number } => {
  const possibleColumns = availableSpace / minColumnWidth;
  const columnsToTry =
    possibleColumns > maxColumns ? maxColumns : Math.floor(possibleColumns);

  const totalSpacing =
    columnsToTry + (spacing * columnsToTry === 1 ? 0 : columnsToTry);
  const availableSpaceMinusSpacing = availableSpace - totalSpacing;

  const assumedWidth = availableSpaceMinusSpacing / columnsToTry;

  if (assumedWidth >= minColumnWidth) {
    return { width: assumedWidth, numberOfColumns: columnsToTry };
  } else {
    const newColumnsToTry = columnsToTry - 1;
    return getNumberOfColumnsAndWidth(
      availableSpace,
      spacing,
      minColumnWidth,
      newColumnsToTry
    );
  }
};

export default useGetColumnWidths;
