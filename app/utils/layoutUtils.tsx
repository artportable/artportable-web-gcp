import { isNullOrUndefined } from './util';

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
      i++;
    }

    const ratio = image.Width / image.Height;
    const newWidth = rowHeight * ratio;

    const normalizedImage = normalizeImageSize(image, rowHeight);

    rows[i].push(normalizedImage);
  });

  return rows;
}

export function normalizeImageSize(image: Image, newHeight: number) {
  const ratio = image.Width / image.Height;
  const newWidth = newHeight * ratio;

  return {
    Name: image.Name,
    Width: newWidth,
    Height: newHeight
  };
}

