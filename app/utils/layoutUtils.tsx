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

    const ratio = image.Width / image.Height;
    const newWidth = rowHeight * ratio;
    const normalizedImage = normalizeImageSize(image, undefined, newWidth);

    if((widthSum + gapSum) + normalizedImage.Width > rowWidth) {
      rows.push([]);
      rows[i] = setFinalRowDimensions(rows[i], (rowWidth - gapSum) / widthSum);
      i++;
    }

    

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

// Create an array of indexes in sequence with random start, 0,1,2,3... etc.
export function getRandomSequentialIndexes(arrayLength, resultCount) {
  const startIndex = Math.floor(Math.random() * arrayLength)

  let randomIndexes = []
  for (let i = startIndex; i < startIndex + resultCount; i++) {
    // If next value to push is off the end of the array, push values from the beginning instead, 0,1,2...
    randomIndexes.push(i < arrayLength ? i : i - arrayLength)
  }

  return randomIndexes
}

// export const sortArtworkByOrderIndex = (a, b) => {
//   if (a.index > b.index) return 1
//   if (a.index < b.index) return -1
//   return 0
// }