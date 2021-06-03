import { isNullOrUndefined } from './util';
import Image from '../models/Image';

export function getImageAsRows(images: Image[], gapSpace: number, rowWidth: number, rowHeight: number = 300): Image[][] {
  if (isNullOrUndefined(images)) {
    return;
  }

  const rows: Image[][] = [[]];
  let i = 0;

  images.forEach(image => {
    const widthSum = rows[i].reduce((acc, cur) => acc + cur.Width, 0);
    const gapSum = (rows[i].length - 1) * gapSpace;

    if((widthSum + gapSum) > rowWidth) {
      rows.push([]);
      rows[i] = setFinalRowDimensions(rows[i], (rowWidth - gapSum) / widthSum);
      i++;
    }

    const ratio = image.Width / image.Height;
    const newWidth = rowHeight * ratio;

    const normalizedImage = normalizeImageSize(image, undefined, newWidth);

    rows[i].push(normalizedImage);
  });

  return rows;
}

export function normalizeImageSize(image: Image, newHeight?: number, newWidth?: number) {
  const ratio = image.Width / image.Height;
  const newX = newWidth ? newWidth : newHeight * ratio;
  const newY = newHeight ? newHeight : newWidth / ratio

  return {
    Name: image.Name,
    Width: newX,
    Height: newY
  };
}

function setFinalRowDimensions(row, adjustBy) {
  const borderWidthAdjustment = 2;
  const borderHeightAdjustment = 2 * adjustBy;

  return row.map(image => ({
    
      Name: image.Name,
      Width: (image.Width * adjustBy) - borderWidthAdjustment,
      Height: (image.Height * adjustBy) - borderHeightAdjustment
    

    
  }));
}

